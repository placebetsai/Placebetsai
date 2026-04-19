"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function GlossaryClient({ data, authors }) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const totalTerms = data.categories.reduce((s, c) => s + (c.terms?.length || 0), 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.categories
      .filter((c) => activeCat === "all" || c.id === activeCat)
      .map((c) => ({
        ...c,
        terms: (c.terms || []).filter((t) =>
          !q ||
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.terms.length > 0);
  }, [query, activeCat, data]);

  return (
    <main className="gloss-page">
      {/* HERO */}
      <section className="gloss-hero">
        <div className="gloss-hero__inner">
          <span className="gloss-eyebrow">PLACEBETS.AI / GLOSSARY</span>
          <h1 className="gloss-h1">
            The Sharp Bettor's Dictionary.
          </h1>
          <p className="gloss-sub">
            {totalTerms} terms across sports betting, poker, slots, casino table games, horse racing, and DFS.
            Clean definitions with real examples — written by people who actually bet.
          </p>

          {/* byline strip */}
          <div className="gloss-bylines">
            {authors.map((a) => (
              <span key={a.name} className="gloss-byline" title={a.role}>
                <span className="gloss-byline__avatar" aria-hidden="true">{a.initials}</span>
                <span className="gloss-byline__name">{a.name}</span>
                <span className="gloss-byline__role">· {a.role}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="gloss-controls">
        <div className="gloss-controls__inner">
          <div className="gloss-search">
            <input
              type="text"
              placeholder={`Search ${totalTerms} terms…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search glossary"
            />
          </div>
          <div className="gloss-cats" role="tablist" aria-label="Filter by category">
            <button
              className={`gloss-cat ${activeCat === "all" ? "is-active" : ""}`}
              onClick={() => setActiveCat("all")}
              role="tab"
            >
              All
            </button>
            {data.categories.map((c) => (
              <button
                key={c.id}
                className={`gloss-cat ${activeCat === c.id ? "is-active" : ""}`}
                onClick={() => setActiveCat(c.id)}
                role="tab"
              >
                {c.label}
                <span className="gloss-cat__count">{c.terms?.length || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TERMS */}
      <section className="gloss-body">
        {filtered.length === 0 ? (
          <p className="gloss-empty">No terms match your search.</p>
        ) : (
          filtered.map((cat) => (
            <section key={cat.id} className="gloss-cat-block">
              <header className="gloss-cat-header">
                <h2 className="gloss-cat-title">{cat.label}</h2>
                <span className="gloss-cat-meta">{cat.terms.length} terms</span>
              </header>
              <dl className="gloss-terms">
                {cat.terms.map((t, i) => (
                  <div key={t.term + i} className="gloss-term" id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                    <dt className="gloss-term__name">{t.term}</dt>
                    <dd className="gloss-term__body">
                      <p className="gloss-term__def">{t.definition}</p>
                      {t.example && (
                        <p className="gloss-term__ex">
                          <span className="gloss-term__ex-label">Example:</span> {t.example}
                        </p>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))
        )}
      </section>

      {/* CTA FOOTER */}
      <section className="gloss-cta">
        <div className="gloss-cta__inner">
          <h3>Ready to put theory into practice?</h3>
          <p>Use our free EV Calculator, bankroll tools, and live prediction market data.</p>
          <div className="gloss-cta__btns">
            <Link href="/calculators" className="gloss-cta__btn gloss-cta__btn--primary">Open Calculators</Link>
            <Link href="/" className="gloss-cta__btn">Back to Markets</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .gloss-page {
          min-height: 100vh;
          background: var(--bg-dark);
          color: var(--text-main);
          font-family: var(--font-main);
          padding: 0 0 80px;
        }

        /* HERO */
        .gloss-hero { padding: 60px 24px 24px; }
        .gloss-hero__inner {
          max-width: 1100px;
          margin: 0 auto;
          border-left: 2px solid var(--primary);
          padding: 8px 0 8px 20px;
        }
        .gloss-eyebrow {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: var(--primary);
          padding: 4px 10px;
          background: var(--primary-glow);
          border-radius: 2px;
          margin-bottom: 16px;
        }
        .gloss-h1 {
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 900;
          letter-spacing: -1.5px;
          line-height: 1.02;
          margin: 0 0 16px;
          background: linear-gradient(135deg, #f0f2f5 0%, #7a8494 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gloss-sub {
          font-size: 17px;
          line-height: 1.55;
          color: var(--text-muted);
          max-width: 720px;
          margin: 0 0 24px;
        }
        .gloss-bylines {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 20px;
        }
        .gloss-byline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
        }
        .gloss-byline__avatar {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dim) 100%);
          color: #06080d;
          font-weight: 800;
          font-size: 11px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-mono);
        }
        .gloss-byline__name { color: var(--text-main); font-weight: 600; }
        .gloss-byline__role { font-family: var(--font-mono); font-size: 11px; }

        /* CONTROLS */
        .gloss-controls {
          position: sticky; top: 0;
          z-index: 40;
          padding: 16px 24px;
          background: rgba(6,8,13,0.92);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
        }
        .gloss-controls__inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
        }
        .gloss-search { flex: 1 1 260px; max-width: 420px; }
        .gloss-search input {
          width: 100%;
          padding: 10px 14px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-main);
          font-size: 14px;
          font-family: var(--font-main);
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .gloss-search input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }
        .gloss-cats {
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .gloss-cat {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 12px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          color: var(--text-muted);
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          font-family: var(--font-mono);
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .gloss-cat:hover { border-color: var(--primary); color: var(--text-main); }
        .gloss-cat.is-active {
          background: var(--primary);
          color: #06080d;
          border-color: var(--primary);
        }
        .gloss-cat__count {
          font-size: 10px; opacity: 0.8;
        }

        /* BODY */
        .gloss-body {
          max-width: 1100px; margin: 40px auto 0;
          padding: 0 24px;
        }
        .gloss-empty { color: var(--text-muted); text-align: center; padding: 60px 0; }
        .gloss-cat-block { margin-bottom: 48px; }
        .gloss-cat-header {
          display: flex; align-items: baseline; justify-content: space-between;
          padding-bottom: 12px;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .gloss-cat-title {
          font-size: 22px; font-weight: 800; letter-spacing: -0.3px;
          margin: 0;
        }
        .gloss-cat-meta {
          font-size: 11px; font-family: var(--font-mono); letter-spacing: 1.5px;
          color: var(--text-muted); text-transform: uppercase;
        }
        .gloss-terms {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
          margin: 0;
        }
        .gloss-term {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 18px 20px;
          scroll-margin-top: 100px;
          transition: border-color 0.15s, transform 0.15s;
        }
        .gloss-term:hover {
          border-color: var(--border-hover);
          transform: translateY(-1px);
        }
        .gloss-term__name {
          font-size: 16px; font-weight: 700;
          margin: 0 0 10px;
          color: var(--primary);
          font-family: var(--font-mono);
          letter-spacing: 0.3px;
        }
        .gloss-term__body { margin: 0; }
        .gloss-term__def {
          font-size: 14px; line-height: 1.55;
          color: var(--text-main);
          margin: 0 0 10px;
        }
        .gloss-term__ex {
          font-size: 13px; line-height: 1.5;
          color: var(--text-muted);
          margin: 0;
          padding: 10px 12px;
          background: var(--bg-surface);
          border-left: 2px solid var(--primary-dim);
          border-radius: 0 4px 4px 0;
        }
        .gloss-term__ex-label {
          color: var(--primary);
          font-weight: 700;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-right: 6px;
        }

        /* CTA */
        .gloss-cta {
          max-width: 1100px; margin: 60px auto 0;
          padding: 0 24px;
        }
        .gloss-cta__inner {
          background: linear-gradient(135deg, var(--bg-card) 0%, rgba(52, 211, 153, 0.06) 100%);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 36px 28px;
          text-align: center;
        }
        .gloss-cta__inner h3 {
          font-size: 26px; font-weight: 800; margin: 0 0 8px;
        }
        .gloss-cta__inner p { color: var(--text-muted); margin: 0 0 20px; }
        .gloss-cta__btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .gloss-cta__btn {
          padding: 12px 22px;
          border-radius: 6px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.15s, box-shadow 0.15s;
          font-size: 14px;
        }
        .gloss-cta__btn--primary {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dim) 100%);
          color: #06080d;
        }
        .gloss-cta__btn--primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px var(--primary-glow-strong);
        }
        .gloss-cta__btn:not(.gloss-cta__btn--primary) {
          background: transparent;
          color: var(--text-main);
          border: 1px solid var(--border);
        }
        .gloss-cta__btn:not(.gloss-cta__btn--primary):hover {
          border-color: var(--primary);
          color: var(--primary);
        }
      `}</style>
    </main>
  );
}
