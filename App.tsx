import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Zap, Brain, Globe, DollarSign } from 'lucide-react';
import Terminal from './components/Terminal';
import Screener from './components/Screener';
import AICustomizer from './components/AICustomizer';
import MacroEconomics from './components/MacroEconomics';
import AIAgent from './components/AIAgent';
import DataSource from './components/DataSource';
import LLMSelector from './components/LLMSelector';
import { useDashboardStore } from './store/dashboardStore';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTerminal, setShowTerminal] = useState(false);
  const { metrics, selectedLLM, selectedSource } = useDashboardStore();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'terminal', label: 'Terminal', icon: Zap },
    { id: 'screener', label: 'Screener', icon: TrendingUp },
    { id: 'customizer', label: 'AI Customizer', icon: Brain },
    { id: 'macro', label: 'Macro Economics', icon: Globe },
    { id: 'agents', label: 'AI Agents', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <header className="bg-gray-900/80 backdrop-blur border-b border-cyan-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">SinGOD Financial Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <LLMSelector />
              <DataSource />
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'text-gray-400 hover:text-gray-200 border border-transparent hover:border-cyan-500/30'}`}> 
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard metrics={metrics} />}
        {activeTab === 'terminal' && <Terminal />}
        {activeTab === 'screener' && <Screener />}
        {activeTab === 'customizer' && <AICustomizer />}
        {activeTab === 'macro' && <MacroEconomics />}
        {activeTab === 'agents' && <AIAgent />}
      </main>
      <button onClick={() => setShowTerminal(!showTerminal)} className="fixed bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-110">
        <Zap className="w-6 h-6" />
      </button>
    </div>
  );
}

function Dashboard({ metrics }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
            <p className="text-gray-400 text-sm capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p className="text-2xl font-bold text-cyan-300">{value}</p>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-cyan-500/20 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Advanced AI-Powered Financial Dashboard</h2>
        <p className="text-gray-300 mb-6">Real-time market terminals, intelligent screeners, and AI-driven insights</p>
      </div>
    </div>
  );
}