import { useState } from 'react';

export default function BookieChatbot() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Yo, I’m the Bookie. Ask me who’s gonna win — I don’t miss.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/bookie-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.slice(-6) }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Something broke. Try again later.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, width: 300, background: '#111', color: '#fff', padding: 10, borderRadius: 10 }}>
      <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <strong>{msg.role === 'user' ? 'You' : 'Bookie'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Ask the Bookie..."
        style={{ width: '100%', padding: 5, borderRadius: 5, border: 'none' }}
        disabled={loading}
      />
    </div>
  );
}
