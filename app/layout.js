import "./globals.css";
import Navbar from "../components/Navbar";
import MatrixBackground from "../components/MatrixBackground";

export const metadata = {
  title: "PlaceBets.ai – Learn Sports Betting Without Going Broke",
  description:
    "Clean, no-BS guide to sports betting. Learn moneylines, spreads, parlays, bankroll management, and what a $100 bet really wins.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="site-root">
        <canvas id="matrix"></canvas>
        <MatrixBackground />

        <header className="site-header">
          <Navbar />
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <p>© 2025 PlaceBets.ai – Learn first, bet second.</p>
          <p>
            Questions or business stuff?{" "}
            <a href="mailto:info@placebets.ai">info@placebets.ai</a>
          </p>
        </footer>
      </body>
    </html>
  );
    }
