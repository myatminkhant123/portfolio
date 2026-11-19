import React from 'react';
import { ArrowUp } from 'lucide-react';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 px-4 md:px-8 border-t border-white/[0.08] bg-black/60 backdrop-blur-md text-xs sm:text-sm text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-bold text-zinc-200">{profileData.name}</span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="text-zinc-400">Full-Stack Software Engineer &amp; AI Specialist</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-zinc-500">React 18 • TypeScript • Tailwind</span>
          <button
            onClick={scrollToTop}
            className="btn-tactile p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.08]"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};
