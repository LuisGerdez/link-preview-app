"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "recent_urls";
const MAX_URLS = 10;

export function useRecentUrls() {
  const [recentUrls, setRecentUrls] = useState<string[]>([]);

  // Get recent URLs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setRecentUrls(JSON.parse(stored));
    } catch {
      setRecentUrls([]);
    }
  }, []);

  const addUrl = (url: string) => {
    setRecentUrls((prev) => {
      // Deduplicate and put the most recent first
      const updated = [url, ...prev.filter((u) => u !== url)].slice(0, MAX_URLS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { recentUrls, addUrl };
}