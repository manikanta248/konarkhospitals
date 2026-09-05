import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface Crumb {
  label: string;
  href?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <div className="border-b border-ink-100 bg-gradient-to-b from-brand-50/60 to-white py-10 sm:py-12">
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4 flex items-center gap-1.5 text-xs text-ink-500">
            <Link href="/" className="hover:text-brand-700">
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-ink-300" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-brand-700">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-ink-700">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-[1.75rem] font-bold leading-tight text-ink-950 sm:text-3xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">{description}</p>}
      </Container>
    </div>
  );
}
