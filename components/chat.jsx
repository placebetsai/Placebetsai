import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'I’m your savage AI bookie. Gimme a matchup.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setLoading(true);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      width: 300,
      background: '#111',
      color: 'white',
      borderRadius: 10,
      padding: 10,
      zIndex: 1000
    }}>
      <div style={{ height: 200, overflowY: 'auto', fontSize: 12, marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}><b>{msg.role}:</b> {msg.content}</div>
        ))}
        {loading && <div><i>Typing...</i></div>}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="e.g. Makhachev vs Volkanovski"
        style={{ width: '100%', padding: 5, borderRadius: 5 }}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
      />
    </div>
  );
}
