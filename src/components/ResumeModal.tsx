import React, { useEffect } from 'react';
import { X, Download, FileText, ExternalLink } from 'lucide-react';
import { profileData } from '../data/profile';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="glass-panel w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-white/[0.12] bg-zinc-950/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-7 py-4 bg-zinc-900/95 border-b border-white/[0.08] flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 id="resume-modal-title" className="text-base sm:text-lg font-bold text-white truncate">
                Curriculum Vitae &mdash; {profileData.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono truncate">
                Full-Stack Software Engineer &amp; AI Specialist
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Direct Download */}
            <a
              href={profileData.resumeUrl}
              download="CV_MMK.pdf"
              className="btn-shimmer btn-tactile inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.25)]"
              title="Download PDF"
            >
              <Download className="w-4 h-4 text-black" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* Optional open in new tab */}
            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile p-2.5 rounded-xl text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="btn-tactile p-2.5 rounded-xl text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Embed Viewer */}
        <div className="flex-1 w-full h-full bg-zinc-900/50 relative overflow-hidden">
          <iframe
            src={`${profileData.resumeUrl}#toolbar=1&view=FitH`}
            className="w-full h-full border-none"
            title="Curriculum Vitae Viewer"
          />
        </div>
      </div>
    </div>
  );
};
