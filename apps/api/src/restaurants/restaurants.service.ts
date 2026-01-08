import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, payload: CreateRestaurantDto) {
    return this.prisma.restaurant.create({
      data: {
        ...payload,
        slug: payload.slug.toLowerCase(),
        ownerId,
      },
    });
  }

  async list(ownerId: string) {
    return this.prisma.restaurant.findMany({ where: { ownerId } });
  }

  async get(ownerId: string, id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) throw new NotFoundException();
    if (restaurant.ownerId !== ownerId) throw new ForbiddenException();
    return restaurant;
  }

  async update(ownerId: string, id: string, payload: UpdateRestaurantDto) {
    await this.get(ownerId, id);
    return this.prisma.restaurant.update({
      where: { id },
      data: {
        ...payload,
        slug: payload.slug ? payload.slug.toLowerCase() : undefined,
      },
    });
  }

  async remove(ownerId: string, id: string) {
    await this.get(ownerId, id);
    return this.prisma.restaurant.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async publish(ownerId: string, id: string) {
    await this.get(ownerId, id);
    return this.prisma.restaurant.update({
      where: { id },
      data: { publish: "PUBLISHED" },
    });
  }
}
