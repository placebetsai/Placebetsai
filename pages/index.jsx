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
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>🔥 PlaceBets.ai - AI Picks</h1>
      
      {predictions.length === 0 ? (
        <p>Loading predictions...</p>
      ) : (
        predictions.map((pick, i) => {
          const date = new Date(pick["Date + Time"]);
          const readableDate = isNaN(date.getTime()) ? "Date not available" : date.toLocaleString();
          
          return (
            <div key={i} style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              backgroundColor: '#f9f9f9'
            }}>
              <p><strong>🏆 Sport:</strong> {pick.Sport || "Unknown"}</p>
              <p><strong>📅 Event:</strong> {pick.Event || "TBD"}</p>
              <p><strong>🔮 Prediction:</strong> {pick.Prediction}</p>
              <p><strong>🕒 Date:</strong> {readableDate}</p>
            </div>
          );
        })
      )}

      {/* Chatbot widget below */}
      <iframe
        src="https://chat.openai.com/gpts/g-68653d8d66f08191b86b0a5613d39434"
        style={{
          width: '100%',
          height: '600px',
          border: 'none',
          marginTop: '3rem',
          borderRadius: '12px'
        }}
      />
    </div>
  );
}
