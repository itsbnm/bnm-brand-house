export type Offer = {
  id: string;
  name: string;
  price: number | null;
  summary: string;
  bestFor: string;
  includes: string[];
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  forWhom: string;
  outcomes: string[];
  notes: string[];
  offers: Offer[];
  work: string[];
};

export type Project = {
  slug: string;
  title: string;
  sector: string;
  service: string;
  summary: string;
  brief: string;
  solution: string;
  outcome: string;
  year: string;
};

export type Product = {
  slug: string;
  name: string;
  category: "Apparel" | "Drinkware" | "Bags" | "Gifts";
  price: number;
  summary: string;
  description: string;
  colors: string[];
  sizes: string[];
  lead: string;
};

export type Resource = {
  slug: string;
  kind: "checklist" | "workbook" | "course";
  title: string;
  price: number;
  summary: string;
  length: string;
  preview: string[];
  body: { heading: string; paragraphs: string[] }[];
};

export type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  paragraphs: string[];
  related: string[];
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
};

export type OrderLine = {
  kind: "product" | "service" | "resource";
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
  options?: string;
};

export type Order = {
  id: string;
  reference: string;
  createdAt: string;
  customer: Customer;
  lines: OrderLine[];
  delivery: "pickup" | "lagos" | "nigeria" | "none";
  deliveryFee: number;
  total: number;
  status: "reserved" | "paid" | "fulfilled" | "cancelled";
  note: string;
};

export type Booking = {
  id: string;
  reference: string;
  createdAt: string;
  slotId: string;
  slotLabel: string;
  audience: "personal" | "business";
  customer: Customer;
  focus: string;
  status: "reserved" | "paid" | "done" | "cancelled";
};

export type Enquiry = {
  id: string;
  reference: string;
  createdAt: string;
  kind: "general" | "service" | "custom";
  customer: Customer;
  topic: string;
  message: string;
  estimate?: { low: number; high: number; assumptions: string[] };
  status: "new" | "reviewing" | "closed";
};

export type Testimonial = {
  id: string;
  createdAt: string;
  name: string;
  role: string;
  quote: string;
  status: "pending" | "approved" | "rejected";
};

export type ExtraArticle = Article & { id: string; status: "draft" | "published" };

export type StudioData = {
  orders: Order[];
  bookings: Booking[];
  enquiries: Enquiry[];
  testimonials: Testimonial[];
  articles: ExtraArticle[];
};
