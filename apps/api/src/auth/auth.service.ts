import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(payload: RegisterDto) {
    const passwordHash = await bcrypt.hash(payload.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: payload.email,
        name: payload.name,
        passwordHash,
      },
    });

    return this.issueTokens(user.id, user.email);
  }

  async login(payload: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const valid = await bcrypt.compare(payload.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.issueTokens(user.id, user.email);
  }

  async refresh(refreshToken: string) {
    const stored = await this.prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException("Refresh token expired");
    }

    const user = await this.prisma.user.findUnique({ where: { id: stored.userId } });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return this.issueTokens(user.id, user.email, stored.token);
  }

  async logout(refreshToken: string | undefined) {
    if (!refreshToken) return;
    await this.prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }

  async me(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });
  }

  private async issueTokens(userId: string, email: string, existingToken?: string) {
    const accessToken = await this.jwt.signAsync(
      { sub: userId, email },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
      },
    );

    const refreshToken = existingToken ?? randomUUID();
    const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN ?? "7d";
    const expiresAt = new Date(Date.now() + this.parseExpiry(expiresIn));

    await this.prisma.refreshToken.upsert({
      where: { token: refreshToken },
      update: { expiresAt },
      create: {
        token: refreshToken,
        userId,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  private parseExpiry(exp: string) {
    if (exp.endsWith("d")) return Number(exp.replace("d", "")) * 24 * 60 * 60 * 1000;
    if (exp.endsWith("h")) return Number(exp.replace("h", "")) * 60 * 60 * 1000;
    if (exp.endsWith("m")) return Number(exp.replace("m", "")) * 60 * 1000;
    return Number(exp) * 1000;
  }
}
