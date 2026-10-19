"use client";

// @ts-nocheck
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ChevronRight,
  ArrowUpRight,
  ArrowUp,
  Briefcase,
  GraduationCap,
  Code2,
  Database,
  BarChart3,
  BrainCircuit,
  Layers,
  Check,
  Copy,
  Menu,
  X,
  Search,
  Send,
  CheckCircle2,
  Loader2,
  Award,
  TrendingUp,
  Cpu,
  FileText,
  Eye,
  Terminal,
  ShieldCheck,
  Calendar,
  Globe,
  LineChart,
  PieChart,
  Activity
} from 'lucide-react';

// ============================================================================
// FLUID SPRING-PHYSICS ANIMATION PRIMITIVES (SANDBOX-SAFE & ZERO-DEPENDENCY)
// Supports initial, whileInView, animate, whileHover, transition, viewport
// with smooth blur-to-clear and spring cubic-bezier interpolation
// ============================================================================
function useInView(options = { once: true, amount: 0.12 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once) observer.unobserve(node);
        } else if (!options.once) {
          setIsInView(false);
        }
      },
      { threshold: options.amount || 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options.once, options.amount]);

  return [ref, isInView];
}

function createMotionComponent(Tag: any) {
  return React.forwardRef(function MotionComponent(
    {
      initial,
      whileInView,
      animate,
      whileHover,
      whileTap,
      transition = {},
      viewport = { once: true, amount: 0.12 },
      style = {},
      className = '',
      children,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...rest
    },
    forwardedRef
  ) {
    const [inViewRef, isInView] = useInView(viewport);
    const [isHovered, setIsHovered] = useState(false);
    const [isTapped, setIsTapped] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      const t = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(t);
    }, []);

    const setRefs = (node) => {
      inViewRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    const activeTarget = useMemo(() => {
      let target = {};
      if (initial && !mounted) {
        target = { ...initial };
      } else if (whileInView) {
        target = isInView ? { ...initial, ...whileInView } : { ...(initial || {}) };
      } else if (animate) {
        target = mounted ? { ...(initial || {}), ...animate } : { ...(initial || {}) };
      }
      if (isHovered && whileHover) {
        target = { ...target, ...whileHover };
      }
      if (isTapped && whileTap) {
        target = { ...target, ...whileTap };
      }
      return target;
    }, [initial, whileInView, animate, whileHover, whileTap, isInView, isHovered, isTapped, mounted]);

    const duration = transition.duration ?? 0.65;
    const delay = isHovered || isTapped ? 0 : transition.delay ?? 0;
    const ease = transition.ease || 'cubic-bezier(0.16, 1, 0.3, 1)';

    const transforms = [];
    if (activeTarget.x !== undefined) transforms.push(`translate3d(${typeof activeTarget.x === 'number' ? `${activeTarget.x}px` : activeTarget.x}, 0, 0)`);
    if (activeTarget.y !== undefined) transforms.push(`translate3d(0, ${typeof activeTarget.y === 'number' ? `${activeTarget.y}px` : activeTarget.y}, 0)`);
    if (activeTarget.scale !== undefined) transforms.push(`scale3d(${activeTarget.scale}, ${activeTarget.scale}, 1)`);
    if (activeTarget.rotate !== undefined) transforms.push(`rotate(${activeTarget.rotate}deg)`);

    const isRevealed = activeTarget.opacity === undefined || activeTarget.opacity > 0.5;

    const computedStyle = {
      ...style,
      opacity: activeTarget.opacity !== undefined ? activeTarget.opacity : style.opacity,
      transform: transforms.length > 0 ? transforms.join(' ') : style.transform,
      filter: isRevealed ? 'blur(0px)' : 'blur(4px)',
      transition: `opacity ${duration}s ${ease} ${delay}s, transform ${duration}s ${ease} ${delay}s, filter ${duration}s ${ease} ${delay}s, border-color 0.35s ${ease}, box-shadow 0.35s ${ease}, background-color 0.35s ${ease}`,
      willChange: 'opacity, transform, filter'
    };

    return (
      <Tag
        ref={setRefs}
        className={className}
        style={computedStyle}
        onMouseEnter={(e) => {
          setIsHovered(true);
          if (onMouseEnter) onMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          setIsTapped(false);
          if (onMouseLeave) onMouseLeave(e);
        }}
        onMouseDown={(e) => {
          setIsTapped(true);
          if (onMouseDown) onMouseDown(e);
        }}
        onMouseUp={(e) => {
          setIsTapped(false);
          if (onMouseUp) onMouseUp(e);
        }}
        {...rest}
      >
        {children}
      </Tag>
    );
  });
}

const motion = {
  div: createMotionComponent('div'),
  section: createMotionComponent('section'),
  header: createMotionComponent('header'),
  nav: createMotionComponent('nav'),
  span: createMotionComponent('span'),
  p: createMotionComponent('p'),
  h1: createMotionComponent('h1'),
  h2: createMotionComponent('h2'),
  h3: createMotionComponent('h3'),
  a: createMotionComponent('a'),
  button: createMotionComponent('button'),
  article: createMotionComponent('article')
};

// ============================================================================
// PORTFOLIO ASSETS & DATA ANALYST CONTENT SPECIFICATIONS
// ============================================================================
const PROFILE_IMAGE_SRC = "/assets/om-kapdoskar.jpg";
const VT_EMBLEM_SRC = "/assets/vt-emblem.png";
const MPSTME_EMBLEM_SRC = "/assets/mpstme-emblem.png";

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

const MARQUEE_ITEMS = [
  'SQL (MySQL & SQLite)',
  'Microsoft Power BI',
  'Tableau',
  'Python (pandas, NumPy, SciPy)',
  'Adobe Analytics',
  'Customer Churn & Retention Modeling',
  'A/B Testing & Experimentation',
  'Economic & NPV Modeling ($158K NPV)',
  'NLP & Sentiment Analysis',
  'Fama-French 3-Factor & VaR (95%/99%)',
  'PCA & K-Means Clustering',
  'SAS Visual Analytics & JMP Pro',
  'Automated ETL Pipelines'
];

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    handle: '/in/omkapdoskar',
    url: 'https://www.linkedin.com/in/omkapdoskar/',
    icon: Linkedin,
    accent: 'hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-[0_0_24px_rgba(6,182,212,0.22)]'
  },
  {
    name: 'GitHub',
    handle: '@Om-Kapdoskar',
    url: 'https://github.com/Om-Kapdoskar/',
    icon: Github,
    accent: 'hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.22)]'
  },
  {
    name: 'X (Twitter)',
    handle: '@OmKapdoskar',
    url: 'https://x.com/OmKapdoskar',
    icon: Twitter,
    accent: 'hover:border-sky-500/50 hover:text-sky-400 hover:shadow-[0_0_24px_rgba(14,165,233,0.22)]'
  },
  {
    name: 'Instagram',
    handle: '@om.kapdoskar',
    url: 'https://www.instagram.com/om.kapdoskar/',
    icon: Instagram,
    accent: 'hover:border-indigo-500/50 hover:text-indigo-400 hover:shadow-[0_0_24px_rgba(99,102,241,0.22)]'
  }
];

const SKILL_CATEGORIES = [
  {
    id: 'bi-viz',
    title: 'Analytics & BI Platforms',
    subtitle: 'Executive dashboarding, KPI scorecards & visual storytelling',
    icon: BarChart3,
    accentColor: 'from-emerald-500/20 to-cyan-500/10',
    borderAccent: 'hover:border-emerald-500/40',
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    skills: [
      'Tableau',
      'Power BI',
      'Adobe Analytics',
      'SAS Visual Analytics',
      'JMP Pro'
    ]
  },
  {
    id: 'business-product',
    title: 'Data & Statistical Skills',
    subtitle: 'Churn & retention analytics, experimentation, feature engineering & NPV',
    icon: TrendingUp,
    accentColor: 'from-cyan-500/20 to-sky-500/10',
    borderAccent: 'hover:border-cyan-500/40',
    badgeClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    skills: [
      'KPI Design',
      'User Retention & Churn Analysis',
      'Statistical Modeling',
      'A/B Testing',
      'Data Cleaning & Feature Engineering',
      'Economic & NPV Modeling',
      'Customer Lifetime Value (CLV)',
      'Product Metrics',
      'Feature Prioritization'
    ]
  },
  {
    id: 'languages',
    title: 'Querying & Programming Languages',
    subtitle: 'Relational database querying, ETL scripting & statistical computing',
    icon: Code2,
    accentColor: 'from-indigo-500/20 to-cyan-500/10',
    borderAccent: 'hover:border-indigo-500/40',
    badgeClass: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25',
    skills: [
      'Python',
      'SQL (MySQL)',
      'R',
      'MATLAB',
      'Java',
      'C/C++',
      'JavaScript',
      'HTML/CSS'
    ]
  },
  {
    id: 'ml-frameworks',
    title: 'Libraries & Frameworks',
    subtitle: 'Data wrangling, clustering, NLP sentiment & automated pipelines',
    icon: BrainCircuit,
    accentColor: 'from-emerald-500/20 to-indigo-500/10',
    borderAccent: 'hover:border-emerald-500/40',
    badgeClass: 'bg-teal-500/10 text-teal-300 border-teal-500/25',
    skills: [
      'pandas',
      'NumPy',
      'scikit-learn',
      'seaborn',
      'Matplotlib',
      'SciPy',
      'NLP / Sentiment Analysis',
      'Flask',
      'Selenium'
    ]
  },
  {
    id: 'engineering-productivity',
    title: 'Developer & Productivity Tools',
    subtitle: 'Spreadsheet modeling, notebooks, version control & AI workflows',
    icon: Layers,
    accentColor: 'from-sky-500/20 to-indigo-500/10',
    borderAccent: 'hover:border-cyan-500/40',
    badgeClass: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    skills: [
      'Excel (VBA)',
      'PowerPoint',
      'Jupyter',
      'PyCharm',
      'VS Code',
      'Git/GitHub',
      'GenAI tools'
    ]
  }
];

const PROJECT_CATEGORIES = [
  'All',
  'Analytics & BI',
  'Data Science & ML',
  'Product & Systems'
];

// Ordered by Data Analytics & BI priority, grounded in OmKapdoskarResume.pdf
const PROJECTS = [
  {
    id: 'green-chef-capstone',
    title: 'Green Chef Packaging & Churn Analytics Capstone',
    period: 'Jan 2026 – May 2026',
    tag: 'Flagship Data Analytics / Churn & BI',
    analyticsPriority: 'Lead Data Analytics Case Study • HelloFresh / Green Chef',
    categories: ['Analytics & BI', 'Data Science & ML'],
    featured: true,
    metrics: [
      { label: 'Q1 Churn Pinpointed', value: '19.2%' },
      { label: 'Combined 3-Yr NPV', value: '$158,030' },
      { label: 'Tier 2 Ongoing ROI', value: '28.4%' },
      { label: 'Payback Period', value: '25.6 Mos' }
    ],
    bars: [
      { label: 'Plastic Reduction Customer Pain Point', pct: 48, display: '48%' },
      { label: 'Ice Pack Disposal Customer Pain Point', pct: 30, display: '30%' },
      { label: 'Tier 2 Sustainable Transition ROI', pct: 28.4, display: '28.4%' }
    ],
    description:
      'Ingested and cleaned 4 large-scale datasets using Python and SQL (619 surveys, 12 months NLP review data, 21,000+ cancellation records, and SAP pricing) to pinpoint packaging as the top driver of customer churn (19.2% of Q1 cancellations).',
    impact:
      'Quantified that plastic reduction (48%) and ice pack disposal (30%) were top customer pain points. Built a 3-year economic model projecting $158,030 combined NPV and 28.4% ongoing ROI (25.6-month payback). Delivered an interactive Power BI dashboard, QR-code recycling webapp prototype, and weather-smart AI packing recommendations integrated with Katana ERP & Pick-to-Light warehouse infrastructure.',
    architecture: [
      'Ingested and cleaned four large-scale data sources using Python and SQL across 619 survey responses, 12 months of NLP review data, 21,000+ cancellation records, and SAP pricing.',
      'Conducted sentiment and frequency analysis on open-ended cancellation comments, quantifying plastic reduction (48%) and ice pack disposal (30%) as primary subscription loss drivers.',
      'Built a 3-year economic model (NPV, ROI, payback period) projecting $158,030 in combined NPV across two packaging tiers; Tier 2 sustainable transition yielded 28.4% ongoing ROI with a 25.6-month payback.',
      'Created an interactive Power BI dashboard, executive PowerPoint deck, and QR-code webapp prototype for zip-code-specific recycling guidance for HelloFresh/Green Chef stakeholders.'
    ],
    stack: ['Power BI', 'SQL', 'Python', 'NLP', 'Financial Modeling', 'Katana ERP'],
    githubUrl: 'https://github.com/Om-Kapdoskar/',
    accent: 'emerald'
  },
  {
    id: 'investment-portfolio-analytics',
    title: 'Investment Portfolio Risk & Performance Analytics',
    period: '2026',
    tag: 'Financial Data Analytics / ETL & Power BI',
    analyticsPriority: 'End-to-End SQL ETL & Power BI Attribution',
    categories: ['Analytics & BI', 'Data Science & ML'],
    featured: true,
    metrics: [
      { label: 'ETL Warehouse', value: 'SQL + SQLite' },
      { label: 'Factor Regression', value: 'Fama-French 3F' },
      { label: 'Tail Risk Metrics', value: '95% / 99% VaR' },
      { label: 'BI & App Layer', value: 'Power BI + Streamlit' }
    ],
    bars: [
      { label: 'Value at Risk Confidence Interval', pct: 99, display: '95% / 99% VaR' },
      { label: 'Multi-Factor Attribution Coverage', pct: 92, display: 'CAPM + 3-Factor' },
      { label: 'Scheduled SQLite ETL Automation', pct: 100, display: '100% Automated' }
    ],
    description:
      'Engineered an automated Python and SQL analytics pipeline that ingests market data, calculates portfolio performance, and stores risk metrics in a structured SQLite database using scheduled ETL workflows.',
    impact:
      'Developed a multi-currency Streamlit application and interactive Power BI dashboard evaluating Sharpe Ratio, Sortino Ratio, CAPM Alpha/Beta, VaR (95%/99%), Maximum Drawdown, Information Ratio, and Fama–French 3-factor regressions.',
    architecture: [
      'Engineered an automated Python and SQL analytics pipeline ingesting market data and storing risk metrics in a structured SQLite database via scheduled ETL workflows.',
      'Developed a Streamlit web application enabling users to construct multi-currency portfolios and evaluate Sharpe Ratio, Sortino Ratio, CAPM Alpha, Beta, VaR (95%/99%), Maximum Drawdown, and Information Ratio.',
      'Implemented rolling benchmark comparison and Fama–French three-factor regression models to quantify systematic versus stock-selection returns.',
      'Built an interactive Power BI dashboard visualizing cumulative returns, benchmark attribution, factor exposures, drawdown analysis, and portfolio KPIs.'
    ],
    stack: ['Power BI', 'SQL', 'Python', 'SQLite', 'Streamlit', 'Financial Econometrics'],
    githubUrl: 'https://github.com/Om-Kapdoskar/',
    accent: 'cyan'
  },
  {
    id: 'amazon-churn-segmentation',
    title: 'Amazon Customer Churn Prediction & Behavioral Segmentation',
    period: '2024',
    tag: 'Customer Retention & Cohort Analytics',
    analyticsPriority: 'Customer Lifecycle & CLV Optimization',
    categories: ['Analytics & BI', 'Data Science & ML'],
    featured: true,
    metrics: [
      { label: 'Customer Cohort', value: '2,000+ Records' },
      { label: 'Dimensionality', value: 'PCA Reduction' },
      { label: 'Segmentation', value: 'K-Means + Hierarchical' },
      { label: 'Business Output', value: 'CLV & Retention' }
    ],
    bars: [
      { label: 'Behavioral Cohort Coverage', pct: 95, display: '2,000+ Records' },
      { label: 'Multi-Model Clustering Validation', pct: 88, display: 'PCA + K-Means' }
    ],
    description:
      'Designed and evaluated machine learning models on a 2,000+ record dataset; applied PCA, K-Means, and hierarchical clustering for feature engineering and behavioral segmentation.',
    impact:
      'Delivered predictive churn risk scores and actionable retention strategies to optimize customer lifetime value (CLV), translating model outputs into concrete business recommendations.',
    architecture: [
      'Feature engineering and Principal Component Analysis (PCA) across 2,000+ customer transaction and behavioral records.',
      'Applied K-Means and hierarchical clustering to isolate distinct customer risk personas and purchasing patterns.',
      'Formulated predictive churn risk scores and concrete retention playbooks to maximize Customer Lifetime Value (CLV).'
    ],
    stack: ['Python', 'scikit-learn', 'Clustering', 'Predictive Analytics', 'CLV Optimization'],
    githubUrl: 'https://github.com/Om-Kapdoskar/',
    accent: 'emerald'
  },
  {
    id: 'market-intelligence-scraper',
    title: 'Competitive Market Intelligence Web Scraper & Pricing Analytics',
    period: '2023',
    tag: 'Data Engineering, ETL & Market Analytics',
    analyticsPriority: 'Automated Competitive Benchmarking Pipeline',
    categories: ['Analytics & BI', 'Product & Systems'],
    featured: false,
    metrics: [
      { label: 'Scale', value: '100s of Listings' },
      { label: 'Pipeline', value: 'Multi-Page Pandas' },
      { label: 'Output Format', value: 'Structured CSV/BI' }
    ],
    description:
      'Engineered an automated scraper extracting and cleaning hotel and restaurant market data across hundreds of listings, storing structured outputs to CSV for seamless analytics integration.',
    impact:
      'Implemented multi-page pagination handling and pandas-based cleaning pipelines, ensuring data completeness and quality for downstream competitive pricing and market share benchmarking.',
    architecture: [
      'Automated Selenium multi-page pagination scraper extracting hotel and restaurant pricing, ratings, and occupancy listings.',
      'pandas data cleaning, deduplication, and schema normalization pipeline ensuring high data completeness.',
      'Structured CSV export layer designed for direct ingestion into BI competitive benchmarking tools.'
    ],
    stack: ['Python', 'pandas', 'Selenium', 'Automated ETL', 'Market Analytics'],
    githubUrl: 'https://github.com/Om-Kapdoskar/',
    accent: 'cyan'
  },
  {
    id: 'facial-recognition-attendance',
    title: 'Facial Recognition Attendance & Workforce Analytics System',
    period: '2024',
    tag: 'MySQL Telemetry & Web Analytics App',
    analyticsPriority: 'Real-Time SQL Logging & Reporting',
    categories: ['Data Science & ML', 'Product & Systems'],
    featured: false,
    metrics: [
      { label: 'Database', value: 'MySQL Relational' },
      { label: 'Web Interface', value: 'Flask Dashboard' },
      { label: 'Vision Engine', value: 'Real-Time OpenCV' }
    ],
    description:
      'Built a real-time ML-powered facial recognition attendance tracker using OpenCV; integrated MySQL for secure employee record management and developed a Flask web interface for end-user access.',
    impact:
      'Automated employee attendance logging and audit reporting by connecting real-time biometric detection to a relational MySQL database and Flask analytics portal.',
    architecture: [
      'Real-time OpenCV facial detection and recognition pipeline streaming verified attendance events.',
      'Relational MySQL database schema managing employee records, timestamps, and attendance logs.',
      'Accessible Flask web interface for live attendance monitoring and reporting.'
    ],
    stack: ['MySQL', 'Python', 'Flask', 'OpenCV'],
    githubUrl: 'https://github.com/Om-Kapdoskar/',
    accent: 'indigo'
  },
  {
    id: 'haply-robotics-blender',
    title: '3D Mouse Integration for Blender (Haply Robotics Capstone)',
    period: 'Jul 2024 – Jan 2025',
    tag: 'Spatial Telemetry & Product Engineering',
    analyticsPriority: 'Industry Capstone • Haply Robotics',
    categories: ['Product & Systems'],
    featured: false,
    metrics: [
      { label: 'Telemetry Stream', value: '6DoF Spatial' },
      { label: 'Partner', value: 'Haply Robotics' },
      { label: 'Integration', value: 'Blender Python API' }
    ],
    description:
      'Developed and unit-tested custom Python add-ons for Blender to ensure accuracy in 6DoF 3D mouse object manipulation, camera navigation, and sculpting workflows.',
    impact:
      'Collaborated directly with Haply Robotics to incorporate industry requirements, tailoring haptic device functionality for real-world use cases in 3D design pipelines.',
    architecture: [
      'Developed and unit-tested custom Python add-ons for Blender enabling accurate 3D mouse object manipulation, camera navigation, and digital sculpting.',
      'Translated real-time 6DoF hardware telemetry into responsive viewport transformations.',
      'Collaborated directly with Haply Robotics engineering stakeholders to align haptic device functionality with production 3D workflows.'
    ],
    stack: ['Python', 'Blender API', 'Haptics Integration', 'Hardware-Software UX'],
    githubUrl: 'https://github.com/Om-Kapdoskar/',
    accent: 'indigo'
  }
];

const EXPERIENCE = [
  {
    id: 'capgemini-intern',
    role: 'Data Science Intern',
    company: 'Capgemini',
    period: 'May 2023 – Jul 2023',
    location: 'Mumbai, India',
    type: 'Enterprise Data Analytics, Web Funnel Intelligence & Automated KPI Dashboards',
    highlights: [
      'Leveraged Adobe Analytics for data ingestion and mining of website traffic and user behavior data, surfacing actionable insights that informed C-suite strategy and improved conversion targeting.',
      'Engineered robust KPI features from raw web traffic data, performing data modeling to validate user retention and conversion trends and power business optimization models with measurable accuracy gains.',
      'Built automated KPI dashboards in Adobe Analytics enabling real-time, evidence-based decision-making for senior leadership; reduced manual reporting effort and accelerated go-to-market response cycles.'
    ],
    analyticsPillars: [
      {
        title: 'Data Ingestion & Traffic Mining',
        tool: 'Adobe Analytics',
        detail: 'Ingested and mined high-volume website traffic and user behavior telemetry to inform C-suite digital strategy and conversion targeting.'
      },
      {
        title: 'KPI Feature Engineering & Modeling',
        tool: 'Retention & Conversion',
        detail: 'Engineered robust KPI features from raw web traffic data to validate user retention and conversion trends with measurable accuracy gains.'
      },
      {
        title: 'Real-Time Executive KPI Dashboards',
        tool: 'Automated BI',
        detail: 'Built automated KPI dashboards enabling real-time, evidence-based decision-making, reducing manual reporting effort and accelerating go-to-market cycles.'
      }
    ],
    metrics: [
      { label: 'Analytics Platform', value: 'Adobe Analytics' },
      { label: 'Core Modeling Focus', value: 'Retention & Conversion KPIs' },
      { label: 'Executive Outcome', value: 'Real-Time GTM Dashboards' }
    ],
    skills: ['Adobe Analytics', 'KPI Design', 'Data Modeling', 'User Retention', 'Conversion Optimization', 'Executive BI Dashboards', 'Python', 'SQL']
  }
];

const EDUCATION = [
  {
    id: 'vt-msba',
    institution: 'Virginia Tech, Pamplin College of Business',
    shortSchool: 'Virginia Tech',
    emblem: VT_EMBLEM_SRC,
    emblemAlt: 'Virginia Tech Seal',
    emblemBg: 'bg-[#030712] border-[#E5751F]/50',
    location: 'Virginia, USA',
    degree: 'M.S., Business Administration',
    gpa: '3.92/4.00',
    honors: 'Summa Cum Laude',
    period: 'Aug 2025 – May 2026',
    badgeColor: 'from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-emerald-500/30',
    highlights: [
      'Lead Data Analyst on the HelloFresh / Green Chef Packaging & Churn Analytics Capstone (21,000+ records, $158,030 NPV model, Power BI dashboard).',
      'Advanced coursework in statistical business modeling, corporate analytics, financial econometrics, and executive decision strategy.'
    ]
  },
  {
    id: 'vt-bsbit',
    institution: 'Virginia Tech, Pamplin College of Business',
    shortSchool: 'Virginia Tech',
    emblem: VT_EMBLEM_SRC,
    emblemAlt: 'Virginia Tech Seal',
    emblemBg: 'bg-[#030712] border-[#E5751F]/50',
    location: 'Virginia, USA',
    degree: 'B.S., Business Information Technology — Cybersecurity Management Analytics',
    gpa: '3.91/4.00',
    honors: 'First Honors Graduate',
    period: 'Aug 2024 – May 2025',
    badgeColor: 'from-cyan-500/20 to-sky-500/20 text-cyan-300 border-cyan-500/30',
    highlights: [
      'Specialized in decision support systems, enterprise data analytics, quantitative risk modeling, and analytics governance.'
    ]
  },
  {
    id: 'mpstme-btech',
    institution: 'Mukesh Patel School of Technology Management & Engineering',
    shortSchool: "SVKM's NMIMS",
    emblem: MPSTME_EMBLEM_SRC,
    emblemAlt: "SVKM's NMIMS Mukesh Patel Emblem",
    emblemBg: 'bg-white border-white/40',
    location: 'Mumbai, India',
    degree: 'B.Tech, Computer Science & Engineering (Data Science)',
    gpa: '3.42/4.00',
    honors: 'Data Science Specialization',
    period: 'Aug 2021 – May 2024',
    badgeColor: 'from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/30',
    highlights: [
      'Rigorous foundation in SQL database systems, statistical modeling, machine learning, data cleaning, and Python analytics pipelines.'
    ]
  }
];

const ROLE_PILLARS = [
  {
    role: 'Data Analyst',
    tagline: 'Primary Specialization — SQL, Python, Tableau, Power BI & Statistical Modeling',
    points: [
      'Pinpointed 19.2% Q1 churn driver across 21,000+ cancellation records, 619 surveys & 12 months of NLP review data for Green Chef.',
      'Engineered automated SQL + Python ETL pipelines feeding interactive Power BI, Tableau, Adobe Analytics, and Streamlit dashboards.',
      'Built KPI feature models and automated real-time Adobe Analytics dashboards at Capgemini to guide C-suite conversion and retention strategy.'
    ]
  },
  {
    role: 'Business Analyst',
    tagline: 'Translating Quantitative Insights into Economic Models & P&L ROI',
    points: [
      'Built a 3-year economic model projecting $158,030 combined NPV and 28.4% ongoing ROI (25.6-month payback) for Green Chef / HelloFresh.',
      'Quantified systematic vs. stock-selection returns via rolling Fama-French 3-factor regressions and 95%/99% Value at Risk (VaR).',
      'Bridged technical data findings with executive recommendations across Katana ERP, Pick-to-Light warehouse ops, and C-suite leadership.'
    ]
  },
  {
    role: 'Associate Product Manager',
    tagline: 'Data-Driven Feature Prioritization, Experimentation & User Retention',
    points: [
      'Designed weather-smart AI packing product workflows and a zip-code QR-code recycling webapp prototype for Green Chef subscribers.',
      'Delivered unit-tested 6DoF haptic 3D mouse Blender add-ons in direct collaboration with Haply Robotics.',
      'Applied PCA, K-Means clustering, and A/B testing to optimize Customer Lifetime Value (CLV) and lifecycle retention.'
    ]
  }
];

// ============================================================================
// HELPER: CLIPBOARD & DOWNLOAD UTILITIES
// ============================================================================
function copyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch (err) {
    return false;
  }
}

function triggerResumeDownload() {
  const resumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Om Kapdoskar — Data Analyst Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  body { font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif; color: #0f172a; max-width: 820px; margin: 32px auto; padding: 0 24px; line-height: 1.45; font-size: 13px; }
  h1 { font-size: 26px; margin: 0 0 4px 0; color: #030712; letter-spacing: -0.5px; }
  .subtitle { font-size: 14px; font-weight: 700; color: #059669; margin-bottom: 6px; }
  .contact { font-size: 12px; color: #475569; margin-bottom: 16px; border-bottom: 2px solid #0f172a; padding-bottom: 10px; }
  h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 16px; margin-bottom: 8px; }
  .item { margin-bottom: 10px; }
  .row { display: flex; justify-content: space-between; font-weight: 700; color: #0f172a; }
  .subrow { display: flex; justify-content: space-between; font-style: italic; color: #334155; font-size: 12px; margin-bottom: 4px; }
  ul { margin: 4px 0 8px 18px; padding: 0; }
  li { margin-bottom: 3px; }
  .skills-grid { display: grid; grid-template-columns: 190px 1fr; row-gap: 4px; font-size: 12.5px; }
  .skills-label { font-weight: 700; color: #0f172a; }
</style>
</head>
<body>
  <h1>OM KAPDOSKAR</h1>
  <div class="subtitle">Data Analyst • Business Intelligence, Statistical Modeling &amp; Economic Analytics</div>
  <div class="contact">
    Mumbai, India &nbsp;|&nbsp; +91 8779214812 &nbsp;|&nbsp; om.kapdoskar@gmail.com &nbsp;|&nbsp;
    linkedin.com/in/omkapdoskar &nbsp;|&nbsp; github.com/Om-Kapdoskar
  </div>

  <h2>Summary</h2>
  <p style="margin: 0 0 10px 0;">
    Business Administration graduate student (GPA 3.92, Summa Cum Laude) with an ability to turn large, messy datasets into executive-ready insights and economic models. Skilled across the analytics stack — Python, SQL, R, Tableau, and Power BI — with hands-on experience in statistical modeling, NLP, and machine learning applied to churn, retention, and customer behavior problems.
  </p>

  <h2>Technical Skills</h2>
  <div class="skills-grid">
    <div class="skills-label">Analytics &amp; BI:</div><div>Tableau, Microsoft Power BI, Adobe Analytics, SAS Visual Analytics, JMP Pro</div>
    <div class="skills-label">Languages:</div><div>Python, SQL (MySQL), R, Java, C/C++, JavaScript, HTML/CSS, MATLAB</div>
    <div class="skills-label">Libraries &amp; Frameworks:</div><div>pandas, NumPy, scikit-learn, seaborn, Matplotlib, SciPy, Flask, Selenium</div>
    <div class="skills-label">Data Skills:</div><div>Statistical Modeling, Machine Learning, NLP/Sentiment Analysis, A/B Testing, KPI Design, Data Cleaning &amp; Feature Engineering, Economic/NPV Modeling, Data Visualization</div>
    <div class="skills-label">Developer &amp; Office Tools:</div><div>Jupyter, PyCharm, VS Code, Git/GitHub, Microsoft Excel (VBA), PowerPoint, GenAI Tools</div>
  </div>

  <h2>Professional Experience</h2>
  <div class="item">
    <div class="row"><span>Capgemini — Data Science Intern</span><span>May 2023 – Jul 2023 | Mumbai, India</span></div>
    <ul>
      <li>Leveraged Adobe Analytics for data ingestion and mining of website traffic and user behavior data, surfacing actionable insights that informed C-suite strategy and improved conversion targeting.</li>
      <li>Engineered robust KPI features from raw web traffic data, performing data modeling to validate user retention and conversion trends and power business optimization models with measurable accuracy gains.</li>
      <li>Built automated KPI dashboards in Adobe Analytics enabling real-time, evidence-based decision-making for senior leadership; reduced manual reporting effort and accelerated go-to-market response cycles.</li>
    </ul>
  </div>

  <h2>Data Analytics &amp; Academic Projects</h2>
  <div class="item">
    <div class="row"><span>Green Chef Packaging Analytics | Capstone — Green Chef</span><span>Jan 2026 – May 2026</span></div>
    <ul>
      <li>Ingested and cleaned four large-scale data sources using Python and SQL, then processed 619 survey responses, 12 months of NLP review data, 21,000+ cancellation records, and SAP pricing to pinpoint packaging as the top driver of churn (19.2% of Q1 cancellations).</li>
      <li>Conducted sentiment and frequency analysis on open-ended cancellation comments, quantifying that plastic reduction (48%) and ice pack disposal (30%) were the top customer pain points driving subscription loss.</li>
      <li>Built a three-year economic model (NPV, ROI, payback period) projecting $158,030 in combined NPV across two packaging tiers; Tier 2 sustainable transition yielded 28.4% ongoing ROI with 25.6-month payback.</li>
      <li>Created an interactive Power BI dashboard, executive PowerPoint deck, QR-code recycling webapp prototype, and weather-smart AI packing recommendations integrated with Katana ERP and Pick-to-Light infrastructure.</li>
    </ul>
  </div>
  <div class="item">
    <div class="row"><span>Investment Portfolio Risk &amp; Performance Analytics</span><span>2026</span></div>
    <ul>
      <li>Engineered an automated Python and SQL analytics pipeline that ingests market data, calculates portfolio performance, and stores risk metrics in a structured SQLite database using scheduled ETL workflows.</li>
      <li>Developed a Streamlit web application and interactive Power BI dashboard evaluating Sharpe Ratio, Sortino Ratio, CAPM Alpha, Beta, Value at Risk (95%/99%), Maximum Drawdown, Information Ratio, and Fama–French 3-factor regressions.</li>
    </ul>
  </div>
  <div class="item">
    <div class="row"><span>Amazon Customer Churn Prediction &amp; Behavioral Segmentation</span><span>2024</span></div>
    <ul>
      <li>Designed and evaluated machine learning models on a 2,000+ record dataset; applied PCA, K-Means, and hierarchical clustering for feature engineering, churn risk scoring, and CLV retention strategies.</li>
    </ul>
  </div>
  <div class="item">
    <div class="row"><span>Competitive Market Intelligence Web Scraper &amp; Facial Recognition Attendance System</span><span>2023 – 2024</span></div>
    <ul>
      <li>Engineered an automated multi-page Selenium &amp; pandas scraper extracting and cleaning hundreds of hotel/restaurant listings to CSV for competitive benchmarking, and built a real-time OpenCV attendance tracker backed by MySQL and Flask.</li>
    </ul>
  </div>
  <div class="item">
    <div class="row"><span>3D Mouse Integration for Blender | Capstone — Haply Robotics</span><span>Jul 2024 – Jan 2025</span></div>
    <ul>
      <li>Developed and unit-tested custom Python add-ons for Blender to ensure accuracy in 3D mouse object manipulation, camera navigation, and sculpting workflows in direct collaboration with Haply Robotics.</li>
    </ul>
  </div>

  <h2>Education</h2>
  <div class="item">
    <div class="row"><span>Virginia Tech — Pamplin College of Business</span><span>Aug 2025 – May 2026</span></div>
    <div class="subrow"><span>M.S., Business Administration (Summa Cum Laude)</span><span>GPA: 3.92 / 4.00</span></div>
  </div>
  <div class="item">
    <div class="row"><span>Virginia Tech — Pamplin College of Business</span><span>Aug 2024 – May 2025</span></div>
    <div class="subrow"><span>B.S., Business Information Technology — Cybersecurity Management Analytics (First Honors Graduate)</span><span>GPA: 3.91 / 4.00</span></div>
  </div>
  <div class="item">
    <div class="row"><span>Mukesh Patel School of Technology Management &amp; Engineering</span><span>Aug 2021 – May 2024</span></div>
    <div class="subrow"><span>B.Tech, Computer Science &amp; Engineering, Data Science | Mumbai, India</span><span>GPA: 3.42 / 4.00</span></div>
  </div>
</body>
</html>`;

  const blob = new Blob([resumeHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Om_Kapdoskar_Data_Analyst_Resume.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ============================================================================
// COMPONENT: FLUID SCROLL PROGRESS BAR
// ============================================================================
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none"
    >
      <div
        style={{
          width: `${progress}%`,
          transition: 'width 0.12s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
      />
    </div>
  );
}

// ============================================================================
// COMPONENT: FLUID INFINITE DATA ANALYTICS MARQUEE
// ============================================================================
function AnalyticsMarquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      aria-label="Core Data Analytics Capabilities"
      className="relative overflow-hidden py-4 border-y border-white/[0.06] bg-white/[0.01] backdrop-blur-sm select-none"
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        maskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div className="flex w-max animate-fluid-marquee hover:[animation-play-state:paused] items-center gap-8">
        {doubled.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-3 text-xs font-semibold tracking-wide text-slate-300/90"
          >
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: INTERACTIVE 3D TILT & SPOTLIGHT CARD WRAPPER
// ============================================================================
function TiltCard({ children, className = '', glowColor = 'rgba(16, 185, 129, 0.14)' }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    spotlight: 'radial-gradient(600px circle at 50% 50%, transparent, transparent)'
  });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTiltStyle({
      transform: `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`,
      spotlight: `radial-gradient(500px circle at ${x}px ${y}px, ${glowColor}, transparent 72%)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      spotlight: 'radial-gradient(600px circle at 50% 50%, transparent, transparent)'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tiltStyle.transform,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease'
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{ background: tiltStyle.spotlight }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

// ============================================================================
// COMPONENT: CUSTOM SMOOTH CURSOR GLOW
// ============================================================================
function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [visible]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block overflow-hidden"
    >
      <div
        style={{
          transform: `translate3d(${pos.x - 340}px, ${pos.y - 340}px, 0)`,
          opacity: visible ? 1 : 0,
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'
        }}
        className="h-[680px] w-[680px] rounded-full bg-gradient-to-tr from-emerald-500/[0.07] via-cyan-500/[0.06] to-indigo-500/[0.05] blur-3xl"
      />
    </div>
  );
}

// ============================================================================
// COMPONENT: STICKY NAVIGATION BAR & MOBILE DRAWER
// ============================================================================
function Navbar({ activeSection, onNavigate, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-[#030712]/78 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.5)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Monogram Logo */}
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="group relative flex items-center gap-2.5 text-left focus:outline-none"
            aria-label="Scroll to top"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-indigo-500/20 border border-white/15 group-hover:border-emerald-400/60 group-hover:scale-105 transition-all duration-300 shadow-inner">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-lg font-black tracking-tighter text-transparent group-hover:from-emerald-300 group-hover:via-cyan-300 group-hover:to-indigo-300 transition-all">
                OK<span className="text-emerald-400">.</span>
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-sm font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                Om Kapdoskar
              </span>
              <span className="block text-[11px] font-semibold text-emerald-400">
                Data Analyst Portfolio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Pills */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/[0.03] border border-white/[0.08] p-1.5 backdrop-blur-xl">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ease-out ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/25 to-cyan-500/25 text-emerald-300 border border-emerald-500/35 shadow-[0_0_18px_rgba(16,185,129,0.2)] scale-[1.03]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Socials & Resume CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <div className="flex items-center gap-1 pr-1 border-r border-white/10">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <button
              type="button"
              onClick={onOpenResume}
              className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 hover:brightness-110 transition-all duration-300"
            >
              <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>Download Resume</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-300"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation drawer"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.1] text-slate-200 hover:border-emerald-500/40 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Animated Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[68px] left-4 right-4 z-50 rounded-2xl bg-[#0a0f1d]/95 border border-white/10 p-5 shadow-2xl backdrop-blur-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] border border-white/[0.05]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-bold text-slate-950 shadow-lg"
              >
                <Download className="h-4 w-4" />
                <span>Download / View Resume PDF</span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-medium text-slate-400">Connect with Om:</span>
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// COMPONENT: HERO SECTION (DATA ANALYST POSITIONING + FLUID AURORA MOTION)
// ============================================================================
function Hero({ onNavigate, onOpenResume }) {
  return (
    <section
      id="hero"
      className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden"
    >
      {/* Fluid Animated Ambient Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/4 -z-10 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[135px] animate-aurora-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 right-8 -z-10 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[135px] animate-aurora-reverse"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[340px] w-[560px] -translate-x-1/2 rounded-full bg-indigo-500/12 blur-[145px] animate-aurora-slow"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Data Analyst Headline, Status Pill, Value Prop, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Animated Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex flex-wrap items-center gap-2.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/30 px-4 py-1.5 text-xs font-medium text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.14)] mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="font-semibold tracking-wide">
                Available for Full-Time Roles: Data Analyst | Business Intelligence &amp; Analytics
              </span>
            </motion.div>

            {/* Name & Data Analyst Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
            >
              <span>Om Kapdoskar</span>
              <span className="block mt-3 text-2xl sm:text-3xl lg:text-[38px] font-bold bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent leading-[1.2]">
                Data Analyst — Turning Complex Datasets into Executive BI, Predictive Insights &amp; Economic ROI.
              </span>
            </motion.h1>

            {/* Mobile Responsive Profile Photo Card (Original Showcase Style) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14 }}
              className="mt-8 w-full max-w-sm mx-auto lg:hidden"
            >
              <div className="relative rounded-2xl p-1 bg-gradient-to-br from-emerald-500/50 via-cyan-500/30 to-indigo-500/50 shadow-[0_0_35px_rgba(16,185,129,0.2)]">
                <div className="relative overflow-hidden rounded-xl bg-[#060b16]">
                  <img
                    src={PROFILE_IMAGE_SRC}
                    alt="Om Kapdoskar Graduation at Virginia Tech"
                    className="w-full h-80 object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-[#030712]/85 backdrop-blur-md border border-white/15 px-3.5 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={VT_EMBLEM_SRC}
                        alt="Virginia Tech Seal"
                        className="h-8 w-8 rounded-full object-contain shrink-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">M.S. Business Administration</p>
                        <p className="text-[11px] text-emerald-300">Virginia Tech • GPA 3.92 (Summa Cum Laude)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Data Analyst Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-6 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl"
            >
              Business Administration graduate student (<span className="text-white font-semibold">GPA 3.92, Summa Cum Laude</span>)
              specializing in turning large, messy datasets into executive-ready insights and economic models.
              Skilled across the analytics stack — <span className="text-emerald-300 font-semibold">Python, SQL, R, Tableau, Power BI, and Adobe Analytics</span> —
              with hands-on expertise in statistical modeling, NLP, and machine learning applied to churn,
              retention, and customer behavior.
            </motion.p>

            {/* Secondary Status, Location (Mumbai, India) & College Emblem Strip */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="mt-5 flex flex-wrap items-center gap-2.5 text-xs text-slate-400"
            >
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 text-slate-200 font-medium">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Actively Seeking: Data Analyst, Business Analyst &amp; APM Roles
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 text-slate-200 font-medium">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                Mumbai, India
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 text-slate-200 font-medium">
                <img
                  src={VT_EMBLEM_SRC}
                  alt="Virginia Tech"
                  className="h-4 w-4 rounded-full object-contain"
                />
                <span>Virginia Tech</span>
                <span className="text-slate-600">&bull;</span>
                <img
                  src={MPSTME_EMBLEM_SRC}
                  alt="SVKM's NMIMS"
                  className="h-4 w-4 rounded-full bg-white p-0.5 object-contain"
                />
                <span>MPSTME (NMIMS)</span>
              </span>
            </motion.div>

            {/* Primary CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="group inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_42px_rgba(6,182,212,0.55)] hover:-translate-y-0.5 hover:brightness-110 transition-all duration-300"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] hover:border-cyan-500/40 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail className="h-4 w-4 text-cyan-400" />
                <span>Get in Touch</span>
              </button>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white/[0.03] hover:bg-emerald-500/10 border border-white/[0.08] hover:border-emerald-500/40 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-emerald-300 backdrop-blur-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <Download className="h-4 w-4 text-emerald-400" />
                <span>Download Resume</span>
              </button>
            </motion.div>

            {/* Quick Data Analytics KPI Proof Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-6 border-t border-white/[0.08]"
            >
              {[
                { value: '21,000+', label: 'Churn & Survey Rows Mined', accent: 'text-emerald-400' },
                { value: '19.2%', label: 'Q1 Churn Driver Isolated', accent: 'text-cyan-400' },
                { value: '$158,030', label: 'Modeled 3-Yr NPV (28.4% ROI)', accent: 'text-indigo-400' },
                { value: '3.92 GPA', label: 'Virginia Tech Summa Cum Laude', accent: 'text-emerald-300' }
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-emerald-500/30 px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className={`text-xl sm:text-2xl font-extrabold tracking-tight ${stat.accent}`}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Desktop Profile Photo Showcase (Original Glowing TiltCard Frame) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md animate-float-gentle">
              {/* Outer Ambient Glow Ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-cyan-500/20 to-indigo-500/30 blur-2xl opacity-75"
              />

              <TiltCard
                glowColor="rgba(6, 182, 212, 0.22)"
                className="rounded-3xl p-[2px] bg-gradient-to-br from-emerald-400/60 via-cyan-500/40 to-indigo-500/60 shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
              >
                <div className="relative overflow-hidden rounded-[22px] bg-[#060b16]">
                  <img
                    src={PROFILE_IMAGE_SRC}
                    alt="Om Kapdoskar — Virginia Tech Graduation"
                    className="w-full h-[500px] object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent opacity-85" />

                  {/* Top-Right Honors Pill */}
                  <div className="absolute top-4 right-4 rounded-full bg-[#030712]/80 backdrop-blur-md border border-emerald-500/40 px-3.5 py-1.5 flex items-center gap-1.5 shadow-lg">
                    <Award className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-300">Summa Cum Laude • 3.92 GPA</span>
                  </div>

                  {/* Bottom Floating Degree Badge with Uploaded College Emblems */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#030712]/85 backdrop-blur-xl border border-white/15 p-4 shadow-2xl">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={VT_EMBLEM_SRC}
                          alt="Virginia Tech Seal"
                          className="h-10 w-10 rounded-full object-contain shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 truncate">
                              M.S. Business Administration • Virginia Tech
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-slate-300 truncate">
                            Data Analytics • B.S. BIT (VT) &amp; B.Tech DS (NMIMS)
                          </p>
                        </div>
                      </div>
                      <img
                        src={MPSTME_EMBLEM_SRC}
                        alt="SVKM's NMIMS Emblem"
                        className="h-9 w-9 rounded-full bg-white p-0.5 object-contain shrink-0"
                      />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: SOCIAL MEDIA & QUICK LINKS STRIP
// ============================================================================
function SocialQuickStrip({ onShowToast }) {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (label, value) => {
    copyTextToClipboard(value).then(() => {
      setCopiedField(label);
      if (onShowToast) onShowToast(`Copied ${label}: ${value}`);
      setTimeout(() => setCopiedField(null), 2200);
    });
  };

  return (
    <section aria-label="Quick Contact and Social Links" className="relative z-20 pb-10 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5 shadow-xl"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.07] px-3.5 py-2.5 text-slate-300 hover:-translate-y-0.5 transition-all duration-300 ${item.accent}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white group-hover:text-current transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{item.handle}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              );
            })}

            {/* Direct Email Quick Action */}
            <button
              type="button"
              onClick={() => handleCopy('Email', 'om.kapdoskar@gmail.com')}
              className="group flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-emerald-500/50 hover:-translate-y-0.5 px-3.5 py-2.5 text-left text-slate-300 hover:text-emerald-300 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-white">Direct Email</div>
                  <div className="text-[11px] text-slate-400 truncate">om.kapdoskar@gmail.com</div>
                </div>
              </div>
              {copiedField === 'Email' ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-100" />
              )}
            </button>

            {/* Direct Phone Quick Action */}
            <button
              type="button"
              onClick={() => handleCopy('Phone', '+91 8779214812')}
              className="group flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-cyan-500/50 hover:-translate-y-0.5 px-3.5 py-2.5 text-left text-slate-300 hover:text-cyan-300 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-white">Direct Phone</div>
                  <div className="text-[11px] text-slate-400 truncate">+91 8779214812</div>
                </div>
              </div>
              {copiedField === 'Phone' ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
              ) : (
                <Copy className="h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-100" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: ABOUT & DATA ANALYST VALUE PROPOSITION
// ============================================================================
function About({ onNavigate }) {
  const [selectedPillar, setSelectedPillar] = useState(0);

  return (
    <section id="about" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3">
              <Terminal className="h-3.5 w-3.5" />
              <span>Data Analyst Profile &amp; Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              End-to-End{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Data Analytics &amp; Business Intelligence
              </span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Transforming large, messy datasets into statistical models, automated ETL pipelines, and
            executive-ready BI dashboards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Narrative & Portrait Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3.5">
                  <img
                    src={PROFILE_IMAGE_SRC}
                    alt="Om Kapdoskar portrait"
                    className="h-16 w-16 rounded-2xl object-cover object-top border border-emerald-400/40 shadow-md shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">Om Kapdoskar</h3>
                    <p className="text-xs font-bold text-emerald-300">
                      Data Analyst &amp; BI Specialist
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Mumbai, India &bull; GPA 3.92 (Summa Cum Laude)
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center -space-x-2 shrink-0">
                  <img
                    src={VT_EMBLEM_SRC}
                    alt="Virginia Tech Seal"
                    className="h-10 w-10 rounded-full object-contain ring-2 ring-[#030712]"
                  />
                  <img
                    src={MPSTME_EMBLEM_SRC}
                    alt="SVKM's NMIMS Emblem"
                    className="h-10 w-10 rounded-full bg-white p-0.5 object-contain ring-2 ring-[#030712]"
                  />
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                As a <span className="text-white font-semibold">Data Analyst</span>, I specialize in bridging the gap between
                raw enterprise data and high-stakes business decisions. From mining web conversion funnels with{' '}
                <span className="text-white font-semibold">Adobe Analytics at Capgemini</span> to isolating a{' '}
                <span className="text-white font-semibold">19.2% Q1 customer churn driver</span> across 21,000+ cancellation
                records for HelloFresh/Green Chef and building automated{' '}
                <span className="text-white font-semibold">SQL + Python + Power BI + Tableau</span> reporting ecosystems, I
                translate technical findings into concrete business recommendations.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Summa Cum Laude (3.92) &amp; First Honors (3.91)</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
              >
                <span>Schedule a conversation</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Interactive Role Value Proposition Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Core Analytics &amp; Role Alignment
                </span>
                <div className="flex flex-wrap gap-1.5 rounded-xl bg-[#030712]/70 p-1 border border-white/[0.08]">
                  {ROLE_PILLARS.map((item, idx) => (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => setSelectedPillar(idx)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                        selectedPillar === idx
                          ? 'bg-gradient-to-r from-emerald-500/25 to-cyan-500/25 text-emerald-300 border border-emerald-500/35 shadow-sm scale-[1.02]'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-[#030712]/60 border border-white/[0.06] p-5 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{ROLE_PILLARS[selectedPillar].role}</h3>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                    {selectedPillar === 0 ? 'Primary Focus' : 'Ready Day 1'}
                  </span>
                </div>
                <p className="text-xs font-medium text-cyan-300 mt-1">
                  {ROLE_PILLARS[selectedPillar].tagline}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {ROLE_PILLARS[selectedPillar].points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3 text-center">
                <div className="text-xs font-bold text-emerald-300">BI &amp; Dashboards</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Tableau • Power BI • Adobe</div>
              </div>
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3 text-center">
                <div className="text-xs font-bold text-cyan-300">Querying &amp; ETL</div>
                <div className="text-[11px] text-slate-400 mt-0.5">SQL • Python • R • pandas</div>
              </div>
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3 text-center">
                <div className="text-xs font-bold text-indigo-300">Decision Modeling</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Churn • CLV • NPV • A/B</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: PROFESSIONAL EXPERIENCE (EXPANDED DATA ANALYTICS FOCUS)
// ============================================================================
function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Professional Data Analytics Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Enterprise Data Analytics &amp;{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Business Intelligence Impact
            </span>
          </h2>
        </motion.div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-500/30 space-y-10">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#030712] border-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>

              <TiltCard
                glowColor="rgba(16, 185, 129, 0.14)"
                className="rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 p-6 sm:p-8 transition-all shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.role}</h3>
                      <span className="text-slate-400">—</span>
                      <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-emerald-300/90 mt-1">{exp.type}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 text-xs font-medium text-slate-300">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Key Data Analytics Impact Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                  {exp.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl bg-[#030712]/60 border border-white/[0.06] px-4 py-3"
                    >
                      <div className="text-xs font-bold text-cyan-300">{m.value}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Bullet Achievements */}
                <ul className="space-y-3">
                  {exp.highlights.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-200">
                      <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Data Analytics Pillars Breakdown */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {exp.analyticsPillars.map((pillar) => (
                    <div
                      key={pillar.title}
                      className="rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 p-4 transition-all duration-300 hover:bg-emerald-500/[0.08]"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs font-bold text-white">{pillar.title}</span>
                        <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                          {pillar.tool}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{pillar.detail}</p>
                    </div>
                  ))}
                </div>

                {/* Skills Applied */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400 mr-1">Analytics Stack Applied:</span>
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs font-medium text-emerald-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: FEATURED DATA ANALYTICS PROJECTS WITH FLUID KPI BARS
// ============================================================================
function Projects({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3">
              <Database className="h-3.5 w-3.5" />
              <span>Data Analytics, BI &amp; Predictive Modeling Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Featured{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Data Analytics Case Studies
              </span>
            </h2>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-1.5 backdrop-blur-xl"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const isActive = activeFilter === category;
              const count =
                category === 'All'
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.categories.includes(category)).length;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(category)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-300 ease-out ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.03]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive ? 'bg-slate-950/25 text-slate-950 font-bold' : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Data Analytics 4-Stage Methodology Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {[
            {
              icon: Database,
              title: '1. Data Ingestion & SQL ETL',
              desc: 'Multi-source relational joins, SQLite/MySQL warehousing & automated Selenium/Python pipelines'
            },
            {
              icon: LineChart,
              title: '2. Statistical & Churn Modeling',
              desc: 'Sentiment analysis, PCA, K-Means clustering, Fama-French 3-Factor & 95%/99% VaR econometrics'
            },
            {
              icon: PieChart,
              title: '3. Executive BI Storytelling',
              desc: 'Interactive Power BI, Tableau, Adobe Analytics & Streamlit decision dashboards'
            },
            {
              icon: TrendingUp,
              title: '4. Quantified P&L Impact',
              desc: '3-year DCF & NPV modeling ($158,030 NPV, 28.4% ROI, 25.6-mo payback) & retention playbooks'
            }
          ].map((step) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.title}
                className="rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.07] hover:border-emerald-500/30 p-4 flex items-start gap-3 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
                  <StepIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{step.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{step.desc}</div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Responsive Project Grid with 3D Hover Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
              className="h-full"
            >
              <TiltCard
                glowColor={
                  project.accent === 'emerald'
                    ? 'rgba(16, 185, 129, 0.16)'
                    : project.accent === 'cyan'
                    ? 'rgba(6, 182, 212, 0.16)'
                    : 'rgba(99, 102, 241, 0.16)'
                }
                className={`group h-full rounded-2xl backdrop-blur-xl bg-white/[0.03] border ${
                  project.featured ? 'border-emerald-500/25' : 'border-white/[0.08]'
                } hover:border-emerald-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.35)]`}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Top Row: Tag & Links */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                        {project.tag}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          title="Inspect Technical Architecture & Impact"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          title="View on GitHub"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    {/* Data Analytics Priority & Period Sub-badge */}
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                        {project.analyticsPriority}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {project.period}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {project.title}
                    </h3>

                    {/* Key Metrics Grid */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {project.metrics.slice(0, 4).map((m) => (
                        <div
                          key={m.label}
                          className="rounded-xl bg-[#030712]/65 border border-white/[0.06] px-3 py-2"
                        >
                          <div className="text-xs font-extrabold text-cyan-300">{m.value}</div>
                          <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Fluid Animated KPI Mini Bars (for Featured Analytics Projects) */}
                    {project.bars && (
                      <div className="mt-3.5 space-y-2 rounded-xl bg-[#030712]/50 border border-white/[0.05] p-3">
                        {project.bars.map((bar) => (
                          <div key={bar.label}>
                            <div className="flex items-center justify-between text-[10px] mb-1">
                              <span className="text-slate-300 font-medium">{bar.label}</span>
                              <span className="text-emerald-300 font-bold">{bar.display}</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                              <div
                                style={{ width: `${Math.min(100, bar.pct)}%` }}
                                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-1000 ease-out"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Description & Impact */}
                    <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                    {project.impact && (
                      <div className="mt-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 p-3">
                        <p className="text-xs text-slate-200 leading-relaxed">
                          <span className="font-bold text-emerald-300">Analytics Impact: </span>
                          {project.impact}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Stack Chips & Action Footer */}
                  <div className="mt-5 pt-4 border-t border-white/[0.08]">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-[11px] font-medium text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-cyan-300 transition-colors"
                      >
                        <span>Architecture &amp; Case Study</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: CORE COMPETENCIES & DATA ANALYTICS SKILLS
// ============================================================================
function Skills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.filter((cat) =>
      selectedCategory === 'all' ? true : cat.id === selectedCategory
    ).map((cat) => ({
      ...cat,
      matchedSkills: cat.skills.filter((s) =>
        s.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    }));
  }, [searchQuery, selectedCategory]);

  return (
    <section id="skills" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/25 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-3">
              <Cpu className="h-3.5 w-3.5" />
              <span>Data Analyst Core Competencies &amp; Technical Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              BI, Statistical &amp;{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Data Engineering Arsenal
              </span>
            </h2>
          </div>

          {/* Interactive Skill Filter & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter skills (e.g. SQL, Power BI, Tableau)..."
                aria-label="Filter skills"
                className="w-full sm:w-64 rounded-xl bg-white/[0.04] border border-white/[0.1] pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 focus:border-emerald-500/50 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear skill filter"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Category Quick Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 scale-[1.02]'
                : 'bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:text-white'
            }`}
          >
            All Categories (38 Skills)
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 scale-[1.02]'
                  : 'bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:text-white'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Categorized Glassmorphic Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, idx) => {
            const Icon = category.icon;
            const skillsToDisplay =
              searchQuery.trim().length > 0 ? category.matchedSkills : category.skills;

            if (searchQuery.trim().length > 0 && skillsToDisplay.length === 0) {
              return null;
            }

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
                className={`group rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] ${category.borderAccent} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)] flex flex-col justify-between ${
                  idx === 1 ? 'lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.accentColor} border border-white/10 text-white`}
                      >
                        <Icon className="h-5 w-5 text-emerald-300" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-xs text-slate-400">{category.subtitle}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 text-[11px] font-semibold text-slate-300">
                      {skillsToDisplay.length} skills
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillsToDisplay.map((skill) => {
                      const isHighlighted =
                        searchQuery.trim().length > 0 &&
                        skill.toLowerCase().includes(searchQuery.trim().toLowerCase());
                      return (
                        <span
                          key={skill}
                          className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                            isHighlighted
                              ? 'bg-emerald-500/25 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                              : category.badgeClass
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-75" />
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: EDUCATION SECTION WITH UPLOADED COLLEGE EMBLEMS
// ============================================================================
function Education() {
  return (
    <section id="education" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Academic Pedigree &amp; Quantitative Foundation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Education &amp;{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Academic Distinction
              </span>
            </h2>
          </div>

          {/* Official Uploaded University Emblems Pill */}
          <div className="inline-flex items-center gap-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 backdrop-blur-xl">
            <div className="flex items-center gap-2.5">
              <img
                src={VT_EMBLEM_SRC}
                alt="Virginia Tech Official Seal"
                className="h-10 w-10 rounded-full object-contain"
              />
              <div>
                <div className="text-xs font-bold text-white">Virginia Tech</div>
                <div className="text-[10px] text-orange-300">Pamplin College of Business</div>
              </div>
            </div>
            <div className="h-7 w-px bg-white/10" />
            <div className="flex items-center gap-2.5">
              <img
                src={MPSTME_EMBLEM_SRC}
                alt="SVKM's NMIMS Official Emblem"
                className="h-10 w-10 rounded-full bg-white p-0.5 object-contain"
              />
              <div>
                <div className="text-xs font-bold text-white">MPSTME • NMIMS</div>
                <div className="text-[10px] text-rose-300">Deemed-to-be University</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              {/* Subtle Atmospheric College Emblem Watermark in Card Corner */}
              <img
                src={edu.emblem}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 rounded-full object-contain opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-105 transition-all duration-500"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-xs font-semibold text-slate-300">
                    <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                    {edu.period}
                  </span>
                  <span
                    className={`rounded-full bg-gradient-to-r ${edu.badgeColor} border px-3 py-1 text-xs font-bold`}
                  >
                    GPA: {edu.gpa}
                  </span>
                </div>

                {/* Prominent Uploaded College Emblem + Institution Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border p-1 shadow-lg ${edu.emblemBg}`}
                  >
                    <img
                      src={edu.emblem}
                      alt={edu.emblemAlt}
                      className="h-full w-full rounded-xl object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {edu.institution}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{edu.location}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-[#030712]/60 border border-white/[0.06] p-4">
                  <div className="text-sm font-bold text-white leading-snug">{edu.degree}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                    <Award className="h-3.5 w-3.5" />
                    <span>{edu.honors}</span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {edu.highlights.map((item, i) => (
                    <li key={i} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: CONTACT SECTION & FUNCTIONAL CONTACT FORM
// ============================================================================
function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Data Analyst Role — Full-Time Opportunity for Om Kapdoskar',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [copiedKey, setCopiedKey] = useState(null);

  const targetRoles = [
    'Data Analyst',
    'Business Analyst',
    'Associate Product Manager'
  ];

  const handleCopy = (key, text) => {
    copyTextToClipboard(text).then(() => {
      setCopiedKey(key);
      if (onShowToast) onShowToast(`Copied ${key}: ${text}`);
      setTimeout(() => setCopiedKey(null), 2200);
    });
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      subject: `${role} Role — Full-Time Opportunity for Om Kapdoskar`
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      if (onShowToast) {
        onShowToast('Message prepared for Om Kapdoskar!');
      }
    }, 850);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Headline, Target Roles & Direct Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Open for Full-Time Data Analytics Opportunities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Ready to drive{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  data-informed business growth.
                </span>
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Actively seeking full-time <span className="text-white font-semibold">Data Analyst</span> roles
                (as well as Business Analyst and Associate Product Manager opportunities) where SQL, Python,
                Tableau, Power BI, and statistical modeling deliver measurable ROI.
              </p>
            </div>

            {/* Target Positions Interactive Pills */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2.5">
                Open Candidacy — Click to Select Role
              </div>
              <div className="flex flex-wrap gap-2">
                {targetRoles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-200 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Direct Contact Channels
              </h3>

              {/* Quick-Copy Email */}
              <div className="flex items-center justify-between rounded-xl bg-[#030712]/60 border border-white/[0.07] p-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-medium text-slate-400">Email Address</div>
                    <a
                      href="mailto:om.kapdoskar@gmail.com"
                      className="text-xs sm:text-sm font-bold text-white hover:text-emerald-300 truncate block"
                    >
                      om.kapdoskar@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('Email', 'om.kapdoskar@gmail.com')}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-200"
                >
                  {copiedKey === 'Email' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick-Copy Phone */}
              <div className="flex items-center justify-between rounded-xl bg-[#030712]/60 border border-white/[0.07] p-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-medium text-slate-400">Direct Phone</div>
                    <a
                      href="tel:+918779214812"
                      className="text-xs sm:text-sm font-bold text-white hover:text-cyan-300 block"
                    >
                      +91 8779214812
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('Phone', '+91 8779214812')}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-200"
                >
                  {copiedKey === 'Phone' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-cyan-400" />
                      <span className="text-cyan-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location (Mumbai, India only) */}
              <div className="flex items-center gap-3 rounded-xl bg-[#030712]/60 border border-white/[0.07] p-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-400">Location</div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    Mumbai, India
                  </div>
                </div>
              </div>

              {/* Direct Social Icons */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Social Profiles:</span>
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        title={s.name}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 hover:-translate-y-0.5 transition-all"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Functional Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Recruiters, hiring managers, and analytics leaders — I respond within 24 hours.
                </p>
              </div>
              <Globe className="h-6 w-6 text-emerald-400 opacity-80" />
            </div>

            {status === 'success' ? (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Message Ready for Om Kapdoskar</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>! Your message
                  regarding <span className="text-emerald-300 font-medium">"{formData.subject}"</span> has been
                  logged. You can also launch your default mail client with one click below:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`mailto:om.kapdoskar@gmail.com?subject=${encodeURIComponent(
                      formData.subject
                    )}&body=${encodeURIComponent(
                      `Hi Om,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
                    )}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Open in Email Client</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        email: '',
                        subject: 'Data Analyst Role — Full-Time Opportunity for Om Kapdoskar',
                        message: ''
                      });
                    }}
                    className="rounded-xl bg-white/[0.06] border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/[0.1]"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl bg-[#030712]/70 border border-white/[0.1] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500/60 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full rounded-xl bg-[#030712]/70 border border-white/[0.1] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500/60 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Data Analyst Role — Interview Invitation"
                    className="w-full rounded-xl bg-[#030712]/70 border border-white/[0.1] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500/60 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Om, we were impressed by your Green Chef Churn Analytics & Power BI case studies and would love to chat about a Data Analyst role..."
                    className="w-full rounded-xl bg-[#030712]/70 border border-white/[0.1] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500/60 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-3.5 px-6 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:brightness-110 hover:-translate-y-0.5 disabled:opacity-60 transition-all duration-300"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message to Om Kapdoskar</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: FOOTER WITH DYNAMIC YEAR & SCROLL TO TOP
// ============================================================================
function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#02050e] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/15">
              <span className="text-sm font-black text-white">
                OK<span className="text-emerald-400">.</span>
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Om Kapdoskar</p>
              <p className="text-xs text-slate-400">
                Data Analyst &bull; Business Intelligence &bull; Mumbai, India
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                className="hover:text-emerald-300 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group inline-flex items-center gap-2 rounded-xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/[0.08] hover:border-emerald-500/40 px-4 py-2 text-xs font-semibold text-slate-200 hover:text-emerald-300 transition-all"
          >
            <span>Scroll to Top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>&copy; {currentYear} Om Kapdoskar. All rights reserved.</p>
          <p>
            Data Analyst Portfolio &bull; Built with Next.js, React, Tailwind CSS &amp; Montserrat.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// COMPONENT: INTERACTIVE PROJECT ARCHITECTURE MODAL
// ============================================================================
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#0a0f1e] border border-white/15 p-6 sm:p-8 shadow-2xl max-h-[88vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300">
              {project.tag} &bull; {project.period}
            </span>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-slate-300 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3"
            >
              <div className="text-sm font-extrabold text-cyan-300">{m.value}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Analytical Problem &amp; Data Scope
            </h4>
            <p className="leading-relaxed">{project.description}</p>
          </div>

          {project.impact && (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                Quantified Business &amp; BI Impact
              </h4>
              <p className="leading-relaxed text-slate-200">{project.impact}</p>
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Data Analytics Pipeline &amp; Methodology
            </h4>
            <ul className="space-y-2">
              {project.architecture.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Analytics &amp; Engineering Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-white/[0.05] border border-white/10 px-3 py-1 text-xs font-medium text-emerald-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950"
          >
            <Github className="h-4 w-4" />
            <span>Explore GitHub Profile &amp; Code</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-white/[0.06] border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
          >
            Close Preview
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// COMPONENT: EXECUTIVE RESUME PREVIEW & DOWNLOAD MODAL
// ============================================================================
function ResumeModal({ open, onClose, onDownload }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-3xl rounded-2xl bg-[#0a0f1e] border border-white/15 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Data Analyst Curriculum Vitae • Executive Summary
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">Om Kapdoskar — Resume</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Resume File</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-slate-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-5 text-xs sm:text-sm text-slate-300">
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.08] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="font-bold text-white text-base">Om Kapdoskar</div>
              <div className="text-xs text-emerald-300 font-semibold">
                Data Analyst • Business Intelligence &amp; Predictive Analytics
              </div>
            </div>
            <div className="text-xs text-slate-400 sm:text-right">
              <div>om.kapdoskar@gmail.com &bull; +91 8779214812</div>
              <div>Mumbai, India</div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">
              Professional Data Analytics Experience
            </h4>
            {EXPERIENCE.map((ex) => (
              <div key={ex.id} className="rounded-xl bg-[#030712]/60 border border-white/[0.06] p-3.5">
                <div className="flex flex-wrap justify-between font-bold text-white">
                  <span>
                    {ex.role} — {ex.company}
                  </span>
                  <span className="text-xs text-emerald-300">
                    {ex.period} | {ex.location}
                  </span>
                </div>
                <ul className="mt-2 space-y-1 list-disc list-inside text-xs text-slate-300">
                  {ex.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">
              Featured Data Analytics &amp; BI Projects
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PROJECTS.map((p) => (
                <div key={p.id} className="rounded-xl bg-[#030712]/60 border border-white/[0.06] p-3">
                  <div className="font-bold text-white text-xs">{p.title}</div>
                  <div className="text-[11px] text-emerald-300 mt-0.5">{p.tag}</div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">
              Education
            </h4>
            <div className="space-y-2">
              {EDUCATION.map((e) => (
                <div
                  key={e.id}
                  className="rounded-xl bg-[#030712]/60 border border-white/[0.06] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={e.emblem}
                      alt={e.emblemAlt}
                      className={`h-9 w-9 rounded-full object-contain shrink-0 ${
                        e.id === 'mpstme-btech' ? 'bg-white p-0.5' : ''
                      }`}
                    />
                    <div>
                      <div className="font-bold text-white">{e.institution}</div>
                      <div className="text-xs text-slate-300">
                        {e.degree} &bull; <span className="text-emerald-300">{e.honors}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 sm:text-right shrink-0">
                    <div className="font-bold text-cyan-300">GPA: {e.gpa}</div>
                    <div>{e.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// MAIN PORTFOLIO APPLICATION EXPORT
// ============================================================================
export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 2800);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // Active Scroll-Spy Indicator
  useEffect(() => {
    const sectionIds = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const handleDownloadResume = () => {
    triggerResumeDownload();
    showToast('Downloading Om_Kapdoskar_Data_Analyst_Resume...');
  };

  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="min-h-screen bg-[#030712] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden"
    >
      {/* Global Montserrat Font & Fluid Keyframe Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
        html {
          scroll-behavior: smooth;
        }
        html, body, #root, *, button, input, textarea, select {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
        @keyframes fluidMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-fluid-marquee {
          animation: fluidMarquee 34s linear infinite;
        }
        @keyframes auroraSlow {
          0%, 100% { transform: translate3d(-50%, 0, 0) scale(1); }
          50% { transform: translate3d(-44%, 18px, 0) scale(1.08); }
        }
        .animate-aurora-slow {
          animation: auroraSlow 14s ease-in-out infinite;
        }
        @keyframes auroraReverse {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-24px, -18px, 0) scale(1.07); }
        }
        .animate-aurora-reverse {
          animation: auroraReverse 16s ease-in-out infinite;
        }
        @keyframes floatGentle {
          0%, 100% { transform: translate3d(0, 0px, 0); }
          50% { transform: translate3d(0, -8px, 0); }
        }
        .animate-float-gentle {
          animation: floatGentle 6.5s ease-in-out infinite;
        }
      `}</style>

      {/* Fluid Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Subtle Fine Dot-Grid Pattern Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Custom Smooth Desktop Cursor Glow */}
      <CursorGlow />

      {/* Sticky Header with Active Scroll-Spy */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Content — Fluid Flow Prioritizing Data Analytics Experience & Projects */}
      <main className="relative z-10">
        <Hero
          onNavigate={scrollToSection}
          onOpenResume={() => setResumeModalOpen(true)}
        />
        <AnalyticsMarquee />
        <SocialQuickStrip onShowToast={showToast} />
        <About onNavigate={scrollToSection} />
        <Experience />
        <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
        <Skills />
        <Education />
        <Contact onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <ResumeModal
        open={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        onDownload={handleDownloadResume}
      />

      {/* Non-Blocking Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl bg-[#0a0f1e]/95 border border-emerald-500/40 px-4 py-3 text-xs font-semibold text-emerald-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
