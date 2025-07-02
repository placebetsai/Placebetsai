import { useEffect, useState } from 'react';
import Script from 'next/script';

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

      {/* Chatbot Popup Script */}
      <Script
        id="gpt-chat-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const chatbox = document.createElement('div');
              chatbox.id = 'chat-widget';
              chatbox.style = 'position:fixed;bottom:20px;right:20px;width:300px;height:400px;background:white;border:2px solid #222;border-radius:10px;z-index:9999;padding:10px;overflow:auto;font-family:sans-serif;';
              chatbox.innerHTML = "<strong>🤖 AI Bookie:</strong><br><div id='bot-messages' style='height:300px;overflow:auto;margin:10px 0;'></div><input type='text' id='user-input' placeholder='Ask me who’s gonna win...' style='width:100%;padding:5px;' />";
              document.body.appendChild(chatbox);

              const input = document.getElementById('user-input');
              const messages = document.getElementById('bot-messages');

              input.addEventListener('keydown', async function(e) {
                if (e.key === 'Enter') {
                  const userText = input.value.trim();
                  if (!userText) return;
                  messages.innerHTML += '<div><strong>You:</strong> ' + userText + '</div>';
                  input.value = '';

                  const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userText })
                  });

                  const data = await res.json();
                  messages.innerHTML += '<div><strong>AI:</strong> ' + data.reply + '</div>';
                  messages.scrollTop = messages.scrollHeight;
                }
              });
            })();
          `,
        }}
      />
    </>
  );
}
