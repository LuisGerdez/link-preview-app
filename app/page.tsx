"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRecentUrls } from "./hooks/useRecentUrls";

import type { MetaTags } from "./types/meta";
import type { Platform } from "./types/platform"

import PreviewForm from "./components/PreviewForm";

import PlatformPreview from "./components/PlatformPreview";
import PlatformTabs from "./components/PlatformTabs";
import MetaTagsPanel from "./components/MetaTagsPanel";

import RecentUrls from "./components/RecentUrls";
import ThemeToggle from "./components/ThemeToggle";
import Modal from "./components/Modal";


export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<MetaTags | null>(null);
  const [platform, setPlatform] = useState<Platform>("facebook");
  const [showMetaModal, setShowMetaModal] = useState(false);
  const { recentUrls, addUrl } = useRecentUrls();

  const foundCount = meta ? Object.values(meta).filter(Boolean).length : 0;

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

      if (!res.ok) {
        setError(data.error || "Unknown error");
        if (data.error && data.message) toast.info(data.message, { id: "preview" });
        return;
      }
      
      setMeta(data.meta);
      addUrl(url);

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unexpected error", { id: "preview" });
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-6 flex flex-col items-center justify-start py-12 px-4">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <h1 className="mb-4 mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Link Preview Studio</h1>
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-400 font-normal lg:text-xl sm:px-16 xl:px-48">
        A web tool to preview how your links look when shared on social media platforms!
      </p>

      <PreviewForm onSubmit={handleSubmit} loading={loading} />

      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

      {loading && <p className="text-gray-600 dark:text-gray-400">Loading...</p>}

      {meta && !loading && (
        <div className="w-full flex flex-col items-center gap-6">
          <PlatformTabs platform={platform} onChange={setPlatform} />

          <div className="flex flex-col items-center gap-3">
            <PlatformPreview meta={meta} platform={platform} />
            
            <button
              onClick={() => setShowMetaModal(true)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              {foundCount} meta tags found - View details
            </button>
          </div>

          <Modal isOpen={showMetaModal} onClose={() => setShowMetaModal(false)}>
            <MetaTagsPanel meta={meta} />
          </Modal>
        </div>
      )}

      <RecentUrls urls={recentUrls} onSelect={handleSubmit} />
    </div>
  );
}