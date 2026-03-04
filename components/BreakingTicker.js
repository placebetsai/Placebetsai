const HEADLINES = [
  "BREAKING: Plumbers now out-earn most college graduates",
  "Student loan debt hits $1.77 TRILLION and climbing $2,800 every second",
  "Gen Z chooses trades over tuition at record rates",
  "Harvard grad can't find work — electrician booked 6 months out",
  "53% of recent college graduates are underemployed",
  "Average student debt: $37,574 per borrower",
  "Electricians in NYC average $115,000/year with NO degree",
  "Student loan forgiveness blocked — 44 million still owe",
  "HVAC techs earning more than nurses in 16 states",
  "Community college + AWS cert = $85k/year. Prove us wrong.",
  "The college premium is shrinking. The debt is not.",
  "Welders in Texas making $95/hour. Shortage critical.",
];

export default function BreakingTicker() {
  const repeated = [...HEADLINES, ...HEADLINES];

  return (
    <div
      style={{ background: "#ff2020", overflow: "hidden", height: "34px" }}
      className="flex items-center"
      aria-label="Breaking news ticker"
    >
      <div
        style={{
          background: "#cc0000",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <span style={{ color: "#fff", fontSize: "11px", fontWeight: 900, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          ● BREAKING
        </span>
      </div>

      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            whiteSpace: "nowrap",
            animation: "redticker 60s linear infinite",
          }}
        >
          {repeated.map((h, i) => (
            <span
              key={i}
              style={{
                color: "#fff",
                fontSize: "12px",
                fontWeight: 800,
                marginRight: "60px",
                whiteSpace: "nowrap",
              }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes redticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
