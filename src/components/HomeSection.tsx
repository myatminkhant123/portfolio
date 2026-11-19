import React, { useState, useEffect } from 'react';
import {
  FileText,
  Code,
  Mail,
  GraduationCap,
  Rocket,
  Award,
  Building2,
  ArrowRight,
  Sparkles,
  Play,
  Check,
  Terminal,
} from 'lucide-react';
import { profileData } from '../data/profile';
import { AnimatedCharacter } from './AnimatedCharacter';

interface HomeSectionProps {
  onNavigate: (section: 'home' | 'education' | 'experience' | 'skills' | 'projects' | 'contact') => void;
  onOpenResume: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate, onOpenResume }) => {
  const roles = [
    'Full-Stack Web Architectures',
    'Agentic AI & LLM Systems',
    'Data Science & Predictive ML',
    'Modern React & TypeScript Apps',
    'End-to-End Machine Learning Pipelines',
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const [activeCodeTab, setActiveCodeTab] = useState<'workflow' | 'analytics' | 'insights'>('workflow');
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [runSuccess, setRunSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleRunCode = () => {
    setIsRunningCode(true);
    setRunSuccess(false);
    setTimeout(() => {
      setIsRunningCode(false);
      setRunSuccess(true);
      setTimeout(() => setRunSuccess(false), 3000);
    }, 800);
  };

  return (
    <div id="home" className="py-8 sm:py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-12 sm:space-y-16 animate-in fade-in duration-300">
      {/* 1. HERO MAIN BLOCK WITH YOUTHFUL & CUTE ANIMATED CHARACTER */}
      <div className="relative pt-2 sm:pt-4">
        {/* Ambient Subtle Monochrome Glow Spots */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[500px] h-[300px] bg-white/[0.03] blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[280px] bg-white/[0.02] blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/20 text-xs sm:text-sm font-semibold text-zinc-200 mb-4 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <span>Available for Roles</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 font-mono text-xs">Dec 2026 – Jan 2027</span>
            </div>

            {/* Title: MYAT MIN KHANT */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3">
              Hi, I'm{' '}
              <span className="whitespace-nowrap bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Myat Min Khant
              </span>
            </h1>

            {/* Sub-headline prioritizing Full-Stack, AI & Data Science */}
            <p className="text-base sm:text-lg text-zinc-300 font-medium mb-4">
              <span className="text-white font-bold">Full-Stack Software Engineer</span> &amp;{' '}
              <span className="text-zinc-200 font-bold">AI &amp; Data Science Specialist</span>
            </p>

            {/* Attractive "I craft..." Syntax Block (Monochrome) */}
            <div className="relative inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2 rounded-xl bg-zinc-950/80 border border-white/20 shadow-lg shadow-white/5 backdrop-blur-md mb-5 group hover:border-white/50 transition-all">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-xs sm:text-sm font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  I craft
                </span>
              </div>
              <span className="text-zinc-600 font-mono text-sm">/</span>
              <div className="flex items-center">
                <span className="text-sm sm:text-base font-bold font-mono text-white tracking-tight">
                  {roles[currentRoleIndex]}
                </span>
                <span className="inline-block w-2 h-4 bg-white animate-pulse ml-1.5 rounded-sm"></span>
              </div>
            </div>

            {/* Scholar Bio */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 max-w-xl">
              <strong className="text-white font-semibold">Albukhary Foundation Scholar</strong> (CGPA 3.53) at Albukhary International University. 
              Passionate about architecting responsive full-stack web applications, training predictive machine learning models, and building agentic AI pipelines. Actively scouting software engineering, AI, and data science roles. Let's build something exceptional. 🚀
            </p>

            {/* Action Buttons with Advanced Smoothness & Particular Click Animations */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenResume}
                className="btn-shimmer btn-tactile inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-bold text-black bg-white hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="btn-tactile inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-semibold text-zinc-100 bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 hover:border-white/50 active:scale-95 transition-all"
              >
                <Code className="w-4 h-4 text-white" />
                <span>View Projects</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="btn-tactile inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm sm:text-base font-semibold text-zinc-400 hover:text-white bg-transparent hover:bg-white/[0.06] border border-white/10 hover:border-white/30 active:scale-95 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </button>
            </div>
          </div>

          {/* Right Column: Authentic Professional Portrait with 3D Orbit & Orbiting Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
              {/* Subtle Monochrome Ambient Radial Glow */}
              <div className="absolute inset-0 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

              {/* Orbital Concentric Rings in Monochrome */}
              <div className="absolute inset-2 sm:inset-4 rounded-full border border-white/10 animate-[spin_40s_linear_infinite] pointer-events-none" />
              <div className="absolute inset-8 sm:inset-12 rounded-full border border-dashed border-white/20 animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />
              <div className="absolute inset-16 sm:inset-20 rounded-full border border-dotted border-white/15 pointer-events-none" />

              {/* Orbiting Tech Badge 1: React 18 (Top Left) */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/90 border border-white/20 shadow-lg backdrop-blur-md text-[11px] font-mono text-zinc-200">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>React 18</span>
              </div>

              {/* Orbiting Tech Badge 2: TypeScript (Top Right) */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/90 border border-white/20 shadow-lg backdrop-blur-md text-[11px] font-mono text-zinc-200">
                <Sparkles className="w-3 h-3 text-white" />
                <span>TypeScript</span>
              </div>

              {/* Orbiting Tech Badge 3: Python ML (Bottom Left) */}
              <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/90 border border-white/20 shadow-lg backdrop-blur-md text-[11px] font-mono text-zinc-200">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span>Python ML</span>
              </div>

              {/* Orbiting Tech Badge 4: Agentic AI (Bottom Right) */}
              <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/90 border border-white/20 shadow-lg backdrop-blur-md text-[11px] font-mono text-zinc-200">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Agentic AI</span>
              </div>

              {/* Center Circular Photo Frame */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-[3px] bg-gradient-to-tr from-white via-zinc-400 to-zinc-800 shadow-[0_0_35px_rgba(255,255,255,0.2)] group transition-all duration-500 hover:scale-[1.03]">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border-2 border-zinc-950 relative">
                  <img
                    src={profileData.avatarUrl}
                    alt={profileData.name}
                    className="w-full h-full object-cover object-top filter contrast-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CUTE TECH COMPANION & DEV VIBES SECTION */}
      <div className="pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 tracking-wider uppercase mb-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Tech Persona &amp; Daily Dev Vibes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Code, Coffee &amp; Agentic AI
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md">
            A playful, youthful look into my daily development rhythm, machine learning experiments, and tech guy setup.
          </p>
        </div>

        {/* 2-Column Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Card 1: Cute Animated Chibi Mascot with Interactive Thoughts */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-3xl border border-white/15 bg-zinc-950/70 backdrop-blur-xl flex flex-col items-center justify-between shadow-[0_0_30px_rgba(255,255,255,0.04)] relative group">
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Cute Tech Mascot
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/15 font-semibold">
                Click me! ✨
              </span>
            </div>

            {/* The Animated Character Component */}
            <div className="py-2 flex items-center justify-center">
              <AnimatedCharacter />
            </div>

            <div className="w-full pt-4 border-t border-white/10 flex items-center justify-around text-center text-xs font-mono text-zinc-400">
              <div>
                <span className="block text-white font-bold text-sm">3.53</span>
                <span>CGPA</span>
              </div>
              <span className="text-zinc-700">|</span>
              <div>
                <span className="block text-white font-bold text-sm">100%</span>
                <span>Caffeine</span>
              </div>
              <span className="text-zinc-700">|</span>
              <div>
                <span className="block text-white font-bold text-sm">Agentic</span>
                <span>AI Pipelines</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: High-Tech Desk & Ecosystem Artwork (Uploaded Image) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-7 rounded-3xl border border-white/15 bg-zinc-950/70 backdrop-blur-xl flex flex-col justify-between shadow-[0_0_30px_rgba(255,255,255,0.04)]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-white" />
                  Full-Stack &amp; AI Ecosystem
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-200 border border-white/15">
                  @myatminkhant setup
                </span>
              </div>

              {/* Developer Desk Illustration Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-xl group">
                <img
                  src="./tech_guy_desk.jpg"
                  alt="Software & Full-Stack Development, AI & Data Science Developer Desk"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="text-zinc-200 font-semibold bg-black/70 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                    💻 Full-Stack Web + Cloud
                  </span>
                  <span className="text-zinc-200 font-semibold bg-black/70 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                    🤖 AI &amp; Predictive ML
                  </span>
                </div>
              </div>
            </div>

            {/* Tech Guy Vibe Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 mt-2">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Workspace</span>
                <span className="text-xs font-bold text-white font-mono">VS Code + Linux</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Core Stack</span>
                <span className="text-xs font-bold text-white font-mono">React / Python</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Focus</span>
                <span className="text-xs font-bold text-white font-mono">Agentic AI &amp; BI</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Status</span>
                <span className="text-xs font-bold text-white font-mono">Ready to Build 🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. "WHO AM I?" SECTION */}
      <div className="pt-8 border-t border-white/10">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white inline-block">
            Who Am{' '}
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              I?
            </span>
          </h2>
        </div>

        {/* 2-Column Side-by-Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Story Bio + Interactive Code Editor */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              As a <strong className="text-white font-semibold">Computer Science graduate specializing in Data Science</strong>, I combine technical development with real-world business execution. From building AI-powered pipelines, deep learning classifiers, and ESP32 IoT systems to managing enterprise cloud operations at AIA Digital+, founding an on-campus print business, and organizing state-level tech events, I focus on delivering practical, high-impact solutions with a fast-learning approach and strong cross-functional communication.
            </p>

            {/* Interactive Code Editor Box (Monochrome) */}
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-zinc-950/80 backdrop-blur-md shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/10 select-none">
                {/* Traffic Light Dots in Monochrome */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-zinc-600" />
                  <span className="w-3 h-3 rounded-full bg-zinc-400" />
                  <span className="w-3 h-3 rounded-full bg-white" />
                </div>

                {/* File Tabs */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveCodeTab('workflow')}
                    className={`btn-tactile px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      activeCodeTab === 'workflow'
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    workflow.ts
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('analytics')}
                    className={`btn-tactile px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      activeCodeTab === 'analytics'
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    analytics.py
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('insights')}
                    className={`btn-tactile px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      activeCodeTab === 'insights'
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    insights.sql
                  </button>
                </div>

                {/* Run Code Button */}
                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="btn-tactile flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-semibold active:scale-95 transition-all"
                >
                  {isRunningCode ? (
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : runSuccess ? (
                    <Check className="w-3 h-3 text-white" />
                  ) : (
                    <Play className="w-3 h-3 fill-white text-white" />
                  )}
                  <span>{isRunningCode ? 'Running...' : runSuccess ? 'Success!' : 'Run Code'}</span>
                </button>
              </div>

              {/* Code Snippet Content with Line Numbers in Monochrome */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-zinc-300">
                {activeCodeTab === 'workflow' && (
                  <div className="grid grid-cols-[2rem_1fr] gap-3">
                    <div className="text-zinc-600 select-none text-right font-mono space-y-0.5">
                      {Array.from({ length: 19 }, (_, i) => (
                        <div key={i + 1}>{i + 1}</div>
                      ))}
                    </div>
                    <pre className="overflow-x-auto text-zinc-300 space-y-0.5">
                      <div><span className="text-zinc-400 font-semibold">interface</span> <span className="text-white font-bold">Developer</span> {'{'}</div>
                      <div>  <span className="text-zinc-300">specialties</span>: <span className="text-zinc-400">string</span>[];</div>
                      <div>  <span className="text-white">deploySystem</span>(<span className="text-zinc-300">rawData</span>: <span className="text-zinc-400">any</span>): <span className="text-zinc-200">Promise</span>&lt;<span className="text-zinc-400">void</span>&gt;;</div>
                      <div>{'}'}</div>
                      <div>&nbsp;</div>
                      <div><span className="text-zinc-400 font-semibold">export class</span> <span className="text-white font-bold">MyatMinKhant</span> <span className="text-zinc-400 font-semibold">implements</span> <span className="text-white font-bold">Developer</span> {'{'}</div>
                      <div>  <span className="text-zinc-300">specialties</span> = [<span className="text-zinc-100">"Data Science &amp; AI"</span>, <span className="text-zinc-100">"Cloud Operations"</span>, <span className="text-zinc-100">"Full-Stack Dev"</span>];</div>
                      <div>&nbsp;</div>
                      <div>  <span className="text-zinc-400 font-semibold">async</span> <span className="text-white">deploySystem</span>(<span className="text-zinc-300">rawData</span>: <span className="text-zinc-400">any</span>): <span className="text-zinc-200">Promise</span>&lt;<span className="text-zinc-400">void</span>&gt; {'{'}</div>
                      <div>    <span className="text-zinc-400">const</span> <span className="text-zinc-200">insights</span> = <span className="text-zinc-400">await</span> <span className="text-white">DataProcessor</span>.<span className="text-zinc-200">process</span>(<span className="text-zinc-300">rawData</span>);</div>
                      <div>    <span className="text-zinc-400">const</span> <span className="text-zinc-200">app</span> = <span className="text-zinc-400">new</span> <span className="text-white">FullStackApplication</span>(<span className="text-zinc-200">insights</span>);</div>
                      <div>&nbsp;</div>
                      <div>    <span className="text-zinc-400">await</span> <span className="text-zinc-200">app</span>.<span className="text-white">deploy</span>({'{'}</div>
                      <div>      <span className="text-zinc-300">environment</span>: <span className="text-zinc-100">"production"</span>,</div>
                      <div>      <span className="text-zinc-300">scaling</span>: <span className="text-zinc-100">"auto"</span>,</div>
                      <div>      <span className="text-zinc-300">reliability</span>: <span className="text-zinc-100">"99.9%"</span></div>
                      <div>    {'}'});</div>
                      <div>  {'}'}</div>
                      <div>{'}'}</div>
                    </pre>
                  </div>
                )}

                {activeCodeTab === 'analytics' && (
                  <div className="grid grid-cols-[2rem_1fr] gap-3">
                    <div className="text-zinc-600 select-none text-right font-mono space-y-0.5">
                      {Array.from({ length: 16 }, (_, i) => (
                        <div key={i + 1}>{i + 1}</div>
                      ))}
                    </div>
                    <pre className="overflow-x-auto text-zinc-300 space-y-0.5">
                      <div><span className="text-zinc-400">import</span> <span className="text-zinc-200">pandas</span> <span className="text-zinc-400">as</span> <span className="text-white">pd</span></div>
                      <div><span className="text-zinc-400">from</span> <span className="text-zinc-200">sklearn.ensemble</span> <span className="text-zinc-400">import</span> <span className="text-white">RandomForestClassifier</span></div>
                      <div><span className="text-zinc-400">from</span> <span className="text-zinc-200">imblearn.over_sampling</span> <span className="text-zinc-400">import</span> <span className="text-white">SMOTE</span></div>
                      <div><span className="text-zinc-400">import</span> <span className="text-white">shap</span></div>
                      <div>&nbsp;</div>
                      <div><span className="text-zinc-400">class</span> <span className="text-white font-bold">FraudDetectionPipeline</span>:</div>
                      <div>    <span className="text-zinc-400">def</span> <span className="text-white">train_and_explain</span>(<span className="text-zinc-300">self</span>, <span className="text-zinc-200">X</span>, <span className="text-zinc-200">y</span>):</div>
                      <div>        <span className="text-zinc-200">smote</span> = <span className="text-white">SMOTE</span>(<span className="text-zinc-300">sampling_strategy</span>=<span className="text-zinc-100">'auto'</span>)</div>
                      <div>        <span className="text-zinc-200">X_res</span>, <span className="text-zinc-200">y_res</span> = <span className="text-zinc-200">smote</span>.<span className="text-white">fit_resample</span>(<span className="text-zinc-200">X</span>, <span className="text-zinc-200">y</span>)</div>
                      <div>        <span className="text-zinc-300">self</span>.<span className="text-zinc-200">model</span>.<span className="text-white">fit</span>(<span className="text-zinc-200">X_res</span>, <span className="text-zinc-200">y_res</span>)</div>
                      <div>&nbsp;</div>
                      <div>        <span className="text-zinc-200">explainer</span> = <span className="text-white">shap.TreeExplainer</span>(<span className="text-zinc-300">self</span>.<span className="text-zinc-200">model</span>)</div>
                      <div>        <span className="text-zinc-200">shap_values</span> = <span className="text-zinc-200">explainer</span>.<span className="text-white">shap_values</span>(<span className="text-zinc-200">X_res</span>)</div>
                      <div>        <span className="text-zinc-400">return</span> {'{'}<span className="text-zinc-100">"accuracy"</span>: <span className="text-white">0.958</span>, <span className="text-zinc-100">"shap"</span>: <span className="text-zinc-200">shap_values</span>{'}'}</div>
                    </pre>
                  </div>
                )}

                {activeCodeTab === 'insights' && (
                  <div className="grid grid-cols-[2rem_1fr] gap-3">
                    <div className="text-zinc-600 select-none text-right font-mono space-y-0.5">
                      {Array.from({ length: 15 }, (_, i) => (
                        <div key={i + 1}>{i + 1}</div>
                      ))}
                    </div>
                    <pre className="overflow-x-auto text-zinc-300 space-y-0.5">
                      <div><span className="text-zinc-500">-- High-Performance SQL Aggregations</span></div>
                      <div><span className="text-zinc-400">WITH</span> <span className="text-white font-bold">MonthlyMetrics</span> <span className="text-zinc-400">AS</span> (</div>
                      <div>  <span className="text-zinc-400">SELECT</span> <span className="text-zinc-200">transaction_id</span>, <span className="text-zinc-200">amount</span>, <span className="text-zinc-200">status</span>,</div>
                      <div>  <span className="text-white">DATE_TRUNC</span>(<span className="text-zinc-100">'month'</span>, <span className="text-zinc-200">created_at</span>) <span className="text-zinc-400">AS</span> <span className="text-zinc-200">metric_month</span></div>
                      <div>  <span className="text-zinc-400">FROM</span> <span className="text-white">enterprise_transactions</span></div>
                      <div>  <span className="text-zinc-400">WHERE</span> <span className="text-zinc-200">created_at</span> &gt;= <span className="text-white">NOW</span>() - <span className="text-zinc-400">INTERVAL</span> <span className="text-zinc-100">'12 months'</span></div>
                      <div>)</div>
                      <div><span className="text-zinc-400">SELECT</span></div>
                      <div>  <span className="text-zinc-200">metric_month</span>,</div>
                      <div>  <span className="text-white">COUNT</span>(<span className="text-zinc-200">transaction_id</span>) <span className="text-zinc-400">AS</span> <span className="text-zinc-200">total_events</span>,</div>
                      <div>  <span className="text-white">ROUND</span>(<span className="text-white">SUM</span>(<span className="text-zinc-200">amount</span>), <span className="text-zinc-100">2</span>) <span className="text-zinc-400">AS</span> <span className="text-zinc-200">total_volume</span></div>
                      <div><span className="text-zinc-400">FROM</span> <span className="text-white">MonthlyMetrics</span></div>
                      <div><span className="text-zinc-400">GROUP BY</span> <span className="text-zinc-200">metric_month</span> <span className="text-zinc-400">ORDER BY</span> <span className="text-zinc-200">metric_month</span> <span className="text-zinc-400">DESC</span>;</div>
                    </pre>
                  </div>
                )}

                {/* Simulated Live Execution Output Banner */}
                {runSuccess && (
                  <div className="mt-4 pt-3 border-t border-white/20 text-white font-mono text-xs flex items-center gap-2 animate-in fade-in duration-200">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>✔ Compiled in 12ms • All systems operational • Deployed: 99.9% uptime</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Academic & Tech Journey (Timeline in Monochrome) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Academic &amp; Tech Journey
            </h3>

            {/* Vertical Connected Timeline in Pure Monochrome */}
            <div className="relative pl-8 space-y-8 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-white before:via-zinc-400 before:to-zinc-700">
              {/* Event 1 */}
              <div className="relative group">
                <div className="absolute -left-8 top-1 w-7 h-7 rounded-full bg-zinc-950 border-2 border-white flex items-center justify-center text-white shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                    OCT 2022 – SEP 2023
                  </span>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    Foundation in Computing (CGPA 3.27)
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                    Albukhary International University (AIU). Built core fundamentals in programming, mathematics, databases, and front-end development.
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative group">
                <div className="absolute -left-8 top-1 w-7 h-7 rounded-full bg-zinc-950 border-2 border-white flex items-center justify-center text-white shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                    OCT 2023 – NOV 2026
                  </span>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    Bachelor of Computer Science (Honours) (CGPA 3.53)
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                    Albukhary International University (AIU). Albukhary Foundation Fully Funded Scholarship Recipient. Specializing in Data Science &amp; Machine Learning.
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative group">
                <div className="absolute -left-8 top-1 w-7 h-7 rounded-full bg-zinc-950 border-2 border-zinc-400 flex items-center justify-center text-zinc-300 shadow-[0_0_12px_rgba(255,255,255,0.2)]">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                    APR 2026 – OCT 2026
                  </span>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    Cloud Operations Intern @ AIA Digital+
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                    Supported MySQL &amp; MS SQL Server DB operations, Linux/Windows infrastructure patching, and enterprise tools (Azure, ServiceNow, Dynatrace, CyberArk).
                  </p>
                </div>
              </div>

              {/* Event 4 */}
              <div className="relative group">
                <div className="absolute -left-8 top-1 w-7 h-7 rounded-full bg-zinc-950 border-2 border-white flex items-center justify-center text-white shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                    DEC 2026 / JAN 2027
                  </span>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    Available for New Opportunities
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                    Open to Full-Stack Software Engineering, AI/LLM Systems, and Data Science roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MILESTONES & ACHIEVEMENTS in Monochrome */}
      <div className="pt-8 border-t border-white/10">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 tracking-wider uppercase mb-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Verified Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Milestones &amp; Achievements
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between glass-panel-hover active:scale-[0.98] transition-all btn-tactile">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-3xl font-extrabold font-mono text-white mb-1">3.53</div>
              <h3 className="text-sm sm:text-base font-bold text-white">CGPA Academic Honor</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              Consistently ranked in the top percentile of the CS cohort at AIU.
            </p>
          </div>

          <div
            onClick={() => onNavigate('education')}
            className="glass-panel p-5 rounded-2xl flex flex-col justify-between glass-panel-hover cursor-pointer group active:scale-[0.98] transition-all btn-tactile"
          >
            <div>
              <div className="text-3xl mb-2">📜</div>
              <div className="text-3xl font-extrabold font-mono text-white mb-1">3+</div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                  Certifications Earned
                </h3>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              IBM Data Science, DeepLearning.AI, and TechNexus Bootcamp.
            </p>
          </div>

          <div
            onClick={() => onNavigate('projects')}
            className="glass-panel p-5 rounded-2xl flex flex-col justify-between glass-panel-hover cursor-pointer group active:scale-[0.98] transition-all btn-tactile"
          >
            <div>
              <div className="text-3xl mb-2">📁</div>
              <div className="text-3xl font-extrabold font-mono text-white mb-1">8</div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                  Completed Projects
                </h3>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              Featuring KCC, AIU Postgraduate, IoT Greenhouse &amp; NLP pipelines.
            </p>
          </div>

          <div
            onClick={() => onNavigate('experience')}
            className="glass-panel p-5 rounded-2xl flex flex-col justify-between glass-panel-hover cursor-pointer group active:scale-[0.98] transition-all btn-tactile"
          >
            <div>
              <div className="text-3xl mb-2">👔</div>
              <div className="text-3xl font-extrabold font-mono text-white mb-1">1</div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                  Enterprise Experience
                </h3>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              Cloud Operations Intern at AIA Digital+ supporting hybrid systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
