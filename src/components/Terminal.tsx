import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const { terminalHistory, addTerminalCommand, selectedLLM, selectedSource } = useDashboardStore();

  const handleExecute = () => {
    if (!input.trim()) return;
    const response = generateAIResponse(input);
    addTerminalCommand(input, response);
    setInput('');
  };

  const generateAIResponse = (command: string) => {
    const responses = {
      'market': `Market data from ${selectedSource}: AAPL $178.45 (+2.3%), MSFT $372.10 (+1.8%), GOOGL $142.35 (+0.9%)`,
      'forecast': `Using ${selectedLLM}: Predicted market movement +2.5% over next 7 days with 78% confidence`,
      'analyze': `Analysis complete: Key support at 4,200, resistance at 4,280. Volume surge detected.`,
      'portfolio': `Your portfolio value: $45,230 (+3.2% today). Top performers: NVDA +5.2%, TSLA +4.1%`,
    };
    
    for (const [key, value] of Object.entries(responses)) {
      if (command.toLowerCase().includes(key)) return value;
    }
    return `Command processed by ${selectedLLM} using ${selectedSource}. Result: ${command} executed successfully.`;
  };

  return (
    <div className={`fixed bottom-20 right-4 w-96 bg-gray-900 border border-cyan-500/30 rounded-lg overflow-hidden transition-all ${
      isMinimized ? 'h-10' : 'h-96'
    }`}>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center justify-between border-b border-cyan-500/20 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold">Market Terminal</span>
        </div>
        <span className="text-xs text-gray-400">{isMinimized ? '▲' : '▼'}</span>
      </div>
      
      {!isMinimized && (
        <>
          <div className="h-64 overflow-y-auto bg-black/30 p-3 space-y-2 font-mono text-sm">
            {terminalHistory.length === 0 ? (
              <div className="text-gray-500 text-center py-8">Type commands to start...</div>
            ) : (
              terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-cyan-400">$ {item.command}</div>
                  <div className="text-green-400 text-xs ml-4">{item.response}</div>
                </div>
              ))
            )}
          </div>
          <div className="border-t border-cyan-500/20 p-3 flex gap-2">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleExecute()} 
              placeholder="Enter command..." 
              className="flex-1 bg-gray-800 border border-cyan-500/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-400" 
            />
            <button onClick={handleExecute} className="bg-cyan-500 hover:bg-cyan-600 text-black px-3 py-2 rounded transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}