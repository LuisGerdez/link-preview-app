import { parse } from 'node-html-parser';
import type { MetaTags } from '../../types/meta';

export function extractMetaTags(html: string, url: string): MetaTags {
  const root = parse(html);
  const get = (attr: string, value: string) =>
    root.querySelector(`meta[${attr}="${value}"]`)?.getAttribute('content') ?? null;

  return {
    og_title: get('property', 'og:title'),
    og_description: get('property', 'og:description'),
    og_image: get('property', 'og:image'),
    og_url: get('property', 'og:url'),
    twitter_card: get('name', 'twitter:card'),
    twitter_title: get('name', 'twitter:title'),
    twitter_description: get('name', 'twitter:description'),
    twitter_image: get('name', 'twitter:image'),
    html_title: root.querySelector('title')?.text?.trim() ?? null,
    meta_description: get('name', 'description'),
    site: new URL(url).hostname.replace(/^www\./, '')
  };
}