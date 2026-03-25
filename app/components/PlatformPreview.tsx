import type { MetaTags } from "../types/meta";
import type { Platform } from "../types/platform";

import FacebookPreviewCard from "./PreviewCard/FacebookPreviewCard";
import TwitterPreviewCard from "./PreviewCard/TwitterPreviewCard";

interface PlatformPreviewProps {
  meta: MetaTags;
  platform: Platform;
}

export default function PlatformPreview({ meta, platform }: PlatformPreviewProps) {
  return (
    <div className="w-full max-w-md px-4 sm:px-0">
      {platform === "facebook" && <FacebookPreviewCard meta={meta} />}
      {platform === "twitter" && <TwitterPreviewCard meta={meta} />}
    </div>
  );
}