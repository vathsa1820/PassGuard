import React, { useState } from 'react';
import {
  PasswordSecurityCard,
  type PasswordPolicy,
  type PasswordAnalysis,
} from '../../index';
import { Shield, Sliders, Code2, Lock, Check, Sparkles, RefreshCw, Eye } from 'lucide-react';

export const DemoPage: React.FC = () => {
  // Configurable policy state driven by developer panel controls
  const [policy, setPolicy] = useState<PasswordPolicy>({
    minLength: 12,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSymbol: true,
    preventRepeatedCharacters: true,
    preventSequentialPatterns: true,
    preventKeyboardPatterns: true,
    checkCommonPasswords: true,
    preventReuse: true,
  });

  const [password, setPassword] = useState('');
  const [latestAnalysis, setLatestAnalysis] = useState<PasswordAnalysis | null>(null);

  const togglePolicyFlag = (key: keyof PasswordPolicy) => {
    setPolicy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleMinLengthChange = (val: number) => {
    const minLength = Math.max(1, Math.min(32, val));
    setPolicy((prev) => ({
      ...prev,
      minLength,
    }));
  };

  const resetPolicyToDefault = () => {
    setPolicy({
      minLength: 12,
      maxLength: 128,
      requireUppercase: true,
      requireLowercase: true,
      requireNumber: true,
      requireSymbol: true,
      preventRepeatedCharacters: true,
      preventSequentialPatterns: true,
      preventKeyboardPatterns: true,
      checkCommonPasswords: true,
      preventReuse: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased pb-16">
      {/* Navbar / Top Bar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-900/40">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">PassGuard</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/60">
              Open Source
            </span>
          </div>

          <a
            href="https://github.com/vathsa1820/PassGuard"
            target="_blank"
            rel="noreferrer"
            className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-800/80 hover:bg-slate-800 px-3.5 py-1.5 rounded-md border border-slate-700/60"
          >
            GitHub Repository
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        {/* Section 1: Header */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-950/80 text-blue-400 border border-blue-800/60">
            <Sparkles className="w-3.5 h-3.5" /> Real-time password security guidance
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            PassGuard Interactive Demo
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Help users create stronger, unique passwords with clear feedback while they type.
          </p>
        </header>

        {/* Section 2 & 3: Live Demo + Policy Controls (2-Column Grid on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Demo Component (Visual Focus) */}
          <section className="lg:col-span-7 space-y-4" aria-label="Try PassGuard Live Demo">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" /> Try PassGuard
              </h2>
              <span className="text-xs text-slate-400">Keystroke real-time feedback</span>
            </div>

            <div className="p-4 sm:p-6 bg-slate-900/70 rounded-2xl border border-slate-800 shadow-2xl flex flex-col items-center">
              <PasswordSecurityCard
                policy={policy}
                value={password}
                onChange={(val) => setPassword(val)}
                onContinue={(res) => setLatestAnalysis(res || null)}
              />
            </div>
          </section>

          {/* Right Column: Policy Controls Panel */}
          <section className="lg:col-span-5 space-y-4" aria-label="Developer Configuration Panel">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-400" /> Policy Configuration
              </h2>
              <button
                type="button"
                onClick={resetPolicyToDefault}
                className="text-xs text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
              >
                <RefreshCw className="w-3 h-3" /> Reset Defaults
              </button>
            </div>

            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-5 shadow-lg">
              <p className="text-xs text-slate-400 border-b border-slate-800 pb-3">
                Toggle developer security options to dynamically reconfigure requirement rules.
              </p>

              {/* Minimum Length Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-200">
                  <label htmlFor="min-length-range">Minimum Length</label>
                  <span className="text-blue-400 font-mono">{policy.minLength} characters</span>
                </div>
                <input
                  id="min-length-range"
                  type="range"
                  min="4"
                  max="32"
                  value={policy.minLength}
                  onChange={(e) => handleMinLengthChange(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Policy Toggles Grid */}
              <div className="space-y-3 pt-2">
                {[
                  { key: 'requireUppercase', label: 'Require Uppercase (A-Z)' },
                  { key: 'requireLowercase', label: 'Require Lowercase (a-z)' },
                  { key: 'requireNumber', label: 'Require Number (0-9)' },
                  { key: 'requireSymbol', label: 'Require Symbol (!@#$)' },
                  { key: 'preventRepeatedCharacters', label: 'Prevent Repeated Characters' },
                  { key: 'preventSequentialPatterns', label: 'Prevent Sequential Patterns' },
                  { key: 'preventKeyboardPatterns', label: 'Prevent Keyboard Patterns' },
                  { key: 'checkCommonPasswords', label: 'Check Common Passwords' },
                  { key: 'preventReuse', label: 'Prevent Password Reuse' },
                ].map((item) => {
                  const isChecked = !!policy[item.key as keyof PasswordPolicy];
                  return (
                    <div key={item.key} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/50 last:border-0">
                      <span className="text-slate-300 font-medium">{item.label}</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isChecked}
                        aria-label={item.label}
                        onClick={() => togglePolicyFlag(item.key as keyof PasswordPolicy)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isChecked ? 'bg-blue-600' : 'bg-slate-800'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            isChecked ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Section 4: Score Explanation */}
        <section className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-6 sm:p-8 space-y-6" aria-label="Score Explanation">
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-white">Score System Explanation</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              PassGuard aggregates rule validation, entropy evaluation, and pattern checks into a 0–100 score.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-red-900/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-red-400 font-bold">0–30</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-950 text-red-400 border border-red-800">Weak</span>
              </div>
              <p className="text-xs text-slate-400 pt-1">Short length, missing required character types, or predictable patterns.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-bold">31–60</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-950 text-amber-400 border border-amber-800">Fair</span>
              </div>
              <p className="text-xs text-slate-400 pt-1">Moderate length or character mix. Satisfies basic rules but lacks high entropy.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-blue-900/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400 font-bold">61–80</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-950 text-blue-400 border border-blue-800">Strong</span>
              </div>
              <p className="text-xs text-slate-400 pt-1">High entropy and complete character diversity. Resilient to common attacks.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">81–100</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Excellent</span>
              </div>
              <p className="text-xs text-slate-400 pt-1">Maximum entropy and zero pattern detection matches. Meets enterprise security standards.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Security & Privacy */}
        <section className="bg-blue-950/30 rounded-2xl border border-blue-900/40 p-6 sm:p-8 space-y-3" aria-label="Privacy & Security Guarantee">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-900/50 text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Your password stays in your browser.</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            PassGuard performs password analysis locally in browser memory. This demo does not transmit your password to external servers or third-party APIs.
            While PassGuard helps guide users toward stronger password creation, complete account security requires server-side password hashing (e.g. Argon2id or bcrypt) and secure transport protocols.
          </p>
        </section>

        {/* Section 6: Developer Quick Start Code Example */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6" aria-label="Developer Quick Start">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Developer Quick Start</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">React / TypeScript</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Minimal Usage Example */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Basic Usage</span>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800">
{`import { PasswordSecurityCard } from '@vatza/passguard';

export function SignupForm() {
  return (
    <PasswordSecurityCard />
  );
}`}
              </pre>
            </div>

            {/* Configured Policy Usage Example */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Custom Policy Usage</span>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800">
{`import { PasswordSecurityCard, type PasswordPolicy } from '@vatza/passguard';

const policy: PasswordPolicy = ${JSON.stringify(policy, null, 2)};

export function CustomSignup() {
  return (
    <PasswordSecurityCard policy={policy} />
  );
}`}
              </pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DemoPage;
