import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, payload: CreateItemDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: payload.categoryId },
      include: { menu: { include: { restaurant: true } } },
    });
    if (!category) throw new NotFoundException();
    if (category.menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.item.create({
      data: {
        categoryId: payload.categoryId,
        name: payload.name,
        description: payload.description,
        price: payload.price,
        imageUrl: payload.imageUrl,
        tags: payload.tags ?? [],
        allergens: payload.allergens ?? [],
        isSpicy: payload.isSpicy ?? false,
        isVegan: payload.isVegan ?? false,
        available: payload.available ?? true,
        sortOrder: payload.sortOrder,
      },
    });
  }

  async list(ownerId: string, categoryId: string) {
    return this.prisma.item.findMany({
      where: { categoryId, category: { menu: { restaurant: { ownerId } } } },
      orderBy: { sortOrder: "asc" },
    });
  }

  async update(ownerId: string, id: string, payload: UpdateItemDto) {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { category: { include: { menu: { include: { restaurant: true } } } } },
    });
    if (!item) throw new NotFoundException();
    if (item.category.menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.item.update({
      where: { id },
      data: {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        imageUrl: payload.imageUrl,
        tags: payload.tags,
        allergens: payload.allergens,
        isSpicy: payload.isSpicy,
        isVegan: payload.isVegan,
        available: payload.available,
        sortOrder: payload.sortOrder,
      },
    });
  }

  async remove(ownerId: string, id: string) {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { category: { include: { menu: { include: { restaurant: true } } } } },
    });
    if (!item) throw new NotFoundException();
    if (item.category.menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.item.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
