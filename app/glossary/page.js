export default function GlossaryPage() {
  const terms = [
    {
      term: "Unit",
      def: "Your standard bet size (e.g. $20). Talking in units keeps you sane and scalable.",
    },
    {
      term: "Handle",
      def: "Total amount of money wagered on a game or market.",
    },
    {
      term: "Juice / Vig",
      def: "The book’s cut. That -110 tax you keep happily paying.",
    },
    {
      term: "Push",
      def: "Tie. Nobody wins, stake is usually refunded.",
    },
    {
      term: "Live betting",
      def: "Betting while the game is in progress, with lines moving constantly.",
    },
    {
      term: "Bankroll",
      def: "Total pool of money you’re willing (and able) to lose.",
    },
    {
      term: "Chasing",
      def: "Losing then immediately betting more to get it back. Usually ends in tears.",
    },
    {
      term: "Hook",
      def: "The half point in spreads/totals (e.g. -3.5). Often the difference between win and push.",
    },
    {
      term: "Limit",
      def: "Maximum stake a book will accept on a specific market or user.",
    },
  ];

  return (
    <section className="section">
      <h1 className="section-title">Glossary: Talk like you know what you’re doing</h1>
      <p className="section-intro">
        You don&apos;t need to sound like a spreadsheet, but knowing these words
        stops you from being the confused guy in every group chat.
      </p>

      <div className="glossary-grid">
        {terms.map((t) => (
          <div key={t.term} className="glossary-item">
            <h3 style={{ margin: 0, marginBottom: "0.4rem", fontSize: "1rem" }}>
              {t.term}
            </h3>
            <p style={{ margin: 0, color: "#d1d5db" }}>{t.def}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
