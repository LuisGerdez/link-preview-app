import type { MetaTags } from "../types/meta";
import type { Platform } from "../types/platform";

import FacebookPreviewCard from "./PreviewCard/FacebookPreviewCard";
import TwitterPreviewCard from "./PreviewCard/TwitterPreviewCard";

interface PlatformPreviewProps {
  meta: MetaTags;
  platform: Platform;
}

export default function PlatformPreview({ meta, platform }: PlatformPreviewProps) {
  if (platform === "facebook") return <FacebookPreviewCard meta={meta} />;
  if (platform === "twitter") return <TwitterPreviewCard meta={meta} />;
  return null;
}