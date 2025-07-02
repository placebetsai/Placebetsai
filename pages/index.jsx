import { useEffect, useState } from 'react';

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPredictions() {
      try {
        const res = await fetch('https://opensheet.elk.sh/1MNtoPhDrCXHaAds0LdkrIzYXLpTLrcZFdjYgYDEFXP8/Sheet1');
        const data = await res.json();
        setPredictions(data);
      } catch (error) {
        console.error('Failed to load predictions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPredictions();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔥 PlaceBets.ai - AI Picks</h1>
      {loading ? (
        <p>Loading predictions...</p>
      ) : (
        predictions.map((item, idx) => (
          <div key={idx} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '1rem',
            margin: '1rem 0',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <strong>{item["Event"]}</strong>
            <p>{item["Prediction"]}</p>
            <small>{item["Date + Time"]}</small>
          </div>
        ))
      )}
    </div>
  );
}
