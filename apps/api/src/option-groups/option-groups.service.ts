import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOptionGroupDto } from "./dto/create-option-group.dto";
import { UpdateOptionGroupDto } from "./dto/update-option-group.dto";

@Injectable()
export class OptionGroupsService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, payload: CreateOptionGroupDto) {
    const item = await this.prisma.item.findUnique({
      where: { id: payload.itemId },
      include: { category: { include: { menu: { include: { restaurant: true } } } } },
    });
    if (!item) throw new NotFoundException();
    if (item.category.menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.optionGroup.create({
      data: {
        itemId: payload.itemId,
        name: payload.name,
        minSelectable: payload.minSelectable,
        maxSelectable: payload.maxSelectable,
      },
    });
  }

  async list(ownerId: string, itemId: string) {
    return this.prisma.optionGroup.findMany({
      where: { itemId, item: { category: { menu: { restaurant: { ownerId } } } } },
    });
  }

  async update(ownerId: string, id: string, payload: UpdateOptionGroupDto) {
    const group = await this.prisma.optionGroup.findUnique({
      where: { id },
      include: { item: { include: { category: { include: { menu: { include: { restaurant: true } } } } } } },
    });
    if (!group) throw new NotFoundException();
    if (group.item.category.menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.optionGroup.update({ where: { id }, data: payload });
  }

  async remove(ownerId: string, id: string) {
    const group = await this.prisma.optionGroup.findUnique({
      where: { id },
      include: { item: { include: { category: { include: { menu: { include: { restaurant: true } } } } } } },
    });
    if (!group) throw new NotFoundException();
    if (group.item.category.menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.optionGroup.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
