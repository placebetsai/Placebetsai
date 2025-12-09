import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "PlaceBets.ai – The Professional Betting Toolkit",
  description:
    "Advanced sports betting tools, EV+ calculators, and bankroll management strategies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-body">
        <div className="app-shell">
          <Navbar />
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <p>
              © {new Date().getFullYear()} PlaceBets.ai · Education only · 21+ ·
              No betting offered.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
