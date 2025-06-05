// app/ai-agent/page.tsx
'use client';

import { useState } from 'react';

export default function AiAgentPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/ai-agent/market-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword }),
      });

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">AI Market Research</h1>
      <div className="flex gap-4 mb-4">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g., architectural canopy"
          className="border px-4 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white px-6 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {results.length > 0 && (
        <table className="w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Company</th>
              <th className="p-2">Product</th>
              <th className="p-2">Quote</th>
              <th className="p-2">Link</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item: any) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.product}</td>
                <td className="p-2">{item.quote}</td>
                <td className="p-2 text-blue-600 underline">
                  <a href={item.url} target="_blank">Visit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {results.length === 0 && !loading && (
        <p className="text-gray-500">No results found yet. Try a search.</p>
      )}
    </div>
  );
}
