import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const response = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 400 });
    }

    const html = await response.text();

    return NextResponse.json({ html });

  } catch (e) {
    return NextResponse.json({ error: 'Error fetching or parsing URL' }, { status: 500 });
  }
}