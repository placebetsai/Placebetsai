export default function EVPage() {
  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <h1>Expected Value (+EV)</h1>
      <p className="highlight">The only math that actually matters.</p>

      <section className="card mt-4">
        <h2>What is +EV?</h2>
        <p>
          Expected Value measures the gap between{" "}
          <strong>the true chance of something happening</strong> and{" "}
          <strong>the odds the book is giving you.</strong>
        </p>
        <p>
          If a event is truly 50% to happen, fair odds are +100 (even
          money). If a book gives you +150, you are getting paid as if it
          only happens 40% of the time. That&apos;s a{" "}
          <strong>positive expected value (+EV)</strong> bet.
        </p>
        <p>
          You will still lose individual bets. But if you only bet into +EV
          spots over hundreds of wagers, the math drags you into profit.
        </p>
      </section>

      <section className="card mt-4">
        <h2>How do you actually find +EV?</h2>
        <ul
          style={{
            paddingLeft: 20,
            color: "#e5e7eb",
            lineHeight: 1.7,
            fontSize: "0.98rem",
          }}
        >
          <li>
            <strong>1. Line Shopping:</strong> If one book has -110 and
            another has +105 on the same side, the +105 is better value.
          </li>
          <li>
            <strong>2. Beat the Closing Line:</strong> If you bet -2.5 and the
            line closes -4.5, you beat the market. That edge is EV.
          </li>
          <li>
            <strong>3. Models / Projections:</strong> If your numbers say a
            team should be -150 and the book is hanging -115, you likely have
            +EV.
          </li>
        </ul>
      </section>

      <section className="card mt-4" style={{ borderColor: "#22c55e" }}>
        <h2>Key Rules</h2>
        <ul
          style={{
            paddingLeft: 20,
            color: "#d1d5db",
            lineHeight: 1.7,
            fontSize: "0.96rem",
          }}
        >
          <li>EV is about the next 1,000 bets, not the next one.</li>
          <li>You can lose 5 +EV bets in a row and still be right.</li>
          <li>Tracking results matters. Guessing doesn&apos;t.</li>
        </ul>
      </section>
    </div>
  );
              }
