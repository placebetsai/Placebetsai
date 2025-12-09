import "./globals.css";
import Navbar from "../components/Navbar";
import NewsTicker from "../components/NewsTicker";

export const metadata = {
  title: "PlaceBets.ai – The Professional Betting Toolkit",
  description:
    "Advanced sports betting tools, tournament finder, and bankroll management strategies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Navbar />
          <NewsTicker />
          <main className="site-main">{children}</main>
          <footer
            style={{
              textAlign: "center",
              padding: "40px",
              borderTop: "1px solid #111827",
              color: "#4b5563",
              fontSize: "0.8rem",
            }}
          >
            <p>© {new Date().getFullYear()} PlaceBets.ai · Educational Use Only · 21+</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
