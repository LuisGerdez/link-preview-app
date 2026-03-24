import { extractMetaTags } from './extractMetaTags';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    // Validate URL format
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Malformed URL', message: 'The provided URL is not valid.' }, { status: 400 });
    }

    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return NextResponse.json({ error: 'Invalid protocol', message: 'Only HTTP and HTTPS protocols are allowed.' }, { status: 400 });
    }

    // Only allow public IPs/domains
    const hostname = parsed.hostname;
    if (hostname === 'localhost' || hostname.startsWith('127.') || hostname.startsWith('192.168.')) {
      return NextResponse.json({ error: 'Invalid URL', message: 'Only public IPs and domains are allowed.' }, { status: 400 });
    }

    // Fetch with timeout (5 seconds)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(parsed.href, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    // Check for non-200 status
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch URL', message: `Received status code ${response.status}` }, { status: 400 });
    }

    // Ensure content type is HTML
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('text/html')) {
      return NextResponse.json({ error: 'URL does not return an HTML page', message: `Received content type ${contentType}` }, { status: 422 });
    }

    // Limit to first 500KB to avoid memory issues
    const buffer = await response.arrayBuffer();
    const html = new TextDecoder().decode(buffer.slice(0, 500_000));

    const meta = extractMetaTags(html, parsed.href);
    return NextResponse.json({ meta });

  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timed out', message: 'The request took too long to complete.' }, { status: 408 });
    }
    return NextResponse.json({ error: 'Error fetching or parsing URL', message: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
  }
}