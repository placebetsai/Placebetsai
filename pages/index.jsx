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
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔥 PlaceBets.ai - AI Picks</h1>
      
      {predictions.length === 0 ? (
        <p>Loading predictions...</p>
      ) : (
        predictions.map((pick, i) => (
          <div key={i} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
            <p><strong>Sport:</strong> {pick.Sport || 'N/A'}</p>
            <p><strong>Event:</strong> {pick.Event || 'N/A'}</p>
            <p><strong>Prediction:</strong> {pick.Prediction || 'N/A'}</p>
            <p><strong>Date:</strong> {pick["Date + Time"] ? new Date(pick["Date + Time"]).toLocaleString() : 'Invalid Date'}</p>
          </div>
        ))
      )}

      {/* Chatbot Embed */}
      <iframe
        src="https://chat.openai.com/g/g-68653d8d66f08191b86b0a5613d39434"
        width="100%"
        height="600"
        style={{ border: "1px solid #ccc", borderRadius: "10px", marginTop: "2rem" }}
        title="Trash Talk Bot"
      ></iframe>
    </div>
  );
}
