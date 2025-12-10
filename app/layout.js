import "./globals.css";
import Navbar from "../components/Navbar";

const siteUrl = "https://placebets.ai";

const siteTitle = "PlaceBets.ai – Stop Gambling. Start Investing.";
const siteDescription =
  "Professional betting toolkit with +EV calculators, bankroll strategy, and live tournament intel. Stop gambling. Start investing.";

const ogImage = "https://placebets.ai/og-image.png"; // swap to your real OG image

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/", // avoids duplicate preview URLs from Vercel
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "PlaceBets.ai",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Navbar />
          <main className="site-main">{children}</main>
          <footer
            style={{
              textAlign: "center",
              padding: "40px 20px",
              borderTop: "1px solid #1f2937",
              color: "#6b7280",
              fontSize: "0.85rem",
              background: "#020617",
            }}
          >
            <p>
              © {new Date().getFullYear()} PlaceBets.ai · Educational Use Only ·
              21+
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
