import ShopClient from "./ShopClient";

export const revalidate = 3600;

const CATALOG = "https://js0hy0-ux.myshopify.com";
const COLLECTION = "placebets-merch";
const SHOP = "https://fashionistas.ai";
const REF = "placebets";

function productText(product) {
  return [product?.title, ...(product?.tags || []), product?.product_type, product?.body_html]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getCategory(product) {
  const text = productText(product);
  if (/(dice|craps)/.test(text)) return "casino-dice";
  if (/(card|deck|blackjack)/.test(text)) return "playing-cards";
  if (/(dealer button|discard tray|cut card|shoe|shuffler|table layout|table cover)/.test(text)) return "table-gear";
  if (/(chip|hold'em)/.test(text)) return "poker-chips";
  return "table-gear";
}

async function getProducts() {
  try {
    const res = await fetch(`${CATALOG}/collections/${COLLECTION}/products.json?limit=250`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products || [])
      .filter((p) => Array.isArray(p.variants) && p.variants.some((v) => v.available))
      .map((p) => ({ ...p, _category: getCategory(p) }));
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Bettor Shop — Poker Chips, Cards, Dice, Table Gear",
  description: "Clay poker chips, gold-foil decks, casino dice, dealer buttons. US shipping, live inventory.",
  alternates: { canonical: "https://placebets.ai/shop" },
  openGraph: {
    title: "Bettor Shop — Poker Chips, Cards, Dice, Table Gear",
    description: "Clay poker chips, gold-foil decks, casino dice, dealer buttons. US shipping, live inventory.",
    url: "https://placebets.ai/shop",
    siteName: "PlaceBets.ai",
    type: "website",
    images: ["https://placebets.ai/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bettor Shop — Poker Chips, Cards, Dice, Table Gear",
    description: "Clay poker chips, gold-foil decks, casino dice, dealer buttons. US shipping, live inventory.",
    images: ["https://placebets.ai/og-image.svg"],
  },
};

export default async function ShopPage() {
  const products = await getProducts();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bettor Shop | PlaceBets.ai",
    url: "https://placebets.ai/shop",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SHOP}/products/${p.handle}?ref=${REF}`,
      name: p.title,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://placebets.ai" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://placebets.ai/shop" },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18), transparent 60%), linear-gradient(180deg, #0b1220 0%, #050810 100%)",
        }} />
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-10">
          <p className="text-cyan-300 text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Bettor Shop</p>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-[1.1] max-w-3xl">
            Real gear for serious{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
              home games.
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300 text-sm md:text-base leading-relaxed">
            Clay poker chips, gold-foil decks, casino-style dice. Live inventory, US fulfillment.
          </p>
        </div>
      </section>

      {products.length === 0 ? (
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-2xl border border-amber-400/20 bg-amber-300/[0.08] p-6 text-slate-100">
            The live catalog is temporarily unavailable. Please check back shortly.
          </div>
        </div>
      ) : (
        <ShopClient products={products} />
      )}

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-10 text-center">
          <h2 className="text-xl md:text-2xl font-black text-white mb-3">Don&apos;t see what you need?</h2>
          <p className="text-slate-400 mb-5 max-w-xl mx-auto text-sm">Browse the full catalog or jump back to the bettor tools.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`${SHOP}/products?ref=${REF}`} target="_blank" rel="noopener nofollow"
              className="inline-flex items-center justify-center rounded-full bg-white text-black font-bold text-sm tracking-wider px-6 py-2.5 hover:bg-cyan-300 transition-all">
              Browse Full Catalog →
            </a>
            <a href="/calculators"
              className="inline-flex items-center justify-center rounded-full border border-white/20 text-white font-bold text-sm tracking-wider px-6 py-2.5 hover:bg-white/10 transition-all">
              Open EV Calculator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
