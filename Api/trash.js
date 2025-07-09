let trashCache = {};

export default async function handler(req, res) {
  const { match } = req.query;
  if (!match) return res.status(400).json({ error: "Missing match param" });

  if (trashCache[match]) {
    return res.status(200).json({ trash: trashCache[match] });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

  try {
    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a cocky AI sports bookie. Be funny, savage, and brutally honest.'
          },
          {
            role: 'user',
            content: `Trash talk this match: ${match}. Make it short and hilarious.`
          }
        ],
        max_tokens: 60
      })
    });

    const gptData = await gptResponse.json();
    const line = gptData.choices?.[0]?.message?.content || 'They both suck.';

    trashCache[match] = line;
    return res.status(200).json({ trash: line });

  } catch (err) {
    // Claude fallback
    try {
      const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: 60,
          messages: [
            {
              role: "user",
              content: `You're a sarcastic AI bookie. Trash talk this event: ${match}. Be savage and witty.`
            }
          ]
        })
      });

      const fallback = await claudeRes.json();
      const backupLine = fallback?.content?.[0]?.text || 'Claude was too classy to respond.';

      trashCache[match] = backupLine;
      return res.status(200).json({ trash: backupLine });

    } catch (err2) {
      return res.status(500).json({ error: "All trash generators failed." });
    }
  }
}
