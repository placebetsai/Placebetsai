export default async function handler(req, res) {
  const claudeKey = process.env.CLAUDE_API_KEY;

  try {
    const body = {
      model: "claude-3-opus-20240229",
      max_tokens: 200,
      temperature: 1.1,
      messages: [
        {
          role: "user",
          content: `You're a trash-talking AI bookie. Give a short, savage prediction for an upcoming match. Swear a little, be cocky, and always act like you're never wrong.`
        }
      ]
    };

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": claudeKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    const message = result?.content?.[0]?.text || "I’m the bookie, and you’re screwed.";

    res.status(200).json({ message });
  } catch (error) {
    console.error("Claude trash error:", error.message);
    res.status(500).json({ error: "Trash talk failed." });
  }
}
