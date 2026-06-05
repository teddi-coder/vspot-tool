import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured." }, { status: 500 });
  }

  let input: string;
  try {
    const body = await req.json();
    input = String(body.input ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!input) {
    return NextResponse.json({ error: "No product input provided." }, { status: 400 });
  }

  const prompt = `Find this product on The V-Spot (thevspot.com.au), an Australian Shopify store selling vegan and ethical beauty products: ${input}

Use web search to find the exact product page on thevspot.com.au. Respond with ONLY a valid JSON object, no markdown fences, no preamble, no explanation:
{"name": "product name exactly as shown on the page", "price": "price in AUD with $ sign", "imageUrl": "a direct cdn.shopify.com product image URL from that page", "url": "the full thevspot.com.au product page URL"}
If you cannot find a reliable image URL, set imageUrl to "". If you cannot find the price, set price to "".`;

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
      tools: [{ type: "web_search_20250305", name: "web_search" }],
    }),
  });

  const data = await upstream.json();

  if (!upstream.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? "Upstream API error." },
      { status: upstream.status }
    );
  }

  // Extract the final text block (after tool use)
  const text = ((data.content ?? []) as Array<{ type: string; text?: string }>)
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("\n");

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  try {
    const parsed = JSON.parse(match[0].replace(/```json|```/g, "")) as {
      name?: string;
      price?: string;
      imageUrl?: string;
      url?: string;
    };
    return NextResponse.json({
      name: parsed.name ?? "",
      price: parsed.price ?? "",
      imageUrl: parsed.imageUrl ?? "",
      url: parsed.url ?? "",
    });
  } catch {
    return NextResponse.json({ error: "Could not parse product details." }, { status: 500 });
  }
}
