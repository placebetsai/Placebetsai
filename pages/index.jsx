// pages/index.tsx import { useEffect, useState } from 'react';

interface Prediction { Sport: string; Match: string; "GPT Trash Talk": string; "Start Time": string; }

export default function Home() { const [predictions, setPredictions] = useState<Prediction[]>([]);

useEffect(() => { const fetchPredictions = async () => { try { const res = await fetch('https://sheet.best/api/sheets/1MNtoPhDrCXHaAds0LdkrIzYXLpTLrcZFdjYgYDEFXP8'); const data = await res.json();

const clean = data.filter((row: Prediction) => {
      const bannedWords = ['balls', 'cock', 'fuck', 'licking', 'shit'];
      const fields = `${row.Sport} ${row.Match} ${row["GPT Trash Talk"]}`.toLowerCase();
      return row.Sport && row.Match && row["GPT Trash Talk"] && !bannedWords.some(word => fields.includes(word));
    });

    setPredictions(clean);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

fetchPredictions();

}, []);

return ( <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4"> <h1 className="text-3xl font-bold mb-4">🔥 PlaceBets.ai - AI Picks</h1>

<div className="grid gap-4">
    {predictions.length === 0 ? (
      <p>No clean predictions available.</p>
    ) : (
      predictions.map((row, idx) => (
        <div key={idx} className="border border-gray-700 rounded-xl p-4 shadow-lg bg-gray-800">
          <p><strong>Sport:</strong> {row.Sport}</p>
          <p><strong>Match:</strong> {row.Match}</p>
          <p><strong>Prediction:</strong> {row["GPT Trash Talk"]}</p>
          <p><strong>Date:</strong> {row["Start Time"] || 'TBD'}</p>
        </div>
      ))
    )}
  </div>

  {/* ✅ Botpress Chatbot Embed */}
  <script src="https://cdn.botpress.cloud/webchat/v3.0/inject.js" defer></script>
  <script src="https://files.bpcontent.cloud/2025/07/03/19/20250703190712-6HEFPEHY.js" defer></script>
</div>

); }

