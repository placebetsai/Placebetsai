"use client";
import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "🤖 I'm your savage AI bookie. Ask me anything." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef();

  const send = async () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "user", text: input }]);
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    }).then(r => r.json());
    setMessages((m) => [...m, { from: "bot", text: res.reply }]);
    setInput("");
    setLoading(false);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      right: 20,
      width: 350,
      height: 450,
      background: "#222",
      color: "white",
      display: "flex",
      flexDirection: "column",
      borderRadius: 8,
      padding: 8,
      zIndex: 9999
    }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            margin: "4px 0",
            textAlign: m.from === "user" ? "right" : "left"
          }}>
            <span style={{
              background: m.from === "user" ? "#555" : "#444",
              padding: "6px 8px",
              borderRadius: 4,
              display: "inline-block"
            }}>{m.text}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", marginTop: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          style={{ flex: 1, padding: 6, borderRadius: 4, border: "none" }}
          placeholder="Ask me who’s winning..."
        />
        <button onClick={send} disabled={loading} style={{ marginLeft: 4 }}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
