import GlossaryClient from "./GlossaryClient";
import glossaryData from "../../data/glossary.json";

const SITE_URL = "https://placebets.ai";

const AUTHORS = [
  { name: "Sarah Chen", initials: "SC", role: "Senior Editor, Sports Betting" },
  { name: "Marcus Williams", initials: "MW", role: "Poker & Card Games Lead" },
  { name: "Daniella Ruiz", initials: "DR", role: "Casino & Slots Analyst" },
  { name: "Jonah Park", initials: "JP", role: "Horse Racing Correspondent" },
  { name: "Amara Thompson", initials: "AT", role: "DFS & Props Strategist" },
];

const totalTerms = glossaryData.categories.reduce(
  (s, c) => s + (c.terms?.length || 0),
  0
);

export const metadata = {
  title: `The Complete Gambling Glossary — ${totalTerms} Terms Across Sports, Poker, Slots, Casino, Horses & DFS`,
  description: `${totalTerms} gambling terms defined clearly — sports betting (CLV, juice, steam), poker (GTO, ICM, 3-bet), slots (RTP, Megaways), casino table games, horse racing, and DFS. Real examples, no fluff.`,
  alternates: { canonical: `${SITE_URL}/glossary` },
  openGraph: {
    title: `The Complete Gambling Glossary — ${totalTerms} Terms`,
    description: "Sports, poker, slots, casino, horse racing, and DFS terminology — defined by people who actually bet.",
    url: `${SITE_URL}/glossary`,
    type: "website",
  },
};

function buildJsonLd() {
  const terms = [];
  for (const cat of glossaryData.categories) {
    for (const t of cat.terms || []) {
      terms.push({
        "@type": "DefinedTerm",
        name: t.term,
        description: t.definition,
        inDefinedTermSet: `${SITE_URL}/glossary`,
        termCode: cat.id,
      });
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "PlaceBets.ai Gambling Glossary",
    url: `${SITE_URL}/glossary`,
    description: `${totalTerms} gambling and sports betting terms defined with real-world examples.`,
    hasDefinedTerm: terms,
  };
}

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}/glossary` },
    ],
  };
}

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />
      <GlossaryClient data={glossaryData} authors={AUTHORS} />
    </>
  );
}
