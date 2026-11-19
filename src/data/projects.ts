export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: 'web' | 'data' | 'iot';
  featured: boolean;
  date: string;
  description: string;
  highlights: string[];
  techStack: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  statusBadge?: string;
}

export const projectsData: Project[] = [
  {
    id: "kcc",
    title: "Kedah Community Connect (KCC)",
    subtitle: "Sistem Aduan Komuniti Negeri Kedah Darul Aman",
    category: "web",
    featured: true,
    date: "2026 – Present",
    description: "Cloud-first, serverless civic issue reporting and service tracking web platform bridging citizens across Kedah's 12 districts with Local Authorities (PBT) and state agencies (JKR, Health, Landscape).",
    highlights: [
      "Civic Traceability: Centralized digital channel for neighborhood issue reporting with formal triage and resolution handoffs.",
      "Server-Side RBAC: Strict 3-tier permissions for Residents, Admins, and Department Officers with immutable audit trails.",
      "Edge Architecture: Modular monolith on Cloudflare Workers, Hono, D1 relational SQL (10 tables), and private R2 storage."
    ],
    techStack: ["React 18", "TypeScript", "Hono", "Cloudflare Workers", "Cloudflare D1 & R2", "Tailwind CSS"],
    image: "/kcc_preview.svg",
    demoUrl: "https://kedah-community-connect-kcc.vercel.app/",
    statusBadge: "Live Platform"
  },
  {
    id: "aiu-postgrad",
    title: "AIU Postgraduate Monitoring System",
    subtitle: "Final Year Capstone Project",
    category: "web",
    featured: true,
    date: "Aug 2025 – Mar 2026",
    description: "Role-based multi-user academic workflow and thesis monitoring platform designed for university faculty and supporting 500+ postgraduate students.",
    highlights: [
      "Workflows & Journeys: Formulated role-based user journeys and approval state transitions for faculty and students.",
      "RBAC & Security: Implemented strict permission checkpoints for supervisors, examiners, and graduate coordinators.",
      "Platform Reliability: Validated key submission milestones, automated reminders, and defect logging."
    ],
    techStack: ["React.js", "Web Platform", "RBAC Auth", "Database Design", "500+ Users"],
    image: "/thumb3.webp",
    statusBadge: "Final Year Project"
  },
  {
    id: "greenhouse-iot",
    title: "Smart Greenhouse Monitoring System",
    subtitle: "IoT & Precision Agriculture",
    category: "iot",
    featured: true,
    date: "Jan 2026 – Feb 2026",
    description: "End-to-end IoT monitoring system tracking ambient temperature, humidity, soil moisture, and gas levels using ESP32 microcontrollers and industrial sensor arrays.",
    highlights: [
      "Sensor Integration: Interfaced DHT22, soil capacitive, and gas sensors with low-latency analog sampling.",
      "Edge Decision Logic: Programmed local microsecond response logic for irrigation relays and hazardous alert buzzers.",
      "Live Cloud Telemetry: Streamed structured JSON payloads via MQTT to ThingsBoard for real-time dashboard analytics."
    ],
    techStack: ["ESP32", "C++ / MicroPython", "IoT Sensors", "MQTT", "ThingsBoard"],
    image: "/greenhouse_schematic.png",
    githubUrl: "https://github.com/rominswe/smart_agriculture-greenhouse_monitoring",
    statusBadge: "Hardware & Cloud"
  },
  {
    id: "chatgpt-analyzer",
    title: "ChatGPT App Review Analyzer",
    subtitle: "Natural Language Processing Pipeline",
    category: "data",
    featured: false,
    date: "Nov 2025 – Jan 2026",
    description: "End-to-end NLP sentiment classification pipeline categorizing 2,290+ real-world user reviews via multi-model machine learning benchmarking.",
    highlights: [
      "Text Processing: Engineered regex tokenization, stopword cleaning, and TF-IDF n-gram vector representations.",
      "Model Benchmarking: Evaluated Linear SVM, Naive Bayes, and Logistic Regression, achieving 80.22% peak test accuracy.",
      "Interactive Deployment: Packaged trained estimators into a real-time inference web application with confusion matrix diagnostics."
    ],
    techStack: ["Python", "Scikit-Learn", "TF-IDF", "Linear SVM", "Streamlit"],
    image: "/thumb_chatgpt.webp",
    demoUrl: "https://chatgptsentimentanalysis.streamlit.app/",
    githubUrl: "https://github.com/myatminkhant123/sentiment_analysis-.git",
    statusBadge: "NLP Pipeline"
  },
  {
    id: "handwriting-cnn",
    title: "Offline Handwriting Classifier",
    subtitle: "Deep Learning Computer Vision",
    category: "data",
    featured: false,
    date: "Dec 2025 – Jan 2026",
    description: "Convolutional Neural Network writer classifier spanning 70 distinct classes, specifically optimized for lightweight offline CPU execution.",
    highlights: [
      "CNN Architecture: Designed multi-stage convolutional and pooling blocks optimized for grayscale character contours.",
      "Reproducible Tooling: Authored end-to-end CLI scripts (train.py, run.py, analyze.py) for reproducible test evaluation.",
      "Error Diagnosis: Generated multi-class confusion matrices to systematically identify high-similarity penmanship overlaps."
    ],
    techStack: ["Python", "PyTorch / Keras", "CNN", "OpenCV", "NumPy"],
    image: "/thumb3.webp",
    statusBadge: "Computer Vision"
  },
  {
    id: "song-popularity",
    title: "Song Popularity Predictor",
    subtitle: "Ensemble ML & Explainability",
    category: "data",
    featured: false,
    date: "Oct 2025 – Dec 2025",
    description: "Integrated Spotify API audio features with historical Billboard Hot 100 metrics to classify track hit probabilities with SHAP model explainability.",
    highlights: [
      "Feature Engineering: Merged acousticness, danceability, tempo, and chart position into normalized training matrices.",
      "Predictive Accuracy: Achieved 91% F1-score with fine-tuned XGBoost alongside KMeans track clustering.",
      "SHAP Interpretability: Isolated individual feature attribution to explain driving factors behind song virality."
    ],
    techStack: ["Python", "XGBoost", "KMeans", "SHAP", "Scikit-Learn"],
    image: "/earphone.webp",
    demoUrl: "https://songpopularitypredictionmlproject.streamlit.app/",
    githubUrl: "https://github.com/myatminkhant123/Song_Popularity_Prediction_ML_Project",
    statusBadge: "XGBoost & SHAP"
  },
  {
    id: "fraud-detection",
    title: "Credit Card Fraud Anomaly Detection",
    subtitle: "Imbalanced Financial ML",
    category: "data",
    featured: false,
    date: "Sep 2025 – Nov 2025",
    description: "Dual-purpose financial security system mitigating extreme class imbalance (99.8% non-fraud vs 0.2% fraud) paired with Market Basket Recommendation.",
    highlights: [
      "Imbalance Handling: Applied SMOTE and stratified resampling to prevent majority-class bias in anomaly identification.",
      "High Precision: Deployed Random Forest classification reaching 95.8% precision on simulated financial transaction streams.",
      "Retail Analytics: Incorporated Apriori association rule mining for personalized financial product recommendations."
    ],
    techStack: ["Python", "Random Forest", "SMOTE", "Pandas", "Scikit-Learn"],
    image: "/thumb2.webp",
    githubUrl: "https://github.com/myatminkhant123/Credit_Card_Fraud_Detection_and_Customer_Personalization",
    statusBadge: "Anomaly Detection"
  },
  {
    id: "fifa-prediction",
    title: "FIFA World Cup Match Predictor",
    subtitle: "Sports Predictive Modeling",
    category: "data",
    featured: false,
    date: "Jul 2025 – Sep 2025",
    description: "End-to-end match outcome prediction application trained on decades of international FIFA tournament metrics with stratified cross-validation.",
    highlights: [
      "Contextual Metrics: Synthesized squad global rankings, goal differential averages, and tournament pressure factors.",
      "Cross-Validation: Achieved 98.6% cross-validated accuracy across balanced multi-class outcome splits (Win/Loss/Draw).",
      "Interactive GUI: Delivered a real-time matchup simulator web app predicting tournament knockout brackets."
    ],
    techStack: ["Python", "Random Forest", "Pandas", "Streamlit"],
    image: "/thumb1.webp",
    demoUrl: "https://fifawcmatchprediction.streamlit.app/",
    githubUrl: "https://github.com/myatminkhant123/FIFA_WorldCup2022_Match_Prediction",
    statusBadge: "Predictive Analytics"
  }
];
