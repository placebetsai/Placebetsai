import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "PlaceBets.ai – Professional Betting Toolkit",
  description:
    "Advanced sports betting tools, calculators, bankroll management and +EV strategy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Navbar />
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            © {new Date().getFullYear()} PlaceBets.ai · Education only · 21+ ·
            No betting offered.
          </footer>
        </div>
      </body>
    </html>
  );
}
