export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  logo?: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface VolunteerItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  logo?: string;
  category?: string;
}

export interface ReferenceItem {
  name: string;
  role: string;
  organization: string;
  email: string;
  relationship: string;
  verified: boolean;
  logo: string;
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "aia-digital",
    role: "Cloud Operations Intern",
    company: "AIA Digital+",
    location: "Kuala Lumpur, Malaysia",
    period: "Apr 2026 – Present",
    type: "Enterprise Cloud Internship",
    logo: "/aia_logo.png",
    description: "Support enterprise database and cloud infrastructure operations across mission-critical insurance systems with 99.9% uptime compliance.",
    achievements: [
      "Supported MySQL and Microsoft SQL Server enterprise database operations, backup verification, and DR readiness.",
      "Assisted infrastructure maintenance, security patching routines, and health checks across hybrid Windows and Linux servers.",
      "Collaborated in ITSM incident response workflows utilizing ServiceNow, Dynatrace monitoring, PagerDuty, and CyberArk privileged access."
    ],
    skills: ["Microsoft Azure", "MS SQL Server", "MySQL", "Linux / Windows Server", "ServiceNow", "Dynatrace", "ITSM"]
  },
  {
    id: "print-sahel",
    role: "Founder & Business Owner",
    company: "Print With Sahel",
    location: "Alor Setar, Kedah",
    period: "Apr 2024 – Feb 2026",
    type: "Entrepreneurship & Operations",
    description: "Founded and independently scaled an on-campus digital printing venture serving hundreds of university students and faculty members.",
    achievements: [
      "Orchestrated end-to-end daily order processing, tight thesis deadline fulfillment, and quality control standards.",
      "Managed business cash flows, pricing structures, supplier logistics, and proactive equipment maintenance schedules.",
      "Delivered responsive, reliable customer support, establishing a loyal campus user base and sustainable operational profit."
    ],
    skills: ["Business Operations", "Cash Flow & Finance", "Vendor Logistics", "Customer Success", "Inventory Management"]
  }
];

export const referencesData: ReferenceItem[] = [
  {
    name: "Mark Virta",
    role: "Director of Technology Operations",
    organization: "AIA Digital+",
    email: "mark.virta@aia.com",
    relationship: "Internship Director & Executive Mentor",
    verified: true,
    logo: "/aia_logo.png"
  },
  {
    name: "Prof. Dr. Basheer Riskhan",
    role: "Dean of School of Computing",
    organization: "Albukhary International University (AIU)",
    email: "basheer.riskhan@aiu.edu.my",
    relationship: "Academic Dean & Department Head",
    verified: true,
    logo: "/aiu_logo.png"
  },
  {
    name: "Assoc. Prof. Ts. Dr. Leelavathi Rajamanickam",
    role: "Senior Lecturer & Academic Advisor",
    organization: "Albukhary International University (AIU)",
    email: "leelavathi.rajamanickam@aiu.edu.my",
    relationship: "Academic Advisor & Supervisor",
    verified: true,
    logo: "/aiu_logo.png"
  }
];

export const volunteerData: VolunteerItem[] = [
  {
    id: "sci-committee",
    role: "Committee Member and Event Organizer",
    organization: "Kedah Maker Fair 2025 (SCI Committee)",
    period: "2025",
    description: "Coordinated logistics and technical arrangements for a state-level STEM maker event involving 66 school teams across Kedah.",
    logo: "/sci_committee_logo.png",
    category: "STEM & Robotics Event"
  },
  {
    id: "chumbaka-yic",
    role: "Mentor and Trainer",
    organization: "Young Innovators Challenge 2025 (Chumbaka)",
    period: "2025",
    description: "Guided school teachers and students through problem-solving methodologies and hands-on hardware/AI prototyping using Arduino IoT arrays and Artificial Intelligence.",
    logo: "/chumbaka_logo.png",
    category: "IoT & AI Mentorship"
  },
  {
    id: "thunderbirds",
    role: "Event Organizer & Coordinator",
    organization: "Thunderbirds Frisbee Club",
    period: "Nov 2023 – Apr 2025",
    description: "Coordinated club events, scheduled matches, and organized friendly inter-university ultimate frisbee tournaments and athletic engagements.",
    logo: "/thunderbirds_logo.png",
    category: "Sports & Club Leadership"
  },
  {
    id: "amsa-culture",
    role: "Art & Culture Unit Co-Representative",
    organization: "AIU Myanmar Student Association (AMSA)",
    period: "Nov 2023 – Jul 2024",
    description: "Promoted traditional arts, arranged cross-cultural showcases, and directed performance units for university international functions.",
    logo: "/amsa_logo.png",
    category: "Cultural Leadership"
  },
  {
    id: "amsa-pr",
    role: "Public Relations Unit Officer",
    organization: "AIU Myanmar Student Association (AMSA)",
    period: "Nov 2022 – Oct 2023",
    description: "Managed external communications, cultural representation, and public relations coordination for traditional celebrations and community events at AIU.",
    logo: "/amsa_logo.png",
    category: "Public Relations & Media"
  },
  {
    id: "community-tutoring",
    role: "Volunteer Teacher",
    organization: "Community Tutoring Outreach",
    period: "Jun 2020 – Mar 2022",
    description: "Conducted free after-school academic classes, foundational mathematics, and exam coaching for underprivileged children in my local community.",
    category: "Community Education"
  }
];
