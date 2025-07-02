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
    <>
      <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔥 PlaceBets.ai - AI Picks</h1>
        {predictions.length === 0 ? (
          <p>Loading predictions...</p>
        ) : (
          predictions.map((pick, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
              <strong>Sport:</strong> {pick.sport}<br />
              <strong>Event:</strong> {pick.matchup}<br />
              <strong>Prediction:</strong> {pick.prediction}<br />
              <strong>Date:</strong> {new Date(pick.date).toLocaleString()}
            </div>
          ))
        )}
      </div>

      {/* Chatbot Embed */}
      <script dangerouslySetInnerHTML={{ __html: `
        window.OPENROUTER_CHAT = {
          model: "gpt-4o",
          title: "Trash Talk Bot",
          welcomeMessage: "Ready to roast your picks. What sport we betting on?",
          inputPlaceholder: "Ask me who's gonna win...",
          theme: "dark"
        };
      `}} />
      <script src="https://chat.openrouter.ai/chat.js" defer></script>
    </>
  );
}
