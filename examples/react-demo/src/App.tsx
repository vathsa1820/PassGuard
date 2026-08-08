import React, { useState } from 'react';
import {
  PasswordSecurityCard,
  PasswordInput,
  PasswordHealthScore,
  PasswordStrengthIndicator,
  RequirementChecklist,
  SuggestionCard,
  ReuseWarning,
  usePasswordAnalyzer,
  type PasswordPolicy,
  type PasswordAnalysis,
} from '@vatza/passguard';

import '@vatza/passguard/style.css';
import './demo.css';

import {
  ShieldCheck,
  Lock,
  ExternalLink,
  Code,
  Sliders,
  Sparkles,
  Info,
  AlertTriangle,
  Github,
  Package,
} from 'lucide-react';

// Enterprise password policy used for the demonstration
const demoPolicy: PasswordPolicy = {
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

// Synthetic password presets representing required evaluation states
const PRESETS = [
  { label: '1. Empty', value: '', description: 'Empty initial state' },
  { label: '2. Very Weak', value: '12345', description: 'Short & sequential digits' },
  { label: '3. Common', value: 'password123', description: 'Common dictionary word' },
  { label: '4. Pattern-Based', value: 'qwerty123456', description: 'Keyboard pattern & sequence' },
  { label: '5. Medium', value: 'BlueSky2024!', description: 'Meets basic criteria' },
  { label: '6. Strong', value: 'K8#mP9$xL2!w', description: 'High entropy & varied chars' },
  { label: '7. Long Strong', value: 'correct-horse-battery-staple-77#Pass', description: 'Passphrase style high complexity' },
];

export default function App() {
  const [password, setPassword] = useState('');
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'custom'>('card');
  const [showRawJson, setShowRawJson] = useState(false);
  const [liveAnalysis, setLiveAnalysis] = useState<PasswordAnalysis | null>(null);

  // Hook instance for Mode 2: Granular Headless Integration
  const analyzer = usePasswordAnalyzer({
    initialPassword: password,
  });

  const handlePresetSelect = (val: string) => {
    setPassword(val);
    analyzer.setPassword(val);
    setActivePreset(val);
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    analyzer.setPassword(val);
    setActivePreset(null);
  };

  // Active analysis data from whichever view mode is active
  const currentAnalysis = viewMode === 'card' ? liveAnalysis : analyzer.analysis;

  return (
    <div className="demo-container">
      {/* HEADER SECTION */}
      <header className="demo-header" role="banner">
        <div className="brand-badge">
          <ShieldCheck size={16} />
          <span>PassGuard v1.0.1 Public Live Demo</span>
        </div>
        <h1 className="demo-title">PassGuard Interactive Demonstration</h1>
        <p className="demo-subtitle">
          Real-time, zero-knowledge password security guidance component library for React applications.
        </p>
      </header>

      {/* PRIVACY MESSAGE BANNER */}
      <section className="privacy-banner" aria-label="Privacy Information">
        <ShieldCheck size={24} className="privacy-banner-icon" />
        <div>
          <p className="privacy-banner-text">
            <strong>Zero-Knowledge Privacy:</strong> Password analysis runs locally in your browser. Your password is not sent to a server.
          </p>
        </div>
      </section>

      {/* SYNTHETIC PRESETS BAR */}
      <section className="presets-section" aria-label="Synthetic Password Presets">
        <div className="presets-header">
          <h2 className="presets-title">Test Synthetic Password Presets</h2>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            Click a preset to evaluate synthetic password scenarios in real time
          </span>
        </div>
        <div className="presets-grid" role="group" aria-label="Synthetic password presets">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className={`preset-btn ${activePreset === preset.value ? 'active' : ''}`}
              onClick={() => handlePresetSelect(preset.value)}
              title={preset.description}
            >
              <Sparkles size={14} />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* VIEW MODE TABS */}
      <div className="view-tabs" role="tablist" aria-label="Component Display Mode">
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === 'card'}
          className={`tab-btn ${viewMode === 'card' ? 'active' : ''}`}
          onClick={() => setViewMode('card')}
        >
          <Sliders size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
          Out-of-the-Box Security Card (`PasswordSecurityCard`)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === 'custom'}
          className={`tab-btn ${viewMode === 'custom' ? 'active' : ''}`}
          onClick={() => setViewMode('custom')}
        >
          <Code size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
          Granular Components (`usePasswordAnalyzer` Hook)
        </button>
      </div>

      {/* MAIN DEMO GRID */}
      <div className="demo-grid">
        {/* LEFT COLUMN: INTERACTIVE COMPONENT DEMO */}
        <section className="card-container" aria-label="Interactive Password Evaluation Area">
          {viewMode === 'card' ? (
            <>
              <h2 className="card-title">
                <Lock size={20} style={{ color: '#38bdf8' }} />
                Unified Security Card View
              </h2>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>
                Standard zero-knowledge component rendering live score, checklist, and guidance.
              </p>
              <PasswordSecurityCard
                policy={demoPolicy}
                value={password}
                onChange={handlePasswordChange}
                onContinue={(analysis) => {
                  setLiveAnalysis(analysis || null);
                }}
              />
            </>
          ) : (
            <>
              <h2 className="card-title">
                <Code size={20} style={{ color: '#38bdf8' }} />
                Granular Component Composition
              </h2>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>
                Composing atomic components (<code style={{ color: '#38bdf8' }}>PasswordInput</code>, <code style={{ color: '#38bdf8' }}>RequirementChecklist</code>, etc.) with custom layout control.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Granular Password Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '6px' }}>
                    Password Entry
                  </label>
                  <PasswordInput
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Enter synthetic password..."
                  />
                </div>

                {/* Score & Indicator */}
                {currentAnalysis && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: '#94a3b8' }}>Security Health</span>
                      <PasswordHealthScore score={currentAnalysis.score} status={currentAnalysis.status} />
                    </div>
                    <PasswordStrengthIndicator score={currentAnalysis.score} />
                  </div>
                )}

                {/* Requirement Checklist */}
                {currentAnalysis && (
                  <div>
                    <RequirementChecklist
                      rules={currentAnalysis.rules.map((r) => ({
                        label: r.label,
                        completed: r.passed,
                      }))}
                    />
                  </div>
                )}

                {/* Reuse Warning */}
                {currentAnalysis?.reuse?.reused && (
                  <ReuseWarning isVisible={true} message="This password was previously entered in this session." />
                )}

                {/* Suggestion Card */}
                {currentAnalysis?.suggestion && (
                  <SuggestionCard
                    title={currentAnalysis.suggestion.title}
                    description={currentAnalysis.suggestion.message}
                    expectedScore={currentAnalysis.suggestion.expectedScore}
                  />
                )}
              </div>
            </>
          )}
        </section>

        {/* RIGHT COLUMN: REAL-TIME TELEMETRY INSPECTOR */}
        <section className="card-container" aria-label="Real-Time Analysis Output Inspector">
          <h2 className="card-title">
            <Info size={20} style={{ color: '#38bdf8' }} />
            Real-Time Analysis Inspector
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 4px 0' }}>
            Live telemetry data returned by the PassGuard engine for developer integration.
          </p>

          <div className="inspector-panel">
            <div className="metric-row">
              <span className="metric-label">Evaluation Status</span>
              {currentAnalysis ? (
                <span className={`badge badge-${currentAnalysis.status}`}>
                  {currentAnalysis.status.replace('_', ' ')}
                </span>
              ) : (
                <span className="metric-value">Pending Input</span>
              )}
            </div>

            <div className="metric-row">
              <span className="metric-label">Security Score</span>
              <span className="metric-value">
                {currentAnalysis ? `${currentAnalysis.score} / 100` : '0 / 100'}
              </span>
            </div>

            <div className="metric-row">
              <span className="metric-label">Computed Entropy</span>
              <span className="metric-value">
                {currentAnalysis ? `${currentAnalysis.entropy} bits (${currentAnalysis.complexity})` : '0 bits'}
              </span>
            </div>

            <div className="metric-row">
              <span className="metric-label">Estimated Crack Time</span>
              <span className="metric-value">
                {currentAnalysis ? currentAnalysis.crackTime : 'Instant'}
              </span>
            </div>

            <div className="metric-row">
              <span className="metric-label">Rules Passed</span>
              <span className="metric-value">
                {currentAnalysis
                  ? `${currentAnalysis.rules.filter((r) => r.passed).length} / ${currentAnalysis.rules.length}`
                  : '0 / 0'}
              </span>
            </div>

            <div className="metric-row">
              <span className="metric-label">Pattern Warnings</span>
              <span className="metric-value">
                {currentAnalysis?.patterns && currentAnalysis.patterns.length > 0
                  ? `⚠️ ${currentAnalysis.patterns.length} Pattern(s) Detected`
                  : '✓ None'}
              </span>
            </div>

            <div className="metric-row">
              <span className="metric-label">Common Password</span>
              <span className="metric-value">
                {currentAnalysis?.commonPassword?.isCommon ? '❌ Known Common' : '✓ Safe'}
              </span>
            </div>

            <div className="metric-row">
              <span className="metric-label">Session Reuse</span>
              <span className="metric-value">
                {currentAnalysis?.reuse?.reused ? '⚠️ Reused in Session' : '✓ Unique'}
              </span>
            </div>

            {/* RAW JSON TOGGLE */}
            <div style={{ marginTop: '12px' }}>
              <button
                type="button"
                className="preset-btn"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setShowRawJson(!showRawJson)}
              >
                <Code size={14} />
                <span>{showRawJson ? 'Hide Raw Analysis Object' : 'Inspect Raw Analysis Payload (JSON)'}</span>
              </button>

              {showRawJson && (
                <div style={{ marginTop: '12px' }}>
                  <pre className="json-viewer">
                    {JSON.stringify(currentAnalysis, null, 2) || '// Enter a password to inspect telemetry payload'}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* SECURITY DISCLOSURE & ARCHITECTURE BOUNDARIES */}
      <section className="security-disclosure" aria-label="Security Disclosure and Boundaries">
        <h2 className="disclosure-title">
          <AlertTriangle size={20} style={{ color: '#f59e0b' }} />
          Client-Side Security Model & Technical Disclosure
        </h2>
        <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
          PassGuard provides real-time client-side password strength evaluation and security guidance directly within browser memory.
        </p>
        <ul className="disclosure-list">
          <li>
            <strong>Does NOT Replace Server Security:</strong> PassGuard is a guidance tool. It does not replace server-side password hashing (e.g. Argon2id, bcrypt), authentication logic, or rate limiting.
          </li>
          <li>
            <strong>Zero-Knowledge Memory Boundary:</strong> Plaintext password inputs remain in volatile component state and are never logged, serialized, or sent over network sockets.
          </li>
          <li>
            <strong>WebCrypto API Requirement:</strong> Local SHA-256 reuse hashing requires a Secure Context (HTTPS or localhost).
          </li>
        </ul>
        <div>
          <a
            href="https://github.com/vathsa1820/PassGuard/blob/main/docs/SECURITY.md"
            target="_blank"
            rel="noopener noreferrer"
            className="disclosure-link"
          >
            <span>Read full Security Policy in Repository</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="demo-footer" role="contentinfo">
        <div>
          <strong>Built with PassGuard</strong> — <code style={{ color: '#38bdf8' }}>@vatza/passguard@1.0.1</code>
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
