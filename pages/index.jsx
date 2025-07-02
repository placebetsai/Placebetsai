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
        console.error("Failed to load predictions:", err);
      }
    };
    fetchPredictions();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔥 PlaceBets.ai - AI Picks</h1>
      {predictions.length === 0 ? (
        <p>Loading predictions...</p>
      ) : (
        predictions.map((pick, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '10px' }}>
            <h2>{pick["Event"] || pick[0]}</h2>
            <p>{pick["Prediction"] || pick[1]}</p>
            <small>{new Date(pick["Date + Time"] || pick[2]).toLocaleString()}</small>
          </div>
        ))
      )}
      {/* Chatbot */}
      <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/YOUR-CHATBOT-ID-HERE"
          title="Chatbot"
          width="350"
          height="500"
          style={{ border: 'none', borderRadius: '10px' }}
        />
      </div>
    </div>
  );
}
