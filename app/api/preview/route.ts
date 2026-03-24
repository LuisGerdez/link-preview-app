import { extractMetaTags } from './extractMetaTags';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    // Validación
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Malformed URL' }, { status: 400 });
    }

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return NextResponse.json({ error: 'Invalid protocol' }, { status: 400 });
    }

    // Fetch with timeout (5 seconds)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(parsed.href, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 400 });
    }

    // Limit to first 500KB to avoid memory issues
    const buffer = await response.arrayBuffer();
    const html = new TextDecoder().decode(buffer.slice(0, 500_000));

    const meta = extractMetaTags(html);
    return NextResponse.json({ meta });

  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timed out' }, { status: 408 });
    }
    return NextResponse.json({ error: 'Error fetching or parsing URL' }, { status: 500 });
  }
}