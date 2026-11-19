import React, { useState } from 'react';
import { Github, Sparkles, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { projectsData } from '../data/projects';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'web' | 'data' | 'iot'>('all');

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-8 sm:py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Section Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 tracking-wider uppercase mb-2 font-mono">
            <Layers className="w-4 h-4 text-white" />
            <span>Featured Engineering Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
            Projects &amp; Production Systems
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Full-stack web applications, supervised machine learning pipelines, and agentic AI models built for real-world impact.
          </p>
        </div>

        {/* Filter Tabs in Monochrome */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-950/80 border border-white/10 rounded-2xl self-start md:self-auto shadow-sm">
          <button
            onClick={() => setFilter('all')}
            className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
              filter === 'all'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All ({projectsData.length})
          </button>
          <button
            onClick={() => setFilter('web')}
            className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
              filter === 'web'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Full-Stack Web (2)
          </button>
          <button
            onClick={() => setFilter('data')}
            className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
              filter === 'data'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Data Science &amp; AI (5)
          </button>
          <button
            onClick={() => setFilter('iot')}
            className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
              filter === 'iot'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            IoT Hardware (1)
          </button>
        </div>
      </div>

      {/* Projects Grid in Monochrome */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel rounded-2xl overflow-hidden flex flex-col glass-panel-hover group active:scale-[0.99] transition-all border border-white/10 hover:border-white/30"
          >
            {/* Thumbnail Container */}
            <div className="relative w-full overflow-hidden bg-zinc-950 aspect-[16/9] border-b border-white/10">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              {/* Status Badges */}
              <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-zinc-950/90 text-zinc-200 border border-white/20 backdrop-blur-md">
                  {project.date}
                </span>
                {project.statusBadge && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3 h-3 text-white" />
                    {project.statusBadge}
                  </span>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-zinc-200 transition-colors tracking-tight">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-xs sm:text-sm font-semibold text-zinc-300 mt-1 mb-2.5 font-mono">
                    {project.subtitle}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Highlights Bullet List */}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tech Tags & Links Footer */}
              <div className="pt-4 border-t border-white/10">
                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/[0.05] text-zinc-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions with tactile micro-interactions */}
                <div className="flex items-center gap-2.5">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-shimmer btn-tactile inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-tactile inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 active:scale-95 transition-all"
                    >
                      <Github className="w-3.5 h-3.5 text-white" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
