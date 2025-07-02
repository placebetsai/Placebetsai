import { useEffect, useState } from 'react';

export default function Home() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      const res = await fetch("https://opensheet.elk.sh/1N3yzZjkk4CY28Q40MU4nhs-M3D6o167jnrVxzkakdg4/Sheet1");
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
          <div key={i} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
            <strong>{pick[0]}</strong>
            <p>{pick[1]}</p>
            <small>{new Date(pick[2]).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}
