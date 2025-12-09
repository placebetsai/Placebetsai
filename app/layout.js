// app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "PlaceBets.ai – The Professional Betting Toolkit",
  description:
    "Advanced sports betting tools, EV+ calculators, and bankroll management strategies.",
};

// 👇 THIS is what tells phones to render it as mobile, not zoomed-out desktop
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
