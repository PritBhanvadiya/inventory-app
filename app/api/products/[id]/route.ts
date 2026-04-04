import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const resolvedParams = await params;
  try {
    const body = await request.json();
    const { delta } = body;

    const product = await prisma.product.update({
      where: { id: Number(resolvedParams.id) },
      data: {
        stock: {
          increment: delta
        }
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update stock" },
      { status: 500 }
    );
  }
}

export async function DELETE(
   request: Request,
  { params }: { params: { id: string } }
) {
   const resolvedParams = await params;
   try {
    const id = Number(resolvedParams.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, product: deletedProduct });
   } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}