import React, { useState } from 'react';
import {
  PasswordInput,
  PasswordStrengthIndicator,
  RequirementChecklist,
  SuggestionCard,
  PasswordSecurityCard,
  usePasswordAnalysis,
  defaultPasswordPolicy,
  type PasswordPolicy,
} from '../../index';
import {
  Shield,
  Lock,
  Mail,
  User,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Code,
  KeyRound,
  Check,
  RefreshCw,
  Copy,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
  Eye,
  LogIn,
  UserPlus,
  Sliders,
  Terminal,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  // Navigation tab state: 'login' | 'signup' | 'inspector'
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'inspector'>('login');

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('developer@passguard.io');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showLoginInsights, setShowLoginInsights] = useState(true);
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  // Signup Form States
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSubmitted, setSignupSubmitted] = useState(false);

  // Custom Policy State for Inspector & Testing
  const [customPolicy, setCustomPolicy] = useState<PasswordPolicy>({ ...defaultPasswordPolicy });
  const [inspectorPassword, setInspectorPassword] = useState('P@ssw0rd2026!');
  const [jsonCopied, setJsonCopied] = useState(false);

  // Real-time analysis of Login Password using the npm package hook
  const loginAnalysis = usePasswordAnalysis(loginPassword, defaultPasswordPolicy);

  // Real-time analysis for Inspector tab
  const inspectorAnalysis = usePasswordAnalysis(inspectorPassword, customPolicy);

  // Preset Passwords for 1-click testing
  const presets = [
    { label: 'Very Weak', value: '123456', badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { label: 'Common Breach', value: 'password123', badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    { label: 'Keyboard Pattern', value: 'qwertyuiop', badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { label: 'Moderate', value: 'P@ssw0rd2026!', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { label: 'Enterprise Strong', value: 'K9#vL!9$mP2@xZ7wQ', badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  ];

  const handleApplyPreset = (value: string) => {
    if (activeTab === 'login') {
      setLoginPassword(value);
    } else if (activeTab === 'inspector') {
      setInspectorPassword(value);
    } else {
      setSignupPassword(value);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSubmitted(true);
    setTimeout(() => {
      setLoginSubmitted(false);
    }, 4000);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupSubmitted(true);
    setTimeout(() => {
      setSignupSubmitted(false);
    }, 4000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(inspectorAnalysis, null, 2));
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 2000);
  };

  const togglePolicyFlag = (key: keyof PasswordPolicy) => {
    setCustomPolicy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white pb-20">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header Navigation */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                PassGuard <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/60 font-mono">@vatza/passguard</span>
              </span>
            </div>
          </div>

          {/* Navigation View Switcher */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'login'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              Simple Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'signup'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Sign Up Card
            </button>
            <button
              onClick={() => setActiveTab('inspector')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'inspector'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Package Inspector
            </button>
          </div>
        </div>
      </header>

      {/* Preset Quick Tester Toolbar */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Test Package Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handleApplyPreset(preset.value)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all hover:scale-105 active:scale-95 ${preset.badgeColor}`}
                title={`Test password: "${preset.value}"`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: SIMPLE LOGIN PAGE */}
        {activeTab === 'login' && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Sign in to your account with real-time password analyzer protection.
              </p>
            </div>

            {/* Login Card */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

              {loginSubmitted && (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs space-y-2 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sign In Attempt Submitted!
                  </div>
                  <p>Tested `@vatza/passguard` password analyzer output:</p>
                  <div className="font-mono text-[11px] bg-slate-950 p-2 rounded border border-emerald-900/50 space-y-0.5">
                    <div>Score: {loginAnalysis.score}/100 ({loginAnalysis.status})</div>
                    <div>Entropy: {loginAnalysis.entropy} bits</div>
                    <div>Crack Time: {loginAnalysis.crackTime}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      placeholder="you@domain.com"
                      className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Password Input using npm package PasswordInput */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  <PasswordInput
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password..."
                  />

                  {/* Real-time Strength Indicator bar right inside login */}
                  {loginPassword && (
                    <div className="pt-2 space-y-2">
                      <PasswordStrengthIndicator
                        score={loginAnalysis.score}
                      />

                      {/* Expandable Analysis Drawer */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setShowLoginInsights(!showLoginInsights)}
                          className="flex items-center justify-between w-full text-[11px] font-medium text-slate-400 hover:text-slate-200 transition-colors py-1"
                        >
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            Package Insights: <strong className="text-slate-200">{loginAnalysis.crackTime} crack time</strong>
                          </span>
                          {showLoginInsights ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {showLoginInsights && (
                          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2.5 text-xs">
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                                <span className="text-slate-400 block text-[10px]">Score</span>
                                <span className="font-bold text-white font-mono">{loginAnalysis.score} / 100</span>
                              </div>
                              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                                <span className="text-slate-400 block text-[10px]">Entropy</span>
                                <span className="font-bold text-white font-mono">{loginAnalysis.entropy} bits ({loginAnalysis.complexity})</span>
                              </div>
                            </div>

                            {/* Warnings if common or pattern match */}
                            {loginAnalysis.commonPassword.isCommon && (
                              <div className="flex items-start gap-1.5 p-2 rounded bg-red-950/50 border border-red-900/60 text-red-300 text-[11px]">
                                <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                                <span>{loginAnalysis.commonPassword.message}</span>
                              </div>
                            )}

                            {loginAnalysis.patterns.length > 0 && (
                              <div className="flex items-start gap-1.5 p-2 rounded bg-amber-950/50 border border-amber-900/60 text-amber-300 text-[11px]">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                <span>Detected pattern: {loginAnalysis.patterns.map((p) => p.type).join(', ')}</span>
                              </div>
                            )}

                            {/* Requirement checklist summary */}
                            <RequirementChecklist rules={loginAnalysis.rules.map((r) => ({ label: r.label, completed: r.passed }))} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500"
                    />
                    Remember login session
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 text-sm active:scale-98"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              </form>

              <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
                Don't have an account?{' '}
                <button
                  onClick={() => setActiveTab('signup')}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Create Account with PassGuard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SIGN UP WITH FULL PASSGUARD SECURITY CARD */}
        {activeTab === 'signup' && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Create your Account
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Testing full <code className="text-blue-400 bg-slate-900 px-1.5 py-0.5 rounded font-mono">&lt;PasswordSecurityCard /&gt;</code> integration.
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
              {signupSubmitted && (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs space-y-1.5 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Account Created Successfully!
                  </div>
                  <p>Full PassGuard Security Card validation succeeded.</p>
                </div>
              )}

              <form onSubmit={handleSignupSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        required
                        placeholder="John Doe"
                        className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        placeholder="john@example.com"
                        className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Integrated PasswordSecurityCard Component */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Set Security Password</label>
                  <PasswordSecurityCard
                    value={signupPassword}
                    onChange={(val) => setSignupPassword(val)}
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Confirm Password</label>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password to confirm..."
                  />
                  {confirmPassword && (
                    <div className="text-xs pt-1 flex items-center gap-1.5">
                      {confirmPassword === signupPassword ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Passwords match
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> Passwords do not match
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!signupPassword || confirmPassword !== signupPassword}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 text-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: PACKAGE INSPECTOR & PLAYGROUND */}
        {activeTab === 'inspector' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Npm Package Intelligence Inspector
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Inspect raw outputs returned by <code className="text-blue-400 bg-slate-900 px-1.5 py-0.5 rounded font-mono">usePasswordAnalysis()</code> under custom security policies.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Configurator & Tester */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <KeyRound className="w-4 h-4 text-blue-400" /> Test Password Input
                  </h2>

                  <PasswordInput
                    value={inspectorPassword}
                    onChange={(e) => setInspectorPassword(e.target.value)}
                    placeholder="Type any test string..."
                  />

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>Policy Minimum Length</span>
                      <span className="text-blue-400 font-mono">{customPolicy.minLength} chars</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="32"
                      value={customPolicy.minLength}
                      onChange={(e) =>
                        setCustomPolicy((prev) => ({ ...prev, minLength: parseInt(e.target.value, 10) }))
                      }
                      className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Policy Flag Toggles */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800">
                    <span className="text-xs font-semibold text-slate-300 block">Security Engine Flags</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        { key: 'requireUppercase', label: 'Require Uppercase' },
                        { key: 'requireLowercase', label: 'Require Lowercase' },
                        { key: 'requireNumber', label: 'Require Number' },
                        { key: 'requireSymbol', label: 'Require Symbol' },
                        { key: 'checkCommonPasswords', label: 'Common Password Database' },
                        { key: 'preventSequentialPatterns', label: 'Sequential Pattern Check' },
                        { key: 'preventKeyboardPatterns', label: 'Keyboard Pattern Check' },
                        { key: 'preventRepeatedCharacters', label: 'Repeated Char Check' },
                      ].map((flag) => {
                        const isChecked = !!customPolicy[flag.key as keyof PasswordPolicy];
                        return (
                          <button
                            key={flag.key}
                            type="button"
                            onClick={() => togglePolicyFlag(flag.key as keyof PasswordPolicy)}
                            className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all ${
                              isChecked
                                ? 'bg-blue-950/40 border-blue-800/60 text-blue-300'
                                : 'bg-slate-950 border-slate-800/60 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span className="text-[11px] font-medium">{flag.label}</span>
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${
                                isChecked ? 'bg-blue-400 shadow-sm shadow-blue-400' : 'bg-slate-700'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Rendered Component Preview */}
                <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" /> Package UI Component Preview
                  </h2>
                  <SuggestionCard description={inspectorAnalysis.suggestion.message} expectedScore={inspectorAnalysis.suggestion.expectedScore} />
                  <RequirementChecklist rules={inspectorAnalysis.rules.map((r) => ({ label: r.label, completed: r.passed }))} />
                </div>
              </div>

              {/* Right Column: JSON Output Inspector */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Code className="w-4 h-4 text-blue-400" /> Output JSON Data
                    </h2>
                    <button
                      type="button"
                      onClick={handleCopyJson}
                      className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                    >
                      {jsonCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {jsonCopied ? 'Copied!' : 'Copy JSON'}
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-800 max-h-[500px] leading-relaxed">
                    {JSON.stringify(inspectorAnalysis, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LoginPage;
