"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products, projects, services } from "@/lib/content";

export function WorkFilter() {
  const [service, setService] = useState("all");
  const visible = useMemo(
    () => projects.filter((project) => service === "all" || project.service === service),
    [service],
  );
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterButton active={service === "all"} onClick={() => setService("all")}>
          All
        </FilterButton>
        {services.map((item) => (
          <FilterButton key={item.slug} active={service === item.slug} onClick={() => setService(item.slug)}>
            {item.name}
          </FilterButton>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {visible.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className="rounded-3xl border border-line bg-card p-5">
            <p className="text-xs tracking-[0.16em] text-gold uppercase">
              {project.sector} · {project.year}
            </p>
            <h2 className="mt-2 text-3xl">{project.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ShopFilter() {
  const [category, setCategory] = useState("All");
  const visible = products.filter((product) => category === "All" || product.category === category);
  const categories = ["All", ...new Set(products.map((product) => product.category))];
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <FilterButton key={item} active={category === item} onClick={() => setCategory(item)}>
            {item}
          </FilterButton>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <Link key={product.slug} href={`/shop/${product.slug}`} className="rounded-3xl border border-line bg-card p-5">
            <p className="text-xs tracking-[0.16em] text-gold uppercase">{product.category}</p>
            <h2 className="mt-2 text-2xl">{product.name}</h2>
            <p className="mt-2 text-sm text-muted">{product.summary}</p>
            <p className="mt-4 text-sm">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm ${active ? "border-accent bg-accent text-white" : "border-line"}`}
    >
      {children}
    </button>
  );
}
