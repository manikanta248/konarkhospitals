import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-keywords";
import { getDepartments, getDoctors, getArticles, getEvents, getCareers } from "@/lib/content";

const STATIC_ROUTES = [
  "",
  "/about",
  "/about/leadership",
  "/about/infrastructure",
  "/about/awards",
  "/services",
  "/doctors",
  "/book-appointment",
  "/emergency-care",
  "/health-packages",
  "/international-patients",
  "/patient-care",
  "/patient-care/insurance-tpa",
  "/patient-care/medical-records",
  "/patient-care/patient-guide",
  "/patient-care/admission-discharge",
  "/patient-care/second-opinion",
  "/testimonials",
  "/resources/article",
  "/resources/disease",
  "/resources/treatment-guide",
  "/resources/video",
  "/resources/news",
  "/careers",
  "/contact",
  "/locations",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [departments, doctors, articles, events, careers] = await Promise.all([
    getDepartments(),
    getDoctors(),
    getArticles(),
    getEvents(),
    getCareers(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const departmentEntries: MetadataRoute.Sitemap = departments.map((d) => ({
    url: `${SITE_URL}/services/${d.slug}`,
    lastModified: d.updatedAt ? new Date(d.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const doctorEntries: MetadataRoute.Sitemap = doctors.map((d) => ({
    url: `${SITE_URL}/doctors/${d.slug}`,
    lastModified: d.updatedAt ? new Date(d.updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/resources/${a.type}/${a.slug}`,
    lastModified: a.updatedAt ? new Date(a.updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  void events;

  const careerEntries: MetadataRoute.Sitemap = careers.map((c) => ({
    url: `${SITE_URL}/careers/${c.slug}`,
    lastModified: c.postedAt ? new Date(c.postedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.3,
  }));

  return [...staticEntries, ...departmentEntries, ...doctorEntries, ...articleEntries, ...careerEntries];
}
