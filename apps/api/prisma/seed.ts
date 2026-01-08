import { PrismaClient, PublishState } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 10);

  const user = await prisma.user.create({
    data: {
      email: "owner@digitalmenu.com",
      name: "Demo Owner",
      passwordHash,
    },
  });

  const restaurant = await prisma.restaurant.create({
    data: {
      ownerId: user.id,
      name: "Saffron Table",
      slug: "saffron-table",
      address: "123 Market Street",
      phone: "+1 555 200 3000",
      currency: "USD",
      languages: ["en"],
      socialLinks: { instagram: "https://instagram.com/saffrontable" },
      publish: PublishState.PUBLISHED,
    },
  });

  const menu = await prisma.menu.create({
    data: {
      restaurantId: restaurant.id,
      name: "Dinner",
      description: "Seasonal tasting menu",
    },
  });

  const category = await prisma.category.create({
    data: {
      menuId: menu.id,
      name: "Starters",
      desc: "Begin the journey",
      sortOrder: 0,
    },
  });

  await prisma.item.create({
    data: {
      categoryId: category.id,
      name: "Truffle Arancini",
      description: "Crispy risotto bites, parmesan foam",
      price: 14,
      tags: ["popular"],
      allergens: ["dairy"],
      isVegan: false,
      isSpicy: false,
      available: true,
      sortOrder: 0,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
