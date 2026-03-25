import type { Metadata, Viewport } from "next";
import "../index.css";
import Providers from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: {
    template: "%s | PINPLUG PRIVATE LIMITED",
    default: "PINPLUG PRIVATE LIMITED | Top-Rated Electronics Store in Jaipur, Rajasthan",
  },
  description: "Pinplug Private Limited: Leading electronics store in Jaipur offering premium products and professional technology integration. Connecting people with the latest, genuine quality technology at unbeatable prices.",
  keywords: [
    "Electronics store Jaipur",
    "Pinplug Private Limited",
    "Pinplug Jaipur",
    "Best electronics integration Jaipur",
    "Latest technology products Jaipur",
    "Genuine quality electronics Rajasthan",
    "Best deals on electronics Jaipur",
    "Professional electronics Jaipur",
    "Pinplug Ganga Marg",
    "Jagatpura electronics shop",
  ],
  authors: [{ name: "PINPLUG PRIVATE LIMITED" }],
  creator: "PINPLUG PRIVATE LIMITED",
  publisher: "PINPLUG PRIVATE LIMITED",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://pinplug.co.in"), // Defaulting, can be changed if needed
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PINPLUG PRIVATE LIMITED | Leading Electronics in Jaipur",
    description: "Discover genuine quality electronics and professional integration services at Pinplug Private Limited, Jaipur.",
    url: "https://pinplug.co.in",
    siteName: "Pinplug Private Limited",
    images: [
      {
        url: "/favicon.png", // Fallback image, real hero image is better
        width: 1200,
        height: 630,
        alt: "Pinplug Private Limited Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PINPLUG PRIVATE LIMITED | Leading Electronics in Jaipur",
    description: "Genuine quality electronics and professional integration services in Jaipur, Rajasthan.",
    images: ["/favicon.png"],
  },
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
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  category: "electronics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "PINPLUG PRIVATE LIMITED",
    "image": "https://pinplug.co.in/favicon.png",
    "@id": "https://pinplug.co.in",
    "url": "https://pinplug.co.in",
    "telephone": "09256841555",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ganga Marg, Cbi Phatak, Jagatpura",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302017",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.8242,
      "longitude": 75.8335
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "22:00"
    },
    "sameAs": [
      "https://www.google.com/search?q=PINPLUG+PRIVATE+LIMITED"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "36"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
