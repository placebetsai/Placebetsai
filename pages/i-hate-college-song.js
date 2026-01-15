import Head from "next/head";
import Link from "next/link";

export default function IHateCollegeSong() {
  return (
    <>
      <Head>
        <title>“I Hate College” (Song) — Why the Phrase Went Viral</title>
        <meta
          name="description"
          content="People search 'I Hate College' for the song, but the phrase represents something bigger. Here's why it resonates and what to do if college isn't working."
        />
      </Head>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
        <h1>“I Hate College” (Song) — Why the Phrase Went Viral</h1>

        <p>
          Many people land here looking for the “I Hate College” song. But the
          reason this phrase keeps trending is deeper than music — it reflects
          frustration with debt, pressure, and the feeling that college may not
          be worth it.
        </p>

        <h2>Why people search “I Hate College”</h2>
        <ul>
          <li>They feel trapped or burned out</li>
          <li>They’re questioning student debt</li>
          <li>They’re considering dropping out</li>
          <li>They want alternatives</li>
        </ul>

        <h2>If you hate college, here’s what actually helps</h2>
        <p>
          Hating college doesn’t mean you failed. Often it means the system
          failed to match your goals. There are real alternatives that work —
          without a four-year degree.
        </p>

        <ul>
          <li>
            <Link href="/alternatives">College alternatives that pay well</Link>
          </li>
          <li>
            <Link href="/cost">The real cost of college</Link>
          </li>
          <li>
            <Link href="/debt-calculator">Student debt calculator</Link>
          </li>
        </ul>

        <p style={{ marginTop: 24 }}>
          <strong>Note:</strong> We don’t publish song lyrics here. This page
          discusses the cultural meaning of the phrase and real-world options.
        </p>
      </main>
    </>
  );
}
