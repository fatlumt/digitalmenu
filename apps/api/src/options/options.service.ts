import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOptionDto } from "./dto/create-option.dto";
import { UpdateOptionDto } from "./dto/update-option.dto";

@Injectable()
export class OptionsService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, payload: CreateOptionDto) {
    const group = await this.prisma.optionGroup.findUnique({
      where: { id: payload.optionGroupId },
      include: { item: { include: { category: { include: { menu: { include: { restaurant: true } } } } } } },
    });
    if (!group) throw new NotFoundException();
    if (group.item.category.menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.option.create({
      data: {
        optionGroupId: payload.optionGroupId,
        name: payload.name,
        priceDelta: payload.priceDelta,
      },
    });
  }

  async list(ownerId: string, optionGroupId: string) {
    return this.prisma.option.findMany({
      where: {
        optionGroupId,
        optionGroup: { item: { category: { menu: { restaurant: { ownerId } } } } },
      },
    });
  }

  async update(ownerId: string, id: string, payload: UpdateOptionDto) {
    const option = await this.prisma.option.findUnique({
      where: { id },
      include: { optionGroup: { include: { item: { include: { category: { include: { menu: { include: { restaurant: true } } } } } } } } },
    });
    if (!option) throw new NotFoundException();
    if (option.optionGroup.item.category.menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.option.update({ where: { id }, data: payload });
  }

  async remove(ownerId: string, id: string) {
    const option = await this.prisma.option.findUnique({
      where: { id },
      include: { optionGroup: { include: { item: { include: { category: { include: { menu: { include: { restaurant: true } } } } } } } } },
    });
    if (!option) throw new NotFoundException();
    if (option.optionGroup.item.category.menu.restaurant.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.option.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
