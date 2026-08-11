import React, { useState, useRef, useEffect } from 'react';
import {
  PasswordSecurityCard,
  type PasswordPolicy,
  type PasswordAnalysisOutput,
} from '../../index';
import { type AdaptiveDensity, type AdaptiveThemeMode } from '../../theme/types';
import { Shield, Sparkles, ChevronDown, ChevronUp, Check, Cpu, Eye, Layout, Sliders, Palette, Lock } from 'lucide-react';

export const DemoPage: React.FC = () => {
  // Configurable policy state driven by developer panel controls
  const [policy] = useState<PasswordPolicy>({
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

  const [password, setPassword] = useState('SecretPassword123!');
  const [latestAnalysis, setLatestAnalysis] = useState<PasswordAnalysisOutput | null>(null);

  // Playground adaptive state controls
  const [themeMode, setThemeMode] = useState<AdaptiveThemeMode>('auto');
  const [accentColor, setAccentColor] = useState('#7c3aed');
  const [bgColor, setBgColor] = useState('#f8fafc');
  const [borderRadius, setBorderRadius] = useState('0.5rem');
  const [containerWidth, setContainerWidth] = useState<number>(400);
  const [density, setDensity] = useState<AdaptiveDensity>('auto');

  // Simulated host environment preset selector
  const [environmentPreset, setEnvironmentPreset] = useState<'saas' | 'cyber' | 'banking' | 'custom'>('saas');

  // Diagnostic telemetry accordion state
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Interactive Form Integration State
  const [signupName, setSignupName] = useState('Jane Developer');
  const [signupEmail, setSignupEmail] = useState('jane@example.com');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('SecretPassword123!');

  const containerRef = useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState<number>(400);

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

  const handleApplyPreset = (preset: 'saas' | 'cyber' | 'banking' | 'custom') => {
    setEnvironmentPreset(preset);
    if (preset === 'saas') {
      setThemeMode('light');
      setBgColor('#f8fafc');
      setAccentColor('#7c3aed');
      setBorderRadius('0.5rem');
    } else if (preset === 'cyber') {
      setThemeMode('dark');
      setBgColor('#09090b');
      setAccentColor('#00d4ff');
      setBorderRadius('0.5rem');
    } else if (preset === 'banking') {
      setThemeMode('light');
      setBgColor('#ffffff');
      setAccentColor('#123456');
      setBorderRadius('0.125rem');
    }
  };

  const handlePasswordPreset = (val: string) => {
    setPassword(val);
    setSignupConfirmPassword(val);
  };

  const computedDensity = density !== 'auto'
    ? (density === 'minimal' ? 'compact' : density)
    : (measuredWidth < 280 ? 'minimal' : measuredWidth < 340 ? 'compact' : measuredWidth > 600 ? 'detailed' : 'standard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-purple-500 selection:text-white pb-20 overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-900/30">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white tracking-tight">PASSGUARD</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-950 text-purple-300 border border-purple-800/60">
                  v1.1.1
                </span>
              </div>
            </div>
          </div>

          <a
            href="https://github.com/vathsa1820/PassGuard"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors bg-slate-800/80 hover:bg-slate-800 px-3.5 py-1.5 rounded-lg border border-slate-700/60"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
        {/* Header Title */}
        <header className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-950/70 text-purple-300 border border-purple-800/50">
            <Sparkles className="w-3.5 h-3.5" /> Adaptive UI Playground
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Adaptive Password Security for React
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            PassGuard behaves like a small, native password-security layer underneath standard host input fields.
          </p>
        </header>

        {/* Playground Controls & Live Preview Card */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-6 shadow-2xl" aria-label="PassGuard Playground Controls">
          {/* Preset & Customization Toolbar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 border-b border-slate-800/80">
            {/* Host Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Host UI Presets</label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                {(['saas', 'cyber', 'banking'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className={`text-xs py-1.5 capitalize rounded font-medium transition-colors ${
                      environmentPreset === p ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {p === 'saas' ? 'SaaS' : p === 'cyber' ? 'Cyber' : 'Banking'}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Mode */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Theme Mode</label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                {(['auto', 'light', 'dark'] as AdaptiveThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setThemeMode(mode);
                      setEnvironmentPreset('custom');
                    }}
                    className={`text-xs py-1.5 capitalize rounded font-medium transition-colors ${
                      themeMode === mode ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Host Accent Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => {
                    setAccentColor(e.target.value);
                    setEnvironmentPreset('custom');
                  }}
                  className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer shrink-0"
                  title="Choose host accent color"
                />
                <div className="flex gap-1.5 flex-1 overflow-x-auto py-1">
                  {['#7c3aed', '#00d4ff', '#123456', '#ff4ecd', '#ff6b35'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      style={{ backgroundColor: c }}
                      onClick={() => {
                        setAccentColor(c);
                        setEnvironmentPreset('custom');
                      }}
                      className="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-transform shrink-0"
                      title={`Accent ${c}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Border Radius */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Border Radius</label>
              <div className="flex gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 overflow-x-auto">
                {['0.125rem', '0.5rem', '0.75rem', '1rem'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setBorderRadius(r);
                      setEnvironmentPreset('custom');
                    }}
                    className={`flex-1 text-[11px] py-1 font-mono rounded transition-colors ${
                      borderRadius === r ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Container Width Slider & Preset Triggers */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-purple-400" /> Container Width Trigger:
                <strong className="text-white font-mono">{containerWidth}px</strong>
              </span>
              <span className="text-xs text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/60 font-mono uppercase">
                Detected: {computedDensity}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="range"
                min="240"
                max="1000"
                step="10"
                value={containerWidth}
                onChange={(e) => setContainerWidth(parseInt(e.target.value, 10))}
                className="w-full accent-purple-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400 font-medium">Quick width presets:</span>
              {[240, 300, 400, 700, 1000].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setContainerWidth(w)}
                  className={`text-xs px-2.5 py-0.5 rounded font-mono border transition-colors ${
                    containerWidth === w
                      ? 'bg-purple-600 border-purple-500 text-white font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {w}px
                </button>
              ))}
            </div>
          </div>

          {/* Password Preset Selector */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <label className="text-xs font-semibold text-slate-300 block">Password Presets</label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Empty', value: '' },
                { label: 'Very Weak', value: '123' },
                { label: 'Common', value: 'password' },
                { label: 'Pattern-Based', value: 'qwerty12345' },
                { label: 'Medium', value: 'Pass123!' },
                { label: 'Strong', value: 'SecretPassword123!' },
                { label: 'Very Strong', value: 'correct-horse-battery-staple-99!' },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handlePasswordPreset(preset.value)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
                    password === preset.value
                      ? 'bg-purple-900/60 border-purple-500 text-purple-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* LIVE SIGNUP PREVIEW HOST CONTAINER */}
          <div className="space-y-2 pt-4">
            <div className="text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 font-mono">
                Live Host Signup Preview
              </span>
            </div>

            <div
              className="p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex justify-center mx-auto overflow-x-auto shadow-inner"
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
                {/* Host Signup Form Wrapper */}
                <div
                  className="p-5 sm:p-6 space-y-4 transition-colors text-slate-900 border"
                  style={{
                    backgroundColor: themeMode === 'dark' || (themeMode === 'auto' && environmentPreset === 'cyber') ? '#121215' : '#ffffff',
                    color: themeMode === 'dark' || (themeMode === 'auto' && environmentPreset === 'cyber') ? '#f8fafc' : '#0f172a',
                    borderColor: themeMode === 'dark' || (themeMode === 'auto' && environmentPreset === 'cyber') ? '#27272a' : '#e2e8f0',
                    borderRadius: borderRadius,
                  }}
                >
                  <div>
                    <h3 className="text-lg font-bold">Create your account</h3>
                    <p className="text-xs opacity-70">Join thousands of developers building secure applications.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold block">Full name</label>
                    <input
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded border bg-transparent opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      style={{ borderColor: 'inherit', borderRadius: borderRadius }}
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold block">Email</label>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded border bg-transparent opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      style={{ borderColor: 'inherit', borderRadius: borderRadius }}
                      placeholder="jane@example.com"
                    />
                  </div>

                  {/* EMBEDDED PASSGUARD COMPONENT */}
                  <PasswordSecurityCard
                    policy={policy}
                    value={password}
                    density={density}
                    showContinueButton={false}
                    override={{
                      mode: themeMode,
                      accent: accentColor,
                      bg: bgColor,
                      radius: borderRadius,
                    }}
                    onChange={(val) => {
                      setPassword(val);
                      setSignupConfirmPassword(val);
                    }}
                    onContinue={(res) => setLatestAnalysis(res || null)}
                  />

                  <div className="space-y-1">
                    <label className="text-xs font-semibold block">Confirm password</label>
                    <input
                      type="password"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded border bg-transparent opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      style={{ borderColor: 'inherit', borderRadius: borderRadius }}
                      placeholder="Re-enter password..."
                    />
                  </div>

                  <button
                    type="button"
                    style={{
                      backgroundColor: accentColor,
                      borderRadius: borderRadius,
                    }}
                    className="w-full py-2.5 px-4 font-semibold text-sm text-white shadow hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    Create account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY PASSGUARD? HIGHLIGHTS */}
        <section className="space-y-4" aria-label="Why PassGuard Features">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" /> Why PassGuard?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Zero-Knowledge</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Password analysis runs 100% locally in browser memory with zero network requests.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 border border-blue-800/60 flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Adaptive UI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatically matches host application colors, theme, container width, and border radii.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-950 text-purple-400 border border-purple-800/60 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">No Tailwind Required</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Standalone production CSS ships compiled in package <code className="text-purple-300 font-mono text-[10px]">dist/style.css</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/60 flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Accessible</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                WCAG-conscious keyboard navigation, screen reader polite announcements, and ARIA attributes.
              </p>
            </div>
          </div>
        </section>

        {/* DEVELOPER TELEMETRY & DIAGNOSTICS (COLLAPSIBLE ACCORDION) */}
        <section className="bg-slate-900/70 rounded-xl border border-slate-800/80 overflow-hidden" aria-label="Developer Diagnostics Accordion">
          <button
            type="button"
            onClick={() => setShowDiagnostics((prev) => !prev)}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Developer diagnostics</span>
              <span className="text-[10px] font-normal text-slate-500 font-mono">
                {password ? `(score: ${latestAnalysis?.score ?? 'analyzed'}, ${password.length} chars)` : '(empty)'}
              </span>
            </div>
            <div className="text-slate-400">
              {showDiagnostics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showDiagnostics && (
            <div className="p-5 border-t border-slate-800/80 bg-slate-950/80 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Score</span>
                  <span className="text-white text-sm font-bold">{latestAnalysis?.score ?? 0} / 100</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Status</span>
                  <span className="text-emerald-400 text-sm font-bold">{latestAnalysis?.status ?? 'Weak'}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Entropy Bits</span>
                  <span className="text-purple-400 text-sm font-bold">{latestAnalysis?.entropy ?? 0} bits</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Crack Time</span>
                  <span className="text-blue-400 text-xs font-bold truncate block">{latestAnalysis?.crackTime ?? 'instant'}</span>
                </div>
              </div>

              {latestAnalysis && (
                <div className="space-y-1.5 text-slate-400 text-[11px] pt-2 border-t border-slate-900">
                  <p>Rules Passed: <span className="text-slate-200">{latestAnalysis.rules.filter(r => r.passed).length} / {latestAnalysis.rules.length}</span></p>
                  <p>Common Password: <span className={latestAnalysis.commonPassword.isCommon ? 'text-red-400' : 'text-emerald-400'}>{latestAnalysis.commonPassword.isCommon ? 'Flagged' : 'Safe'}</span></p>
                  <p>Reuse Hashing: <span className="text-slate-200">Argon2id local salt keying</span></p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DemoPage;
