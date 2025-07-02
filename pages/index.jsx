import { useEffect, useState } from 'react';

export default function Home() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await fetch("https://opensheet.elk.sh/1MNtoPhDrCXHaAds0LdkrIzYXLpTLrcZFdjYgYDEFXP8/Sheet1");
        const data = await res.json();
        setPredictions(data);
      } catch (err) {
        console.error("Failed to load predictions", err);
      }
    };

    fetchPredictions();
    const interval = setInterval(fetchPredictions, 5 * 60 * 1000); // auto-refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '700px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔥 PlaceBets.ai - AI Picks</h1>
      {predictions.length === 0 ? (
        <p>Loading predictions...</p>
      ) : (
        predictions.map((row, i) => (
          <div key={i} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <p><strong>Sport:</strong> {row["Sport"]}</p>
            <p><strong>Event:</strong> {row["Event"]}</p>
            <p><strong>Prediction:</strong> {row["Prediction"]}</p>
            <p><strong>Date:</strong> {new Date(row["Date + Time"]).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
