import type { MetaTags } from "../types/meta";

export default function FacebookPreviewCard({ meta }: { meta: MetaTags }) {
    
  return (
    <div className="flex flex-col max-w-md border border-[rgb(223,222,219)] overflow-hidden bg-white shadow-md rounded-none" style={{ fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <div className="w-full h-48 bg-gray-100 relative" style={{ paddingTop: '52.5%' }}>
        {meta.og_image && (
          <img
            src={meta.og_image}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      <div className="px-3 py-2.5 bg-[rgb(242,243,245)]">
        <p className="mb-0.5 text-[11px] font-normal leading-[1.2] text-[rgb(96,103,112)] uppercase">
            {meta.site || "Unknown Site"}
        </p>

        <p className="my-0.5 text-sm font-semibold leading-[1.3] text-[rgb(29,33,41)] whitespace-nowrap overflow-hidden text-ellipsis block">
          {meta.og_title || meta.html_title || "(No title)"}
        </p>

        <p className="mt-0.5 text-xs leading-[1.4] text-[rgb(96,103,112)] whitespace-nowrap overflow-hidden text-ellipsis block">
          {meta.og_description || meta.meta_description || "(No description)"}
        </p>
      </div>
    </div>
  );
}

