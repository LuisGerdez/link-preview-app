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
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<MetaTags | null>(null);
  const [platform, setPlatform] = useState<Platform>("facebook");
  const [showMetaModal, setShowMetaModal] = useState(false);

  const { recentUrls, addUrl } = useRecentUrls();

  const foundCount = meta ? Object.values(meta).filter(Boolean).length : 0;

  const handleSubmit = async (submittedUrl: string) => {
    setUrl(submittedUrl);
    setError(null);
    setLoading(true);
    setMeta(null);

    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: submittedUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unknown error");
        if (data.error && data.message) toast.info(data.message, { id: "preview" });
        return;
      }
      
      setMeta(data.meta);
      addUrl(submittedUrl);

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

      <PreviewForm url={url} onUrlChange={setUrl} onSubmit={handleSubmit} loading={loading} />

      {error && <p className="text-red-500 dark:text-red-400 animate-fade-slide-up">{error}</p>}

      {loading && (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 animate-fade-slide-up">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Loading...</span>
        </div>
      )}

      {meta && !loading && (
        <div className="w-full max-w-xl px-4 flex flex-col items-center gap-6 animate-fade-slide-up">
          <PlatformTabs platform={platform} onChange={setPlatform} />

          <div className="flex flex-col items-center gap-3 w-full">
            <PlatformPreview meta={meta} platform={platform} />
            
            <button
              onClick={() => setShowMetaModal(true)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              {foundCount} meta tags found - View details
            </button>
          </div>
        </div>
      )}

      <Modal isOpen={showMetaModal} onClose={() => setShowMetaModal(false)}>
        <MetaTagsPanel meta={meta!} />
      </Modal>

      <RecentUrls urls={recentUrls} onSelect={handleSubmit} />
    </div>
  );
}