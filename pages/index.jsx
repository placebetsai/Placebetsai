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
    <>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔥 PlaceBets.ai - AI Picks</h1>
        {predictions.length === 0 ? (
          <p>Loading predictions...</p>
        ) : (
          predictions.map((row, idx) => (
            <div key={idx} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
              <p><strong>Sport:</strong> {row["Sport"]}</p>
              <p><strong>Event:</strong> {row["Event"]}</p>
              <p><strong>Prediction:</strong> {row["Prediction"]}</p>
              <p><strong>Date:</strong> {new Date(row["Date + Time"]).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>

      {/* Chatbot embed */}
      <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.botpressWebChat.init({
              "botId": "cf17771b-b56a-4f3a-8912-0a0555d43f3b",
              "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
              "messagingUrl": "https://messaging.botpress.cloud",
              "clientId": "cf17771b-b56a-4f3a-8912-0a0555d43f3b",
              "showPoweredBy": false,
              "enableConversationDeletion": true
            });
          `
        }}
      />
    </>
  );
}
