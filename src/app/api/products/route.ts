import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? searchParams.get("cat");
  const filter = category && category !== "all" ? { category } : {};
  const products = await Product.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const payload = await request.json();
  const product = await Product.create(payload);
  return NextResponse.json(product, { status: 201 });
}
