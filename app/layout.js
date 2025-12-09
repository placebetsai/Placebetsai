import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "PlaceBets.ai – Learn Odds, Tools & Strategy",
  description:
    "Education-first sports betting hub. Odds calculators, bankroll strategy, +EV betting, and a clean glossary so you stop gambling blind.",
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
              padding: "32px 20px 40px",
              borderTop: "1px solid #111827",
              color: "#6b7280",
              fontSize: "0.8rem",
            }}
          >
            <p>
              © {new Date().getFullYear()} PlaceBets.ai · Education only ·
              21+ · No betting offered.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
