import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const endpoint = process.env.GOOGLE_SHEET_WEB_APP_URL;
    const secret = process.env.GOOGLE_SHEET_SECRET;

    if (!endpoint || !secret) {
      return NextResponse.json(
        { error: "Missing GSHEET_WEBAPP_URL or GSHEET_SECRET in env vars" },
        { status: 500 }
      );
    }

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, secret, page: body?.page || "contact" }),
      redirect: "follow",
    });

    const raw = await resp.text();

    let data: any = null;
    try {
      data = JSON.parse(raw);
    } catch {
      // not JSON (often HTML from Google auth/deploy issues)
    }

    if (!resp.ok) {
      return NextResponse.json(
        { error: `Apps Script HTTP ${resp.status}`, details: raw.slice(0, 500) },
        { status: 500 }
      );
    }

    if (!data || data.ok !== true) {
      return NextResponse.json(
        {
          error: "Apps Script returned not-ok",
          details: data?.error || raw.slice(0, 500),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}