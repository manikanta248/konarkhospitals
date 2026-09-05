import { BookOpen, FileText, Newspaper, Stethoscope, Video } from "lucide-react";
import type { ArticleType } from "@konark/shared";

export const RESOURCE_TYPES: Record<ArticleType, { label: string; plural: string; description: string; icon: typeof BookOpen }> = {
  article: { label: "Health Article", plural: "Health Articles", description: "Practical health guidance from the Konark Hospitals team.", icon: BookOpen },
  disease: { label: "Disease Information", plural: "Disease Information", description: "Clear, accessible information on common conditions we treat.", icon: Stethoscope },
  "treatment-guide": { label: "Treatment Guide", plural: "Treatment Guides", description: "What to expect before, during and after common treatments.", icon: FileText },
  video: { label: "Video", plural: "Videos", description: "Video walkthroughs of our facilities and care.", icon: Video },
  news: { label: "News", plural: "News & Events", description: "Latest news and upcoming events from Konark Hospitals.", icon: Newspaper },
};

export const RESOURCE_TYPE_SLUGS = Object.keys(RESOURCE_TYPES) as ArticleType[];

export function isResourceType(value: string): value is ArticleType {
  return RESOURCE_TYPE_SLUGS.includes(value as ArticleType);
}
