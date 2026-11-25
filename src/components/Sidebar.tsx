import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  GraduationCap,
  Briefcase,
  Layers,
  Code,
  Mail,
  FileText,
  Menu,
  X,
  Eye,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { profileData } from '../data/profile';

export type SectionId = 'home' | 'education' | 'experience' | 'skills' | 'projects' | 'contact';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'education', label: 'Education & Certs', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills & Stack', icon: Layers },
  { id: 'projects', label: 'Selected Work', icon: Code },
  { id: 'contact', label: 'Contact', icon: Mail },
];

interface SidebarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onOpenResume: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Exact measurement refs for the scroll track
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const [trackBounds, setTrackBounds] = useState<{ start: number; end: number }>({
    start: 24,
    end: 280,
  });

  // Calculate pixel bounds of first (Home) and last (Contact) icons
  useEffect(() => {
    const updateBounds = () => {
      if (!navContainerRef.current || !navListRef.current) return;
      const listItems = navListRef.current.querySelectorAll('li');
      if (listItems.length < 2) return;

      const containerRect = navContainerRef.current.getBoundingClientRect();
      const firstItem = listItems[0].querySelector('button');
      const lastItem = listItems[listItems.length - 1].querySelector('button');

      if (firstItem && lastItem) {
        const firstRect = firstItem.getBoundingClientRect();
        const lastRect = lastItem.getBoundingClientRect();
        const startY = (firstRect.top + firstRect.height / 2) - containerRect.top;
        const endY = (lastRect.top + lastRect.height / 2) - containerRect.top;
        setTrackBounds({ start: startY, end: endY });
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, [activeSection]);

  // Track window scroll progress for smooth photon beam
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = window.scrollY / totalHeight;
        setScrollProgress(Math.min(1, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute beam height & bead position bounded between start and end
  const trackSpan = Math.max(0, trackBounds.end - trackBounds.start);
  const targetBeadTop = trackBounds.start + trackSpan * scrollProgress;
  const beadTop = Math.min(trackBounds.end, Math.max(trackBounds.start, targetBeadTop));
  const beamHeight = Math.max(0, beadTop - trackBounds.start);

  const handleItemClick = (id: SectionId, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header — Frosted Glass with Monochrome Aesthetic */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-2xl border-b border-white/10 z-50 flex items-center justify-between px-4">
        <button
          onClick={(e) => handleItemClick('home', e)}
          className="flex items-center gap-3 text-left active:scale-95 transition-transform"
        >
          {/* Mobile avatar squircle — Titanium Monochrome */}
          <div className="w-10 h-10 rounded-xl p-[2px] bg-gradient-to-tr from-white via-zinc-400 to-zinc-700 shadow-[0_0_15px_rgba(255,255,255,0.2)] flex-shrink-0 relative">
            <div className="w-full h-full rounded-[9px] bg-zinc-950 overflow-hidden relative">
              <img
                src={profileData.sidebarAvatarUrl || profileData.avatarUrl}
                alt={profileData.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-zinc-950 flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              <span className="w-1 h-1 bg-black rounded-full" />
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1">
              {profileData.name} <Sparkles className="w-3 h-3 text-zinc-300" />
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              full-stack // ai &amp; data
            </span>
          </div>
        </button>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-xl text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 active:scale-90 transition-all btn-tactile"
          aria-label="Toggle navigation drawer"
          aria-expanded={isMobileOpen}
          aria-controls="sidebar"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Fixed Sidebar — Translucent Frosted Glass with Pure Monochrome Styling */}
      <aside
        id="sidebar"
        className={`fixed top-0 bottom-0 left-0 w-72 lg:w-80 bg-black/35 lg:bg-black/25 backdrop-blur-2xl border-r border-white/10 z-40 flex flex-col p-5 transition-transform duration-300 ease-out overflow-y-auto ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* TOP: Monochrome Profile Header */}
        <div className="flex flex-col gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => handleItemClick('home', e)}
              className="flex items-center gap-3 text-left group active:scale-95 transition-transform"
            >
              {/* Titanium Monochrome Squircle Avatar with glowing white pulse */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl p-[2px] bg-gradient-to-tr from-white via-zinc-400 to-zinc-700 shadow-[0_0_20px_rgba(255,255,255,0.25)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] group-hover:scale-105 transition-all duration-300">
                  <div className="w-full h-full rounded-[13px] bg-zinc-950 overflow-hidden relative">
                    <img
                      src={profileData.sidebarAvatarUrl || profileData.avatarUrl}
                      alt={profileData.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* White status beacon */}
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full border-2 border-zinc-950 flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.9)]">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-white group-hover:text-zinc-200 transition-colors whitespace-nowrap">
                    {profileData.name}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-zinc-300 animate-pulse" />
                </div>
                <span className="text-xs font-mono text-zinc-400 font-medium">
                  @myatminkhant
                </span>
              </div>
            </button>
          </div>

          {/* Status Pill in Monochrome */}
          <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-xs text-zinc-200 font-semibold truncate">
                Available for Roles
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/10 text-white border border-white/20 flex-shrink-0">
              2026–27
            </span>
          </div>
        </div>

        {/* MIDDLE: Navigation Menu with Active Scroll Light Beam */}
        <div ref={navContainerRef} className="relative py-4 my-auto">
          {/* Subtle Rail Track (Moved well to the left with comfortable clearance) */}
          <div
            className="absolute left-[4px] w-[2px] bg-white/[0.08] rounded-full pointer-events-none"
            style={{
              top: `${trackBounds.start}px`,
              height: `${trackSpan}px`,
            }}
          />

          {/* Active Glowing Light Beam (Pure White Glow) */}
          <div
            className="absolute left-[4px] w-[2px] bg-gradient-to-b from-white via-zinc-200 to-zinc-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_14px_rgba(255,255,255,0.9)] pointer-events-none"
            style={{
              top: `${trackBounds.start}px`,
              height: `${beamHeight}px`,
            }}
          />

          {/* Active Glowing Photon Bead - Stays strictly bounded */}
          <div
            className="absolute left-[0px] w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_24px_rgba(255,255,255,0.8)] transition-all duration-150 pointer-events-none -translate-y-1/2 z-20"
            style={{
              top: `${beadTop}px`,
            }}
          >
            <span className="animate-ping absolute inset-0 rounded-full bg-white opacity-75" />
          </div>

          {/* Menu Items with comfortable typography & smooth click interactions */}
          <ul ref={navListRef} className="space-y-1.5 relative z-10 pl-5" role="list">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={(e) => handleItemClick(item.id as SectionId, e)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full group flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all text-left active:scale-[0.97] btn-tactile ${
                      isActive
                        ? 'bg-white/15 text-white border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.12)] translate-x-1'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:translate-x-1'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-white text-black shadow-sm font-bold scale-105'
                          : 'bg-white/[0.05] text-zinc-400 group-hover:text-white group-hover:bg-white/[0.10]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="truncate flex-1">{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* BOTTOM: Actions, Connect & Career Status & Availability Card */}
        <div className="pt-3 border-t border-white/10 flex flex-col gap-3 mt-auto">
          {/* View Resume CTA Button with White Shimmer */}
          <button
            onClick={() => {
              onOpenResume();
              setIsMobileOpen(false);
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.96] transition-all group btn-shimmer btn-tactile"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-black group-hover:rotate-6 transition-transform" />
              <span>View Resume</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded-md bg-black/10 text-black border border-black/20">
              <span>PDF</span>
              <Eye className="w-3.5 h-3.5 text-black" />
            </div>
          </button>

          {/* Career Status in Monochrome */}
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col gap-2.5 text-left shadow-sm">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.06]">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Career Status &amp; Availability
              </span>
            </div>

            {/* Location */}
            <div className="flex flex-col text-[11px]">
              <span className="text-zinc-500 font-mono text-[10px] uppercase font-semibold">Location</span>
              <span className="text-zinc-200 font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-white flex-shrink-0" />
                Kuala Lumpur, Malaysia
              </span>
            </div>

            {/* Work Modes */}
            <div className="flex flex-col text-[11px]">
              <span className="text-zinc-500 font-mono text-[10px] uppercase font-semibold">Work Modes</span>
              <span className="text-zinc-300 font-medium">On-site, Relocation, Remote, CONTRACT</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
