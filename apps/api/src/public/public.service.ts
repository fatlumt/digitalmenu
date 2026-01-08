import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PublicService {
  constructor(private prisma: PrismaService) {}

  async getPublicMenu(slug: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { slug },
      include: {
        menus: {
          include: {
            categories: {
              orderBy: { sortOrder: "asc" },
              include: {
                items: {
                  orderBy: { sortOrder: "asc" },
                  include: {
                    optionGroups: {
                      include: {
                        options: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!restaurant || restaurant.publish !== "PUBLISHED") {
      throw new NotFoundException();
    }

    return restaurant;
  }
}
