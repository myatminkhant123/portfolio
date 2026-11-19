import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, Code2, Cpu, GraduationCap } from 'lucide-react';

const CUTE_QUOTES = [
  "Building smart AI & full-stack apps! (๑•̀ㅂ•́)و✧",
  "Albukhary Scholar • CGPA 3.53 🎓",
  "Turning caffeine into clean code ☕💻",
  "Specializing in Data Science & LLMs 🤖",
  "AIA Digital+ Cloud Intern ☁️",
  "Let's create something exceptional! 🚀",
];

export const AnimatedCharacter: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isWinking, setIsWinking] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  // Cycle cute quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % CUTE_QUOTES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleCharacterClick = () => {
    setIsWinking(true);
    setShowSparkles(true);
    setQuoteIndex((prev) => (prev + 1) % CUTE_QUOTES.length);
    setTimeout(() => setIsWinking(false), 900);
    setTimeout(() => setShowSparkles(false), 1200);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Interactive Cute Thought / Speech Bubble */}
      <div
        onClick={handleCharacterClick}
        className="mb-3 px-4 py-2 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.08)] cursor-pointer group hover:border-white/50 hover:scale-105 transition-all text-center max-w-[280px] sm:max-w-[320px] relative select-none"
      >
        <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-medium text-zinc-200">
          <Sparkles className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '6s' }} />
          <span>{CUTE_QUOTES[quoteIndex]}</span>
        </div>
        {/* Thought bubble pointer */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-950 border-r border-b border-white/20 rotate-45" />
      </div>

      {/* Main Container with 3D Rings & Badges */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* Animated Monochrome Halo Orbit Rings */}
        <div className="absolute inset-0 rounded-full border border-white/15 animate-[spin_24s_linear_infinite] pointer-events-none" />
        <div className="absolute inset-4 rounded-full border border-dashed border-white/20 animate-[spin_32s_linear_infinite_reverse] pointer-events-none" />
        <div className="absolute inset-8 rounded-full border border-dotted border-white/10 pointer-events-none" />
        <div className="absolute inset-0 bg-white/[0.03] rounded-full blur-2xl -z-10" />

        {/* Center Display: Cute Chibi Tech Developer */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full p-[2px] bg-gradient-to-tr from-white via-zinc-400 to-zinc-700 shadow-[0_0_35px_rgba(255,255,255,0.18)] relative overflow-hidden group">
          <div className="w-full h-full rounded-full bg-zinc-950 overflow-hidden relative flex items-center justify-center">
            {/* Youthful & Cute Chibi Developer Character */}
            <div
              onClick={handleCharacterClick}
              className="w-full h-full relative cursor-pointer select-none animate-float-gentle flex items-center justify-center"
              title="Click me for a cute wink! ✨"
            >
              {/* Background Tech Code Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

              {/* Vector Cute Anime Tech Character (SVG) */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
              >
                <defs>
                  <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#27272a" />
                    <stop offset="50%" stopColor="#18181b" />
                    <stop offset="100%" stopColor="#09090b" />
                  </linearGradient>
                  <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e4e4e7" />
                  </linearGradient>
                  <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#18181b" />
                    <stop offset="100%" stopColor="#09090b" />
                  </linearGradient>
                  <linearGradient id="headphoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#71717a" />
                  </linearGradient>
                </defs>

                {/* Character Body / Oversized Tech Hoodie */}
                <path
                  d="M 55 170 Q 50 140 75 130 Q 100 126 125 130 Q 150 140 145 170 Z"
                  fill="url(#hoodieGrad)"
                  stroke="#3f3f46"
                  strokeWidth="2"
                />

                {/* Hoodie Drawstrings with Metallic White Tips */}
                <path d="M 88 135 L 86 155" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 112 135 L 114 155" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="86" cy="155" r="1.5" fill="#ffffff" />
                <circle cx="114" cy="155" r="1.5" fill="#ffffff" />

                {/* Mini MMK Logo Badge on Hoodie */}
                <rect x="91" y="142" width="18" height="8" rx="2" fill="#27272a" stroke="#71717a" strokeWidth="0.8" />
                <text x="100" y="148" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
                  MMK
                </text>

                {/* Chibi Head & Cheeks */}
                <ellipse cx="100" cy="98" rx="42" ry="38" fill="url(#skinGrad)" />

                {/* Cute Rosy Blushing Cheeks (Visible or enhanced when clicked) */}
                <ellipse
                  cx="72"
                  cy="106"
                  rx={isWinking ? "9" : "6"}
                  ry="4"
                  fill="#ffffff"
                  opacity={isWinking ? "0.6" : "0.25"}
                  className="transition-all"
                />
                <ellipse
                  cx="128"
                  cy="106"
                  rx={isWinking ? "9" : "6"}
                  ry="4"
                  fill="#ffffff"
                  opacity={isWinking ? "0.6" : "0.25"}
                  className="transition-all"
                />

                {/* Cute Anime Mouth: smiling curve */}
                {isWinking ? (
                  <path d="M 94 112 Q 100 120 106 112 Z" fill="#27272a" />
                ) : (
                  <path d="M 94 112 Q 100 117 106 112" stroke="#27272a" strokeWidth="2" strokeLinecap="round" fill="none" />
                )}

                {/* Eyes: Expressive Big Anime Eyes or Winking */}
                {isWinking ? (
                  // Right eye winks (^ _ ~)
                  <>
                    {/* Left Eye: Open Sparkle */}
                    <ellipse cx="78" cy="96" rx="8" ry="10" fill="#18181b" />
                    <circle cx="76" cy="93" r="3.5" fill="#ffffff" />
                    <circle cx="81" cy="98" r="1.5" fill="#ffffff" />
                    {/* Right Eye: Cute Wink Arc */}
                    <path d="M 114 96 Q 122 89 130 96" stroke="#18181b" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                  </>
                ) : (
                  // Normal Blinking Eyes
                  <g className="animate-eye-blink origin-[100px_96px]">
                    {/* Left Eye */}
                    <ellipse cx="78" cy="96" rx="8.5" ry="11" fill="#18181b" />
                    <circle cx="76" cy="93" r="4" fill="#ffffff" />
                    <circle cx="81" cy="99" r="1.8" fill="#ffffff" />
                    <ellipse cx="78" cy="103" rx="4" ry="1" fill="#71717a" opacity="0.4" />

                    {/* Right Eye */}
                    <ellipse cx="122" cy="96" rx="8.5" ry="11" fill="#18181b" />
                    <circle cx="120" cy="93" r="4" fill="#ffffff" />
                    <circle cx="125" cy="99" r="1.8" fill="#ffffff" />
                    <ellipse cx="122" cy="103" rx="4" ry="1" fill="#71717a" opacity="0.4" />
                  </g>
                )}

                {/* Hair: Stylized Fluffy Anime Developer Hair */}
                <path
                  d="M 58 88 Q 50 56 80 46 Q 102 38 125 46 Q 150 56 142 88 Q 135 62 118 64 Q 100 58 82 64 Q 65 62 58 88 Z"
                  fill="url(#hairGrad)"
                />
                {/* Bangs (Fringe) */}
                <path d="M 68 76 Q 80 92 88 78 Q 98 94 110 78 Q 120 90 132 76 Q 120 70 100 68 Q 80 70 68 76 Z" fill="url(#hairGrad)" />

                {/* Tech Gaming Headphones (Over-Ear with white LED glow ring) */}
                {/* Headband */}
                <path d="M 58 92 A 44 44 0 0 1 142 92" stroke="url(#headphoneGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
                {/* Left Ear Cushion & LED Ring */}
                <rect x="52" y="82" width="10" height="24" rx="5" fill="#18181b" stroke="#ffffff" strokeWidth="1.2" />
                <circle cx="57" cy="94" r="3" fill="#ffffff" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="57" cy="94" r="2" fill="#ffffff" />
                {/* Right Ear Cushion & LED Ring */}
                <rect x="138" y="82" width="10" height="24" rx="5" fill="#18181b" stroke="#ffffff" strokeWidth="1.2" />
                <circle cx="143" cy="94" r="3" fill="#ffffff" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="143" cy="94" r="2" fill="#ffffff" />

                {/* Ultra-Slim Laptop with Typing Hands */}
                <g className="animate-cute-typing origin-[100px_165px]">
                  {/* Laptop Base */}
                  <rect x="68" y="160" width="64" height="6" rx="2" fill="#27272a" stroke="#71717a" strokeWidth="1" />
                  {/* Glowing Screen back */}
                  <path d="M 72 160 L 78 132 L 122 132 L 128 160 Z" fill="#18181b" stroke="#52525b" strokeWidth="1" />
                  {/* Apple/Tech glowing logo on back of laptop */}
                  <circle cx="100" cy="144" r="3.5" fill="#ffffff" />
                  <polygon points="100,137 101.5,140 100,141 98.5,140" fill="#ffffff" />

                  {/* Cute Chibi Hands typing on keyboard */}
                  <circle cx="84" cy="158" r="5" fill="url(#skinGrad)" stroke="#3f3f46" strokeWidth="0.8" />
                  <circle cx="116" cy="158" r="5" fill="url(#skinGrad)" stroke="#3f3f46" strokeWidth="0.8" />
                </g>

                {/* Floating Code Symbols around the character */}
                <g opacity="0.85">
                  <text x="35" y="65" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace" className="animate-bounce" style={{ animationDuration: '3s' }}>
                    &lt;/&gt;
                  </text>
                  <text x="150" y="68" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="monospace" className="animate-bounce" style={{ animationDuration: '3.6s', animationDelay: '0.8s' }}>
                    &#123;&#125;
                  </text>
                  <text x="42" y="130" fontSize="8" fontWeight="bold" fill="#a1a1aa" fontFamily="monospace">
                    ✦
                  </text>
                  <text x="152" y="125" fontSize="9" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
                    01
                  </text>
                </g>
              </svg>

              {/* Sparkles Burst Animation when Clicked */}
              {showSparkles && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="absolute top-6 left-10 text-white text-base animate-ping">✨</div>
                  <div className="absolute top-10 right-10 text-white text-lg animate-ping">⭐</div>
                  <div className="absolute bottom-12 left-8 text-white text-sm animate-ping">✦</div>
                  <div className="absolute bottom-10 right-8 text-white text-base animate-ping">✨</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating 3D Technology Badges (Monochrome Black & White) */}
        <div
          className="absolute top-0 left-0 px-2.5 py-1 rounded-xl bg-zinc-950/90 border border-white/20 text-xs font-mono text-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-1.5 animate-bounce"
          style={{ animationDuration: '4.5s' }}
        >
          <Code2 className="w-3.5 h-3.5 text-white" />
          <span>React 18</span>
        </div>

        <div
          className="absolute top-6 right-0 px-2.5 py-1 rounded-xl bg-zinc-950/90 border border-white/20 text-xs font-mono text-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-1.5 animate-bounce"
          style={{ animationDuration: '5.2s', animationDelay: '1s' }}
        >
          <Terminal className="w-3.5 h-3.5 text-white" />
          <span>TypeScript</span>
        </div>

        <div
          className="absolute bottom-4 left-0 px-2.5 py-1 rounded-xl bg-zinc-950/90 border border-white/20 text-xs font-mono text-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-1.5 animate-bounce"
          style={{ animationDuration: '4.8s', animationDelay: '2s' }}
        >
          <Cpu className="w-3.5 h-3.5 text-white" />
          <span>Python AI</span>
        </div>

        <div
          className="absolute bottom-3 right-0 px-2.5 py-1 rounded-xl bg-zinc-950/90 border border-white/20 text-xs font-mono text-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-1.5 animate-bounce"
          style={{ animationDuration: '5.6s', animationDelay: '1.5s' }}
        >
          <GraduationCap className="w-3.5 h-3.5 text-white" />
          <span>CGPA 3.53</span>
        </div>
      </div>
    </div>
  );
};
