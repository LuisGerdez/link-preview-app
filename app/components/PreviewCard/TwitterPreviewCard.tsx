import type { MetaTags } from "../../types/meta";

// Based on X preview behavior and styles (summary and summary_large_image)

export default function TwitterPreviewCard({ meta }: { meta: MetaTags }) {
  if (meta.twitter_card === 'summary_large_image' && meta.twitter_image) {
    return (
      <div className="max-w-md min-w-md border border-[rgb(229,231,235)] bg-white rounded-xl overflow-hidden shadow-sm" style={{ fontFamily: 'Segoe UI, Arial, sans-serif' }}>
        <div className="relative bg-[rgb(245,246,247)]">
          <img
            src={meta.twitter_image}
            alt="Preview"
            className="w-full object-contain bg-white"
          />
          <div className="absolute left-2 bottom-2 bg-black/80 text-white text-[15px] px-2 py-1 rounded">
            {meta.twitter_title || meta.html_title || "(No title)"}
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="text-[15px] text-[rgb(55,65,81)] font-normal leading-tight truncate">
            From {meta.site || "Unknown Site"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-stretch min-w-md max-w-md border border-[rgb(229,231,235)] bg-white rounded-xl overflow-hidden shadow-sm" style={{ fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <div className="flex items-center justify-center w-[25%] bg-white border-r border-[rgb(229,231,235)]">
        {meta.twitter_image ? (
          <img
            src={meta.twitter_image}
            alt="Preview"
            className="w-full object-contain"
          />
        ) : (
          <span className="inline-flex items-center justify-center w-10 h-10 text-[rgb(107,114,128)]">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.5em] fill-[rgb(83,100,113)]"><g><path d="M1.998 5.5c0-1.38 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.12 2.5 2.5v13c0 1.38-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.12-2.5-2.5v-13zm2.5-.5c-.276 0-.5.22-.5.5v13c0 .28.224.5.5.5h15c.276 0 .5-.22.5-.5v-13c0-.28-.224-.5-.5-.5h-15zM6 7h6v6H6V7zm2 2v2h2V9H8zm10 0h-4V7h4v2zm0 4h-4v-2h4v2zm-.002 4h-12v-2h12v2z"></path></g></svg>
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0 px-4 py-3 hover:bg-[oklch(96.7%_0.003_264.542)]">
        <div className="text-[15px] text-[rgb(55,65,81)] font-normal leading-tight truncate">{meta.site || "Unknown Site"}</div>
        <div className="font-semibold text-[16px] text-[rgb(17,24,39)] leading-tight truncate">{meta.twitter_title || meta.html_title || "(No title)"}</div>
        <div className="text-[15px] text-[rgb(55,65,81)] leading-snug truncate">{meta.twitter_description || meta.meta_description || "(No description)"}</div>
      </div>
    </div>
  );
}