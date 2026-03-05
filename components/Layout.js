import Navbar from "./Navbar";
import Footer from "./Footer";
import BreakingTicker from "./BreakingTicker";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen text-white flex flex-col font-sans" style={{ background: "#0a0a0a" }}>
      <div className="sticky top-0 z-50">
        <Navbar />
        <BreakingTicker />
      </div>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
