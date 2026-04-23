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
    <div style={{ minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="pb-shop-hero">
        <div className="pb-shop-hero-inner">
          <p className="pb-shop-kicker">Bettor Shop</p>
          <h1 className="pb-shop-title">
            Real gear for serious{" "}
            <span className="pb-shop-title-accent">home games.</span>
          </h1>
          <p className="pb-shop-subtitle">
            Clay poker chips, gold-foil decks, casino-style dice. Live inventory, US fulfillment.
          </p>
        </div>
      </section>

      {products.length === 0 ? (
        <div className="pb-shop-unavailable">
          The live catalog is temporarily unavailable. Please check back shortly.
        </div>
      ) : (
        <ShopClient products={products} />
      )}

      <section className="pb-shop-cta">
        <div className="pb-shop-cta-inner">
          <h2 className="pb-shop-cta-title">Don&apos;t see what you need?</h2>
          <p className="pb-shop-cta-text">Browse the full catalog or jump back to the bettor tools.</p>
          <div className="pb-shop-cta-actions">
            <a href={`${SHOP}/products?ref=${REF}`} target="_blank" rel="noopener nofollow" className="pb-shop-btn pb-shop-btn-primary">
              Browse Full Catalog →
            </a>
            <a href="/calculators" className="pb-shop-btn pb-shop-btn-secondary">
              Open EV Calculator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
