// components/SEO.js
import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = "https://ihatecollege.com";
const DEFAULT_IMAGE = `${SITE_URL}/social-card.png`;

export default function SEO({
  title = "IHateCollege.com - Skip Debt, Stack Cash 2025",
  description = "College is optional. Debt isn't. Real alternatives: trades, certs, gigs without loans.",
  image = DEFAULT_IMAGE,
}) {
  const router = useRouter();
  const canonical = `${SITE_URL}${router.asPath === "/" ? "" : router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="skip college, trade schools 2025, debt free careers, google certs, alternatives to degree, ihatecollege" />  // Added for SEO boost
      <link rel="canonical" href={canonical} />

      <link rel="icon" href="/icon.png" />
      <link rel="apple-touch-icon" href="/icon.png" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="IHateCollege.com" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />  // Fixed: Missing before, causes blank previews
      <meta name="twitter:description" content={description} />  // Fixed: Essential for X cards
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@ihatecollege4u" />

      {/* Schema for rich snippets - boosts SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "IHateCollege.com",
        "url": SITE_URL,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${SITE_URL}/rank-your-school?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }) }} />
    </Head>
  );
}
