import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const ProductData: Prisma.ProductCreateInput[] = [
    {
        name: "Wireless Mouse",
        price: 799,
        stock: 12,
        category: "Electronics",
        lowStockThreshold: 5,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Keyboard",
        price: 1499,
        stock: 3,
        category: "Electronics",
        lowStockThreshold: 5,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Notebook",
        price: 99,
        stock: 0,
        category: "Stationery",
        lowStockThreshold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Mouse",
        price: 299,
        stock: 3,
        category: "Electronics",
        lowStockThreshold: 7,
        createdAt: new Date(),
        updatedAt: new Date()
    },
];

export async function main() {
  for (const u of ProductData) {
    await prisma.product.create({ data: u });
  }
}

main();