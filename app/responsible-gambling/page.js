export const metadata = {
  title: "Responsible Gambling | PlaceBets.ai",
  description:
    "Responsible gambling information and resources. PlaceBets.ai provides analysis and educational content only.",
};

export default function ResponsibleGamblingPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "44px 20px" }}>
      <h1>Responsible Gambling</h1>

      <p style={{ color: "#9ca3af", lineHeight: 1.8 }}>
        PlaceBets.ai promotes responsible gambling. We provide analysis and educational content
        only. We do not guarantee results and we do not encourage excessive betting.
      </p>

      <h2 style={{ marginTop: 26 }}>Key Guidelines</h2>
      <ul style={{ color: "#9ca3af", lineHeight: 1.9 }}>
        <li>Bet only if you are 18+ or 21+ depending on your jurisdiction.</li>
        <li>Only wager what you can afford to lose.</li>
        <li>Never chase losses.</li>
        <li>Take breaks — sports betting can be addictive.</li>
      </ul>

      <h2 style={{ marginTop: 26 }}>Need Help?</h2>
      <p style={{ color: "#9ca3af", lineHeight: 1.8 }}>
        If you think you may have a gambling problem, seek help from professional resources in your
        area. If you’re in the U.S., the National Council on Problem Gambling (NCPG) provides
        confidential support and resources.
      </p>

      <p style={{ color: "#9ca3af", lineHeight: 1.8 }}>
        PlaceBets.ai does not operate a sportsbook and does not accept wagers.
      </p>
    </main>
  );
}
