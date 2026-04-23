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
  const compareAt = variant.compare_at_price && parseFloat(variant.compare_at_price) > parseFloat(price)
    ? variant.compare_at_price
    : null;
  const discount = compareAt ? Math.round((1 - parseFloat(price) / parseFloat(compareAt)) * 100) : null;
  const cat = CATEGORIES.find((c) => c.id === p._category) || CATEGORIES[0];

  return (
    <a
      href={`${SHOP}/products/${p.handle}?ref=${REF}`}
      target="_blank"
      rel="noopener nofollow"
      className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/[0.04] hover:border-white/30 transition-all flex flex-col"
    >
      {discount && (
        <div className="absolute top-2 left-2 z-10 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider bg-cyan-300 text-black">
          -{discount}%
        </div>
      )}
      <div className="aspect-square bg-black/40 overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-[0.18em] text-slate-500">No image</div>
        )}
        <span className="absolute bottom-2 right-2 rounded-full bg-black/80 px-2.5 py-1 text-[12px] font-black backdrop-blur" style={{ color: cat.accent }}>
          ${price}
        </span>
      </div>
      <div className="p-2.5 flex flex-col flex-1">
        <h3 className="text-[12px] font-bold text-white leading-tight line-clamp-2 min-h-[2rem]">{p.title}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          {compareAt && <span className="text-slate-500 text-[10px] line-through">${compareAt}</span>}
          <span className="ml-auto text-[9px] uppercase tracking-[0.14em]" style={{ color: cat.accent }}>{cat.label}</span>
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
      <div className="sticky top-14 z-30 bg-[#050810]/95 backdrop-blur border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 flex gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => {
            const isActive = active === c.id;
            const count = counts[c.id] || 0;
            if (c.id !== "all" && count === 0) return null;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] font-bold transition-all ${
                  isActive ? "bg-white text-black" : "border border-white/20 text-white hover:bg-white/10"
                }`}
                style={isActive ? { background: c.accent, color: "#0a0a0a" } : {}}
              >
                {c.label} <span className="opacity-60 font-normal">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
            <p className="text-slate-400 text-sm">Nothing in this category right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {visible.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </>
  );
}
