import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Contact from "@/models/Contact";

export const dynamic = "force-dynamic";

type RouteParams = {
  params: { id: string };
};

export async function PATCH(_request: Request, { params }: RouteParams) {
  await connectToDatabase();
  const contact = await (Contact as any).findByIdAndUpdate(
    params.id,
    { status: "contacted" },
    { new: true }
  );
  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }
  return NextResponse.json(contact);
}
