export const revalidate = 3600;

const SHOP = "https://fashionistas.ai";
const CATALOG = "https://js0hy0-ux.myshopify.com";
const COLLECTION = "placebets-merch";
const REF = "placebets";
const THIN_SECTION_COUNT = 2;

const SUBSECTIONS = [
  {
    tag: "poker-chips",
    title: "Poker Chips",
    blurb: "Clay sets, denomination chips, dealer buttons with shot-clock timers — built for serious home games.",
    accent: "#34d399",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(0,0,0,0.6) 100%)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <circle cx="16" cy="16" r="11" />
        <circle cx="16" cy="16" r="7" />
        <path d="M16 5v4M16 23v4M5 16h4M23 16h4" />
      </svg>
    ),
  },
  {
    tag: "playing-cards",
    title: "Playing Cards",
    blurb: "Gold-foil decks, Vegas casino-used decks, blackjack discard trays.",
    accent: "#a78bfa",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.18) 0%, rgba(0,0,0,0.6) 100%)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        <rect x="6" y="4" width="14" height="20" rx="2" transform="rotate(-8 13 14)" />
        <rect x="12" y="8" width="14" height="20" rx="2" transform="rotate(8 19 18)" />
      </svg>
    ),
  },
  {
    tag: "casino-dice",
    title: "Casino Dice",
    blurb: "Casino-style D6, jumbo dice, craps sets in 6 colors.",
    accent: "#fb923c",
    gradient: "linear-gradient(135deg, rgba(251,146,60,0.18) 0%, rgba(0,0,0,0.6) 100%)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        <rect x="5" y="5" width="22" height="22" rx="4" />
        <circle cx="11" cy="11" r="1.4" fill="currentColor" />
        <circle cx="21" cy="11" r="1.4" fill="currentColor" />
        <circle cx="16" cy="16" r="1.4" fill="currentColor" />
        <circle cx="11" cy="21" r="1.4" fill="currentColor" />
        <circle cx="21" cy="21" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
];

function productText(product) {
  return [
    product?.title,
    ...(product?.tags || []),
    product?.product_type,
    product?.body_html,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getSectionTag(product) {
  const text = productText(product);

  if (/(dice|craps)/.test(text)) return "casino-dice";
  if (/(card|deck|blackjack|discard tray)/.test(text)) return "playing-cards";
  if (/(chip|dealer button|hold'em)/.test(text)) return "poker-chips";

  return null;
}

async function getProducts() {
  try {
    const res = await fetch(`${CATALOG}/collections/${COLLECTION}/products.json?limit=250`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return {
        products: [],
        state: "error",
        message: `Catalog request failed with HTTP ${res.status}.`,
      };
    }
    const data = await res.json();
    const products = (data.products || []).filter((p) => Array.isArray(p.variants) && p.variants.some((v) => v.available));

    if (products.length === 0) {
      return {
        products: [],
        state: "empty",
        message: "The live catalog is up, but nothing in this collection is currently available.",
      };
    }

    return {
      products,
      state: "ready",
      message: null,
    };
  } catch {
    return {
      products: [],
      state: "error",
      message: "The live catalog is taking too long or unavailable right now.",
    };
  }
}

export const metadata = {
  title: "Bettor Shop — Poker Chips, Cards, Dice",
  description: "Curated poker chips, playing cards, and casino dice for serious home games. Sourced through Fashionistas.ai with US shipping.",
  alternates: { canonical: "https://placebets.ai/shop" },
  openGraph: {
    title: "Bettor Shop — Poker Chips, Cards, Dice | PlaceBets.ai",
    description: "Curated poker chips, playing cards, and casino dice for serious home games. Sourced through Fashionistas.ai with US shipping.",
    url: "https://placebets.ai/shop",
    siteName: "PlaceBets.ai",
    type: "website",
  },
};

function shopifyImage(url, width = 600) {
  if (!url) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}width=${width}`;
}

function ProductCard({ p, accent }) {
  const variant = p.variants[0] || {};
  const rawImage = (p.images || [])[0]?.src;
  const image = shopifyImage(rawImage, 600);
  const price = variant.price || "?";
  const compareAt = variant.compare_at_price && parseFloat(variant.compare_at_price) > parseFloat(price)
    ? variant.compare_at_price
    : null;
  const discount = compareAt ? Math.round((1 - parseFloat(price) / parseFloat(compareAt)) * 100) : null;

  return (
    <a
      href={`${SHOP}/products/${p.handle}?ref=${REF}`}
      target="_blank"
      rel="noopener nofollow"
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-white/30 transition-all duration-300 flex flex-col w-full max-w-[260px] mx-auto md:max-w-none"
      style={{ boxShadow: "0 12px 28px -16px rgba(0,0,0,0.6)" }}
    >
      {discount && (
        <div className="absolute top-3 left-3 z-10 rounded-md px-2 py-1 text-[10px] font-bold tracking-wider"
          style={{ background: accent, color: "#0a0a0a" }}>
          -{discount}%
        </div>
      )}
      <div className="aspect-square bg-slate-950 overflow-hidden relative max-h-[260px] md:max-h-none">
        {image ? (
          <img
            src={image}
            alt={p.title}
            loading="lazy"
            width="600"
            height="600"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs uppercase tracking-[0.18em] text-slate-500">No image</div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-white leading-snug mb-3 line-clamp-2">{p.title}</h3>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-white font-bold text-lg">${price}</span>
          {compareAt && <span className="text-slate-500 text-xs line-through">${compareAt}</span>}
          <span className="ml-auto text-[10px] uppercase tracking-[0.18em]" style={{ color: accent }}>Buy →</span>
        </div>
      </div>
    </a>
  );
}

function getProductHref(handle) {
  return `${SHOP}/products/${handle}?ref=${REF}`;
}

function getCollectionHref() {
  return `${CATALOG}/collections/${COLLECTION}`;
}

function getFullCatalogHref() {
  return `${SHOP}/products?ref=${REF}`;
}

export default async function ShopPage() {
  const { products, state, message } = await getProducts();
  const sections = SUBSECTIONS.map((section) => ({
    ...section,
    products: products.filter((p) => getSectionTag(p) === section.tag),
  }));
  const totalCount = sections.reduce((sum, s) => sum + s.products.length, 0);
  const populatedSections = sections.filter((section) => section.products.length > 0);
  const hasCatalog = populatedSections.length > 0;
  const showFallbackPanel = state !== "ready" || !hasCatalog;
  const featuredFallbacks = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18), transparent 60%), linear-gradient(180deg, #0b1220 0%, #050810 100%)",
        }} />
        <div className="absolute inset-0 -z-10 opacity-30" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-cyan-300 text-xs font-bold uppercase tracking-[0.32em] mb-5">Bettor Shop</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.05] max-w-3xl">
            Real gear for serious{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
              home games.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed">
            Clay poker chips, gold-foil decks, casino-style dice — sourced through our partner{" "}
            <a href={SHOP} target="_blank" rel="noopener nofollow" className="text-cyan-300 underline decoration-dotted underline-offset-4 hover:text-white">
              Fashionistas.ai
            </a>
            . Live inventory, US fulfillment, fast checkout.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {populatedSections.map((s) => (
              <a key={s.tag} href={`#${s.tag}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/[0.1] transition-all">
                <span style={{ color: s.accent }}>●</span>
                {s.title} <span className="opacity-50">({s.products.length})</span>
              </a>
            ))}
            {showFallbackPanel && (
              <a
                href={getCollectionHref()}
                target="_blank"
                rel="noopener nofollow"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-cyan-100 hover:bg-cyan-400/15 transition-all"
              >
                Open live collection
              </a>
            )}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl">
            {[
              { label: "Visible items", value: `${totalCount}` },
              { label: "Categories", value: `${populatedSections.length}` },
              { label: "Catalog status", value: state === "ready" ? "Live" : "Check" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {showFallbackPanel && (
            <div className="mt-8 max-w-3xl rounded-2xl border border-amber-400/20 bg-amber-300/[0.08] p-5 text-left">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">
                    {state === "error" ? "Catalog connection issue" : state === "empty" ? "No tagged merch live" : "Lean merch snapshot"}
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white">
                    {state === "error"
                      ? "The live shop did not load cleanly."
                      : state === "empty"
                        ? "No tagged PlaceBets items are live right now."
                        : thinSections.length > 0
                          ? "Some gear categories only have one live item right now."
                          : "This collection is temporarily thin."}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    {state !== "ready"
                      ? `${message} You can still browse the full Fashionistas catalog or jump back into the betting tools while inventory sync catches up.`
                      : "This page hides empty categories and only shows verified live products. If a category looks sparse, that is the real catalog state rather than filler links."}
                  </p>
                </div>
                <div className="min-w-[220px] rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Working fallbacks</p>
                  <ul className="mt-3 space-y-2 text-sm text-white">
                    <li>PlaceBets collection stays browsable</li>
                    <li>Full upstream catalog stays browsable</li>
                    <li>Checkout and fulfillment stay on the main store</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={getCollectionHref()}
                  target="_blank"
                  rel="noopener nofollow"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-bold tracking-wider text-white hover:bg-white/10 transition-all"
                >
                  Open PlaceBets collection
                </a>
                <a
                  href={getFullCatalogHref()}
                  target="_blank"
                  rel="noopener nofollow"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-bold tracking-wider text-white hover:bg-white/10 transition-all"
                >
                  Browse full catalog
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      <div className="mx-auto max-w-6xl px-6 py-14 space-y-16">
        {populatedSections.map((section) => (
          <section key={section.tag} id={section.tag} className="scroll-mt-24">
            <div
              className="rounded-2xl border border-white/10 p-6 md:p-8 mb-6"
              style={{ background: section.gradient }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,0,0,0.4)", color: section.accent, border: `1px solid ${section.accent}33` }}
                >
                  {section.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2 className="text-2xl md:text-3xl font-black text-white">{section.title}</h2>
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-300">
                      {section.products.length === 1 ? "1 live item" : `${section.products.length} live items`}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-2 max-w-2xl">{section.blurb}</p>
                </div>
              </div>
            </div>
            {section.products.length < THIN_SECTION_COUNT && (
              <p className="mb-5 text-sm leading-6 text-amber-200">
                This category is thin right now, so we are only showing the live item we could verify.
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-md md:max-w-none mx-auto">
              {section.products.map((p) => <ProductCard key={p.id} p={p} accent={section.accent} />)}
            </div>
          </section>
        ))}

        {!hasCatalog && (
          <section className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-8 md:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Fallback mode</p>
              <h2 className="mt-3 text-3xl font-black text-white">No featured products are rendering on PlaceBets right now.</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Rather than showing an empty fake storefront, this page is exposing the upstream catalog issue and routing you to working paths until the merch feed recovers.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {featuredFallbacks.map((product) => (
                  <a
                    key={product.id}
                    href={getProductHref(product.handle)}
                    target="_blank"
                    rel="noopener nofollow"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-bold tracking-wider text-white hover:bg-white/10 transition-all"
                  >
                    {product.title}
                  </a>
                ))}
                <a
                  href={getCollectionHref()}
                  target="_blank"
                  rel="noopener nofollow"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-bold tracking-wider text-white hover:bg-white/10 transition-all"
                >
                  Open PlaceBets collection
                </a>
                <a
                  href={getFullCatalogHref()}
                  target="_blank"
                  rel="noopener nofollow"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-bold tracking-wider text-white hover:bg-white/10 transition-all"
                >
                  Browse full catalog
                </a>
                <a
                  href="/calculators"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-bold tracking-wider text-white hover:bg-white/10 transition-all"
                >
                  Open EV calculator
                </a>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* BOTTOM CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Don&apos;t see what you need?
          </h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Browse the full Fashionistas.ai catalog or jump back to the bettor tools that brought you here.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={getCollectionHref()} target="_blank" rel="noopener nofollow"
              className="inline-flex items-center justify-center rounded-full bg-white text-black font-bold text-sm tracking-wider px-7 py-3 hover:bg-cyan-300 transition-all">
              Open PlaceBets Collection →
            </a>
            <a href={getFullCatalogHref()} target="_blank" rel="noopener nofollow"
              className="inline-flex items-center justify-center rounded-full bg-white text-black font-bold text-sm tracking-wider px-7 py-3 hover:bg-cyan-300 transition-all">
              Browse Full Catalog →
            </a>
            <a href="/calculators"
              className="inline-flex items-center justify-center rounded-full border border-white/20 text-white font-bold text-sm tracking-wider px-7 py-3 hover:bg-white/10 transition-all">
              Open EV Calculator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
