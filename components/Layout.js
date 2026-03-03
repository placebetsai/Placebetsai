import Navbar from "./Navbar";
import Footer from "./Footer";
import NewsTicker from "./NewsTicker";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Sticky wrapper: navbar + news ticker scroll as one unit */}
      <div className="sticky top-0 z-50">
        <Navbar />
        <div className="bg-slate-950/95 backdrop-blur-md border-b border-slate-700 px-4 py-2">
          <NewsTicker />
        </div>
      </div>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
