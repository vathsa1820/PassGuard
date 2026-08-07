import React, { useState } from 'react';
import { PasswordSecurityCard, PasswordSecurityCardStateProps } from '../../components/password/PasswordSecurityCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ShieldAlert, Play, Code, CheckCircle, AlertTriangle, Layers } from 'lucide-react';

export interface DemoStateConfig {
  id: string;
  name: string;
  badge: 'neutral' | 'error' | 'warning' | 'success' | 'default';
  description: string;
  stateProps: PasswordSecurityCardStateProps;
}

export const demoStates: DemoStateConfig[] = [
  {
    id: 'empty',
    name: '1. Empty State',
    badge: 'neutral',
    description: 'Initial blank state when user opens signup form.',
    stateProps: {
      password: '',
      score: 0,
      status: 'Neutral',
      rules: [
        { label: 'At least 12 characters', completed: false },
        { label: 'Uppercase letter', completed: false },
        { label: 'Lowercase letter', completed: false },
        { label: 'Number', completed: false },
        { label: 'Special character (!@#$%)', completed: false },
      ],
      suggestion: 'Enter a password to evaluate security strength.',
      expectedScoreBoost: undefined,
      reuseWarning: { isVisible: false },
      successMessage: null,
    },
  },
  {
    id: 'typing',
    name: '2. Typing State',
    badge: 'neutral',
    description: 'User actively typing initial characters.',
    stateProps: {
      password: 'pass',
      score: 25,
      status: 'Weak',
      rules: [
        { label: 'At least 12 characters', completed: false },
        { label: 'Uppercase letter', completed: false },
        { label: 'Lowercase letter', completed: true },
        { label: 'Number', completed: false },
        { label: 'Special character (!@#$%)', completed: false },
      ],
      suggestion: 'Keep typing to meet length and character requirements.',
      expectedScoreBoost: 15,
      reuseWarning: { isVisible: false },
      successMessage: null,
    },
  },
  {
    id: 'weak',
    name: '3. Weak Password',
    badge: 'error',
    description: 'Common predictable pattern with low entropy.',
    stateProps: {
      password: 'password123',
      score: 30,
      status: 'Weak',
      rules: [
        { label: 'At least 12 characters', completed: false },
        { label: 'Uppercase letter', completed: false },
        { label: 'Lowercase letter', completed: true },
        { label: 'Number', completed: true },
        { label: 'Special character (!@#$%)', completed: false },
      ],
      suggestion: 'Avoid common dictionary words like "password" and sequential numbers.',
      expectedScoreBoost: 25,
      reuseWarning: { isVisible: false },
      successMessage: null,
    },
  },
  {
    id: 'fair',
    name: '4. Fair Password',
    badge: 'warning',
    description: 'Moderate strength password missing special characters.',
    stateProps: {
      password: 'Pass12345678',
      score: 55,
      status: 'Fair',
      rules: [
        { label: 'At least 12 characters', completed: true },
        { label: 'Uppercase letter', completed: true },
        { label: 'Lowercase letter', completed: true },
        { label: 'Number', completed: true },
        { label: 'Special character (!@#$%)', completed: false },
      ],
      suggestion: 'Add special symbols (!@#$%) to improve password resistance against brute-force attacks.',
      expectedScoreBoost: 20,
      reuseWarning: { isVisible: false },
      successMessage: null,
    },
  },
  {
    id: 'strong',
    name: '5. Strong Password',
    badge: 'success',
    description: 'Robust password satisfying almost all criteria.',
    stateProps: {
      password: 'PassGuard2026',
      score: 80,
      status: 'Strong',
      rules: [
        { label: 'At least 12 characters', completed: true },
        { label: 'Uppercase letter', completed: true },
        { label: 'Lowercase letter', completed: true },
        { label: 'Number', completed: true },
        { label: 'Special character (!@#$%)', completed: false },
      ],
      suggestion: 'Add one special symbol (!@#$%) to reach maximum 100% score.',
      expectedScoreBoost: 20,
      reuseWarning: { isVisible: false },
      successMessage: null,
    },
  },
  {
    id: 'excellent',
    name: '6. Excellent Password',
    badge: 'success',
    description: 'Maximum entropy password satisfying all enterprise guidelines.',
    stateProps: {
      password: 'P@ssGu@rd#2026!',
      score: 100,
      status: 'Excellent',
      rules: [
        { label: 'At least 12 characters', completed: true },
        { label: 'Uppercase letter', completed: true },
        { label: 'Lowercase letter', completed: true },
        { label: 'Number', completed: true },
        { label: 'Special character (!@#$%)', completed: true },
      ],
      suggestion: null,
      expectedScoreBoost: undefined,
      reuseWarning: { isVisible: false },
      successMessage: 'Excellent password! Meets all enterprise security standards.',
    },
  },
  {
    id: 'reused',
    name: '7. Reused Password',
    badge: 'error',
    description: 'Strong password flagged for prior credential leaks.',
    stateProps: {
      password: 'P@ssGu@rd#2026!',
      score: 85,
      status: 'Strong',
      rules: [
        { label: 'At least 12 characters', completed: true },
        { label: 'Uppercase letter', completed: true },
        { label: 'Lowercase letter', completed: true },
        { label: 'Number', completed: true },
        { label: 'Special character (!@#$%)', completed: true },
      ],
      suggestion: null,
      expectedScoreBoost: undefined,
      reuseWarning: {
        isVisible: true,
        message: 'Previously used password detected. Reusing passwords across accounts exposes you to credential stuffing attacks.',
      },
      successMessage: null,
    },
  },
];

export const DemoPage: React.FC = () => {
  const [activeStateId, setActiveStateId] = useState<string>('strong');
  const currentState = demoStates.find((s) => s.id === activeStateId) || demoStates[4];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-2 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <Badge variant="success" dot>
            PassGuard UI Gallery
          </Badge>
          <span className="text-xs text-slate-500 font-mono">v1.0.0</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Interactive Component States Demo
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Test and preview all 7 component states for <code className="text-blue-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">&lt;PasswordSecurityCard /&gt;</code> without running real-time analysis logic.
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: State Controls Navigation */}
        <div className="lg:col-span-4 space-y-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Layers className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-slate-200">Select Demo State</h2>
          </div>

          <div className="space-y-1.5">
            {demoStates.map((state) => {
              const isActive = state.id === activeStateId;
              return (
                <button
                  key={state.id}
                  onClick={() => setActiveStateId(state.id)}
                  className={`w-full text-left p-3 rounded-lg text-xs transition-all flex items-center justify-between border ${
                    isActive
                      ? 'bg-blue-950/60 text-white border-blue-600/80 shadow-sm font-semibold'
                      : 'bg-slate-950/40 text-slate-400 border-slate-800/60 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-medium text-slate-200">{state.name}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{state.description}</div>
                  </div>
                  <Badge variant={state.badge} size="sm" className="shrink-0 ml-2">
                    {state.stateProps.status}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Rendered Card & Code Drawer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 shadow-lg flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-emerald-400" /> Active Preview: <strong className="text-slate-100">{currentState.name}</strong>
              </span>
              <Badge variant={currentState.badge}>{currentState.stateProps.status}</Badge>
            </div>

            {/* Live Component Render */}
            <PasswordSecurityCard
              stateProps={currentState.stateProps}
              onContinue={() => alert(`Submitted in ${currentState.name}`)}
            />
          </div>

          {/* Developer Code Snippet */}
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Code className="w-4 h-4 text-blue-400" /> Usage Code Snippet
            </div>
            <pre className="p-3 rounded bg-slate-950 text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800/80">
{`import { PasswordSecurityCard } from '@passguard/client';

export function SignupForm() {
  return (
    <PasswordSecurityCard
      stateProps={${JSON.stringify(currentState.stateProps, null, 2)}}
      onContinue={() => handleSignup()}
    />
  );
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DemoPage;
