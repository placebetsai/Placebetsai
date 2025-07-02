import { useEffect, useState } from 'react';

export default function Home() {
  const [predictions, setPredictions] = useState([]);

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

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔥 PlaceBets.ai - AI Picks</h1>

      <div style={{ marginBottom: '2rem' }}>
        {predictions.length === 0 ? (
          <p>Loading predictions...</p>
        ) : (
          predictions.map((pick, i) => (
            <div
              key={i}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <strong>Sport:</strong> {pick["Sport"]}<br />
              <strong>Event:</strong> {pick["Event"]}<br />
              <strong>Odds:</strong> {pick["Odds"]}<br />
              <strong>Prediction:</strong> {pick["Prediction"]}<br />
              <strong>Date:</strong>{" "}
              {new Date(pick["Date + Time"]).toLocaleString()}
            </div>
          ))
        )}
      </div>

      {/* CHATBOT */}
      <iframe
        src="https://chat.openai.com/gpts/share/g-68653d8d66f08191b86b0a5613d39434"
        width="100%"
        height="600px"
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          display: 'block',
        }}
        title="Ask the Bookie Anything"
      ></iframe>
    </div>
  );
}
