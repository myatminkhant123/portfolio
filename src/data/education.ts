export interface EducationDegree {
  institution: string;
  degree: string;
  period: string;
  grade: string;
  honors: string;
  logo?: string;
  description: string;
}

export interface CourseModule {
  number: string;
  title: string;
  project: string;
  skills: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  platformText: string;
  date: string;
  verifyUrl: string;
  badgeText: string;
  description: string;
  tools: string[];
  modulesTitle: string;
  modules: CourseModule[];
  isLocalImage?: boolean;
}

export const educationData: EducationDegree[] = [
  {
    institution: "Albukhary International University (AIU)",
    degree: "Bachelor of Computer Science (Honours)",
    period: "Oct 2023 – Nov 2026",
    grade: "CGPA 3.53 / 4.00",
    honors: "Albukhary Foundation Fully Funded Scholarship Recipient",
    logo: "./aiu_logo.png",
    description: "Specialized in Data Science & Artificial Intelligence with strong software development foundations. Focused on machine learning pipelines, full-stack application development, and database architectures."
  },
  {
    institution: "Albukhary International University (AIU)",
    degree: "Foundation in Computing",
    period: "Oct 2022 – Sep 2023",
    grade: "CGPA 3.27 / 4.00",
    honors: "Albukhary Foundation Full Pre-U Scholarship",
    logo: "./aiu_logo.png",
    description: "Comprehensive foundation across programming principles, discrete mathematics, relational databases, data structures, and web technologies."
  }
];

export const certificationsData: Certification[] = [
  {
    id: "deeplearning-genai",
    title: "Generative AI for Software Development",
    issuer: "DeepLearning.AI",
    issuerLogo: "./deeplearning_logo.svg",
    platformText: "3-Course Professional Certificate via Coursera",
    date: "Jun 2026",
    verifyUrl: "https://coursera.org/verify/professional-cert/TRP5PIXN0JQS",
    badgeText: "Verified Credential (ID: TRP5PIXN0JQS)",
    description: "A specialized 3-course professional credential focused on leveraging Large Language Models (LLMs) to augment software engineering workflows, automate code generation, streamline unit testing, and design AI-native system architectures.",
    tools: ["Generative AI", "Prompt Engineering", "System Design", "LLM Selection", "AI Coding Tools"],
    modulesTitle: "3 Specialization Courses & Projects",
    modules: [
      {
        number: "01",
        title: "Introduction to Generative AI for Software Development",
        project: "Prompt-engineering structured code translation, syntax explanations, and automated debugging scenarios.",
        skills: "LLM Selection, Prompt Engineering, Code Explanations, AI-assisted Bug Diagnosis."
      },
      {
        number: "02",
        title: "Team Software Engineering with AI",
        project: "Utilizing LLMs for collaborative planning, automated unit test generation, and generating comprehensive API docs.",
        skills: "AI Code Reviews, Automated Test Generation, API Documentation, Collaborative Git with AI."
      },
      {
        number: "03",
        title: "AI-Powered Software and System Design",
        project: "Designing multi-tier system architectures and implementing resilient design patterns with AI assistance.",
        skills: "AI System Design, Multi-Tier Architectures, Design Patterns, API Integration, Output Verification."
      }
    ],
    isLocalImage: false
  },
  {
    id: "ibm-data-analyst",
    title: "IBM Data Analyst Professional Certificate",
    issuer: "IBM Skills Network",
    issuerLogo: "./ibm_logo.svg",
    platformText: "11-Course Professional Certificate via Coursera",
    date: "May 2026",
    verifyUrl: "https://coursera.org/verify/professional-cert/CLPHAOPC673C",
    badgeText: "Verified Credential (ID: CLPHAOPC673C)",
    description: "A comprehensive 11-course professional credential validating hands-on expertise in data analysis methodologies, relational database querying, interactive dashboard engineering, and Generative AI-enhanced analytics solutions.",
    tools: ["Python", "SQL", "Excel & Cognos", "Pandas", "Scikit-Learn", "Jupyter", "Generative AI"],
    modulesTitle: "11 Specialization Courses (Key Highlights)",
    modules: [
      {
        number: "01",
        title: "Introduction to Data Analytics & Excel Modeling",
        project: "E-Commerce platform analytical study & financial sales channel performance models with Pivot Tables and VLOOKUP.",
        skills: "Data Analytics Lifecycle, Data Cleaning & Wrangling, Pivot Tables, Formulating Business Metrics."
      },
      {
        number: "02",
        title: "Data Visualization & Dashboards (Excel & IBM Cognos)",
        project: "Executive Revenue Dashboard built in IBM Cognos Analytics with interactive drill-down KPIs.",
        skills: "Interactive Dashboard Engineering, KPI Metrics Tracking, Business Intelligence Visualizations."
      },
      {
        number: "03",
        title: "Python for Data Science, AI & Applied Projects",
        project: "Custom web scraping and REST API fetchers for financial telemetry, analyzed in Pandas and Matplotlib.",
        skills: "Python Scripting, Jupyter Notebooks, Requests, BeautifulSoup, Pandas DataFrames."
      },
      {
        number: "04",
        title: "Databases and SQL for Data Science with Python",
        project: "Relational SQL analytics database for urban census datasets with complex JOINs, aggregate queries, and subqueries.",
        skills: "Relational Schema Engineering, Complex SQL Queries, SQLite, PostgreSQL Integration."
      },
      {
        number: "05",
        title: "Data Analysis & Geospatial Visualization with Python",
        project: "Housing market price prediction regression model in Scikit-Learn & interactive geospatial outbreak maps in Folium.",
        skills: "Exploratory Data Analysis (EDA), Linear Regression, Seaborn, Folium, Model Evaluation."
      },
      {
        number: "06",
        title: "IBM Capstone & Generative AI for Analytics",
        project: "Full-scale developer talent insights dashboard and prompt-engineered customer sentiment classification.",
        skills: "REST API Aggregation, Streamlit App Deployment, LLM Prompting, Automated Code Gen."
      }
    ],
    isLocalImage: false
  },
  {
    id: "technexus-mern",
    title: "Full MERN Stack Bootcamp",
    issuer: "TechNexus — School of Computing & Informatics (AIU)",
    issuerLogo: "./technexus_logo.png",
    platformText: "Intensive Full-Stack Web Development Bootcamp",
    date: "Issued 10/11/2025",
    verifyUrl: "./technexus_cert.png",
    badgeText: "Bootcamp Honors & Verified Certificate",
    description: "An intensive training program focused on full-stack web application engineering, covering front-end and back-end development with HTML, CSS, JavaScript, React.js, Node.js, Express, and MongoDB. Includes hands-on project design, REST API creation, database integration, and working on real-world projects.",
    tools: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript ES6+", "RESTful APIs"],
    modulesTitle: "4 Bootcamp Syllabus Modules & Real-World Projects",
    modules: [
      {
        number: "01",
        title: "Front-End Responsive Architecture",
        project: "Interactive Portfolio Dashboard with custom Glassmorphism UI & responsive layout.",
        skills: "Semantic HTML5, CSS Flexbox & Grid, Modern ES6+ JavaScript, DOM Manipulation, CSS Variables."
      },
      {
        number: "02",
        title: "React.js Single Page Applications (SPA)",
        project: "Movie Catalog & Streaming Web Application with dynamic TMDB API integration.",
        skills: "Component Architecture, Hooks (useState, useEffect), React Router, Context API, State Management."
      },
      {
        number: "03",
        title: "Back-End Web Service Engineering",
        project: "Secure Authentication RESTful API with JSON Web Tokens (JWT) & password encryption.",
        skills: "Node.js runtime, Express.js middleware, Route Controllers, Token-based Auth, Error Handling, CORS."
      },
      {
        number: "04",
        title: "Database Integration & Cloud Deployment",
        project: "Full-Stack CRUD Application connected to MongoDB Atlas and deployed to cloud hosting.",
        skills: "MongoDB Schemas, Mongoose ODM, Database Indexing, Environment Variables, Cloud Deployment."
      }
    ],
    isLocalImage: true
  }
];
