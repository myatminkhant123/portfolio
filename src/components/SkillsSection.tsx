import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Code2,
  BrainCircuit,
  Database,
  Briefcase,
  Terminal,
  Cloud,
  ChevronDown,
  Search,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { specificToolsData, skillCategoriesData, SpecificTool } from '../data/skills';

export const SkillsSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedToolId, setSelectedToolId] = useState<string>('python');

  // Category Icon Resolver in Monochrome
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-white" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-white" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-white" />;
      case 'Database':
        return <Database className="w-5 h-5 text-white" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-white" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-white" />;
      default:
        return <Cpu className="w-5 h-5 text-white" />;
    }
  };

  // Authentic Official Brand Icons in Full Vibrant Colors
  const renderToolIcon = (iconType: string) => {
    switch (iconType) {
      case 'python':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#3776AB" d="M11.91 2c-5.07 0-4.75 2.19-4.75 2.19l.01 2.27h4.82v.69H5.16S2 6.78 2 11.93c0 5.14 2.76 4.95 2.76 4.95h1.65v-2.31s-.09-2.76 2.71-2.76h4.66s2.61.04 2.61-2.52V4.52S16.98 2 11.91 2zm-2.59 1.48c.45 0 .82.37.82.82 0 .45-.37.82-.82.82-.45 0-.82-.37-.82-.82 0-.45.37-.82.82-.82z" />
            <path fill="#FFD438" d="M12.09 22c5.07 0 4.75-2.19 4.75-2.19l-.01-2.27h-4.82v-.69h6.83s3.16.42 3.16-4.73c0-5.14-2.76-4.95-2.76-4.95h-1.65v2.31s.09 2.76-2.71 2.76h-4.66s-2.61-.04-2.61 2.52v4.74S7.02 22 12.09 22zm2.59-1.48c-.45 0-.82-.37-.82-.82 0-.45.37-.82.82-.82.45 0 .82.37.82.82 0 .45-.37.82-.82.82z" />
          </svg>
        );
      case 'java':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#5382A1" d="M8.85 16.84c0 .08.06.14.15.14.41.05.82.08 1.25.08 1.29 0 2.49-.3 3.49-.83.35-.19.46-.62.24-.96-.19-.3-.59-.39-.93-.24-.8.42-1.78.65-2.8.65-.33 0-.66-.02-.97-.06-.23-.03-.43.12-.43.34v.88zm8.68-4.22c-.19-.35-.61-.47-.96-.28-.35.19-.47.62-.28.97.45.82.68 1.72.68 2.69 0 1.94-.96 3.75-2.58 4.85-.33.22-.41.67-.19 1 .22.33.67.41 1 .19 1.97-1.34 3.14-3.53 3.14-5.88 0-1.18-.28-2.27-.81-3.26v-.28z" />
            <path fill="#ED8B00" d="M10.87 2.05c-.35.65-.7 1.34-1.05 2.05.41.44.82.88 1.26 1.32.32-.47.64-.93.96-1.4-.39-.66-.78-1.31-1.17-1.97zm2.52 1.34c-.28.53-.56 1.06-.84 1.59.39.38.78.75 1.18 1.13.26-.38.52-.76.78-1.14-.37-.53-.74-1.05-1.12-1.58z" />
            <path fill="#5382A1" d="M4 19.5c3.2 1.5 8.8 1.5 12 0 .5-.2.5-.8 0-1-3.2-1.5-8.8-1.5-12 0-.5.2-.5.8 0 1z" />
          </svg>
        );
      case 'javascript':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="4" fill="#F7DF1E" />
            <path fill="#000000" d="M12.5 16.5c0 1.2-.8 1.9-2.1 1.9-.9 0-1.6-.4-2-1l1-1c.3.4.6.6 1 .6.4 0 .7-.2.7-.6V11h1.4v5.5zm6.8-2.3c0 2.2-1.3 3.3-3.4 3.3-1.5 0-2.6-.7-3.1-1.7l1.2-1c.4.7 1 1.2 1.9 1.2.9 0 1.6-.5 1.6-1.3 0-.8-.5-1.2-1.6-1.7-1.8-.7-2.7-1.5-2.7-3 0-1.9 1.4-3.1 3.2-3.1 1.3 0 2.2.5 2.8 1.4l-1.2 1c-.3-.5-.8-.8-1.5-.8-.8 0-1.4.5-1.4 1.2 0 .7.4 1 1.6 1.5 1.8.8 2.6 1.6 2.6 3z" />
          </svg>
        );
      case 'typescript':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="4" fill="#3178C6" />
            <path fill="#ffffff" d="M11.5 8.5H5.5V10h2.2v8h1.6v-8h2.2V8.5zm4.8 5.7c0-.8-.5-1.3-1.6-1.7-.8-.3-1.2-.5-1.2-.9 0-.4.3-.6.9-.6.6 0 1.2.3 1.5.7l1.1-.9c-.6-.7-1.5-1.1-2.6-1.1-1.6 0-2.6.9-2.6 2.1 0 .9.6 1.5 1.7 1.9.8.3 1.1.5 1.1.9 0 .4-.4.7-1 .7-.7 0-1.4-.4-1.8-1l-1.1.9c.6 1 1.6 1.4 2.8 1.4 1.7 0 2.8-.9 2.8-2.4z" />
          </svg>
        );
      case 'react':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <ellipse cx="12" cy="12" rx="4" ry="11" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="4" ry="11" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
            <ellipse cx="12" cy="12" rx="4" ry="11" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
            <circle cx="12" cy="12" r="2" fill="#61DAFB" />
          </svg>
        );
      case 'nodejs':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#539E43" d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.3L4.9 8.4v7.7L12 20.3l7.1-4.2V8.4L12 4.3zm-1.5 5.5h3v1.8h-3V9.8zm0 3.2h3v4.5h-3V13z" />
          </svg>
        );
      case 'docker':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 5.43h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.955-5.43h2.119a.186.186 0 00.185-.186V3.574a.186.186 0 00-.185-.185H8.074a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.186m0 5.43h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H8.074a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.955 0h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H5.12a.185.185 0 00-.186.185v1.888c0 .102.083.185.186.185m0-2.714h2.119a.186.186 0 00.186-.186V6.279a.186.186 0 00-.186-.185H5.12a.185.185 0 00-.186.185v1.888c0 .102.083.186.186.186m5.91 0h2.118a.186.186 0 00.186-.186V6.279a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m-2.955 0h2.119a.186.186 0 00.185-.186V6.279a.186.186 0 00-.185-.185H8.074a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m15.068 2.015c-.426-.296-1.39-.427-2.1-.213-.198-.946-.867-1.493-1.66-1.503-.133-.001-.266.012-.397.04-1.077.23-1.564 1.144-1.745 1.838H1.365a.682.682 0 00-.682.683c0 1.258.267 2.49.774 3.593 1.267 2.748 3.82 4.412 6.96 4.412 5.485 0 9.873-3.23 11.233-8.257 1.05.074 2.072-.34 2.502-.593z" />
          </svg>
        );
      case 'mongodb':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#47A248" d="M12 2C11.5 2 7 8.5 7 14c0 3.5 2.5 7 5 8 2.5-1 5-4.5 5-8 0-5.5-4.5-12-5-12zm0 18c-1.5-.7-3-3.2-3-6 0-3.3 2.5-7.5 3-9.5.5 2 3 6.2 3 9.5 0 2.8-1.5 5.3-3 6z" />
          </svg>
        );
      case 'sql':
      case 'database':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#00758F" d="M12 3c-4.4 0-8 1.3-8 3v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6c0-1.7-3.6-3-8-3zm0 2c3.9 0 6 1.1 6 1s-2.1 1-6 1-6-.1-6-1 2.1-1 6-1zm6 13c0 .1-2.1 1-6 1s-6-.9-6-1v-2.2c1.6.8 3.7 1.2 6 1.2s4.4-.4 6-1.2V18zm0-4c0 .1-2.1 1-6 1s-6-.9-6-1v-2.2c1.6.8 3.7 1.2 6 1.2s4.4-.4 6-1.2V14z" />
          </svg>
        );
      case 'linux':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#FCC624" d="M12 2C9.5 2 8 4 8 7v4c0 1.5-.5 2.5-1.5 3-.5.2-.5.8 0 1 1 .3 2 .3 3-.2V13c.5.5 1.5 1 2.5 1s2-.5 2.5-1v1.8c1 .5 2 .5 3 .2.5-.2.5-.8 0-1-1-.5-1.5-1.5-1.5-3V7c0-3-1.5-5-4-5z" />
            <circle cx="10.5" cy="6.5" r="1" fill="#000000" />
            <circle cx="13.5" cy="6.5" r="1" fill="#000000" />
            <polygon points="12,8 10.5,10 13.5,10" fill="#FFA500" />
          </svg>
        );
      case 'git':
      case 'github':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#F05032" d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.6 4.8l2.6 2.6c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l2.5 2.5c.6-.2 1.3 0 1.8.5.8.8.8 2 0 2.8s-2 .8-2.8 0c-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v5.3c.2.2.4.4.5.7.8.8.8 2 0 2.8s-2 .8-2.8 0c-.8-.8-.8-2 0-2.8.3-.3.6-.5 1-.6V7.6c-.4-.1-.7-.3-1-.6-.6-.6-.7-1.4-.4-2.1L4.8 7.4c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l6.2-6.2c.6-.6.6-1.5 0-2.1z" />
          </svg>
        );
      case 'cloudflare':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#F38020" d="M18.2 11.5c-.3-2.6-2.5-4.5-5.2-4.5-2.2 0-4.1 1.3-4.8 3.3-.6-.3-1.3-.4-2-.4-2.3 0-4.2 1.9-4.2 4.2 0 .2 0 .5.1.7C1.4 15.3 1 16.1 1 17c0 1.7 1.3 3 3 3h14.5c2.5 0 4.5-2 4.5-4.5 0-2.2-1.6-4-3.8-4.4v.4z" />
          </svg>
        );
      case 'php':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4" />
            <text x="12" y="15" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">PHP</text>
          </svg>
        );
      case 'servicenow':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#81B924" />
            <path fill="#ffffff" d="M12 6a6 6 0 106 6 6 6 0 00-6-6zm0 9a3 3 0 113-3 3 3 0 01-3 3z" />
          </svg>
        );
      case 'dynatrace':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="5" fill="#1496FF" />
            <path fill="#ffffff" d="M7 6h4a5 5 0 015 5 5 5 0 01-5 5H7V6zm3 7h1a2 2 0 002-2 2 2 0 00-2-2h-1v4z" />
          </svg>
        );
      case 'powerbi':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <rect x="3" y="13" width="4" height="8" rx="1" fill="#F2C811" />
            <rect x="10" y="8" width="4" height="13" rx="1" fill="#F2C811" />
            <rect x="17" y="3" width="4" height="18" rx="1" fill="#F2C811" />
          </svg>
        );
      case 'excel':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="4" fill="#107C41" />
            <path fill="#ffffff" d="M7.5 7l3 5-3 5h2.2l1.8-3.3 1.8 3.3h2.2l-3-5 3-5h-2.2l-1.8 3.2L9.7 7H7.5z" />
          </svg>
        );
      case 'scikit':
        return (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <circle cx="9" cy="12" r="6" fill="#F89939" opacity="0.9" />
            <circle cx="15" cy="12" r="6" fill="#3499CD" opacity="0.9" />
          </svg>
        );
      default:
        return <Cpu className="w-5 h-5 text-zinc-300" />;
    }
  };

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return specificToolsData;
    const q = searchQuery.toLowerCase();
    return specificToolsData.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const selectedTool = useMemo(() => {
    return specificToolsData.find((t) => t.id === selectedToolId) || specificToolsData[0];
  }, [selectedToolId]);

  return (
    <section
      id="skills"
      className="py-8 sm:py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300"
    >
      {/* ──────────────── SECTION HEADER ──────────────── */}
      <div className="max-w-3xl pb-2 border-b border-white/10">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 tracking-wider uppercase mb-2 font-mono">
          <Layers className="w-4 h-4 text-white" />
          <span>Dual Architecture Split Ecosystem</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          Skills &amp; Technology Stack
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Separated into two focused panels: <strong>Specific Tools &amp; Languages</strong> on the left, and <strong>Engineering Disciplines &amp; Domains</strong> on the right.
        </p>
      </div>

      {/* ──────────────── TWO-COLUMN SPLIT GRID ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ════════════════ LEFT COLUMN: SPECIFIC SKILLS & TOOLS (5 COLS) ════════════════ */}
        <div className="lg:col-span-5 space-y-5">
          {/* Column Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                COLUMN A • SPECIFIC SKILLS
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                Core Technical Stack
              </h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold border border-white/20">
              {filteredTools.length} Tools
            </span>
          </div>

          {/* Quick Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. Python, Docker, SQL)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm bg-zinc-950/80 border border-white/15 focus:border-white focus:outline-none text-white placeholder-zinc-500 transition-all shadow-sm"
            />
          </div>

          {/* Tools Interactive Badges Grid */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-white/10 shadow-sm space-y-2 max-h-[480px] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {filteredTools.map((tool: SpecificTool) => {
                const isSelected = selectedToolId === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedToolId(tool.id)}
                    className={`btn-tactile w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 group active:scale-[0.98] ${
                      isSelected
                        ? 'bg-white/15 border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: `${tool.brandColor}18`,
                          borderColor: isSelected ? tool.brandColor : `${tool.brandColor}35`,
                          borderWidth: 1,
                        }}
                      >
                        {renderToolIcon(tool.iconType)}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-xs sm:text-sm text-white truncate block group-hover:text-zinc-200 transition-colors">
                          {tool.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 block">
                          {tool.categoryLabel}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                        tool.level === 'Advanced'
                          ? 'bg-white text-black font-bold'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}
                    >
                      {tool.level}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tool Insight Card */}
          <div className="p-4 rounded-xl bg-zinc-950/90 border border-white/20 transition-all duration-300 flex items-start gap-3.5 shadow-[0_0_20px_rgba(255,255,255,0.06)]">
            <div
              className="p-2.5 rounded-lg flex-shrink-0 shadow-sm"
              style={{
                backgroundColor: `${selectedTool.brandColor}22`,
                borderColor: `${selectedTool.brandColor}50`,
                borderWidth: 1,
              }}
            >
              {renderToolIcon(selectedTool.iconType)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-sm text-white">
                  {selectedTool.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-semibold border border-white/15">
                  {selectedTool.categoryLabel}
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedTool.description}
              </p>
            </div>
          </div>
        </div>

        {/* ════════════════ RIGHT COLUMN: SKILL CATEGORIES & DISCIPLINES (7 COLS) ════════════════ */}
        <div className="lg:col-span-7 space-y-5">
          {/* Column Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                COLUMN B • SKILL CATEGORIES &amp; DISCIPLINES
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                Engineering Disciplines &amp; Domains
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {skillCategoriesData.length} Verified Disciplines
            </span>
          </div>

          {/* Interactive Expandable Cards in Monochrome */}
          <div className="space-y-3.5">
            {skillCategoriesData.map((cat, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={cat.title}
                  className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                    isExpanded
                      ? 'bg-zinc-950/90 border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.08)]'
                      : 'bg-zinc-950/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Clickable Header Button */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                    className="btn-tactile w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`p-2.5 rounded-xl transition-transform group-hover:scale-110 flex-shrink-0 ${
                          isExpanded
                            ? 'bg-white text-black shadow-sm'
                            : 'bg-white/[0.05] text-white border border-white/10'
                        }`}
                      >
                        {getCategoryIcon(cat.iconName)}
                      </div>

                      <div className="min-w-0">
                        <h4
                          className={`font-bold text-base sm:text-lg tracking-tight transition-colors ${
                            isExpanded ? 'text-white' : 'text-zinc-200 group-hover:text-white'
                          }`}
                        >
                          {cat.title}
                        </h4>
                        <span className="text-xs text-zinc-400 font-mono block">
                          {cat.skills.length} core competencies
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-mono font-bold text-zinc-300 hidden sm:inline">
                        {isExpanded ? 'Collapse' : 'Explore'}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform ${
                          isExpanded ? 'bg-white/20 text-white rotate-180' : 'bg-white/[0.05] text-zinc-400'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content Area */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-white/10 space-y-4 animate-in fade-in duration-200">
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {cat.description}
                      </p>

                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                          Core Frameworks &amp; Tooling:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((skill) => (
                            <span
                              key={skill.name}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                skill.highlight
                                  ? 'bg-white text-black font-bold shadow-sm'
                                  : 'bg-white/[0.05] text-zinc-200 border border-white/10'
                              }`}
                            >
                              {skill.highlight && (
                                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                              )}
                              <span>{skill.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                        <span className="flex items-center gap-1.5 text-zinc-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          <span>Production-Proven Standards</span>
                        </span>
                        <span className="text-white font-bold">
                          Active Engineering
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
