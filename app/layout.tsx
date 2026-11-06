import type { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";
import { SiteFrame } from "@/components/site-frame";
import { studio } from "@/lib/content";
import "./globals.css";

const sofia = Sofia_Sans({
  variable: "--font-sofia",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bnmbrandhouse.com"),
  title: {
    default: `${studio.name} · ${studio.line}`,
    template: `%s · ${studio.name}`,
  },
  description:
    "BNM Brand House builds brands that are remembered. Book a consultation, commission identity, shop ready-made goods, or estimate a custom print run.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sofia.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
