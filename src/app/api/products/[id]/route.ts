import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

type RouteParams = {
  params: { id: string };
};

export async function GET(_request: Request, { params }: RouteParams) {
  await connectToDatabase();
  const product = await Product.findById(params.id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: RouteParams) {
  await connectToDatabase();
  const payload = await request.json();
  const product = await Product.findByIdAndUpdate(params.id, payload, { new: true });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  await connectToDatabase();
  const deleted = await Product.findByIdAndDelete(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
