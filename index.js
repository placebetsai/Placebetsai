// PlaceBets.ai - MVP Site Template // Built to read from your Google Sheet and display daily AI predictions

import { useEffect, useState } from 'react'; import { Card, CardContent } from "@/components/ui/card";

export default function Home() { const [predictions, setPredictions] = useState([]);

useEffect(() => { const fetchPredictions = async () => { const res = await fetch( "https://opensheet.elk.sh/1N3yzZjkk4CY28Q40MU4nhs-M3D6o167jnrVxzkakdg4/Sheet1" ); const data = await res.json(); setPredictions(data); };

fetchPredictions();

}, []);

return ( <div className="p-4 max-w-3xl mx-auto"> <h1 className="text-3xl font-bold mb-6 text-center">🔥 PlaceBets.ai - AI Sportsbook Picks</h1> <p className="mb-8 text-center text-muted-foreground"> Updated daily with GPT-powered predictions. If you bet the other way… you deserve to lose. </p>

{predictions.length === 0 ? (
    <p className="text-center">Loading predictions...</p>
  ) : (
    predictions.map((pick, i) => (
      <Card key={i} className="mb-4">
        <CardContent className="p-4">
          <div className="text-lg font-semibold">{pick[0]}</div>
          <div className="text-sm mt-1 text-muted-foreground">{pick[1]}</div>
          <div className="text-xs mt-2 text-right text-gray-500">{new Date(pick[2]).toLocaleString()}</div>
        </CardContent>
      </Card>
    ))
  )}
</div>

); }

