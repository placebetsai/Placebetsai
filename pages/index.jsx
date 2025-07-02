import { useEffect, useState } from 'react';

export default function Home() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      const res = await fetch(
        'https://opensheet.elk.sh/1MNtoPhDrCXHaAds0LdkrIzYXLpTLrcZFdjYgYDEFXP8/Sheet1'
      );
      const data = await res.json();
      setPredictions(data);
    };
    fetchPredictions();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔥 PlaceBets.ai - AI Picks</h1>
      {predictions.length === 0 ? (
        <p>Loading predictions...</p>
      ) : (
        predictions.map((pick, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #ddd',
              padding: '1rem',
              borderRadius: '10px',
              marginBottom: '1rem',
            }}
          >
            <strong>{pick['Event']}</strong>
            <p>{pick['Prediction']}</p>
            <small>{new Date(pick['Date + Time']).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}
import Chat from '../components/Chat';
...
<Chat />

