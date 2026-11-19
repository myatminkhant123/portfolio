import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Award,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  BookOpen,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import { educationData, certificationsData, Certification } from '../data/education';

export const EducationSection: React.FC = () => {
  const [expandedCertId, setExpandedCertId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCertId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="education" className="py-8 sm:py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 tracking-wider uppercase mb-2 font-mono">
          <GraduationCap className="w-4 h-4 text-white" />
          <span>Academic Foundations &amp; Certifications</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          Education &amp; Verified Credentials
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Formal university degrees, scholarship honors, and verified technical curricula across Full-Stack Web Development, Generative AI, and Data Science.
        </p>
      </div>

      {/* 1. UNIVERSITY DEGREES */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-5 flex items-center gap-2.5">
          <GraduationCap className="w-5 h-5 text-white" />
          <span>Academic Degrees</span>
        </h3>

        <div className="space-y-4">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 sm:p-7 glass-panel-hover border border-white/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  {edu.logo ? (
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 p-2 flex items-center justify-center flex-shrink-0">
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{edu.degree}</h4>
                    <p className="text-sm sm:text-base font-semibold text-zinc-200 mt-0.5">{edu.institution}</p>
                    <p className="text-xs sm:text-sm text-zinc-400 font-semibold mt-0.5">{edu.honors}</p>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs sm:text-sm font-mono font-medium bg-zinc-950/80 border border-white/10 text-zinc-300">
                    <Calendar className="w-3.5 h-3.5 text-white" />
                    {edu.period}
                  </span>
                  <span className="text-sm font-mono font-bold text-white">{edu.grade}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. VERIFIED PROFESSIONAL CERTIFICATIONS */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Award className="w-5 h-5 text-white" />
            <span>Professional Certifications &amp; Detailed Syllabus</span>
          </h3>
          <span className="text-xs sm:text-sm font-mono text-zinc-400">Curricula &amp; Projects</span>
        </div>

        <div className="space-y-6">
          {certificationsData.map((cert: Certification) => {
            const isExpanded = expandedCertId === cert.id;

            return (
              <div
                key={cert.id}
                className="glass-panel rounded-2xl p-6 sm:p-7 glass-panel-hover border border-white/10"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    {cert.issuerLogo ? (
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 p-2 flex items-center justify-center flex-shrink-0">
                        <img
                          src={cert.issuerLogo}
                          alt={cert.issuer}
                          className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                        <Award className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                        {cert.title}
                      </h4>
                      <p className="text-sm font-semibold text-zinc-200 mt-0.5">{cert.issuer}</p>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">{cert.platformText}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/20 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      {cert.badgeText}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-zinc-400">{cert.date}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* Tools & Technologies */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="text-xs uppercase font-mono text-zinc-400 mr-1 font-bold">Skills:</span>
                  {cert.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/[0.06] text-zinc-200 border border-white/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    {cert.isLocalImage ? (
                      <button
                        onClick={() => setPreviewImage(cert.verifyUrl)}
                        className="btn-shimmer btn-tactile inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-95 transition-all"
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>View Certificate Image</span>
                      </button>
                    ) : (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-shimmer btn-tactile inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-95 transition-all"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Toggle Syllabus Drawer */}
                  <button
                    onClick={() => toggleExpand(cert.id)}
                    className="btn-tactile inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white active:scale-95 transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{isExpanded ? 'Hide Syllabus Modules' : 'View Syllabus Modules'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Syllabus Breakdown */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-white/10 animate-in fade-in duration-200">
                    <h5 className="text-xs sm:text-sm font-bold font-mono text-zinc-200 uppercase tracking-wider mb-4">
                      {cert.modulesTitle}
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {cert.modules.map((mod) => (
                        <div
                          key={mod.number}
                          className="bg-zinc-950/70 p-4 rounded-xl border border-white/10 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2.5 mb-2">
                              <span className="w-6 h-6 rounded-md bg-white/10 text-white border border-white/20 text-xs font-mono font-bold flex items-center justify-center">
                                {mod.number}
                              </span>
                              <h6 className="text-sm font-bold text-white tracking-tight leading-snug">
                                {mod.title}
                              </h6>
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                              <strong className="text-zinc-200 font-semibold">Key Project:</strong> {mod.project}
                            </p>
                          </div>
                          <div className="mt-3 pt-2.5 border-t border-white/10">
                            <p className="text-xs text-zinc-400 font-mono">
                              <span className="text-white font-medium">Skills:</span> {mod.skills}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal for TechNexus Certificate Image Preview */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-zinc-950 rounded-2xl p-3 sm:p-5 border border-white/20 shadow-2xl overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 px-2 border-b border-white/10">
              <span className="text-sm sm:text-base font-bold text-white">
                TechNexus — Full MERN Stack Bootcamp Certificate of Achievement
              </span>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all btn-tactile"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 overflow-auto max-h-[80vh] flex items-center justify-center">
              <img
                src={previewImage}
                alt="TechNexus Full MERN Stack Bootcamp Certificate"
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
