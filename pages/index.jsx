import { useEffect, useState } from "react";

export default function Home() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      const res = await fetch("https://opensheet.elk.sh/1MNtoPhDrCXHaAds0LdkrIzYXLpTLrcZFdjYgYDEFXP8/Sheet1");
      const data = await res.json();
      setPredictions(data);
    };
    fetchPredictions();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔥 PlaceBets.ai - AI Picks</h1>
      {predictions.length === 0 ? (
        <p>Loading predictions...</p>
      ) : (
        predictions.map((row, i) => (
          <div key={i} style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
            <p><strong>Sport:</strong> {row[0]}</p>
            <p><strong>Event:</strong> {row[1]}</p>
            <p><strong>Prediction:</strong> {row[2]}</p>
            <p><strong>Date:</strong> {new Date(row[3]).toLocaleString()}</p>
          </div>
        ))
      )}

      <div style={{ marginTop: "3rem", borderTop: "1px solid #ccc", paddingTop: "2rem" }}>
        <h2>💬 Ask the AI Bookie</h2>
        <iframe
          src="https://chat.openai.com/g/g-68653d8d66f08191b86b0a5613d39434"
          width="100%"
          height="500"
          style={{ border: "1px solid #ccc", borderRadius: "8px" }}
        ></iframe>
        <p style={{ fontSize: "0.8rem", color: "#777" }}>
          *Note: You must be logged into ChatGPT to chat with the AI.
        </p>
      </div>
    </div>
  );
}
