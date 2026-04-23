"use client";
import { useState } from "react";

const SHOP = "https://fashionistas.ai";
const REF = "placebets";

const CATEGORIES = [
  { id: "all", label: "All", accent: "#e2e8f0" },
  { id: "poker-chips", label: "Poker Chips", accent: "#34d399" },
  { id: "playing-cards", label: "Playing Cards", accent: "#a78bfa" },
  { id: "casino-dice", label: "Casino Dice", accent: "#fb923c" },
  { id: "table-gear", label: "Table Gear", accent: "#22d3ee" },
];

function shopifyImage(url, width = 400) {
  if (!url) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}width=${width}`;
}

function ProductCard({ p }) {
  const variant = p.variants[0] || {};
  const rawImage = (p.images || [])[0]?.src;
  const image = shopifyImage(rawImage, 400);
  const price = variant.price || "?";
  const compareAt =
    variant.compare_at_price && parseFloat(variant.compare_at_price) > parseFloat(price)
      ? variant.compare_at_price
      : null;
  const discount = compareAt ? Math.round((1 - parseFloat(price) / parseFloat(compareAt)) * 100) : null;
  const cat = CATEGORIES.find((c) => c.id === p._category) || CATEGORIES[0];

  return (
    <a
      href={`${SHOP}/products/${p.handle}?ref=${REF}`}
      target="_blank"
      rel="noopener nofollow"
      className="pb-card"
    >
      {discount && <div className="pb-card-discount">-{discount}%</div>}
      <div className="pb-card-img">
        {image ? <img src={image} alt={p.title} loading="lazy" /> : <div className="pb-card-noimg">No image</div>}
        <span className="pb-card-price" style={{ color: cat.accent }}>${price}</span>
      </div>
      <div className="pb-card-body">
        <h3 className="pb-card-title">{p.title}</h3>
        <div className="pb-card-meta">
          {compareAt && <span className="pb-card-compare">${compareAt}</span>}
          <span className="pb-card-tag" style={{ color: cat.accent }}>{cat.label}</span>
        </div>
      </div>
    </a>
  );
}

export default function ShopClient({ products }) {
  const [active, setActive] = useState("all");
  const counts = CATEGORIES.reduce((acc, c) => {
    acc[c.id] = c.id === "all" ? products.length : products.filter((p) => p._category === c.id).length;
    return acc;
  }, {});
  const visible = active === "all" ? products : products.filter((p) => p._category === active);

  return (
    <>
      <div className="pb-shop-tabs-bar">
        <div className="pb-shop-tabs">
          {CATEGORIES.map((c) => {
            const isActive = active === c.id;
            const count = counts[c.id] || 0;
            if (c.id !== "all" && count === 0) return null;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`pb-shop-tab ${isActive ? "is-active" : ""}`}
                style={isActive ? { background: c.accent, color: "#0a0a0a", borderColor: c.accent } : {}}
              >
                {c.label} <span className="pb-shop-tab-count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pb-shop-grid-wrap">
        {visible.length === 0 ? (
          <div className="pb-shop-empty">Nothing in this category right now.</div>
        ) : (
          <div className="pb-shop-grid">
            {visible.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </>
  );
}
