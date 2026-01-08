import { describe, expect, it, vi } from "vitest";
import { AuthService } from "../src/auth/auth.service";

const prismaMock = {
  user: {
    findUnique: vi.fn(),
  },
  refreshToken: {
    findUnique: vi.fn(),
    upsert: vi.fn(),
  },
};

const jwtMock = {
  signAsync: vi.fn().mockResolvedValue("token"),
};

describe("AuthService", () => {
  it("throws on invalid login", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    const service = new AuthService(prismaMock as any, jwtMock as any);

    await expect(
      service.login({ email: "nope@example.com", password: "bad" }),
    ).rejects.toThrow("Invalid credentials");
  });
});
