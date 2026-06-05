'use client';

import { useState, useMemo, useRef } from "react";

/* ============================================================
   THE V-SPOT EMAIL BUILDER
   Two modes:
   1. Quick brief  – give it some points, it writes the email
   2. Blog post    – paste a blog, it becomes a newsletter
   Output: paste-ready inline-styled HTML for Mailchimp.
   ============================================================ */

const BRAND = {
  cream: "#FAF7F2",
  creamDeep: "#F3EDE4",
  sage: "#7E9077",
  sageDeep: "#5C6F57",
  blush: "#E9C8BC",
  blushSoft: "#F6E7E0",
  terracotta: "#C2745A",
  charcoal: "#3B3A36",
  stone: "#8A8578",
};

const EMAIL_TYPES = [
  "Newsletter",
  "Sale / promo",
  "New arrivals",
  "Brand spotlight",
  "Gift with purchase",
  "Back in stock",
];

type Product = {
  name: string;
  price: string;
  imageUrl: string;
  url: string;
};

type EmailContent = {
  subjectLines: string[];
  previewText: string;
  heroHeadline: string;
  heroSubtext: string;
  sections: { heading: string; body: string }[];
  productsIntro?: string;
  productBlurbs: Record<string, string>;
  ctaText: string;
  signOff: string;
};

type Options = {
  discountCode: string;
  heroImageUrl: string;
  ctaUrl: string;
  toneNote: string;
  showShippingBar: boolean;
};

/* ---------- email HTML assembly ---------- */

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphs(text = "") {
  return text
    .split(/\n+/)
    .filter((p) => p.trim())
    .map(
      (p) =>
        `<p style="margin:0 0 16px 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:15px; line-height:1.7; color:${BRAND.charcoal};">${esc(p.trim())}</p>`
    )
    .join("\n");
}

function buildEmailHtml({
  content,
  products,
  options,
}: {
  content: EmailContent;
  products: Product[];
  options: Options;
}) {
  const c = content;
  const heroImg = options.heroImageUrl
    ? `<tr><td style="padding:0;"><img src="${esc(options.heroImageUrl)}" alt="" width="600" style="display:block; width:100%; max-width:600px; height:auto; border:0;" /></td></tr>`
    : "";

  const shippingBar = options.showShippingBar
    ? `<tr><td align="center" style="background:${BRAND.sageDeep}; padding:10px 24px;">
        <p style="margin:0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#FFFFFF;">Free shipping on AUS orders over $85</p>
      </td></tr>`
    : "";

  const discountBlock = options.discountCode
    ? `<tr><td align="center" style="padding:8px 40px 28px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
          <tr><td align="center" style="border:2px dashed ${BRAND.terracotta}; background:${BRAND.blushSoft}; padding:14px 34px;">
            <p style="margin:0 0 4px 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${BRAND.terracotta};">Use code at checkout</p>
            <p style="margin:0; font-family:Georgia,'Times New Roman',serif; font-size:24px; letter-spacing:3px; color:${BRAND.charcoal};">${esc(options.discountCode)}</p>
          </td></tr>
        </table>
      </td></tr>`
    : "";

  const sectionsHtml = (c.sections || [])
    .map(
      (s) => `
      <tr><td style="padding:8px 40px 4px 40px;">
        <h2 style="margin:0 0 10px 0; font-family:Georgia,'Times New Roman',serif; font-weight:normal; font-size:22px; line-height:1.3; color:${BRAND.sageDeep};">${esc(s.heading)}</h2>
        ${paragraphs(s.body)}
      </td></tr>`
    )
    .join("\n");

  const productCard = (p: Product, blurb?: string) => `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#FFFFFF; border:1px solid ${BRAND.creamDeep};">
      <tr><td style="padding:0;">
        ${p.imageUrl ? `<a href="${esc(p.url || "#")}" target="_blank"><img src="${esc(p.imageUrl)}" alt="${esc(p.name)}" width="260" style="display:block; width:100%; height:auto; border:0;" /></a>` : ""}
      </td></tr>
      <tr><td style="padding:16px 16px 6px 16px;">
        <p style="margin:0 0 4px 0; font-family:Georgia,'Times New Roman',serif; font-size:17px; color:${BRAND.charcoal};">${esc(p.name)}</p>
        ${blurb ? `<p style="margin:0 0 8px 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:13px; line-height:1.5; color:${BRAND.stone};">${esc(blurb)}</p>` : ""}
        ${p.price ? `<p style="margin:0 0 4px 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; font-weight:bold; color:${BRAND.terracotta};">${esc(p.price)}</p>` : ""}
      </td></tr>
      <tr><td style="padding:0 16px 18px 16px;">
        <a href="${esc(p.url || "#")}" target="_blank" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:${BRAND.sageDeep}; text-decoration:underline;">Shop now</a>
      </td></tr>
    </table>`;

  let productsHtml = "";
  if (products.length > 0) {
    const blurbs = c.productBlurbs || {};
    const rows: string[] = [];
    for (let i = 0; i < products.length; i += 2) {
      const left = products[i];
      const right = products[i + 1];
      rows.push(`
        <tr>
          <td valign="top" width="50%" style="padding:8px;">${productCard(left, blurbs[left.name])}</td>
          <td valign="top" width="50%" style="padding:8px;">${right ? productCard(right, blurbs[right.name]) : ""}</td>
        </tr>`);
    }
    productsHtml = `
      <tr><td style="padding:16px 32px 8px 32px;">
        ${c.productsIntro ? `<p style="margin:0 0 6px 8px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${BRAND.terracotta};">${esc(c.productsIntro)}</p>` : ""}
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${rows.join("")}</table>
      </td></tr>`;
  }

  const cta =
    c.ctaText &&
    `<tr><td align="center" style="padding:12px 40px 36px 40px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
        <tr><td align="center" bgcolor="${BRAND.sageDeep}" style="border-radius:2px;">
          <a href="${esc(options.ctaUrl || "https://www.thevspot.com.au")}" target="_blank" style="display:inline-block; padding:15px 42px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:2.5px; text-transform:uppercase; color:#FFFFFF; text-decoration:none;">${esc(c.ctaText)}</a>
        </td></tr>
      </table>
    </td></tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(c.subjectLines?.[0] || "The V-Spot")}</title>
</head>
<body style="margin:0; padding:0; background:${BRAND.cream};">
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">${esc(c.previewText || "")}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.cream};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px; max-width:600px; background:#FFFFFF;">
  ${shippingBar}
  <tr><td align="center" style="padding:36px 40px 8px 40px;">
    <p style="margin:0; font-family:Georgia,'Times New Roman',serif; font-size:30px; letter-spacing:6px; color:${BRAND.charcoal};">THE V&#8209;SPOT</p>
    <p style="margin:6px 0 0 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:${BRAND.terracotta};">Lifestyle with Heart</p>
  </td></tr>
  <tr><td style="padding:20px 40px 0 40px;"><div style="border-top:1px solid ${BRAND.creamDeep};"></div></td></tr>
  ${heroImg}
  <tr><td align="center" style="padding:32px 48px 8px 48px;">
    <h1 style="margin:0 0 14px 0; font-family:Georgia,'Times New Roman',serif; font-weight:normal; font-size:30px; line-height:1.25; color:${BRAND.charcoal};">${esc(c.heroHeadline || "")}</h1>
    <p style="margin:0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:15px; line-height:1.7; color:${BRAND.stone};">${esc(c.heroSubtext || "")}</p>
  </td></tr>
  ${discountBlock}
  ${sectionsHtml}
  ${productsHtml}
  ${cta || ""}
  <tr><td style="background:${BRAND.blushSoft}; padding:28px 40px;">
    <p style="margin:0 0 6px 0; font-family:Georgia,'Times New Roman',serif; font-size:16px; color:${BRAND.charcoal};">${esc(c.signOff || "With heart, Jannifer x")}</p>
    <p style="margin:0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; line-height:1.6; color:${BRAND.stone};">Founder, The V-Spot. Vegan, cruelty-free and ethically made, always.</p>
  </td></tr>
  <tr><td align="center" style="background:${BRAND.charcoal}; padding:26px 40px;">
    <p style="margin:0 0 10px 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase;">
      <a href="https://www.thevspot.com.au" target="_blank" style="color:${BRAND.blush}; text-decoration:none;">Shop</a>
      &nbsp;&nbsp;&middot;&nbsp;&nbsp;
      <a href="https://www.instagram.com/thevspot_/" target="_blank" style="color:${BRAND.blush}; text-decoration:none;">Instagram</a>
      &nbsp;&nbsp;&middot;&nbsp;&nbsp;
      <a href="https://www.facebook.com/thevspotau" target="_blank" style="color:${BRAND.blush}; text-decoration:none;">Facebook</a>
    </p>
    <p style="margin:0 0 6px 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; line-height:1.6; color:#9A968C;">The V-Spot &middot; *|LIST:ADDRESS|*</p>
    <p style="margin:0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; color:#9A968C;">
      <a href="*|UNSUB|*" style="color:#9A968C; text-decoration:underline;">Unsubscribe</a>
      &nbsp;&middot;&nbsp;
      <a href="*|UPDATE_PROFILE|*" style="color:#9A968C; text-decoration:underline;">Update preferences</a>
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/* ---------- AI copy generation (calls our server-side proxy) ---------- */

async function generateCopy({
  mode,
  emailType,
  brief,
  blogText,
  products,
  options,
}: {
  mode: string;
  emailType: string;
  brief: string;
  blogText: string;
  products: Product[];
  options: Options;
}): Promise<EmailContent> {
  const productList = products
    .map((p) => `- ${p.name}${p.price ? ` (${p.price})` : ""}`)
    .join("\n");

  const sourceInstruction =
    mode === "blog"
      ? `Convert this blog post into a newsletter email. Tease the best ideas without giving the whole post away, and drive readers to the blog with the CTA.\n\nBLOG POST:\n${blogText}`
      : `EMAIL TYPE: ${emailType}\n\nKEY POINTS FROM JANNIFER:\n${brief}`;

  const prompt = `You are the email copywriter for The V-Spot (thevspot.com.au), an Australian online store stocking vegan, cruelty-free, ethically made beauty and lifestyle products since 2015. Tagline: "Lifestyle with Heart". The founder Jannifer writes the emails personally. Voice: warm, playful, values-led, a little cheeky, never corporate. Australian English spelling. Never use em dashes.

${sourceInstruction}

${productList ? `FEATURED PRODUCTS:\n${productList}` : ""}
${options.discountCode ? `DISCOUNT CODE: ${options.discountCode}` : ""}
${options.toneNote ? `EXTRA DIRECTION: ${options.toneNote}` : ""}

Respond with ONLY a valid JSON object, no markdown fences, no preamble, in exactly this shape:
{
  "subjectLines": ["option 1", "option 2", "option 3"],
  "previewText": "40-90 char preview text",
  "heroHeadline": "short headline, max 8 words",
  "heroSubtext": "1-2 sentence subhead",
  "sections": [{"heading": "...", "body": "1-3 short paragraphs separated by newlines"}],
  "productsIntro": "${products.length ? "short kicker line above the product grid" : ""}",
  "productBlurbs": {${products.map((p) => `"${p.name.replace(/"/g, '\\"')}": "one punchy sentence"`).join(", ")}},
  "ctaText": "2-4 word button text",
  "signOff": "warm one-line sign off from Jannifer"
}
Keep total email length tight: 1-3 sections max. Subject lines under 50 characters.`;

  const response = await fetch("/api/generate-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Generation failed.");
  }

  const data = await response.json();
  const text = (data.content || [])
    .filter((b: { type: string }) => b.type === "text")
    .map((b: { text: string }) => b.text)
    .join("\n");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean) as EmailContent;
}

/* ---------- UI ---------- */

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: `1px solid ${BRAND.creamDeep}`,
  borderRadius: 2,
  background: "#FFFFFF",
  fontFamily: "'Karla', 'Helvetica Neue', sans-serif",
  fontSize: 14,
  color: BRAND.charcoal,
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Karla', 'Helvetica Neue', sans-serif",
  fontSize: 11,
  letterSpacing: 1.8,
  textTransform: "uppercase",
  color: BRAND.stone,
  marginBottom: 6,
};

export default function VSpotEmailBuilder() {
  const [mode, setMode] = useState("brief");
  const [emailType, setEmailType] = useState("Newsletter");
  const [brief, setBrief] = useState("");
  const [blogText, setBlogText] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [ctaUrl, setCtaUrl] = useState("https://www.thevspot.com.au");
  const [toneNote, setToneNote] = useState("");
  const [showShippingBar, setShowShippingBar] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [content, setContent] = useState<EmailContent | null>(null);
  const [chosenSubject, setChosenSubject] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const copyRef = useRef<HTMLTextAreaElement>(null);

  const options: Options = { discountCode, heroImageUrl, ctaUrl, toneNote, showShippingBar };

  const html = useMemo(() => {
    if (!content) return "";
    const ordered: EmailContent = {
      ...content,
      subjectLines: [
        content.subjectLines?.[chosenSubject],
        ...(content.subjectLines || []).filter((_, i) => i !== chosenSubject),
      ].filter(Boolean),
    };
    return buildEmailHtml({ content: ordered, products, options });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, products, chosenSubject, discountCode, heroImageUrl, ctaUrl, showShippingBar]);

  const addProduct = () =>
    setProducts([...products, { name: "", price: "", imageUrl: "", url: "" }]);
  const updateProduct = (i: number, field: keyof Product, val: string) => {
    const next = [...products];
    next[i] = { ...next[i], [field]: val };
    setProducts(next);
  };
  const removeProduct = (i: number) => setProducts(products.filter((_, idx) => idx !== i));

  const generate = async () => {
    setError("");
    if (mode === "brief" && !brief.trim()) {
      setError("Add a few points about what the email should say first.");
      return;
    }
    if (mode === "blog" && !blogText.trim()) {
      setError("Paste the blog post in first.");
      return;
    }
    setLoading(true);
    try {
      const result = await generateCopy({
        mode,
        emailType,
        brief,
        blogText,
        products: products.filter((p) => p.name.trim()),
        options,
      });
      setContent(result);
      setChosenSubject(0);
    } catch (e) {
      console.error(e);
      setError("Something went wrong generating the copy. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      if (copyRef.current) {
        copyRef.current.select();
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: BRAND.cream, padding: "0 0 60px 0" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Karla:wght@400;500;700&display=swap');`}</style>

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "28px 20px 0 20px",
          display: "grid",
          gridTemplateColumns: "minmax(340px, 440px) 1fr",
          gap: 28,
        }}
      >
        {/* LEFT: controls */}
        <div>
          {/* mode tabs */}
          <div style={{ display: "flex", gap: 0, marginBottom: 22 }}>
            {[
              { id: "brief", label: "Quick brief" },
              { id: "blog", label: "From a blog post" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setMode(t.id)}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  border: `1px solid ${BRAND.sageDeep}`,
                  background: mode === t.id ? BRAND.sageDeep : "transparent",
                  color: mode === t.id ? BRAND.cream : BRAND.sageDeep,
                  fontFamily: "'Karla', sans-serif",
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {mode === "brief" ? (
            <>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Email type</label>
                <select
                  value={emailType}
                  onChange={(e) => setEmailType(e.target.value)}
                  style={inputStyle}
                >
                  {EMAIL_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>What should it say? (dot points are fine)</label>
                <textarea
                  rows={6}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder={"e.g.\n- 20% off sitewide ends Sunday\n- free Axiology lip balm over $150\n- new RAAW serums just landed"}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
            </>
          ) : (
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Paste the blog post</label>
              <textarea
                rows={10}
                value={blogText}
                onChange={(e) => setBlogText(e.target.value)}
                placeholder="Paste the full blog post text here and it will become a newsletter that teases the post and links readers through."
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Discount code (optional)</label>
              <input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="e.g. GOODIES"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Button links to</label>
              <input
                value={ctaUrl}
                onChange={(e) => setCtaUrl(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Hero image URL (optional)</label>
            <input
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              placeholder="Paste an image link from Shopify files or the website"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Anything else? (tone, must-mentions)</label>
            <input
              value={toneNote}
              onChange={(e) => setToneNote(e.target.value)}
              placeholder="e.g. extra cheeky, mention I'm back from Africa"
              style={inputStyle}
            />
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Karla', sans-serif",
              fontSize: 13,
              color: BRAND.charcoal,
              marginBottom: 22,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={showShippingBar}
              onChange={(e) => setShowShippingBar(e.target.checked)}
            />
            Show the free shipping bar
          </label>

          {/* products */}
          <div style={{ borderTop: `1px solid ${BRAND.creamDeep}`, paddingTop: 18, marginBottom: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ ...labelStyle, marginBottom: 0 }}>Featured products</span>
              <button
                onClick={addProduct}
                style={{
                  border: `1px solid ${BRAND.terracotta}`,
                  background: "transparent",
                  color: BRAND.terracotta,
                  fontFamily: "'Karla', sans-serif",
                  fontSize: 11,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  cursor: "pointer",
                }}
              >
                + Add product
              </button>
            </div>
            {products.length === 0 && (
              <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 13, color: BRAND.stone, margin: 0 }}>
                Add products to show them as a shoppable grid in the email. Image and product links can be copied straight from the website.
              </p>
            )}
            {products.map((p, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: `1px solid ${BRAND.creamDeep}`, padding: 12, marginBottom: 10 }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8, marginBottom: 8 }}>
                  <input value={p.name} onChange={(e) => updateProduct(i, "name", e.target.value)} placeholder="Product name" style={inputStyle} />
                  <input value={p.price} onChange={(e) => updateProduct(i, "price", e.target.value)} placeholder="$39" style={inputStyle} />
                </div>
                <input value={p.imageUrl} onChange={(e) => updateProduct(i, "imageUrl", e.target.value)} placeholder="Image URL" style={{ ...inputStyle, marginBottom: 8 }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <input value={p.url} onChange={(e) => updateProduct(i, "url", e.target.value)} placeholder="Product page URL" style={inputStyle} />
                  <button onClick={() => removeProduct(i)} style={{ border: "none", background: "transparent", color: BRAND.stone, cursor: "pointer", fontSize: 16 }} title="Remove">
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={generate}
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px 0",
              background: loading ? BRAND.stone : BRAND.terracotta,
              color: "#FFFFFF",
              border: "none",
              fontFamily: "'Karla', sans-serif",
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Writing your email…" : content ? "Regenerate" : "Build my email"}
          </button>
          {error && (
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 13, color: BRAND.terracotta, marginTop: 10 }}>
              {error}
            </p>
          )}
        </div>

        {/* RIGHT: preview + output */}
        <div>
          {content ? (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Pick a subject line</label>
                {(content.subjectLines || []).map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setChosenSubject(i)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 14px",
                      marginBottom: 6,
                      border: `1px solid ${i === chosenSubject ? BRAND.sageDeep : BRAND.creamDeep}`,
                      background: i === chosenSubject ? BRAND.blushSoft : "#FFFFFF",
                      fontFamily: "'Karla', sans-serif",
                      fontSize: 14,
                      color: BRAND.charcoal,
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
                <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 12, color: BRAND.stone, margin: "4px 0 0 0" }}>
                  Preview text: {content.previewText}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ ...labelStyle, marginBottom: 0 }}>Email preview</span>
                <button
                  onClick={copyHtml}
                  style={{
                    padding: "10px 22px",
                    background: copied ? BRAND.sageDeep : BRAND.charcoal,
                    color: "#FFFFFF",
                    border: "none",
                    fontFamily: "'Karla', sans-serif",
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  {copied ? "Copied!" : "Copy HTML for Mailchimp"}
                </button>
              </div>

              <iframe
                title="email-preview"
                srcDoc={html}
                style={{ width: "100%", height: 720, border: `1px solid ${BRAND.creamDeep}`, background: "#FFFFFF" }}
              />

              <textarea
                ref={copyRef}
                readOnly
                value={html}
                style={{ position: "absolute", left: -9999, top: 0, height: 1, width: 1, opacity: 0 }}
              />

              <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 12.5, lineHeight: 1.7, color: BRAND.stone, marginTop: 12 }}>
                In Mailchimp: create a new campaign, choose <b>Code your own &gt; Paste in code</b>, and paste. The footer already includes Mailchimp&apos;s unsubscribe and address merge tags, so it will pass their checks.
              </p>
            </>
          ) : (
            <div style={{ border: `1px dashed ${BRAND.sage}`, background: BRAND.blushSoft, padding: "70px 40px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, color: BRAND.sageDeep, marginBottom: 10 }}>
                Your email will appear here
              </div>
              <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, lineHeight: 1.7, color: BRAND.stone, maxWidth: 420, margin: "0 auto" }}>
                Give it a few points (or paste a blog post), add any products you want to feature, and hit Build. You will get subject line options, a styled preview, and paste-ready HTML for Mailchimp.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
