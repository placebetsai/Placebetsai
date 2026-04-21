export const revalidate = 3600;

const SHOP = "https://fashionistas.ai";
const COLLECTION = "placebets-merch";

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

async function getProducts() {
  try {
    const res = await fetch(`${SHOP}/collections/${COLLECTION}/products.json?limit=250`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products || []).filter((p) => Array.isArray(p.variants) && p.variants.some((v) => v.available));
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Bettor Shop — Poker Chips, Cards, Dice | PlaceBets.ai",
  description: "Curated poker chips, playing cards, and casino dice for serious home games. Sourced through Fashionistas.ai with US shipping.",
};

function ProductCard({ p, accent }) {
  const variant = p.variants[0] || {};
  const image = (p.images || [])[0]?.src;
  const price = variant.price || "?";
  const compareAt = variant.compare_at_price && parseFloat(variant.compare_at_price) > parseFloat(price)
    ? variant.compare_at_price
    : null;
  const discount = compareAt ? Math.round((1 - parseFloat(price) / parseFloat(compareAt)) * 100) : null;

  return (
    <a
      href={`${SHOP}/products/${p.handle}?ref=placebets`}
      target="_blank"
      rel="noopener nofollow"
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-white/30 transition-all duration-300 flex flex-col"
      style={{ boxShadow: "0 12px 28px -16px rgba(0,0,0,0.6)" }}
    >
      {discount && (
        <div className="absolute top-3 left-3 z-10 rounded-md px-2 py-1 text-[10px] font-bold tracking-wider"
          style={{ background: accent, color: "#0a0a0a" }}>
          -{discount}%
        </div>
      )}
      <div className="aspect-square bg-slate-950 overflow-hidden relative">
        {image ? (
          <img src={image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

export default async function ShopPage() {
  const products = await getProducts();
  const sections = SUBSECTIONS.map((section) => ({
    ...section,
    products: products.filter((p) => (p.tags || []).includes(section.tag)),
  }));
  const totalCount = sections.reduce((sum, s) => sum + s.products.length, 0);

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
            {sections.filter((s) => s.products.length > 0).map((s) => (
              <a key={s.tag} href={`#${s.tag}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/[0.1] transition-all">
                <span style={{ color: s.accent }}>●</span>
                {s.title} <span className="opacity-50">({s.products.length})</span>
              </a>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl">
            {[
              { label: "Live inventory", value: `${totalCount}` },
              { label: "Categories", value: `${sections.filter(s => s.products.length).length}` },
              { label: "US fulfillment", value: "✓" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      <div className="mx-auto max-w-6xl px-6 py-14 space-y-16">
        {sections.map((section) => section.products.length === 0 ? null : (
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
                      {section.products.length} in stock
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-2 max-w-2xl">{section.blurb}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {section.products.map((p) => <ProductCard key={p.id} p={p} accent={section.accent} />)}
            </div>
          </section>
        ))}
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
            <a href={SHOP} target="_blank" rel="noopener nofollow"
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
