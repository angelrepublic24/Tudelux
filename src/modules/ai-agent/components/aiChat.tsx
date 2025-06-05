'use client';

import { Spinner } from '@/shared/components/ui/Spinner/Spinner';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { AIAgentChat } from '../api/AiAgent.api';

export const AiAgentChat = () => {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const response = await AIAgentChat(prompt);
      setAnswer(response?.answer || 'No answer returned.');
    } catch {
      setAnswer('⚠️ There was an error contacting the AI Agent.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-md rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">🧠 AI Agent Assistant</h2>

      <div className="flex flex-col gap-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Ask anything about architectural canopies, competitors, pricing..."
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition"
        >
          {loading ? (
            <>
              <Spinner />
              Thinking...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Ask
            </>
          )}
        </button>
      </div>

      {answer && (
        <div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded-lg animate-fade-in">
          <h3 className="text-gray-700 font-semibold mb-2">💬 Agent’s Answer:</h3>
          <p className="text-sm text-gray-800 whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
};
