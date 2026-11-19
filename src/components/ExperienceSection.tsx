import React from 'react';
import { Briefcase, Building, Mail, CheckCircle, Calendar, MapPin, HeartHandshake, Users, ShieldCheck } from 'lucide-react';
import { experiencesData, referencesData, volunteerData } from '../data/experience';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-8 sm:py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 tracking-wider uppercase mb-2 font-mono">
          <Briefcase className="w-4 h-4 text-white" />
          <span>Track Record &amp; Leadership</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          Experience
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Enterprise cloud operations, technical mentorship, corporate references, and state-level volunteer leadership.
        </p>
      </div>

      {/* 1. WORK EXPERIENCE */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-white" />
            <span>Work Experience</span>
          </h3>
          <span className="text-xs sm:text-sm font-mono text-zinc-400">Enterprise &amp; Operations</span>
        </div>

        <div className="space-y-5">
          {experiencesData.map((exp) => (
            <div
              key={exp.id}
              className="glass-panel rounded-2xl p-6 sm:p-7 glass-panel-hover border border-white/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  {exp.logo ? (
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 p-2 flex items-center justify-center flex-shrink-0">
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      <Building className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-2.5 mt-1 text-sm">
                      <span className="font-semibold text-zinc-200">{exp.company}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-white" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs sm:text-sm font-mono font-medium bg-zinc-950/80 border border-white/10 text-zinc-300">
                    <Calendar className="w-3.5 h-3.5 text-white" />
                    {exp.period}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-zinc-400">{exp.type}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 mb-5 leading-relaxed">{exp.description}</p>

              {/* Key Achievements */}
              <ul className="space-y-2 mb-5">
                {exp.achievements.map((ach, i) => (
                  <li key={i} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/[0.05] text-zinc-200 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. VERIFIED REFERENCES & SUPERVISORS */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-white" />
            <span>Industry Leadership &amp; Academic Faculty References</span>
          </h3>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 font-semibold">
            Official Endorsements
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {referencesData.map((ref, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-white/40 glass-panel-hover relative overflow-hidden group active:scale-[0.98] transition-all"
            >
              {/* Top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-white opacity-40 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Reference Header with Official Logo */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 p-2 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <img
                      src={ref.logo}
                      alt={ref.organization}
                      className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-white text-base tracking-tight truncate">
                        {ref.name}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/15 text-white border border-white/20 flex-shrink-0 font-bold">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-200 font-semibold truncate mt-0.5">
                      {ref.role}
                    </p>
                    <p className="text-xs text-zinc-400 font-medium truncate">
                      {ref.organization}
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-950/70 p-3 rounded-xl border border-white/10 mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block font-bold">
                    Relationship
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-1 leading-snug">
                    {ref.relationship}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <a
                  href={`mailto:${ref.email}`}
                  className="btn-tactile inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-300 hover:text-white transition-colors w-full truncate"
                >
                  <Mail className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="truncate">{ref.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. VOLUNTEER AND EXTRACURRICULAR EXPERIENCE */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <HeartHandshake className="w-5 h-5 text-white" />
            <span>Volunteer &amp; Extracurricular Experience</span>
          </h3>
          <span className="text-xs sm:text-sm font-mono text-zinc-400">{volunteerData.length} Engagements</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {volunteerData.map((vol) => (
            <div
              key={vol.id}
              className="glass-panel rounded-2xl p-5 sm:p-6 glass-panel-hover flex flex-col justify-between active:scale-[0.98] transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {vol.logo ? (
                      <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 p-1.5 flex items-center justify-center flex-shrink-0">
                        <img
                          src={vol.logo}
                          alt={vol.organization}
                          className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold flex-shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-zinc-100 leading-tight">
                        {vol.organization}
                      </h4>
                      {vol.category && (
                        <span className="text-xs font-mono text-zinc-400 block mt-0.5">
                          {vol.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-950/80 border border-white/10 text-zinc-400 flex-shrink-0">
                    {vol.period}
                  </span>
                </div>

                <h5 className="text-sm sm:text-base font-extrabold text-white mb-2">
                  {vol.role}
                </h5>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {vol.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
