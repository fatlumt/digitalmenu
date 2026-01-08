import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, payload: CreateCategoryDto) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: payload.menuId },
      include: { restaurant: true },
    });
    if (!menu) throw new NotFoundException();
    if (menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.category.create({
      data: {
        menuId: payload.menuId,
        name: payload.name,
        desc: payload.description,
        sortOrder: payload.sortOrder,
      },
    });
  }

  async list(ownerId: string, menuId: string) {
    return this.prisma.category.findMany({
      where: { menuId, menu: { restaurant: { ownerId } } },
      orderBy: { sortOrder: "asc" },
    });
  }

  async update(ownerId: string, id: string, payload: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { menu: { include: { restaurant: true } } },
    });
    if (!category) throw new NotFoundException();
    if (category.menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.category.update({
      where: { id },
      data: {
        name: payload.name,
        desc: payload.description,
        sortOrder: payload.sortOrder,
      },
    });
  }

  async remove(ownerId: string, id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { menu: { include: { restaurant: true } } },
    });
    if (!category) throw new NotFoundException();
    if (category.menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
