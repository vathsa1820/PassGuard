import React, { useState, useRef, useEffect } from 'react';
import {
  PasswordSecurityCard,
  usePasswordAnalysis,
  type PasswordPolicy,
  type PasswordAnalysisOutput,
  type AdaptiveDensity,
  type PassGuardThemeOverride,
} from '@vatza/passguard';

import '@vatza/passguard/style.css';
import './demo.css';

import {
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Check,
  Cpu,
  Lock,
  Layout,
  Palette,
  ExternalLink,
  Github,
  Package,
  CheckCircle2,
  Code,
} from 'lucide-react';

const defaultPolicy: PasswordPolicy = {
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
};

const PASSWORD_PRESETS = [
  { label: 'Empty', value: '', desc: 'Initial empty input state' },
  { label: 'Very Weak', value: '12345', desc: 'Short sequential digits' },
  { label: 'Common', value: 'password123', desc: 'Known leaked password' },
  { label: 'Pattern-Based', value: 'qwerty123456', desc: 'Keyboard pattern' },
  { label: 'Medium', value: 'BlueSky2024!', desc: 'Standard complexity' },
  { label: 'Strong', value: 'K8#mP9$xL2!w', desc: 'High entropy & varied chars' },
  { label: 'Long Strong', value: 'correct-horse-battery-staple-77#Pass', desc: 'Passphrase style' },
];

export default function App() {
  const [password, setPassword] = useState('K8#mP9$xL2!w');
  const [signupName, setSignupName] = useState('Jane Developer');
  const [signupEmail, setSignupEmail] = useState('jane@company.com');
  const [confirmPassword, setConfirmPassword] = useState('K8#mP9$xL2!w');
  const [submitted, setSubmitted] = useState(false);

  // Playground adaptive theme states
  const [preset, setPreset] = useState<'saas' | 'cyber' | 'banking' | 'custom'>('saas');
  const [themeMode, setThemeMode] = useState<'auto' | 'light' | 'dark'>('light');
  const [accentColor, setAccentColor] = useState('#7c3aed');
  const [bgColor, setBgColor] = useState('#f8fafc');
  const [borderRadius, setBorderRadius] = useState('0.5rem');

  // Container width trigger state
  const [containerWidth, setContainerWidth] = useState<number>(400);
  const [density, setDensity] = useState<AdaptiveDensity>('auto');

  // Diagnostics accordion
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState<number>(400);

  // Real-time analysis telemetry hook for diagnostics
  const analysis = usePasswordAnalysis(password, defaultPolicy);

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

  const handleApplyPreset = (p: 'saas' | 'cyber' | 'banking' | 'custom') => {
    setPreset(p);
    if (p === 'saas') {
      setThemeMode('light');
      setBgColor('#f8fafc');
      setAccentColor('#7c3aed');
      setBorderRadius('0.5rem');
    } else if (p === 'cyber') {
      setThemeMode('dark');
      setBgColor('#09090b');
      setAccentColor('#00d4ff');
      setBorderRadius('0.5rem');
    } else if (p === 'banking') {
      setThemeMode('light');
      setBgColor('#ffffff');
      setAccentColor('#123456');
      setBorderRadius('0.125rem');
    }
  };

  const handlePasswordPresetSelect = (val: string) => {
    setPassword(val);
    setConfirmPassword(val);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const computedDensity = density !== 'auto'
    ? (density === 'minimal' ? 'compact' : density)
    : (measuredWidth < 280 ? 'minimal' : measuredWidth < 340 ? 'compact' : measuredWidth > 600 ? 'detailed' : 'standard');

  const themeOverride: PassGuardThemeOverride = {
    mode: themeMode,
    accent: accentColor,
    bg: bgColor,
    radius: borderRadius,
  };

  return (
    <div className="demo-container">
      {/* HEADER SECTION */}
      <header className="demo-header" role="banner">
        <div className="brand-badge">
          <ShieldCheck size={16} />
          <span>PassGuard v1.1.1 Public Live Demo</span>
        </div>
        <h1 className="demo-title">PassGuard Interactive Demonstration</h1>
        <p className="demo-subtitle">
          Seamless, zero-knowledge password security experience underneath standard signup fields.
        </p>
      </header>

      {/* PRIVACY MESSAGE BANNER */}
      <section className="privacy-banner" aria-label="Privacy Information">
        <ShieldCheck size={24} className="privacy-banner-icon" />
        <div>
          <p className="privacy-banner-text">
            <strong>Zero-Knowledge Privacy:</strong> Password analysis runs 100% locally in browser memory. Plaintext passwords never leave your client device.
          </p>
        </div>
      </section>

      {/* HERO DEMO: REALISTIC MODERN SAAS SIGNUP INTEGRATION */}
      <main className="hero-signup-section" aria-label="PassGuard Hero Signup Form Integration">
        <div className="section-label-header">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>HERO DEMO — REALISTIC SIGNUP INTEGRATION</span>
        </div>

        <div
          className="signup-preview-viewport"
          style={{ backgroundColor: bgColor }}
        >
          <div
            ref={containerRef}
            style={{ width: `${containerWidth}px` }}
            className="signup-card-container"
          >
            <div
              className="signup-card"
              style={{
                backgroundColor: themeMode === 'dark' || (themeMode === 'auto' && preset === 'cyber') ? '#121215' : '#ffffff',
                color: themeMode === 'dark' || (themeMode === 'auto' && preset === 'cyber') ? '#f8fafc' : '#0f172a',
                borderColor: themeMode === 'dark' || (themeMode === 'auto' && preset === 'cyber') ? '#27272a' : '#e2e8f0',
                borderRadius: borderRadius,
              }}
            >
              <div className="signup-card-header">
                <h2 className="signup-title">Create your account</h2>
                <p className="signup-subtitle">Join thousands of developers building secure applications.</p>
              </div>

              {submitted && (
                <div className="signup-success-alert">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Account registration submitted successfully!</span>
                </div>
              )}

              <form onSubmit={handleSubmitForm} className="signup-form">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    placeholder="name@company.com"
                    className="form-input"
                    style={{ borderRadius: borderRadius }}
                  />
                </div>

                {/* PASSGUARD COMPONENT EMBEDDED UNDER PASSWORD FIELD */}
                <div className="form-group">
                  <PasswordSecurityCard
                    policy={defaultPolicy}
                    value={password}
                    density={density}
                    override={themeOverride}
                    onChange={(val) => {
                      setPassword(val);
                      setConfirmPassword(val);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Re-enter password..."
                    className="form-input"
                    style={{ borderRadius: borderRadius }}
                  />
                  {confirmPassword && (
                    <div className="password-match-status">
                      {confirmPassword === password ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Passwords match
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center gap-1">
                          Passwords do not match
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!password || confirmPassword !== password}
                  className="submit-btn"
                  style={{
                    backgroundColor: accentColor,
                    borderRadius: borderRadius,
                  }}
                >
                  Create account
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* SECONDARY DEVELOPER CONTROLS TOOLBAR */}
      <section className="developer-controls-section" aria-label="Developer Testing Controls">
        <div className="controls-header">
          <Layout className="w-4 h-4 text-purple-400" />
          <h2 className="controls-title">Developer Testing Toolbar</h2>
        </div>

        <div className="controls-grid">
          {/* Host Presets */}
          <div className="control-card">
            <span className="control-label">Host UI Presets</span>
            <div className="button-group">
              {(['saas', 'cyber', 'banking'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className={`btn-toggle ${preset === p ? 'active' : ''}`}
                >
                  {p === 'saas' ? 'SaaS' : p === 'cyber' ? 'Cyber' : 'Banking'}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Mode */}
          <div className="control-card">
            <span className="control-label">Theme Mode</span>
            <div className="button-group">
              {(['auto', 'light', 'dark'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setThemeMode(mode);
                    setPreset('custom');
                  }}
                  className={`btn-toggle ${themeMode === mode ? 'active' : ''}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Host Accent Color */}
          <div className="control-card">
            <span className="control-label">Host Accent Color</span>
            <div className="accent-picker-row">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => {
                  setAccentColor(e.target.value);
                  setPreset('custom');
                }}
                className="color-swatch-input"
                title="Choose custom accent color"
              />
              <div className="swatch-list">
                {['#7c3aed', '#00d4ff', '#123456', '#ff4ecd', '#ff6b35'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    style={{ backgroundColor: c }}
                    onClick={() => {
                      setAccentColor(c);
                      setPreset('custom');
                    }}
                    className="swatch-btn"
                    title={`Set accent color ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Border Radius */}
          <div className="control-card">
            <span className="control-label">Border Radius</span>
            <div className="button-group">
              {['0.125rem', '0.5rem', '0.75rem', '1rem'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setBorderRadius(r);
                    setPreset('custom');
                  }}
                  className={`btn-toggle font-mono ${borderRadius === r ? 'active' : ''}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Container Width Slider & Preset Triggers */}
        <div className="width-control-panel">
          <div className="width-control-header">
            <span className="flex items-center gap-1.5 text-xs text-slate-300">
              <Layout className="w-3.5 h-3.5 text-purple-400" /> Container Width Trigger:
              <strong className="text-white font-mono">{containerWidth}px</strong>
            </span>
            <span className="density-badge">
              Detected Density: {computedDensity}
            </span>
          </div>

          <input
            type="range"
            min="240"
            max="1000"
            step="10"
            value={containerWidth}
            onChange={(e) => setContainerWidth(parseInt(e.target.value, 10))}
            className="width-range-slider"
          />

          <div className="preset-width-buttons">
            <span className="text-xs text-slate-400 font-medium">Quick width presets:</span>
            {[240, 300, 400, 700, 1000].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setContainerWidth(w)}
                className={`preset-width-btn ${containerWidth === w ? 'active' : ''}`}
              >
                {w}px
              </button>
            ))}
          </div>
        </div>

        {/* Password Presets Bar */}
        <div className="password-presets-panel">
          <span className="control-label">Test Password Presets</span>
          <div className="password-presets-grid">
            {PASSWORD_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handlePasswordPresetSelect(p.value)}
                className={`password-preset-btn ${password === p.value ? 'active' : ''}`}
                title={p.desc}
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPER DIAGNOSTICS & TELEMETRY (COLLAPSIBLE ACCORDION) */}
      <section className="diagnostics-section" aria-label="Developer Diagnostics Accordion">
        <button
          type="button"
          onClick={() => setShowDiagnostics((prev) => !prev)}
          className="diagnostics-accordion-toggle"
        >
          <div className="toggle-label flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Developer Telemetry & Engine Diagnostics</span>
            <span className="toggle-subtitle font-mono">
              (score: {analysis.score}/100, {analysis.status})
            </span>
          </div>
          {showDiagnostics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDiagnostics && (
          <div className="diagnostics-content">
            <div className="telemetry-grid">
              <div className="telemetry-card">
                <span className="telemetry-label">Score</span>
                <span className="telemetry-value font-mono">{analysis.score} / 100</span>
              </div>
              <div className="telemetry-card">
                <span className="telemetry-label">Status</span>
                <span className="telemetry-value text-emerald-400">{analysis.status}</span>
              </div>
              <div className="telemetry-card">
                <span className="telemetry-label">Entropy Bits</span>
                <span className="telemetry-value text-purple-400 font-mono">{analysis.entropy} bits</span>
              </div>
              <div className="telemetry-card">
                <span className="telemetry-label">Crack Time</span>
                <span className="telemetry-value text-blue-400 truncate">{analysis.crackTime}</span>
              </div>
            </div>

            <div className="json-toggle-wrapper">
              <button
                type="button"
                onClick={() => setShowRawJson((prev) => !prev)}
                className="preset-btn"
              >
                <Code size={14} />
                <span>{showRawJson ? 'Hide Raw Analysis Object' : 'Inspect Raw Analysis Payload (JSON)'}</span>
              </button>

              {showRawJson && (
                <pre className="json-viewer mt-3">
                  {JSON.stringify(analysis, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </section>

      {/* FOOTER SECTION */}
      <footer className="demo-footer" role="contentinfo">
        <div>
          <strong>Built with PassGuard</strong> — <code className="text-purple-300 font-mono">@vatza/passguard@1.1.1</code>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/vathsa1820/PassGuard"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <Github size={14} />
            <span>GitHub Repository</span>
          </a>
          <a
            href="https://www.npmjs.com/package/@vatza/passguard"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <Package size={14} />
            <span>NPM Package</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
