export interface ProfileData {
  name: string;
  role: string;
  subtitle: string;
  bio: string;
  status: {
    available: boolean;
    label: string;
    description: string;
  };
  location: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
  avatarUrl: string;
  sidebarAvatarUrl: string;
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

export const profileData: ProfileData = {
  name: "Myat Min Khant",
  role: "Full-Stack Software Engineer & AI Specialist",
  subtitle: "Albukhary Scholar (CGPA 3.53) • Full-Stack Web Apps • AI & Data Science",
  bio: "Computer Science graduate specializing in Data Science & Artificial Intelligence with strong full-stack software development expertise. Experienced in building responsive web architectures (React 18, TypeScript, Node.js, Hono), training predictive machine learning models, and architecting agentic AI pipelines.",
  status: {
    available: true,
    label: "Available for Opportunities",
    description: "Open to Full-Stack Software Engineering, AI & LLM Systems, and Data Science roles starting Dec 2026 / Jan 2027 (Kuala Lumpur & Remote)."
  },
  location: "Kuala Lumpur / Alor Setar, Malaysia",
  email: "mmk111203@gmail.com",
  phone: "+601164597291",
  whatsappUrl: "https://wa.me/601164597291",
  linkedinUrl: "https://www.linkedin.com/in/myat-min-khant-810bb3275",
  githubUrl: "https://github.com/myatminkhant123",
  resumeUrl: "/CV_MMK.pdf",
  avatarUrl: "/CVphoto.webp",
  sidebarAvatarUrl: "/tech_guy_mmk.jpg",
  stats: [
    { label: "CGPA Academic Honor", value: "3.53", subtext: "Albukhary Full Scholarship" },
    { label: "Full-Stack & AI Projects", value: "8+", subtext: "Web, LLMs, ML & IoT" },
    { label: "Enterprise Experience", value: "AIA Digital+", subtext: "Operations Intern" },
    { label: "Multilingual", value: "English & Burmese", subtext: "Professional Fluency" }
  ]
};
