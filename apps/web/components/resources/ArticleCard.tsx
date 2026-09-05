import Link from "next/link";
import { PlayCircle } from "lucide-react";
import type { Article } from "@konark/shared";
import { ArticleImage } from "./ArticleImage";

export function ArticleCard({ article }: { article: Article }) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <Link
      href={`/resources/${article.type}/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-card transition-shadow hover:shadow-floating"
    >
      <div className="relative">
        <ArticleImage
          src={article.coverImage}
          type={article.type}
          alt={article.title}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          className="aspect-[16/10] transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {article.type === "video" && article.coverImage && (
          <span className="absolute inset-0 flex items-center justify-center">
            <PlayCircle size={40} className="text-white drop-shadow" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-medium text-ink-400">{date}</p>
        <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-ink-900 line-clamp-2">{article.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-500 line-clamp-2">{article.summary}</p>
      </div>
    </Link>
  );
}
