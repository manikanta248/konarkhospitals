import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/resources/ArticleCard";
import { ArticleImage } from "@/components/resources/ArticleImage";
import { getArticle, getArticles } from "@/lib/content";
import { isResourceType, RESOURCE_TYPES } from "@/lib/resource-types";

export async function generateMetadata({ params }: { params: { type: string; slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export default async function ArticleDetailPage({ params }: { params: { type: string; slug: string } }) {
  if (!isResourceType(params.type)) notFound();
  const article = await getArticle(params.slug);
  if (!article || article.type !== params.type) notFound();

  const meta = RESOURCE_TYPES[article.type];
  const date = new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const related = (await getArticles(article.type)).filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={meta.label}
        title={article.title}
        breadcrumbs={[{ label: "Resources", href: "/resources/article" }, { label: meta.plural, href: `/resources/${article.type}` }, { label: article.title }]}
      />

      <Container className="py-10 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-4 text-xs text-ink-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {date}
            </span>
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User size={13} />
                {article.author}
              </span>
            )}
          </div>

          <ArticleImage
            src={article.coverImage}
            type={article.type}
            alt={article.title}
            sizes="768px"
            className="mt-6 aspect-[16/9] w-full rounded-xl2"
          />

          <div className="mt-8 flex flex-col gap-4">
            {article.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink-700">
                {para}
              </p>
            ))}
          </div>

          {article.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-ink-100 pt-6">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-600">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="pb-14 sm:pb-16">
          <h2 className="font-display text-lg font-bold text-ink-950">More {meta.plural}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
