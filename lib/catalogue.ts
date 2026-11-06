import type { OrderLine, Product, Resource, Service } from "./types";
import { products, resources, services } from "./content";

export function findService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function findOffer(id: string) {
  for (const service of services) {
    const offer = service.offers.find((item) => item.id === id);
    if (offer) return { service, offer };
  }
  return undefined;
}

export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function findResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}

export function priceCatalogueLine(input: {
  kind: OrderLine["kind"];
  id: string;
  qty: number;
  options?: string;
}): OrderLine | null {
  const qty = Math.max(1, Math.min(99, Math.floor(input.qty || 1)));
  if (input.kind === "product") {
    const product = findProduct(input.id);
    if (!product) return null;
    return line(product, qty, input.options);
  }
  if (input.kind === "service") {
    const match = findOffer(input.id);
    if (!match || match.offer.price == null) return null;
    return {
      kind: "service",
      id: match.offer.id,
      name: `${match.service.name}: ${match.offer.name}`,
      qty: 1,
      unitPrice: match.offer.price,
    };
  }
  const resource = findResource(input.id);
  if (!resource || resource.price <= 0) return null;
  return {
    kind: "resource",
    id: resource.slug,
    name: resource.title,
    qty: 1,
    unitPrice: resource.price,
  };
}

function line(product: Product, qty: number, options?: string): OrderLine {
  return {
    kind: "product",
    id: product.slug,
    name: product.name,
    qty,
    unitPrice: product.price,
    options: options?.slice(0, 160),
  };
}

export function deliveryFee(method: string, hasProduct: boolean) {
  if (!hasProduct) return { delivery: "none" as const, fee: 0 };
  if (method === "lagos") return { delivery: "lagos" as const, fee: 12 };
  if (method === "nigeria") return { delivery: "nigeria" as const, fee: 25 };
  return { delivery: "pickup" as const, fee: 0 };
}

export function resourceIsPaid(resource: Resource) {
  return resource.price > 0;
}

export function servicePath(service: Service) {
  return `/services/${service.slug}`;
}
