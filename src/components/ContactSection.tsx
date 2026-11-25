import React, { useState } from 'react';
import {
  Mail,
  Check,
  Send,
  MapPin,
  Briefcase,
  Compass,
  Sparkles,
  Clock,
  ExternalLink,
  Calendar,
  Contact,
  AlertCircle,
  User,
} from 'lucide-react';
import { profileData } from '../data/profile';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Downloadable vCard (.vcf) Generator
  const handleDownloadVCard = () => {
    const vcardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Myat Min Khant',
      'N:Khant;Myat;Min;;',
      'TITLE:Full-Stack Software Engineer & AI Specialist',
      'ORG:Albukhary International University',
      `EMAIL;TYPE=INTERNET,WORK:${profileData.email}`,
      `TEL;TYPE=CELL,VOICE:${profileData.phone}`,
      'ADR;TYPE=WORK:;;Kuala Lumpur / Alor Setar;Kedah;;Malaysia',
      `URL:${profileData.githubUrl}`,
      `X-SOCIALPROFILE;TYPE=linkedin:${profileData.linkedinUrl}`,
      'NOTE:Albukhary Scholar (CGPA 3.53) | Full-Stack Web Development, AI & Data Science',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Myat_Min_Khant.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Direct Form Validation & Instant Dispatch
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please specify a subject.';
    if (!formData.message.trim()) {
      newErrors.message = 'Please write a brief message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Format mailto URI for instant dispatch
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${profileData.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmittedSuccess(false), 5000);
    }, 400);
  };

  // Pre-filled email templates for fast recruiter & collaborator outreach
  const emailTemplates = [
    {
      label: '💼 Full-Time / Graduate Opportunity',
      subject: 'Interview Opportunity — Software Engineering / Data Science',
      body: 'Hi Myat Min,\n\nWe came across your portfolio and are impressed with your technical projects. We would love to schedule an introductory conversation regarding our software engineering / data science opportunities.\n\nBest regards,\n[Your Name]\n[Your Company]',
    },
    {
      label: '🤖 AI & Full-Stack Collaboration',
      subject: 'Project Collaboration — Agentic AI / Full-Stack',
      body: 'Hi Myat Min,\n\nI saw your work on reactive web apps and machine learning models. I would like to discuss a potential project/contract collaboration.\n\nBest regards,\n[Your Name]',
    },
    {
      label: '☕ Networking & Coffee Chat',
      subject: 'Connecting via Portfolio — Myat Min Khant',
      body: 'Hi Myat Min,\n\nI came across your portfolio and would love to connect and exchange thoughts on tech, data science, and development.\n\nBest regards,\n[Your Name]',
    },
  ];

  return (
    <section id="contact" className="py-8 sm:py-12 px-4 md:px-8 max-w-5xl mx-auto text-center animate-in fade-in duration-300 space-y-10">
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-white/[0.03] blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* 1. Section Header */}
      <div className="max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 tracking-wider uppercase mb-2 font-mono">
          <Send className="w-4 h-4 text-white" />
          <span>Direct Communication</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          Let's Build Something Exceptional
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          I am actively exploring <strong className="text-white font-semibold">Full-Stack Software Engineering</strong>, <strong className="text-zinc-200 font-semibold">AI &amp; LLM Systems</strong>, and <strong className="text-zinc-200 font-semibold">Data Science</strong> roles starting <strong className="text-white">December 2026 / January 2027</strong>. Open to on-site, relocation, and remote arrangements.
        </p>
      </div>

      {/* 2. FAST ACTION BAR: DIRECT MEETING SCHEDULER & DOWNLOADABLE vCARD */}
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        {/* Direct Meeting Scheduler Button */}
        <a
          href={`mailto:${profileData.email}?subject=${encodeURIComponent('Request 15-Minute Intro Call with Myat Min Khant')}&body=${encodeURIComponent(
            'Hi Myat Min,\n\nI would like to schedule a 15-minute introductory call to discuss opportunities / potential collaboration.\n\nProposed times (GMT+8):\n1)\n2)\n\nCompany / Role Details:\n\nBest regards,\n[Your Name]'
          )}`}
          className="btn-shimmer btn-tactile inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm sm:text-base font-bold text-black bg-white hover:bg-zinc-200 shadow-[0_0_25px_rgba(255,255,255,0.25)] group"
        >
          <Calendar className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
          <span>Book a 15-Minute Intro Call</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/10 text-black font-extrabold">
            Instant
          </span>
        </a>

        {/* Downloadable vCard (.vcf) Button */}
        <button
          onClick={handleDownloadVCard}
          className="btn-tactile inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm sm:text-base font-semibold text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-white/30 shadow-md"
          title="Save Contact Details (.vcf)"
        >
          <Contact className="w-4 h-4 text-white" />
          <span>Download Contact Card (.vcf)</span>
        </button>
      </div>

      {/* 3. DIRECT CONTACT CHANNELS GRID (Official Brand Logos & Authentic Accents) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Email Copy Box */}
        <button
          onClick={handleCopyEmail}
          className="btn-tactile glass-panel p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-[#EA4335]/50 hover:shadow-[0_0_25px_rgba(234,67,53,0.15)] cursor-pointer relative transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-[#EA4335]/15 border border-[#EA4335]/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
            {copied ? (
              <Check className="w-6 h-6 text-[#EA4335]" />
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 12.7L2.4 5.5C2.8 4.6 3.8 4 5 4h14c1.2 0 2.2.6 2.6 1.5L12 12.7z" />
                <path fill="#4285F4" d="M22 6.5v11c0 1.4-1.1 2.5-2.5 2.5H18V10.2l4-3.7z" />
                <path fill="#34A853" d="M2 6.5l4 3.7V20H4.5C3.1 20 2 18.9 2 17.5v-11z" />
                <path fill="#FBBC05" d="M6 10.2V20h12V10.2L12 14.7 6 10.2z" />
              </svg>
            )}
          </div>
          <span className="text-sm sm:text-base font-bold text-white">Gmail / Email</span>
          <span className="text-xs sm:text-sm text-zinc-400 font-mono mt-1 truncate max-w-full">
            {profileData.email}
          </span>
          <span className="text-xs text-[#EA4335] font-semibold mt-2 flex items-center gap-1 group-hover:underline">
            {copied ? 'Copied to Clipboard! ✓' : 'Click to Copy →'}
          </span>
        </button>

        {/* WhatsApp Direct (Official WhatsApp Green Logo) */}
        <a
          href={profileData.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-tactile glass-panel p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-[#25D366]/50 hover:shadow-[0_0_25px_rgba(37,211,102,0.15)] transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                fill="#25D366"
                d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z"
              />
              <path
                fill="#ffffff"
                d="M17.51 14.38c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.24-.59-.49-.51-.67-.52l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"
              />
            </svg>
          </div>
          <span className="text-sm sm:text-base font-bold text-white">WhatsApp Direct</span>
          <span className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
            {profileData.phone}
          </span>
          <span className="text-xs text-[#25D366] font-semibold mt-2 group-hover:underline">
            Chat on WhatsApp →
          </span>
        </a>

        {/* LinkedIn Profile (Official LinkedIn Blue Logo) */}
        <a
          href={profileData.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-tactile glass-panel p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-[#0A66C2]/50 hover:shadow-[0_0_25px_rgba(10,102,194,0.15)] transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="4" fill="#0A66C2" />
              <path
                fill="#ffffff"
                d="M6.94 5a2 2 0 11-4 0 2 2 0 014 0zM3.19 8.33h3.5v10.64h-3.5V8.33zm5.72 0h3.36v1.46h.05c.47-.88 1.62-1.81 3.33-1.81 3.56 0 4.22 2.34 4.22 5.39v5.6h-3.5v-4.97c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62v5.05h-3.5V8.33z"
              />
            </svg>
          </div>
          <span className="text-sm sm:text-base font-bold text-white">LinkedIn</span>
          <span className="text-xs sm:text-sm text-zinc-400 mt-1 truncate max-w-full font-mono">
            /in/myat-min-khant
          </span>
          <span className="text-xs text-[#0A66C2] font-semibold mt-2 group-hover:underline">
            Connect on LinkedIn →
          </span>
        </a>

        {/* GitHub Profile (Official GitHub Logo) */}
        <a
          href={profileData.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-tactile glass-panel p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-white/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <span className="text-sm sm:text-base font-bold text-white">GitHub Repos</span>
          <span className="text-xs sm:text-sm text-zinc-400 mt-1 font-mono truncate max-w-full">
            @myatminkhant123
          </span>
          <span className="text-xs text-zinc-300 font-semibold mt-2 group-hover:underline">
            Explore Code Repos →
          </span>
        </a>
      </div>

      {/* 4. CAREER STATUS & AVAILABILITY — EXECUTIVE BENTO SHOWCASE */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl text-left border border-white/15 shadow-[0_0_35px_rgba(255,255,255,0.05)] space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Career Status &amp; Availability
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Ready for technical evaluations &amp; team onboarding
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">
              Available Dec '26 / Jan '27
            </span>
          </div>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Bento Card 1: Target Roles & Specializations */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-white/[0.06] flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-zinc-300 mb-2">
                <Briefcase className="w-4 h-4 text-white" />
                <span>Target Roles &amp; Disciplines</span>
              </div>
              <p className="text-xs text-zinc-400 mb-3">
                Seeking high-impact software engineering and data intelligence opportunities:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Data Analysis & BI',
                  'Agentic AI & LLMs',
                  'Software Development',
                  'Graduate Trainee Program',
                  'Full-Stack Web (React/Node)',
                ].map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white/[0.04] text-zinc-200 border border-white/[0.08] hover:border-white/30 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="text-zinc-500">Employment Types:</span>
              <span className="text-white font-semibold">Full-Time, Part-Time, Contract, Freelance</span>
            </div>
          </div>

          {/* Bento Card 2: Location, Mobility & Work Modes */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-white/[0.06] flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-zinc-300 mb-2">
                <Compass className="w-4 h-4 text-white" />
                <span>Location &amp; Work Flexibility</span>
              </div>
              <div className="flex items-start gap-2.5 mb-3">
                <MapPin className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-bold text-white block">Kuala Lumpur, Malaysia</span>
                  <span className="text-xs text-zinc-400">Open to regional relocation and global remote teams</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Accepted Work Modes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {['On-site', 'Relocation', 'Remote', 'CONTRACT', 'Hybrid'].map((mode) => (
                    <span
                      key={mode}
                      className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-white/5 text-zinc-200 border border-white/10"
                    >
                      ✓ {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-white" />
                Timezone: GMT+8
              </span>
              <span className="text-zinc-300 font-medium">Response SLA: &lt; 24h</span>
            </div>
          </div>
        </div>

        {/* 1-Click Fast Email Starter Templates */}
        <div className="pt-4 border-t border-white/[0.06]">
          <span className="text-xs font-mono uppercase font-bold text-zinc-400 block mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            Quick Email Starters (Click to Draft Instantly):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {emailTemplates.map((t, idx) => (
              <a
                key={idx}
                href={`mailto:${profileData.email}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`}
                className="btn-tactile p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/30 text-left transition-all group flex items-center justify-between"
              >
                <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                  {t.label}
                </span>
                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-white flex-shrink-0 ml-1.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE DIRECT MESSAGE FORM WITH CLIENT-SIDE VALIDATION */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl text-left border border-white/[0.1] shadow-2xl space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-zinc-400 mb-1.5">
            <Mail className="w-4 h-4 text-white" />
            <span>Interactive Direct Message Form</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Send an Immediate Message
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Fill in the details below to dispatch an email inquiry directly to my inbox.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="form-name" className="block text-xs font-mono font-semibold text-zinc-300 mb-1.5">
                Your Full Name <span className="text-zinc-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="form-name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'form-name-error' : undefined}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className={`w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                    errors.name ? 'border-white focus:border-white' : 'border-white/[0.1] focus:border-white/40'
                  }`}
                />
                <User className="absolute right-3.5 top-3 w-4 h-4 text-zinc-500 pointer-events-none" />
              </div>
              {errors.name && (
                <p id="form-name-error" role="alert" className="text-[11px] text-zinc-300 mt-1 flex items-center gap-1 font-mono">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="form-email" className="block text-xs font-mono font-semibold text-zinc-300 mb-1.5">
                Your Email Address <span className="text-zinc-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="form-email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'form-email-error' : undefined}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sarah.j@company.com"
                  className={`w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                    errors.email ? 'border-white focus:border-white' : 'border-white/[0.1] focus:border-white/40'
                  }`}
                />
                <Mail className="absolute right-3.5 top-3 w-4 h-4 text-zinc-500 pointer-events-none" />
              </div>
              {errors.email && (
                <p id="form-email-error" role="alert" className="text-[11px] text-zinc-300 mt-1 flex items-center gap-1 font-mono">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="form-subject" className="block text-xs font-mono font-semibold text-zinc-300 mb-1.5">
              Subject / Topic <span className="text-zinc-400">*</span>
            </label>
            <input
              id="form-subject"
              type="text"
              required
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'form-subject-error' : undefined}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Software Engineering Opportunity / AI Project Consultation"
              className={`w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                errors.subject ? 'border-white focus:border-white' : 'border-white/[0.1] focus:border-white/40'
              }`}
            />
            {errors.subject && (
              <p id="form-subject-error" role="alert" className="text-[11px] text-zinc-300 mt-1 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="form-message" className="block text-xs font-mono font-semibold text-zinc-300 mb-1.5">
              Your Message <span className="text-zinc-400">*</span>
            </label>
            <textarea
              id="form-message"
              rows={4}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'form-message-error' : undefined}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe the opportunity, project requirements, or questions..."
              className={`w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors resize-none ${
                errors.message ? 'border-white focus:border-white' : 'border-white/[0.1] focus:border-white/40'
              }`}
            />
            {errors.message && (
              <p id="form-message-error" role="alert" className="text-[11px] text-zinc-300 mt-1 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button & Feedback */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-shimmer btn-tactile w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-black bg-white hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-black" />
              )}
              <span>{isSubmitting ? 'Preparing Email...' : 'Send Direct Message 🚀'}</span>
            </button>

            {submittedSuccess && (
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-200 animate-in fade-in">
                <Check className="w-4 h-4 text-white" />
                <span>Message prepared! Opening your email client to dispatch...</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
