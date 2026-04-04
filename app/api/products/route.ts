import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    }catch (error) {
        console.error(error);
        return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {

  
  const body = await request.json();

  const {
        name,
        price,             
        stock,           
        category,  
        lowStockThreshold,         
      } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        stock: Number(stock) || 0,
        category,
        lowStockThreshold: Number(lowStockThreshold) || 5
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}