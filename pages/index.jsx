import { useEffect, useState } from 'react';

export default function Home() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await fetch("https://opensheet.elk.sh/1N3yzZjkk4CY28Q40MU4nhs-M3D6o167jnrVxzkakdg4/Sheet1");
        const data = await res.json();
        setPredictions(data);
      } catch (error) {
        console.error("Failed to fetch predictions:", error);
      }
    };
    fetchPredictions();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔥 PlaceBets.ai - AI Picks</h1>
      {predictions.length === 0 ? (
        <p>Loading predictions...</p>
      ) : (
        predictions.map((pick, i) => (
          <div key={i} style={{
            border: '1px solid #ddd',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <strong style={{ fontSize: '1.1rem' }}>{pick[0]}</strong>
            <p style={{ margin: '0.5rem 0' }}>{pick[1]}</p>
            <small style={{ color: '#555' }}>{pick[2]}</small>
          </div>
        ))
      )}
    </div>
  );
}
