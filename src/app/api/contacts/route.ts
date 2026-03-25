import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Contact from "@/models/Contact";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectToDatabase();
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const payload = await request.json();
  const contact = await Contact.create(payload);
  return NextResponse.json(contact, { status: 201 });
}
