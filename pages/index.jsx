import { useEffect, useState } from "react";

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      const res = await fetch(
        "https://opensheet.elk.sh/1MNtoPhDrCXHaAds0LdkrIzYXLpTLrcZFdjYgYDEFXP8/Sheet1"
      );
      const data = await res.json();
      setPredictions(data);
    };
    fetchPredictions();
  }, []);

  const filtered = predictions
    .filter(
      (p) =>
        p["Sport"]?.toLowerCase().includes(search.toLowerCase()) ||
        p["Event"]?.toLowerCase().includes(search.toLowerCase()) ||
        p["Prediction"]?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? new Date(a["Date + Time"]) - new Date(b["Date + Time"])
        : new Date(b["Date + Time"]) - new Date(a["Date + Time"])
    );

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        🔥 PlaceBets.ai - AI Picks
      </h1>

      <input
        type="text"
        placeholder="Search by sport, event, or prediction"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          border: "1px solid #ccc",
        }}
      />

      <button onClick={() => setSortAsc(!sortAsc)} style={{ marginBottom: "1rem" }}>
        Sort by Date: {sortAsc ? "Ascending" : "Descending"}
      </button>

      {filtered.length === 0 ? (
        <p>No predictions found.</p>
      ) : (
        filtered.map((pick, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p><strong>Sport:</strong> {pick["Sport"]}</p>
            <p><strong>Event:</strong> {pick["Event"]}</p>
            <p><strong>Prediction:</strong> {pick["Prediction"]}</p>
            <p><strong>Date:</strong> {new Date(pick["Date + Time"]).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
