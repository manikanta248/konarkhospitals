import { api } from "./api";
import type { Article, ArticleType, CareerPosting, Department, Doctor, HealthPackage, HospitalEvent, Testimonial } from "@konark/shared";
import { FALLBACK_ARTICLES, FALLBACK_CAREERS, FALLBACK_DEPARTMENTS, FALLBACK_DOCTORS, FALLBACK_EVENTS, FALLBACK_HEALTH_PACKAGES, FALLBACK_TESTIMONIALS } from "./fallback-content";

// Server-side content fetchers. Each fails soft (falls back to static seed-matching
// content) so pages render fully during local development before the API/Firestore
// is reachable or seeded.

export async function getDepartments(): Promise<Department[]> {
  try {
    const { items } = await api.get<{ items: Department[] }>("/api/departments");
    return items.length ? items.sort((a, b) => a.order - b.order) : FALLBACK_DEPARTMENTS;
  } catch {
    return FALLBACK_DEPARTMENTS;
  }
}

export async function getDepartment(slug: string): Promise<Department | null> {
  try {
    const { item } = await api.get<{ item: Department }>(`/api/departments/${slug}`);
    return item;
  } catch {
    return FALLBACK_DEPARTMENTS.find((d) => d.slug === slug) ?? null;
  }
}

export async function getDoctors(): Promise<Doctor[]> {
  try {
    const { items } = await api.get<{ items: Doctor[] }>("/api/doctors");
    return items.length ? items.sort((a, b) => a.order - b.order) : FALLBACK_DOCTORS;
  } catch {
    return FALLBACK_DOCTORS;
  }
}

export async function getDoctor(slug: string): Promise<Doctor | null> {
  try {
    const { item } = await api.get<{ item: Doctor }>(`/api/doctors/${slug}`);
    return item;
  } catch {
    return FALLBACK_DOCTORS.find((d) => d.slug === slug) ?? null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { items } = await api.get<{ items: Testimonial[] }>("/api/testimonials");
    return items.length ? items : FALLBACK_TESTIMONIALS;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getArticles(type?: ArticleType): Promise<Article[]> {
  try {
    const { items } = await api.get<{ items: Article[] }>("/api/articles");
    const source = items.length ? items : FALLBACK_ARTICLES;
    const filtered = type ? source.filter((a) => a.type === type) : source;
    return filtered.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  } catch {
    const filtered = type ? FALLBACK_ARTICLES.filter((a) => a.type === type) : FALLBACK_ARTICLES;
    return filtered.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const { item } = await api.get<{ item: Article }>(`/api/articles/${slug}`);
    return item;
  } catch {
    return FALLBACK_ARTICLES.find((a) => a.slug === slug) ?? null;
  }
}

export async function getEvents(): Promise<HospitalEvent[]> {
  try {
    const { items } = await api.get<{ items: HospitalEvent[] }>("/api/events");
    return items.length ? items : FALLBACK_EVENTS;
  } catch {
    return FALLBACK_EVENTS;
  }
}

export async function getCareers(): Promise<CareerPosting[]> {
  try {
    const { items } = await api.get<{ items: CareerPosting[] }>("/api/careers");
    const source = items.length ? items : FALLBACK_CAREERS;
    return source.filter((c) => c.active);
  } catch {
    return FALLBACK_CAREERS.filter((c) => c.active);
  }
}

export async function getCareer(slug: string): Promise<CareerPosting | null> {
  try {
    const { item } = await api.get<{ item: CareerPosting }>(`/api/careers/${slug}`);
    return item;
  } catch {
    return FALLBACK_CAREERS.find((c) => c.slug === slug) ?? null;
  }
}

export async function getHealthPackages(): Promise<HealthPackage[]> {
  try {
    const { items } = await api.get<{ items: HealthPackage[] }>("/api/health-packages");
    const source = items.length ? items : FALLBACK_HEALTH_PACKAGES;
    return source.sort((a, b) => a.order - b.order);
  } catch {
    return FALLBACK_HEALTH_PACKAGES.sort((a, b) => a.order - b.order);
  }
}
