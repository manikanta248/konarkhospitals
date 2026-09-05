import Image from "next/image";
import { Stethoscope } from "lucide-react";
import { PlaceholderPanel } from "./PlaceholderPanel";

export function DepartmentImage({ src, alt, className, sizes }: { src?: string; alt: string; className?: string; sizes?: string }) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
    );
  }
  return <PlaceholderPanel icon={Stethoscope} label="Photo coming soon" className={className} />;
}
