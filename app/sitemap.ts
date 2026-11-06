import type { MetadataRoute } from "next";
import { articles, products, projects, resources, services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.bnmbrandhouse.com";
  const paths = [
    "",
    "/about",
    "/services",
    "/work",
    "/shop",
    "/shop/custom",
    "/consult",
    "/resources",
    "/journal",
    "/testimonials",
    "/contact",
    "/guide",
    ...services.map((item) => `/services/${item.slug}`),
    ...projects.map((item) => `/work/${item.slug}`),
    ...products.map((item) => `/shop/${item.slug}`),
    ...resources.map((item) => `/resources/${item.slug}`),
    ...articles.map((item) => `/journal/${item.slug}`),
  ];
  return paths.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly", priority: path === "" ? 1 : 0.7 }));
}
