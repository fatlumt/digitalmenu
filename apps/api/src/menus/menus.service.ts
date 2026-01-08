import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, payload: CreateMenuDto) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: payload.restaurantId },
    });
    if (!restaurant) throw new NotFoundException();
    if (restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.menu.create({
      data: {
        restaurantId: payload.restaurantId,
        name: payload.name,
        description: payload.description,
      },
    });
  }

  async list(ownerId: string, restaurantId?: string) {
    return this.prisma.menu.findMany({
      where: {
        restaurant: { ownerId },
        ...(restaurantId ? { restaurantId } : {}),
      },
    });
  }

  async update(ownerId: string, id: string, payload: UpdateMenuDto) {
    const menu = await this.prisma.menu.findUnique({ where: { id }, include: { restaurant: true } });
    if (!menu) throw new NotFoundException();
    if (menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();
    return this.prisma.menu.update({ where: { id }, data: payload });
  }

  async remove(ownerId: string, id: string) {
    const menu = await this.prisma.menu.findUnique({ where: { id }, include: { restaurant: true } });
    if (!menu) throw new NotFoundException();
    if (menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();
    return this.prisma.menu.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
