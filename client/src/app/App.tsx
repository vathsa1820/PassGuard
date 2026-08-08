import React, { useState } from 'react';
import { LoginPage } from '../pages/Login';
import { DemoPage } from '../pages/Demo';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'login' | 'demo'>('login');

  return (
    <div>
      {/* Global Top App Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs px-4 py-2 flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-200">PassGuard Tester App</span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">v1.0.0</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage('login')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              currentPage === 'login' ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-slate-800'
            }`}
          >
            🔑 Login Page Test
          </button>
          <button
            onClick={() => setCurrentPage('demo')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              currentPage === 'demo' ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-slate-800'
            }`}
          >
            🚀 Full Library Demo
          </button>
        </div>
      </div>

      {currentPage === 'login' ? <LoginPage /> : <DemoPage />}
    </div>
  );
};

export default App;

