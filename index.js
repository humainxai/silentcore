import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setResponse(data.result);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-4">SilentCore AI Assistant</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          placeholder="Ask me anything..."
        />
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">Send</button>
      </form>
      {response && <div className="mt-4 p-4 bg-white rounded shadow">{response}</div>}
    </div>
  );
}