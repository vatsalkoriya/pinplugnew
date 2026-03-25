import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENROUTER_API_KEY is not set." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const messages = (body?.messages ?? []) as ChatMessage[];

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Messages are required." }, { status: 400 });
  }

  const siteUrl = process.env.OPENROUTER_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = process.env.OPENROUTER_APP_NAME || "Pinplug Chatbot";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl,
      "X-Title": title,
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return NextResponse.json({ error: "OpenRouter request failed", details: text }, { status: 502 });
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    return NextResponse.json({ error: "No response from model." }, { status: 502 });
  }

  return NextResponse.json({ content });
}
