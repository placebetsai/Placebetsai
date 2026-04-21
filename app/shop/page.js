export const revalidate = 3600;

const SHOP = "https://fashionistas.ai";
const COLLECTION = "placebets-merch";

const SUBSECTIONS = [
  { tag: "poker-chips", title: "Poker Chips", blurb: "Chip sets, dealer tools, and table accessories that actually fit the betting and casino audience." },
  { tag: "playing-cards", title: "Playing Cards", blurb: "Decks, trays, and card-table accessories for the table-game lane." },
  { tag: "casino-dice", title: "Casino Dice", blurb: "Dice sets and craps-style accessories for desk merch and casino-adjacent shopping intent." },
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
  title: "Shop | PlaceBets.ai",
  description: "Poker chips, cards, dice, and betting-desk merch sourced through the Fashionistas.ai catalog for PlaceBets.ai readers.",
};

function ProductCard({ p }) {
  const variant = p.variants[0] || {};
  const image = (p.images || [])[0]?.src;
  const compareAt = variant.compare_at_price && parseFloat(variant.compare_at_price) > parseFloat(variant.price)
    ? variant.compare_at_price
    : null;
  return (
    <a
      href={`${SHOP}/products/${p.handle}?ref=placebets`}
      target="_blank"
      rel="noopener nofollow"
      className="group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-cyan-400/40 transition-all"
    >
      <div className="aspect-[4/5] bg-slate-950 overflow-hidden">
        {image ? (
          <img src={image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs uppercase tracking-[0.18em] text-slate-500">No image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white leading-snug min-h-[2.8rem]">{p.title}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-cyan-300 font-semibold">${variant.price || "?"}</span>
          {compareAt && <span className="text-slate-500 text-xs line-through">${compareAt}</span>}
          <span className="ml-auto text-[10px] uppercase tracking-[0.16em] text-slate-400">View →</span>
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

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="max-w-4xl">
        <p className="text-cyan-300 text-xs uppercase tracking-[0.3em] mb-4">Shop</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
          Betting desk gear and casino-adjacent merch.
        </h1>
        <p className="mt-5 max-w-3xl text-slate-300 text-base md:text-lg leading-8">
          This page gives PlaceBets.ai a commerce lane without turning the site into a junky sportsbook store.
          Every product is sourced from the Fashionistas.ai catalog and grouped by the items that actually fit the audience.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {sections.filter((s) => s.products.length > 0).map((s) => (
          <a key={s.tag} href={`#${s.tag}`} className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-300 hover:border-cyan-400/40 hover:text-white transition-all">
            {s.title} ({s.products.length})
          </a>
        ))}
      </div>

      <div className="mt-12 space-y-14">
        {sections.map((section) => section.products.length === 0 ? null : (
          <section key={section.tag} id={section.tag} className="scroll-mt-24">
            <div className="flex items-end justify-between gap-4 mb-3">
              <h2 className="text-2xl md:text-3xl font-bold text-white">{section.title}</h2>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{section.products.length} items</span>
            </div>
            <p className="text-slate-400 max-w-3xl leading-7 mb-6">{section.blurb}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {section.products.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
