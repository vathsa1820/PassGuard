import React, { useState, useRef, useEffect } from 'react';
import {
  PasswordSecurityCard,
  type PasswordPolicy,
  type PasswordAnalysisOutput,
} from '../../index';
import { type AdaptiveDensity, type AdaptiveThemeMode } from '../../theme/types';
import { Shield, Sliders, Code2, Lock, Sparkles, RefreshCw, Eye, Monitor, Layers, Palette } from 'lucide-react';

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
  const [latestAnalysis, setLatestAnalysis] = useState<PasswordAnalysisOutput | null>(null);

  // Playground adaptive state controls
  const [themeMode, setThemeMode] = useState<AdaptiveThemeMode>('auto');
  const [accentColor, setAccentColor] = useState('#3b82f6');
  const [bgColor, setBgColor] = useState('#0f172a');
  const [containerWidth, setContainerWidth] = useState<number>(440);
  const [density, setDensity] = useState<AdaptiveDensity>('auto');

  // Simulated host environment preset selector
  const [environmentPreset, setEnvironmentPreset] = useState<'saas' | 'cyber' | 'banking' | 'custom'>('custom');

  // Interactive Form Integration State
  const [signupEmail, setSignupEmail] = useState('developer@example.com');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState<number>(440);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMeasuredWidth(Math.round(entry.contentRect.width));
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleApplyPreset = (preset: 'saas' | 'cyber' | 'banking') => {
    setEnvironmentPreset(preset);
    if (preset === 'saas') {
      setThemeMode('light');
      setBgColor('#f8fafc');
      setAccentColor('#7c3aed');
    } else if (preset === 'cyber') {
      setThemeMode('dark');
      setBgColor('#09090b');
      setAccentColor('#00d4ff');
    } else if (preset === 'banking') {
      setThemeMode('light');
      setBgColor('#ffffff');
      setAccentColor('#123456');
    }
  };

  const handlePasswordPreset = (value: string) => {
    setPassword(value);
  };

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

  const computedDensity = density !== 'auto'
    ? (density === 'minimal' ? 'compact' : density)
    : (measuredWidth < 340 ? 'compact' : measuredWidth > 600 ? 'detailed' : 'standard');

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
              v1.1.0 Adaptive UI
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
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-950/80 text-blue-400 border border-blue-800/60">
            <Sparkles className="w-3.5 h-3.5" /> Container-Aware Adaptive Security UI
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            PassGuard Developer Playground
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Test how PassGuard automatically adapts to your app's host colors, light/dark themes, container width, and visual density.
          </p>
        </header>

        {/* Adaptive UI Playground Section */}
        <section className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-2xl" aria-label="Adaptive UI Playground">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-400" /> Host Application Simulator Controls
              </h2>
              <p className="text-xs text-slate-400">
                Modify parameters below to observe instant client-side theme & density adaptation.
              </p>
            </div>

            {/* Host Simulator Quick Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Environment Presets:</span>
              <button
                type="button"
                onClick={() => handleApplyPreset('saas')}
                className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
                  environmentPreset === 'saas' ? 'bg-purple-900/50 border-purple-500 text-purple-200' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Modern SaaS
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('cyber')}
                className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
                  environmentPreset === 'cyber' ? 'bg-cyan-900/50 border-cyan-500 text-cyan-200' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Cybersecurity
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('banking')}
                className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
                  environmentPreset === 'banking' ? 'bg-blue-900/50 border-blue-500 text-blue-200' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Banking
              </button>
            </div>
          </div>

          {/* Playground Control Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Theme Mode */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Theme Mode</label>
              <div className="flex gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
                {(['auto', 'light', 'dark'] as AdaptiveThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setThemeMode(mode);
                      setEnvironmentPreset('custom');
                    }}
                    className={`flex-1 text-xs py-1.5 capitalize rounded font-medium transition-colors ${
                      themeMode === mode ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Accent Color */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Host Primary / Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => {
                    setAccentColor(e.target.value);
                    setEnvironmentPreset('custom');
                  }}
                  className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  title="Choose accent color"
                />
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => {
                    setAccentColor(e.target.value);
                    setEnvironmentPreset('custom');
                  }}
                  className="flex-1 px-2.5 py-1 text-xs font-mono bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-1.5 pt-1">
                {['#7c3aed', '#00d4ff', '#123456', '#ff4ecd', '#ff6b35', '#10b981'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    style={{ backgroundColor: c }}
                    onClick={() => {
                      setAccentColor(c);
                      setEnvironmentPreset('custom');
                    }}
                    className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform"
                    title={`Set accent ${c}`}
                  />
                ))}
              </div>
            </div>

            {/* 3. Container Width */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Container Width</span>
                <span className="text-blue-400 font-mono">{containerWidth}px</span>
              </div>
              <input
                type="range"
                min="240"
                max="1000"
                step="10"
                value={containerWidth}
                onChange={(e) => setContainerWidth(parseInt(e.target.value, 10))}
                className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex flex-wrap gap-1">
                {[240, 280, 300, 340, 400, 500, 600, 700, 1000].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setContainerWidth(w)}
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono border ${
                      containerWidth === w ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Density Override */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Density Override</label>
              <div className="flex flex-wrap gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                {(['auto', 'minimal', 'compact', 'standard', 'detailed'] as AdaptiveDensity[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDensity(d)}
                    className={`flex-1 text-[11px] py-1 capitalize rounded font-medium transition-colors ${
                      density === d ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostic Playground Telemetry Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-blue-400" />
              <span>Simulated Container: <strong className="text-white">{measuredWidth}px</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Active Density: <strong className="text-emerald-400 uppercase">{computedDensity}</strong></span>
            </div>
            <div>
              Mode: <strong className="text-purple-400 uppercase">{themeMode}</strong>
            </div>
            <div>
              Accent: <span className="inline-block w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: accentColor }} />
              <strong className="text-slate-200">{accentColor}</strong>
            </div>
          </div>

          {/* Simulated Host Container Box */}
          <div
            className="p-6 rounded-2xl border transition-all duration-300 flex justify-center mx-auto overflow-x-auto"
            style={{
              backgroundColor: bgColor,
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              ref={containerRef}
              style={{ width: `${containerWidth}px` }}
              className="transition-all duration-200"
            >
              <PasswordSecurityCard
                policy={policy}
                value={password}
                density={density}
                override={{
                  mode: themeMode,
                  accent: accentColor,
                  bg: bgColor,
                }}
                onChange={(val) => setPassword(val)}
                onContinue={(res) => setLatestAnalysis(res || null)}
              />
            </div>
          </div>

          {/* Password Scenario Presets */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-300">Test Password Scenarios:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Empty', value: '' },
                { label: 'Weak', value: '123' },
                { label: 'Common', value: 'password' },
                { label: 'Sequential', value: 'abc12345' },
                { label: 'Medium', value: 'Pass123!' },
                { label: 'Strong', value: 'SecretPassword123!' },
                { label: 'Passphrase', value: 'correct-horse-battery-staple-99!' },
              ].map((sc) => (
                <button
                  key={sc.label}
                  type="button"
                  onClick={() => handlePasswordPreset(sc.value)}
                  className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Real Signup Form Integration Example */}
        <section className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl" aria-label="Embedded Registration Form Integration Example">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" /> Embedded Form Integration Example
            </h2>
            <p className="text-xs text-slate-400">
              Demonstrates how PassGuard embeds naturally beneath a password field in a standard signup form without taking over the full page layout.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white text-center pb-2 border-b border-slate-800">
              Create Enterprise Account
            </h3>

            <div className="space-y-1">
              <label htmlFor="demo-signup-email" className="text-xs font-semibold text-slate-300">
                Email Address
              </label>
              <input
                id="demo-signup-email"
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="you@company.com"
              />
            </div>

            {/* Embedded PassGuard Security Component */}
            <div className="space-y-1">
              <PasswordSecurityCard
                density="compact"
                policy={policy}
                value={password}
                onChange={(val) => setPassword(val)}
                onContinue={(analysisRes) => setLatestAnalysis(analysisRes || null)}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="demo-signup-confirm" className="text-xs font-semibold text-slate-300">
                Confirm Password
              </label>
              <input
                id="demo-signup-confirm"
                type="password"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="Re-enter password..."
              />
            </div>

            <button
              type="button"
              disabled={!password || password !== signupConfirmPassword}
              className="w-full h-10 mt-2 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors shadow-lg"
            >
              Complete Registration
            </button>
          </div>
        </section>

        {/* Policy Configuration Controls */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-lg" aria-label="Policy Controls">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-400" /> Dynamic Policy Rules Configuration
            </h2>
            <button
              type="button"
              onClick={resetPolicyToDefault}
              className="text-xs text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded border border-slate-800"
            >
              <RefreshCw className="w-3 h-3" /> Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-200">
                <label htmlFor="min-length-range">Minimum Character Length</label>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'requireUppercase', label: 'Require Uppercase (A-Z)' },
                { key: 'requireLowercase', label: 'Require Lowercase (a-z)' },
                { key: 'requireNumber', label: 'Require Number (0-9)' },
                { key: 'requireSymbol', label: 'Require Symbol (!@#$)' },
                { key: 'preventRepeatedCharacters', label: 'Prevent Repeated Characters' },
                { key: 'preventSequentialPatterns', label: 'Prevent Sequential Runs' },
                { key: 'preventKeyboardPatterns', label: 'Prevent Spatial Patterns' },
                { key: 'checkCommonPasswords', label: 'Check Common Breached List' },
                { key: 'preventReuse', label: 'Prevent Session Reuse' },
              ].map((item) => {
                const isChecked = !!policy[item.key as keyof PasswordPolicy];
                return (
                  <div key={item.key} className="flex items-center justify-between text-xs p-2 rounded bg-slate-950 border border-slate-800">
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

        {/* Security & Operational Boundaries */}
        <section className="bg-blue-950/30 rounded-2xl border border-blue-900/40 p-6 sm:p-8 space-y-3" aria-label="Privacy & Security Boundaries">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-900/50 text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Client-Side Analysis & Security Boundaries</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            PassGuard performs password strength evaluations 100% locally in client browser memory with 0 network calls.
            PassGuard provides real-time guidance to help users create strong passwords, but does NOT replace server-side password hashing (Argon2id, bcrypt), backend authentication, multi-factor authentication (MFA), or IP rate-limiting.
          </p>
        </section>
      </main>
    </div>
  );
};

export default DemoPage;
