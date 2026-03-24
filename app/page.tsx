"use client";

import { useState } from "react";
import { useRecentUrls } from "./hooks/useRecentUrls";

import type { MetaTags } from "./types/meta";
import type { Platform } from "./types/platform"

import PreviewForm from "./components/PreviewForm";

import PlatformPreview from "./components/PlatformPreview";
import PlatformTabs from "./components/PlatformTabs";

import RecentUrls from "./components/RecentUrls";


export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<MetaTags | null>(null);
  const [platform, setPlatform] = useState<Platform>("facebook");
  const { recentUrls, addUrl } = useRecentUrls();

  const handleSubmit = async (url: string) => {
    setError(null);
    setLoading(true);
    setMeta(null);

    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Unknown error");
      
      setMeta(data.meta);
      addUrl(url);

    } catch (error) {
      setError(error instanceof Error ? error.message : "Error fetching preview");
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4">

      <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">Link Preview Studio</h1>
      <p className="mb-6 text-lg text-gray-600 font-normal text-body lg:text-xl sm:px-16 xl:px-48">
        A web tool to preview how your links look when shared on social media platforms!
      </p>

      <PreviewForm onSubmit={handleSubmit} loading={loading} />

      {error && <p className="text-red-500">{error}</p>}

      {loading && <p>Loading...</p>}

      {meta && !loading && (
      <div className="w-full flex flex-col items-center gap-6">
          <PlatformTabs platform={platform} onChange={setPlatform} />
          <PlatformPreview meta={meta} platform={platform} />
        </div>
      )}

      <RecentUrls urls={recentUrls} onSelect={handleSubmit} />
    </div>
  );
}