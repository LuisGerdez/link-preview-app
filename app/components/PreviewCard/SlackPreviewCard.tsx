import type { MetaTags } from "../../types/meta";

interface Props {
  meta: MetaTags;
  imgError: boolean;
  onImgError: () => void;
}

// Based on Slack's unfurl preview style

export default function SlackPreviewCard({ meta, imgError, onImgError }: Props) {
  const showImage = meta.og_image && !imgError;

  return (
    <div
      className="w-full max-w-md bg-white border border-gray-200 rounded overflow-hidden"
      style={{ fontFamily: 'Lato, Slack-Lato, sans-serif' }}
    >
      <div className="flex">
        <div className="w-1 bg-gray-400 flex-shrink-0" />

        <div className="flex-1 p-3 min-w-0">
          <p className="text-xs font-bold text-gray-900 mb-0.5">
            {meta.site || "Unknown Site"}
          </p>

          <p className="text-sm font-bold text-[rgb(18,100,163)] hover:underline cursor-pointer leading-snug mb-1 truncate">
            {meta.og_title || meta.html_title || "(No title)"}
          </p>

          <p className="text-xs text-gray-700 leading-[1.4] line-clamp-2">
            {meta.og_description || meta.meta_description || "(No description)"}
          </p>

          {showImage && (
            <div
              className="mt-2 rounded overflow-hidden"
              style={{ background: 'rgb(209,213,219)', maxHeight: '200px' }}
            >
              <img
                src={meta.og_image!}
                alt="Preview"
                className="w-full h-auto object-cover rounded"
                style={{ maxHeight: '200px' }}
                onError={onImgError}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
