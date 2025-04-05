import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// CHANGE THE STATUS OR UPDATE THE ORDER WITH NEW PRODUCTS AND PRICE
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const body = await req.json();

    // Ensure valid input for `status` and `products`
    if (typeof body.status !== "string") {
      return new NextResponse(
        JSON.stringify({ message: "Invalid status value!" }),
        { status: 400 }
      );
    }

    // Ensure that products is an array and price is a number
    if (!Array.isArray(body.products)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid products array!" }),
        { status: 400 }
      );
    }

    if (typeof body.price !== "number") {
      return new NextResponse(
        JSON.stringify({ message: "Invalid price value!" }),
        { status: 400 }
      );
    }

    // Update the order with new products and status
    const updatedOrder = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: body.status, // Update status
        products: body.products, // Update the products list
        price: body.price, // Update price
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "Order has been updated!",
        order: updatedOrder,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// DELETE AN ORDER
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const deletedOrder = await prisma.order.delete({
      where: {
        id,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Order has been deleted!", order: deletedOrder }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete error:", err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete order." }),
      { status: 500 }
    );
  }
};
