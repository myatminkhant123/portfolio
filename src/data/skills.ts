export interface Skill {
  name: string;
  level: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: Skill[];
}

export interface SpecificTool {
  id: string;
  name: string;
  category: 'languages' | 'frameworks' | 'databases' | 'cloud' | 'enterprise';
  categoryLabel: string;
  level: 'Advanced' | 'Proficient' | 'Production';
  brandColor: string;
  description: string;
  iconType: string;
}

export const specificToolsData: SpecificTool[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    categoryLabel: 'Languages & AI',
    level: 'Advanced',
    brandColor: '#3776AB',
    description: 'Data science & ML modeling (Scikit-Learn, Pandas, NumPy), automated pipelines, and REST APIs.',
    iconType: 'python'
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    categoryLabel: 'Languages',
    level: 'Proficient',
    brandColor: '#E76F51',
    description: 'Object-oriented software engineering, system design patterns, and enterprise backend architectures.',
    iconType: 'java'
  },
  {
    id: 'typescript',
    name: 'TypeScript & JavaScript',
    category: 'languages',
    categoryLabel: 'Languages & Web',
    level: 'Advanced',
    brandColor: '#3178C6',
    description: 'Strongly-typed frontends, reactive component architectures, async event handling, and ES6+ standards.',
    iconType: 'typescript'
  },
  {
    id: 'react',
    name: 'React 18 / 19',
    category: 'frameworks',
    categoryLabel: 'Frontend Framework',
    level: 'Advanced',
    brandColor: '#61DAFB',
    description: 'Component lifecycles, custom hooks (useState, useEffect), Tailwind CSS styling, and single-page apps.',
    iconType: 'react'
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'frameworks',
    categoryLabel: 'Backend Framework',
    level: 'Proficient',
    brandColor: '#68A063',
    description: 'Scalable RESTful API engineering, middleware pipelines, JWT auth, and server-side request routing.',
    iconType: 'nodejs'
  },
  {
    id: 'sql',
    name: 'MySQL & MS SQL Server',
    category: 'databases',
    categoryLabel: 'Relational Database',
    level: 'Advanced',
    brandColor: '#00758F',
    description: 'Relational schema normalization, T-SQL query optimization, indexing, and enterprise backup audits.',
    iconType: 'sql'
  },
  {
    id: 'mongodb',
    name: 'MongoDB & Mongoose',
    category: 'databases',
    categoryLabel: 'NoSQL Database',
    level: 'Advanced',
    brandColor: '#47A248',
    description: 'Document data modeling, aggregation pipelines, Atlas cloud clusters, and Mongoose ODM validation.',
    iconType: 'mongodb'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    categoryLabel: 'DevOps & Containers',
    level: 'Proficient',
    brandColor: '#2496ED',
    description: 'Multi-stage Dockerfile builds, container orchestration, and isolated reproducible development environments.',
    iconType: 'docker'
  },
  {
    id: 'linux',
    name: 'Linux / Bash Scripting',
    category: 'cloud',
    categoryLabel: 'System Infrastructure',
    level: 'Advanced',
    brandColor: '#FCC624',
    description: 'Linux systems administration, automated bash scripting, server security patching, and cron maintenance.',
    iconType: 'linux'
  },
  {
    id: 'git',
    name: 'Git & GitHub CI/CD',
    category: 'cloud',
    categoryLabel: 'DevOps & Tooling',
    level: 'Advanced',
    brandColor: '#f3f4f6',
    description: 'Branching strategies, collaborative pull requests, release versioning, and automated GitHub Actions.',
    iconType: 'git'
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Workers & D1',
    category: 'cloud',
    categoryLabel: 'Edge Serverless',
    level: 'Proficient',
    brandColor: '#F38020',
    description: 'Sub-50ms edge serverless functions, serverless SQLite edge databases, and global R2 object storage.',
    iconType: 'cloudflare'
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'languages',
    categoryLabel: 'Languages & Web',
    level: 'Proficient',
    brandColor: '#777BB4',
    description: 'Server-side scripting, dynamic web application development, and database-driven query processing.',
    iconType: 'php'
  },
  {
    id: 'servicenow',
    name: 'ServiceNow (ITSM)',
    category: 'enterprise',
    categoryLabel: 'Enterprise Operations',
    level: 'Proficient',
    brandColor: '#81B924',
    description: 'IT Service Management incident workflows, system change tickets, CMDB records, and SLA tracking.',
    iconType: 'servicenow'
  },
  {
    id: 'dynatrace',
    name: 'Dynatrace APM',
    category: 'enterprise',
    categoryLabel: 'Observability & APM',
    level: 'Proficient',
    brandColor: '#1496FF',
    description: 'Application performance diagnostics, real-time memory/CPU metrics, and automated root-cause detection.',
    iconType: 'dynatrace'
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    category: 'enterprise',
    categoryLabel: 'Analytics & BI',
    level: 'Advanced',
    brandColor: '#F2C811',
    description: 'Interactive business intelligence dashboards, DAX queries, data transformations, and executive reports.',
    iconType: 'powerbi'
  },
  {
    id: 'excel',
    name: 'Microsoft Excel',
    category: 'enterprise',
    categoryLabel: 'Data & Modeling',
    level: 'Advanced',
    brandColor: '#107C41',
    description: 'Advanced spreadsheets, pivot tables, VLOOKUP/INDEX-MATCH, and business financial cash flow modeling.',
    iconType: 'excel'
  },
  {
    id: 'scikit',
    name: 'Scikit-Learn & ML',
    category: 'frameworks',
    categoryLabel: 'AI & Data Science',
    level: 'Advanced',
    brandColor: '#F89939',
    description: 'Supervised predictive modeling (Random Forest, XGBoost), SMOTE class rebalancing, and SHAP explainability.',
    iconType: 'scikit'
  }
];

export const skillCategoriesData: SkillCategory[] = [
  {
    title: "Full-Stack Web Engineering",
    iconName: "Code2",
    description: "Modern reactive web apps, component architectures, and responsive full-stack interfaces.",
    skills: [
      { name: "React 18 / 19", level: "Advanced", highlight: true },
      { name: "TypeScript", level: "Proficient", highlight: true },
      { name: "Node.js & Express", level: "Proficient", highlight: true },
      { name: "MongoDB & Mongoose", level: "Advanced", highlight: true },
      { name: "Tailwind CSS", level: "Advanced", highlight: true },
      { name: "RESTful API Design", level: "Advanced", highlight: true },
      { name: "Vite & Modern Tooling", level: "Advanced" },
      { name: "Zod Schema Validation", level: "Proficient" }
    ]
  },
  {
    title: "Artificial Intelligence & LLMs",
    iconName: "BrainCircuit",
    description: "Agentic AI workflows, natural language processing, and prompt engineering solutions.",
    skills: [
      { name: "Agentic AI Workflows", level: "Proficient", highlight: true },
      { name: "NLP Sentiment Classification", level: "Advanced", highlight: true },
      { name: "Prompt Engineering", level: "Advanced", highlight: true },
      { name: "TF-IDF Vectorization", level: "Advanced" },
      { name: "PyTorch & Deep Learning", level: "Proficient" },
      { name: "Convolutional Neural Networks", level: "Proficient" },
      { name: "Streamlit UI Deployment", level: "Advanced", highlight: true },
      { name: "Hugging Face Models", level: "Proficient" }
    ]
  },
  {
    title: "Data Science & Machine Learning",
    iconName: "Cpu",
    description: "Supervised predictive modeling, statistical feature engineering, and model explainability.",
    skills: [
      { name: "Python", level: "Advanced", highlight: true },
      { name: "Scikit-Learn", level: "Advanced", highlight: true },
      { name: "Pandas & NumPy", level: "Advanced", highlight: true },
      { name: "Supervised ML (XGBoost / RF)", level: "Advanced", highlight: true },
      { name: "SHAP Explainability", level: "Proficient", highlight: true },
      { name: "SMOTE Class Imbalance", level: "Advanced" },
      { name: "Data Visualization & EDA", level: "Advanced" },
      { name: "Statistical Hypothesis Testing", level: "Proficient" }
    ]
  },
  {
    title: "Databases & Cloud Architecture",
    iconName: "Database",
    description: "Relational data modeling, SQL optimization, and edge serverless backends.",
    skills: [
      { name: "MySQL", level: "Advanced", highlight: true },
      { name: "Microsoft SQL Server", level: "Advanced", highlight: true },
      { name: "Cloudflare Workers & D1", level: "Proficient", highlight: true },
      { name: "T-SQL Query Optimization", level: "Proficient" },
      { name: "Cloudflare R2 Object Store", level: "Proficient" },
      { name: "Git & GitHub CI/CD", level: "Advanced", highlight: true },
      { name: "Database Schema Normalization", level: "Advanced" }
    ]
  },
  {
    title: "Leadership & Enterprise Operations",
    iconName: "Briefcase",
    description: "Technical mentorship, business management, and cross-functional team execution.",
    skills: [
      { name: "Technical Mentorship", level: "Advanced", highlight: true },
      { name: "Fluent English Communication", level: "Native / Fluent", highlight: true },
      { name: "Business Cash Flow Management", level: "Advanced" },
      { name: "ITSM Incident Management", level: "Proficient" },
      { name: "Cross-Functional Execution", level: "Advanced", highlight: true },
      { name: "Vendor Logistics & Success", level: "Advanced" },
      { name: "Agile & Project Coordination", level: "Proficient" }
    ]
  }
];
