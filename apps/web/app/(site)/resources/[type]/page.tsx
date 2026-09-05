import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/resources/ArticleCard";
import { EventCard } from "@/components/resources/EventCard";
import { getArticles, getEvents } from "@/lib/content";
import { isResourceType, RESOURCE_TYPES } from "@/lib/resource-types";

export function generateStaticParams() {
  return Object.keys(RESOURCE_TYPES).map((type) => ({ type }));
}

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
  if (!isResourceType(params.type)) return {};
  const meta = RESOURCE_TYPES[params.type];
  return { title: meta.plural, description: meta.description };
}

export default async function ResourceTypePage({ params }: { params: { type: string } }) {
  if (!isResourceType(params.type)) notFound();
  const type = params.type;
  const meta = RESOURCE_TYPES[type];

  const [articles, events] = await Promise.all([getArticles(type), type === "news" ? getEvents() : Promise.resolve([])]);

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title={meta.plural}
        description={meta.description}
        breadcrumbs={[{ label: "Resources", href: "/resources/article" }, { label: meta.plural }]}
      />

      <Container className="py-10 sm:py-12">
        {type === "news" && events.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display text-lg font-bold text-ink-950">Upcoming Events</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {events.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </div>
        )}

        {articles.length > 0 ? (
          <div>
            {type === "news" && <h2 className="mb-5 font-display text-lg font-bold text-ink-950">Latest News</h2>}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-ink-500">No {meta.plural.toLowerCase()} published yet — check back soon.</p>
        )}
      </Container>
    </>
  );
}
