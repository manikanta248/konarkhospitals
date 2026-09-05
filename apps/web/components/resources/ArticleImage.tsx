import Image from "next/image";
import type { ArticleType } from "@konark/shared";
import { RESOURCE_TYPES } from "@/lib/resource-types";
import { PlaceholderPanel } from "@/components/ui/PlaceholderPanel";

export function ArticleImage({ src, type, alt, className, sizes }: { src?: string; type: ArticleType; alt: string; className?: string; sizes?: string }) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
    );
  }
  const meta = RESOURCE_TYPES[type];
  return <PlaceholderPanel icon={meta.icon} label={type === "video" ? "Video coming soon" : "Image coming soon"} className={className} />;
}
