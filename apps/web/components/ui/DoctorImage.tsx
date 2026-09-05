import Image from "next/image";
import { DOCTOR_PHOTOS } from "@/lib/doctor-photos";
import { DoctorPhoto } from "./DoctorPhoto";

export function DoctorImage({ slug, name, className, sizes }: { slug: string; name: string; className?: string; sizes?: string }) {
  const photo = DOCTOR_PHOTOS[slug];
  if (photo) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image src={photo} alt={name} fill className="object-cover" sizes={sizes} />
      </div>
    );
  }
  return <DoctorPhoto name={name} className={className} />;
}
