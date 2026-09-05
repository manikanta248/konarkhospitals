import Image from "next/image";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src="/images/brand/konark-logo-transparent.png"
        alt="Konark Hospitals"
        width={225}
        height={225}
        priority
        className={className ?? "h-[76px] w-auto object-contain"}
      />
    </Link>
  );
}
