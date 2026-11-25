import React, { useState, useEffect } from 'react';
import { Sidebar, SectionId } from './components/Sidebar';
import { HomeSection } from './components/HomeSection';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { ThreeDBackground } from './components/ThreeDBackground';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Enforce pure dark mode across the entire app
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('portfolio-theme', 'dark');

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as SectionId;
      const validSections: SectionId[] = ['home', 'education', 'experience', 'skills', 'projects', 'contact'];
      if (validSections.includes(hash)) {
        setActiveSection(hash);
      } else {
        setActiveSection('home');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  const handleNavigate = (section: SectionId) => {
    setActiveSection(section);
    window.history.pushState(null, '', `#${section}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-transparent text-zinc-100 flex flex-col font-sans selection:bg-white/20 selection:text-white relative">
      {/* 3D Monochrome Perspective Grid & Celestial Horizon Canvas */}
      <ThreeDBackground />

      {/* Fixed Frosted Sidebar & Responsive Mobile Header */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Area: Each section is a dedicated, separate view */}
      <div className="lg:pl-80 flex-1 flex flex-col min-w-0 transition-all duration-300 relative z-10">
        <main className="flex-1 pt-16 lg:pt-0 min-h-screen">
          <div key={activeSection} className="animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
            {activeSection === 'home' && (
              <HomeSection
                onNavigate={handleNavigate}
                onOpenResume={() => setIsResumeOpen(true)}
              />
            )}
            {activeSection === 'education' && <EducationSection />}
            {activeSection === 'experience' && <ExperienceSection />}
            {activeSection === 'skills' && <SkillsSection />}
            {activeSection === 'projects' && <ProjectsSection />}
            {activeSection === 'contact' && (
              <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
            )}
          </div>
        </main>

        <Footer />
      </div>

      {/* Global In-Page Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export default App;
