import { useEffect, useState } from 'react';

export default function Home() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://opensheet.elk.sh/1MNtoPhDrCXHaAds0LdkrIzYXLpTLrcZFdjYgYDEFXP8/Sheet1");
      const data = await res.json();
      setPredictions(data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>🔥 PlaceBets.ai - AI Picks</h1>
      {predictions.length === 0 ? (
        <p>Loading predictions...</p>
      ) : (
        predictions.map((p, i) => (
          <div key={i} style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
            <strong>Sport:</strong> {p["Sport"]} <br />
            <strong>Event:</strong> {p["Event"]} <br />
            <strong>Prediction:</strong> {p["Prediction"]} <br />
            <small><strong>Date:</strong> {new Date(p["Date + Time"]).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}
