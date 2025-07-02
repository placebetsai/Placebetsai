import { useEffect, useState } from 'react';

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
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔥 PlaceBets.ai - AI Picks</h1>

      {predictions.length === 0 ? (
        <p>Loading predictions...</p>
      ) : (
        predictions.map((pick, i) => (
          <div key={i} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
            <p><strong>Sport:</strong> {pick["Sport"] || "N/A"}</p>
            <p><strong>Event:</strong> {pick["Event"] || "N/A"}</p>
            <p><strong>Prediction:</strong> {pick["Prediction"]}</p>
            <p><strong>Date:</strong> {pick["Date + Time"] || "N/A"}</p>
          </div>
        ))
      )}

      {/* Embedded GPT Chatbot */}
      <div style={{ marginTop: '3rem' }}>
        <h2>🤖 Talk to the Trash Talk Bot</h2>
        <iframe
          src="https://chat.openai.com/g/g-68653d8d66f08191b86b0a5613d39434"
          width="100%"
          height="600"
          style={{ border: 'none', borderRadius: '12px', marginTop: '1rem' }}
          title="Trash Talk Bot"
        />
        <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
          *You must be logged in to ChatGPT to use this bot.*
        </p>
      </div>
    </div>
  );
}
