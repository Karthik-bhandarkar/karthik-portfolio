import type { Metadata } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const siteConfig = {
  name: "Karthik Bhandarkar",
  description:
    "Software engineer in Bengaluru building Python backends, multi-agent AI systems and data pipelines. Internships at Infosys Springboard and Dyashin Technosoft.",
  url: siteUrl,
  ogImage: "/og-image.png",
  creator: "Karthik Bhandarkar",
  authors: [
    {
      name: "Karthik Bhandarkar",
      url: siteUrl,
    },
  ],
  keywords: [
    "Karthik Bhandarkar",
    "Software Engineer",
    "Python Developer",
    "Backend Developer",
    "FastAPI",
    "LangGraph",
    "AI Engineer",
    "Multi-agent systems",
    "Bengaluru",
    "Portfolio",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Software Engineer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — Software Engineer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Software Engineer`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  absoluteTitle = false,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  /** Use the title as-is, without the "| Karthik Bhandarkar" suffix. */
  absoluteTitle?: boolean;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;
  const shareTitle = title
    ? absoluteTitle
      ? title
      : `${title} | ${siteConfig.name}`
    : siteConfig.name;

  return {
    title: title ? (absoluteTitle ? { absolute: title } : title) : undefined,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: shareTitle,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: shareTitle,
        },
      ],
    },
    twitter: {
      title: shareTitle,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
