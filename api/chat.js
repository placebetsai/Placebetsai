export default async function handler(req, res) {
  const { messages } = req.body;
  const openaiKey = process.env.OPENAI_API_KEY;

  const result = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You're a savage AI bookie. Respond with trash talk and smart picks." },
        ...messages
      ],
      temperature: 0.8
    })
  });

  const data = await result.json();
  const reply = data.choices?.[0]?.message?.content || "Something went wrong, you bum.";
  res.status(200).json({ reply });
}
