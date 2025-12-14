import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  metadataBase: new URL("https://placebets.ai"),
  title: {
    default: "PlaceBets.ai – The Professional Betting Toolkit",
    template: "%s | PlaceBets.ai",
  },
  description:
    "Advanced sports betting tools, EV+ calculators, bankroll management strategies, and live tournament intel for sharp, data-driven players.",
  openGraph: {
    title: "PlaceBets.ai – The Professional Betting Toolkit",
    description:
      "Advanced sports betting tools, EV+ calculators, bankroll management strategies, and live tournament intel.",
    url: "https://placebets.ai",
    siteName: "PlaceBets.ai",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/Screenshot_20251210_115432_Grok.jpg",
        width: 1365,
        height: 768,
        alt: "PlaceBets.ai – Precision tools for professional bettors: calculate, strategize, win.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaceBets.ai – The Professional Betting Toolkit",
    description:
      "Tools and analytics for disciplined, data-driven bettors. Not a sportsbook. Not gambling advice.",
    images: ["/Screenshot_20251210_115432_Grok.jpg"],
  },
  alternates: {
    canonical: "https://placebets.ai",
  },
  // Removed manifest: "/manifest.json" — this was breaking build because manifest.json has invalid JS code
  icons: {
    icon: "/grok_1765395775037.jpg",
    shortcut: "/grok_1765395775037.jpg",
    apple: "/grok_1765395775037.jpg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://placebets.ai/#website",
        url: "https://placebets.ai",
        name: "PlaceBets.ai",
        description:
          "Advanced sports betting tools, EV+ calculators, bankroll management strategies, and live tournament intel.",
        inLanguage: "en-US",
        publisher: {
          "@id": "https://placebets.ai/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://placebets.ai/#organization",
        name: "PlaceBets.ai",
        url: "https://placebets.ai",
        logo: "https://placebets.ai/Screenshot_20251210_115432_Grok.jpg",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="app-shell">
          <Navbar />
          <main className="site-main">{children}</main>
          <footer
            style={{
              textAlign: "center",
              padding: "32px 20px",
              borderTop: "1px solid #1f2937",
              color: "#9ca3af",
              fontSize: "0.85rem",
              background: "#020617",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <div>
                © {new Date().getFullYear()} PlaceBets.ai · Educational Use
                Only · 21+
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "14px",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                }}
              >
                <a href="/about" style={{ color: "#e5e7eb" }}>
                  About
                </a>
                <span style={{ opacity: 0.4 }}>•</span>
                <a href="/terms" style={{ color: "#e5e7eb" }}>
                  Terms
                </a>
                <span style={{ opacity: 0.4 }}>•</span>
                <a href="/privacy" style={{ color: "#e5e7eb" }}>
                  Privacy
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
