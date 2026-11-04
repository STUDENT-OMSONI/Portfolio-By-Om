import { useState, useEffect, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import {
  SiPython,
  SiMysql,
  SiPandas,
  SiNumpy,
  SiPytorch,
  SiOpencv,
  SiReact,
  SiStreamlit,
  SiFlask,
  SiFigma,
  SiGithub,
  SiYolo,
} from 'react-icons/si';
import { TbSql } from 'react-icons/tb';
import { RiFileExcel2Line } from 'react-icons/ri';
import {
  FaBrain,
  FaTrophy,
  FaRocket,
  FaGraduationCap,
  FaAward,
} from 'react-icons/fa6';

/* Custom SVG icons for Power BI and Canva (exact official brand marks) */
function SiPowerbi({ size = 40, color = '#F2C811', style, ...props }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ color, ...style }}
      {...props}
    >
      <path d="M10 12a1 1 0 0 1 1 1v11H4a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1zm-2-.5V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17h-4.5V13a1.5 1.5 0 0 0-1.5-1.5zm5-6V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1h-3.5V7A1.5 1.5 0 0 0 15 5.5z" />
    </svg>
  );
}

function SiCanva({ size = 40, color = '#00C4CC', style, ...props }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ color, ...style }}
      {...props}
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.324 16.59c-1.464.394-2.887.487-4.137.273-2.023-.347-3.23-1.664-3.522-3.841-.303-2.257.653-4.542 2.378-5.679 1.439-.949 3.013-1.042 4.09-.247.962.71 1.258 1.942.748 3.125-.435 1.009-1.406 1.815-2.791 2.317-.113.041-.219.076-.32.106.27 1.157.906 1.838 1.776 1.905.748.058 1.62-.234 2.476-.814l-.698 2.855zm-2.484-6.388c.767-.32 1.267-.78 1.458-1.341.173-.509.023-.974-.384-1.196-.452-.247-1.17-.156-1.92.29-.844.502-1.393 1.393-1.492 2.433.824-.037 1.616-.073 2.338-.186z" />
    </svg>
  );
}
import omPhoto from './assets/om_photo.jpg';
import omPhotoHero from './assets/om_photo_hero.png';
import project1Img from './assets/project1.png';
import project2Img from './assets/project2.png';
import project3Img from './assets/project3.png';
import omifyImg from './assets/omify.png';
import './App.css';

/* ─── CUSTOM POTHOLE UI (REPLACING IMAGE) ─── */
function PotholeUI() {
  return (
    <div className="pothole-ui-container">
      <div className="pothole-ui-card">
        <div className="pothole-ui-title">Pothole Detection System</div>
        <p className="pothole-ui-sub">Select Detection Mode</p>

        <div className="pothole-modes-grid">
          <div className="pothole-mode-box">
            <div className="pothole-mode-name">📷 Image Detection</div>
            <p className="pothole-mode-desc">Upload an image and detect potholes</p>
          </div>
          <div className="pothole-mode-box">
            <div className="pothole-mode-name">🎥 Video Detection</div>
            <p className="pothole-mode-desc">Upload a video and analyze frames</p>
          </div>
          <div className="pothole-mode-box highlight">
            <div className="pothole-mode-name">📡 Live Webcam</div>
            <p className="pothole-mode-desc">Real-time pothole detection</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SCROLL REVEAL ─── */
function useReveal(activeTab) {
  useEffect(() => {
    const selector = '[data-reveal], [data-stagger], .exp-item, .tech-card, .skill-card, .skills-group, .showcase-card, .ach-cell, .ach-stacked-panel, .tech-stack-cell, .about-left, .about-right, .contact-grid > *';
    const els = document.querySelectorAll(selector);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [activeTab]);
}

/* ─── REDUCED MOTION ─── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return reduced;
}

/* ─── CURSOR (with optional "VIEW" label) ─── */
function useCursor(disabled) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (disabled) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    const onEnter = (e) => {
      ringRef.current?.classList.add('hovering');
      const lbl = e.currentTarget.getAttribute('data-cursor');
      if (lbl) setLabel(lbl);
    };
    const onLeave = () => { ringRef.current?.classList.remove('hovering'); setLabel(''); };

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const bind = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    bind();
    document.addEventListener('mousemove', onMove);
    const rebindObserver = new MutationObserver(bind);
    rebindObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      rebindObserver.disconnect();
    };
  }, [disabled]);

  return { dotRef, ringRef, label };
}

/* ─── MAGNETIC HOVER (buttons pull slightly toward cursor) ─── */
function useMagnetic(disabled) {
  const ref = useRef(null);
  useEffect(() => {
    if (disabled) return;
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [disabled]);
  return ref;
}

/* ─── HERO PARALLAX (subtle reaction to mouse position) ─── */
function useParallax(disabled) {
  const wrapRef = useRef(null);
  const nameRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    if (disabled) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5); // -0.5..0.5
      const ny = (e.clientY / window.innerHeight - 0.5);
      if (nameRef.current) nameRef.current.style.transform = `translate(${nx * -10}px, ${ny * -6}px)`;
      if (photoRef.current) photoRef.current.style.transform = `translate(${nx * 7}px, ${ny * 4}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [disabled]);

  return { wrapRef, nameRef, photoRef };
}

/* ─── LOGO — custom OM SONI monogram ─── */
function Logo({ size = 40 }) {
  // We use a wider viewBox for the custom "om" cursive logo
  const w = size * 2.2;
  const h = size * 1.1;
  return (
    <svg width={w} height={h} viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="animated-logo-svg">
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C59E59" />
          <stop offset="25%" stopColor="#F9E596" />
          <stop offset="50%" stopColor="#C59E59" />
          <stop offset="75%" stopColor="#F9E596" />
          <stop offset="100%" stopColor="#C59E59" />
        </linearGradient>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path
        className="om-path"
        d="M 27,13 
           A 11,11 0 1,0 29,25 
           C 32,25 35,24 35,20 
           A 9,9 0 0,1 53,20 
           L 53,29 
           L 53,20 
           A 9,9 0 0,1 71,20 
           L 71,29"
        stroke="url(#goldGradient)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#goldGlow)"
      />
    </svg>
  );
}

/* ─── LIVE CLOCK ─── */
function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours() % 12 || 12;
      const m = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setTime(`${h}:${m} ${ampm}`);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="nav-clock">{time}</span>;
}

/* ─── DATA (verified only — sourced from resume) ─── */
const PROJECTS = [
  {
    id: 1,
    title: 'Health Lock - Blockchain Medical Records',
    subtitle: 'Immutable Decentralized Ledger for Sensitive Patient Records',
    cat: 'SUNHACKS-2025 · DATA SECURITY',
    stack: ['Blockchain', 'Encryption', 'React', 'Data Security'],
    img: project2Img,
    icon: '🔐',
    themeColor: '#60a5fa',
    themeBg: 'rgba(59, 130, 246, 0.15)',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    mockupUrl: 'https://healthlock.chain/records',
    detail: 'A secure health-record management system built for the medical department, using blockchain technology to store and protect patient data through immutable, decentralized ledger entries. Implements end-to-end encryption so only authorized personnel can access sensitive records, eliminating tampering risk and supporting medical data privacy standards.',
  },
  {
    id: 2,
    title: 'AI Pothole Detection',
    subtitle: 'Real-Time Computer Vision & Hazard Analytics Platform',
    cat: 'Smart India Hackathon 2025 · Winner',
    stack: ['YOLOv8', 'Python', 'OpenCV', 'PyTorch', 'Flask'],
    img: project1Img, // Fallback image just in case
    imgComponent: <PotholeUI />,
    icon: '🛣️',
    themeColor: '#22d3ee',
    themeBg: 'rgba(6, 182, 212, 0.15)',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    mockupUrl: 'https://pothole-ai.gov.in/live',
    detail: 'A real-time web platform built with YOLOv8, Python, OpenCV, and PyTorch to detect potholes from images, video, and webcam feeds, using centroid-based tracking to eliminate duplicate detections. Integrated automated reporting with location and severity details, Google OAuth, an analytics dashboard, and email-based complaint routing to municipal authorities.',
  },
  {
    id: 3,
    title: 'OMIFY – Music Streaming Web App with ML Recommendations',
    subtitle: 'Personal Spotify-Inspired Sound System with AI Clustering',
    cat: 'Personal Project · 2025',
    stack: ['React', 'Machine Learning', 'MusicBrainz API', 'Audio Streaming', 'Clustering'],
    img: omifyImg,
    link: 'https://omify-pearl.vercel.app/',
    icon: '🎵',
    themeColor: '#4ade80',
    themeBg: 'rgba(34, 197, 94, 0.15)',
    glowColor: 'rgba(34, 197, 94, 0.25)',
    mockupUrl: 'https://omify-pearl.vercel.app',
    detail: '• Built a personal Spotify-inspired music streaming web app hosting a self-curated library of my 1,098 favorite songs, featuring full playback, playlist creation, and search functionality.\n\n• Added ML recommendations: song clustering, daily mixes from the last 10 days of listening, and new-release suggestions via the MusicBrainz API.',
  }
];

const EXPERIENCE = [
  {
    date: 'Apr 2026 – May 2026',
    company: 'Trident Groups',
    role: 'Field Data Collection Lead — Robot Training',
    location: 'Narmadapuram, India',
    desc: 'Operated the Magic Hat device to capture real-time worker motion on the factory floor, then structured and labelled motion-capture datasets to train robotic systems for industrial automation. Gained hands-on exposure to how platforms such as Kaggle and Oracle acquire and manage large-scale datasets.',
    tags: ['Data Collection', 'Dataset Annotation', 'ML Pipelines', 'Industrial Robotics'],
  },
  {
    date: 'Feb 2025 – Mar 2025',
    company: 'New Vision Pvt. Ltd.',
    role: 'Data Analytics Intern',
    location: 'Bhopal, India',
    desc: 'Worked hands-on with core Python libraries — NumPy for numerical computation and Pandas for data cleaning, manipulation, and structured analysis. Built an understanding of large-scale dataset handling, including missing-value treatment, outlier handling, and the broader data science pipeline.',
    tags: ['Python', 'NumPy', 'Pandas', 'Data Cleaning', 'Data Preprocessing'],
  },
];

const POSITIONS = [
  {
    date: '2023 – Present',
    company: 'E-Cell, S.A.T.I.',
    role: 'Graphic Designing Lead',
    location: 'Vidisha, M.P.',
    desc: "Designed all creatives for the National Entrepreneurship Challenge and secured All-India Rank 19 at E-Summit 2025, IIT Bombay.",
    tags: ['Figma', 'Canva', 'Branding', 'Event Design'],
  },
  {
    date: '2023 – Present',
    company: 'Training & Placement Cell, S.A.T.I.',
    role: 'Technical Lead',
    location: 'Vidisha, M.P.',
    desc: 'Spearheaded technical initiatives within the Placement Cell, successfully coordinating placement drives.',
    tags: ['Coordination', 'Technical Lead'],
  },
];

const ACHIEVEMENTS = [
  {
    num: '01',
    icon: FaTrophy,
    title: 'Smart India Hackathon — Winner',
    org: 'Govt. of India · 2025',
    metric: '1ST PLACE',
    desc: "India's biggest national-level hackathon — won at the college level with the AI pothole detection platform.",
  },
  {
    num: '02',
    icon: FaRocket,
    title: 'All-India Rank 19 — E-Summit, IIT Bombay',
    org: 'IIT Bombay E-Cell · 2025',
    metric: 'AIR 19',
    desc: 'National Entrepreneurship Challenge — AIR 19 as Graphic Designing Lead for E-Cell, S.A.T.I.',
  },
  {
    num: '03',
    icon: FaGraduationCap,
    title: 'Cummins Scholar',
    org: 'Cummins India · 2023',
    metric: 'TOP 32 / 5,000+',
    desc: 'Selected among 32 of 5,000+ students for full fee coverage based on academic excellence and merit.',
  },
  {
    num: '04',
    icon: FaAward,
    title: 'NCC — All India Thal Sainik Camp',
    org: 'IGC Raipur · National Cadet Corps',
    metric: '2X CADET',
    desc: 'Attended the All India Thal Sainik Camp twice, demonstrating leadership, discipline, and teamwork.',
  },
];

/* Skills — grouped exactly as verified: Data Analytics focus, supported by AI/DS */
const SKILL_GROUPS = [
  {
    label: 'Data Analytics',
    items: ['SQL', 'Power BI', 'Excel', 'Data Analysis', 'Data Cleaning', 'Data Visualization'],
  },
  {
    label: 'Programming & Data',
    items: ['Python', 'Pandas', 'NumPy', 'MySQL', 'C++'],
  },
  {
    label: 'AI & Machine Learning',
    items: ['Machine Learning', 'OpenCV', 'PyTorch', 'YOLOv8', 'NLTK'],
  },
];

/* Flat technology card grid — reference-style "Technologies · Daily Stack".
   Only real, resume-verified skills. */
const skills = [
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Power BI', icon: SiPowerbi, color: '#F2C811' },
  { name: 'Pandas', icon: SiPandas, color: '#E70488' },
  { name: 'NumPy', icon: SiNumpy, color: '#4DABCF' },
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
  { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'Flask', icon: SiFlask, color: '#FFFFFF' },
  { name: 'Streamlit', icon: SiStreamlit, color: '#FF4B4B' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
  { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
];

const TECH_CARDS = skills;

const TICKER_ITEMS = [
  'SQL', 'Power BI', 'Excel', 'Python', 'Pandas', 'NumPy',
  'Machine Learning', 'OpenCV', 'PyTorch', 'Data Analysis',
  'Data Visualization', 'Smart India Hackathon', 'IIT Bombay E-Summit',
  'Cummins Scholar', 'NCC Cadet',
];

/* ─── TICKER ─── */
function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((t, i) => <span className="ticker-item" key={i}>{t}</span>)}
      </div>
    </div>
  );
}

/* ─── INTRO LOADING SCREEN ─── */
function IntroScreen({ onDone }) {
  const [exiting, setExiting] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [progress, setProgress] = useState(0);

  const fullText = "om-soni.portfolio";

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);
    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2500;
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer);
      }
    }, 25);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 650);
    }, 3100);
    return () => clearTimeout(t);
  }, [onDone]);

  const handleSkip = () => {
    setExiting(true);
    setTimeout(onDone, 450);
  };

  return (
    <div className={`intro-screen ${exiting ? 'exiting' : ''}`}>
      {/* Background Visual Atmosphere */}
      <div className="intro-bg-glow-1" />
      <div className="intro-bg-glow-2" />
      <div className="intro-bg-grid" />

      {/* Skip Button */}
      <button className="intro-skip-btn" onClick={handleSkip} title="Skip Introduction">
        <span>Skip Intro</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      {/* Main Glass Card */}
      <div className="intro-card">
        {/* Formal Status Badge */}
        <div className="intro-badge">
          <span className="intro-badge-pulse" />
          <span>OM SONI • DATA & AI PORTFOLIO</span>
        </div>

        {/* Executive Icon Pills */}
        <div className="intro-icons">
          <div className="intro-icon-btn" title="Data Analytics">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
            <span className="intro-icon-tooltip">Analytics</span>
          </div>

          <div className="intro-icon-btn" title="Data Engineering">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="intro-icon-tooltip">Engineer</span>
          </div>

          <div className="intro-icon-btn" title="Machine Learning & AI">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="intro-icon-tooltip">AI & ML</span>
          </div>
        </div>

        {/* Heading with Metallic/Glow Gradient */}
        <h1 className="intro-heading">
          Welcome to my<br />
          <span className="intro-heading-highlight">Portfolio Website</span>
        </h1>

        {/* Subheading */}
        <p className="intro-sub">
          Turning data into decisions, one dataset at a time.
        </p>

        {/* Typewriter URL Pill */}
        <div className="intro-url-pill">
          <div className="intro-url-dot" />
          <span className="intro-url-prefix">https://</span>
          <span className="intro-url-text">{typedText}</span>
          <span className="intro-url-cursor" />
        </div>

        {/* Progress Loader Bar */}
        <div className="intro-loader-wrap">
          <div className="intro-progress-bar">
            <div className="intro-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="intro-loader-status">
            <span className="intro-loader-label">INITIALIZING SYSTEM</span>
            <span className="intro-loader-pct">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const { dotRef, ringRef, label: cursorLabel } = useCursor(reducedMotion);
  const { nameRef: heroNameRef, photoRef: heroPhotoRef } = useParallax(reducedMotion);
  const viewWorkBtnRef = useMagnetic(reducedMotion);
  const resumeBtnRef = useMagnetic(reducedMotion);
  const [introShown, setIntroShown] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProj, setSelectedProj] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [currentAchSlide, setCurrentAchSlide] = useState(0);
  const [isAchAutoPlay, setIsAchAutoPlay] = useState(true);
  const [isAchHovered, setIsAchHovered] = useState(false);
  const achTouchStartRef = useRef(0);

  const nextAchSlide = useCallback(() => {
    setCurrentAchSlide((prev) => (prev + 1) % ACHIEVEMENTS.length);
  }, []);

  const prevAchSlide = useCallback(() => {
    setCurrentAchSlide((prev) => (prev - 1 + ACHIEVEMENTS.length) % ACHIEVEMENTS.length);
  }, []);

  useEffect(() => {
    if (activeTab !== 'achievements' || !isAchAutoPlay || isAchHovered) return;
    const timer = setInterval(() => {
      nextAchSlide();
    }, 3800);
    return () => clearInterval(timer);
  }, [activeTab, isAchAutoPlay, isAchHovered, nextAchSlide]);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % PROJECTS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  }, []);

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
    touchEndRef.current = 0;
  };
  const handleTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const diff = touchStartRef.current - touchEndRef.current;
    if (diff > 45) nextSlide();
    if (diff < -45) prevSlide();
    touchStartRef.current = 0;
    touchEndRef.current = 0;
  };

  /* Keyboard Slide Navigation */
  useEffect(() => {
    const handleKey = (e) => {
      if (activeTab !== 'projects') return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeTab, nextSlide, prevSlide]);

  /* Autoplay Slide Timer */
  useEffect(() => {
    if (activeTab !== 'projects' || !isAutoPlay || isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [activeTab, isAutoPlay, isHovered, nextSlide]);

  useReveal(activeTab);
  const [toast, setToast] = useState({ show: false, success: true, msg: '' });
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: 'Data Analytics', message: '' });
  const formRef = useRef(null);

  const LINKEDIN = 'https://www.linkedin.com/in/om-soni-407789317';
  const INSTAGRAM = 'https://www.instagram.com/__om_soni__08?igsh=aWZ2ZmozdjM5NG85';
  const EMAIL = 'omsoni2006456@gmail.com';
  const PHONE = '+91 9302496582';
  const RESUME_URL = '/Om_Soni_Resume.pdf';

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Close mobile menu on scroll */
  useEffect(() => {
    if (!menuOpen) return;
    const fn = () => setMenuOpen(false);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [menuOpen]);

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast({ show: false, success: true, msg: '' }), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') { setSelectedProj(null); setAboutOpen(false); setMenuOpen(false); } };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  /* Lock scroll when modal/menu open */
  useEffect(() => {
    document.body.style.overflow = (selectedProj || aboutOpen || menuOpen) ? 'hidden' : '';
  }, [selectedProj, aboutOpen, menuOpen]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_m2pdu3h';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_j4r8ylr';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'NMk7icB94IMxOhUgE';

    setSending(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          topic: form.topic,
          message: form.message,
          from_name: form.name,
          from_email: form.email,
          to_email: 'omsoni2006456@gmail.com',
        },
        publicKey
      );
      setToast({ show: true, success: true, msg: 'Message sent! Om will reply soon. ✓' });
      setForm({ name: '', email: '', topic: 'Data Analytics', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      /* Fallback: open mailto if EmailJS call itself fails */
      const subject = encodeURIComponent(`[Portfolio] ${form.topic} — from ${form.name}`);
      const body = encodeURIComponent(
        `Hi Om,\n\nName: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\nMessage:\n${form.message}`
      );
      window.open(`mailto:omsoni2006456@gmail.com?subject=${subject}&body=${body}`, '_self');
      setToast({ show: true, success: true, msg: '📧 Opening your email client as backup — just hit Send!' });
    } finally {
      setSending(false);
    }
  };


return (
  <>
    <style>{`
        /* Removed Card Hanging Animation per request */

        /* Title Hover Animation */
        .sc-card-title {
          position: relative;
          display: inline-block;
        }
        .sc-card-title::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--ink, white);
          transition: width 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .showcase-card:hover .sc-card-title::after {
          width: 100%;
        }

        /* Ticker Left-to-Right Animation */
        .ticker-track {
          animation: tickerLTRForce 20s linear infinite !important;
        }
        @keyframes tickerLTRForce {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0%); }
        }
      `}</style>



    {/* INTRO */}
    {!introShown && <IntroScreen onDone={() => setIntroShown(true)} />}

    {/* ─── NAV ─── */}
    <nav className={`nav ${navScrolled ? 'scrolled' : ''} nav-slide-in`}>
      <div className="nav-fluid-inner">
        <div className="nav-left-zone">
          <div className="nav-brand">
            <div className="nav-brand-icon"><Logo size={16} /></div>
            <span>OM SONI <span style={{ opacity: 0.5, fontWeight: 400 }}>· DATA ANALYTICS</span></span>
          </div>
          <LiveClock />
        </div>

        <div className="nav-right-links">
          {[['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['work', 'Showcase'], ['contact', 'Contact']].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
              {label}
            </a>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>

    {/* ─── MOBILE NAV DRAWER ─── */}
    {menuOpen && (
      <div className="mobile-nav-overlay" onClick={() => setMenuOpen(false)}>
        <nav className="mobile-nav-drawer" onClick={e => e.stopPropagation()}>
          <div className="mobile-nav-header">
            <span className="mobile-nav-brand">OM SONI</span>
            <button className="mobile-nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
          </div>
          <ul className="mobile-nav-links">
            {[['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['work', 'Showcase'], ['contact', 'Contact']].map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => { e.preventDefault(); setMenuOpen(false); setTimeout(() => scrollTo(id), 80); }}>
                  {label}
                  <span className="mobile-nav-arrow">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-nav-footer">
            <a href={`mailto:${EMAIL}`} className="mobile-nav-email">{EMAIL}</a>
          </div>
        </nav>
      </div>
    )}

    {/* ─── HERO ─── */}
    <section id="home" className="hero">
      <div className="hero-fluid-inner">
        {/* Left Content Column */}
        <div className="hero-left-content">
          <div className="hero-badge formal-animate-1">
            <span>DATA ANALYTICS &amp; AI ENGINEER</span>
          </div>

          <div className="hero-main-name formal-animate-2">OM SONI</div>

          <h1 className="hero-left-title formal-animate-3">
            <span>DATA ANALYTICS &amp; AI / </span>
            <span className="accent-text">DATA SCIENCE.</span>
          </h1>

          <p className="hero-left-tagline formal-animate-4">
            Turning raw data into clear, reliable<br />
            <strong>insights and decisions.</strong>
          </p>

          <div className="hero-btn-row formal-animate-5">
            <button ref={viewWorkBtnRef} className="hero-pill-btn hero-pill-primary" onClick={() => scrollTo('work')}>
              VIEW MY WORK ↗
            </button>
            <a ref={resumeBtnRef} href="/Om_Soni_Resume.pdf" download className="hero-pill-btn hero-pill-ghost">
              DOWNLOAD RESUME
            </a>
          </div>
        </div>

        {/* Right Side: Full-Bleed Photo Zone */}
        <div className="hero-right-photo-zone" ref={heroPhotoRef}>
          <img src={omPhotoHero} alt="Om Soni" />
        </div>
      </div>
    </section>

    {/* TICKER BELT */}
    <Ticker />

    {/* ─── ABOUT — BIG TITLE + ID CARD ─── */}
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-layout">
          {/* Left: text */}
          <div className="about-left" data-reveal="down">
            <div className="about-big-title">
              Data<br />
              <span className="dim">Analytics</span>
            </div>

            <p className="about-body-text">
              B.Tech <strong>Artificial Intelligence &amp; Data Science</strong> at SATI Vidisha (GPA 8.10 / 10.0).
              I work with <strong>SQL, Power BI, Excel and Python</strong> to clean, analyze, and visualize data,
              and apply Python-based ML tooling to real-world problems.
              SIH Winner · AIR 19 IIT Bombay · Cummins Scholar · NCC Cadet.
            </p>

            <div className="about-tech-pills">
              {['SQL', 'Power BI', 'Excel', 'Python', 'Pandas', 'NumPy', 'Machine Learning'].map((t) => (
                <span className="tech-pill" key={t}>{t}</span>
              ))}
            </div>

            <div className="about-buttons">
              <button
                className="btn-outline-red"
                onClick={() => setShowCard(!showCard)}
              >
                {showCard ? 'HIDE CARD' : 'SHOW CARD'}
              </button>
              <button
                className="btn-solid-dark"
                onClick={() => setAboutOpen(true)}
              >
                ABOUT ME
              </button>
            </div>
          </div>

          {/* Right: hanging ID card */}
          <div className={`about-right ${showCard ? '' : 'card-hidden'}`} data-reveal="right">
            <div className="id-card-container">
              <div className="id-card-string" />
              <div className="id-card-clip">
                <div className="id-card-top-hole" />
              </div>
              <div className="id-card">
                <div className="id-card-top">
                  <div className="id-card-top-hole" />
                </div>
                <img
                  src={omPhoto}
                  alt="Om Soni"
                  className="id-card-photo"
                />
                <div className="id-card-info">
                  <div className="id-card-org">SATI Vidisha · AI & DS</div>
                  <div className="id-card-name-row">
                    <div>
                      <div className="id-card-label">Name</div>
                      <div className="id-card-name">Om Soni</div>
                      <div className="id-card-role">Data Analytics · AI & DS</div>
                    </div>
                    <span style={{ fontSize: '1rem' }}>🤚</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="h-rule" />

    {/* ─── EDUCATION ─── */}
    <section className="section">
      <div className="container">
        <div data-reveal style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div className="section-eyebrow">Education</div>
          <h2 className="section-big-title">ACADEMIC BACKGROUND</h2>
        </div>

        <div className="exp-list" data-reveal>
          <div className="exp-item">
            <div className="exp-left-col">
              <div className="exp-date">Sept 2023 – June 2027</div>
              <div className="exp-company">S.A.T.I. Vidisha, M.P.</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                GPA: 8.10 / 10.0
              </div>
            </div>
            <div>
              <div className="exp-role">B.Tech — Artificial Intelligence &amp; Data Science</div>
              <p className="exp-desc">
                Samrat Ashok Technological Institute, Vidisha (M.P.). Focused coursework and project work
                spanning data analytics, machine learning, and structured dataset analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="h-rule" />

    {/* ─── SKILLS / TECHNOLOGIES ─── */}
    <section id="skills" className="section tech-section">
      <div className="container">
        <div data-reveal="down" style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div className="section-eyebrow">Skills</div>
          <h2 className="section-big-title">WHAT I WORK WITH</h2>
        </div>

        <div className="tech-count-eyebrow" data-reveal>
          {skills.length} TECHNOLOGIES · DAILY STACK
        </div>

        <div className="tech-card-grid" data-reveal>
          {skills.map(({ name, icon: Icon, color }, i) => (
            <div
              className="tech-card skill-card"
              key={name}
              style={{ transitionDelay: `${(i % 12) * 0.05}s` }}
            >
              <span className="tech-card-icon">
                <Icon size={40} color={color} />
              </span>
              <p className="tech-card-name">{name}</p>
            </div>
          ))}
        </div>

        <div className="skills-groups" data-reveal>
          {SKILL_GROUPS.map((group, gi) => (
            <div className="skills-group" key={group.label} style={{ transitionDelay: `${gi * 0.1}s` }}>
              <div className="skills-group-label">{group.label}</div>
              <div className="skills-group-pills">
                {group.items.map((s) => (
                  <span className="tech-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="h-rule" />

    {/* ─── EXPERIENCE ─── */}
    <section className="section">
      <div className="container">
        <div data-reveal style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div className="section-eyebrow">Experience</div>
          <h2 className="section-big-title">WHERE I'VE WORKED</h2>
        </div>

        <div className="exp-list">
          {EXPERIENCE.map((item, i) => (
            <div className="exp-item" key={i} data-reveal style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="exp-left-col">
                <div className="exp-date">{item.date}</div>
                <div className="exp-company">{item.company}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                  {item.location}
                </div>
              </div>
              <div>
                <div className="exp-role">{item.role}</div>
                <p className="exp-desc">{item.desc}</p>
                <div className="exp-tags">
                  {item.tags.map((t) => <span className="exp-tag" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal style={{ textAlign: 'center', margin: '56px 0 8px' }}>
          <div className="section-eyebrow">Positions of Responsibility</div>
        </div>

        <div className="exp-list">
          {POSITIONS.map((item, i) => (
            <div className="exp-item" key={i} data-reveal style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="exp-left-col">
                <div className="exp-date">{item.date}</div>
                <div className="exp-company">{item.company}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                  {item.location}
                </div>
              </div>
              <div>
                <div className="exp-role">{item.role}</div>
                <p className="exp-desc">{item.desc}</p>
                <div className="exp-tags">
                  {item.tags.map((t) => <span className="exp-tag" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="h-rule" />

    {/* ─── SHOWCASE ─── */}
    <section id="work" className="section">
      <div className="container">
        <div data-reveal="down" style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div className="section-eyebrow">Showcase</div>
          <h2 className="section-big-title">PORTFOLIO SHOWCASE</h2>
        </div>

        {/* Tab Group */}
        <div className="showcase-tab-group" data-reveal>
          {[['projects', 'Projects'], ['techstack', 'Tech Stack'], ['achievements', 'Achievements']].map(([val, label]) => (
            <button
              key={val}
              className={`showcase-tab ${activeTab === val ? 'active' : ''}`}
              onClick={() => setActiveTab(val)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab: Projects */}
        {activeTab === 'projects' && (
          <div className="projects-showcase-wrap">
            {/* Control Bar: Jump Pills */}
            <div className="stacked-controls-bar" data-reveal>
              <div className="stacked-nav-pills">
                {PROJECTS.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`stacked-nav-pill ${currentSlide === idx ? 'active' : ''}`}
                    onClick={() => goToSlide(idx)}
                  >
                    <span className="pill-num">0{idx + 1}</span>
                    <span className="pill-name">{p.title.split('–')[0].split('-')[0].trim()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mode: Animated Slide Carousel */}
            <div
              className="project-slider-wrapper"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Floating Left/Right Arrows */}
              <button
                type="button"
                className="slider-floating-arrow prev"
                onClick={prevSlide}
                aria-label="Previous Slide"
                title="Previous Project (Left Arrow)"
              >
                ❮
              </button>
              <button
                type="button"
                className="slider-floating-arrow next"
                onClick={nextSlide}
                aria-label="Next Slide"
                title="Next Project (Right Arrow)"
              >
                ❯
              </button>

              {/* Main Viewport */}
              <div
                className="slider-main-viewport"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="slider-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {PROJECTS.map((p, i) => {
                    const isEven = i % 2 === 0;
                    return (
                      <div className="slider-slide" key={p.id}>
                        <div
                          className={`stacked-card ${isEven ? 'layout-normal' : 'layout-reverse'}`}
                          onClick={() => setSelectedProj(p)}
                        >
                          {/* Header strip */}
                          <div className="card-stack-header">
                            <div className="card-stack-header-left">
                              <span className="card-stack-index">0{i + 1}</span>
                              <span className="card-stack-mini-title">{p.title}</span>
                            </div>
                            <div className="card-stack-indicator">
                              <span>{p.cat}</span>
                              <span>•</span>
                              <span style={{ color: p.themeColor }}>CLICK FOR FULL VIEW ↗</span>
                            </div>
                          </div>

                          <div className="stacked-card-grid">
                            <div className="stacked-card-content">
                              <div className="sc-meta-row">
                                <div className="sc-icon-badge" style={{ background: p.themeBg, color: p.themeColor }}>
                                  {p.icon}
                                </div>
                                <div className="sc-cat-pill">{p.cat}</div>
                                <div className="sc-index-counter">0{i + 1} / 0{PROJECTS.length}</div>
                              </div>

                              <h3 className="sc-title">{p.title}</h3>
                              {p.subtitle && <p className="sc-subtitle">{p.subtitle}</p>}

                              <div className="sc-desc-box">
                                {p.detail.split('\n\n').map((paragraph, pIdx) => (
                                  <p key={pIdx} className="sc-desc-line">{paragraph}</p>
                                ))}
                              </div>

                              <div className="sc-tags-row">
                                {p.stack.map((t) => (
                                  <span key={t} className="sc-tag-pill">{t}</span>
                                ))}
                              </div>

                              <div className="sc-actions-row">
                                {p.link && (
                                  <a
                                    href={p.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sc-btn-primary"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>Live Demo</span>
                                    <span className="sc-btn-arrow">↗</span>
                                  </a>
                                )}
                                <button
                                  type="button"
                                  className="sc-btn-secondary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProj(p);
                                  }}
                                >
                                  View Details
                                </button>
                              </div>
                            </div>

                            <div className="stacked-card-visual">
                              <div className="mockup-window" style={{ '--accent-glow': p.glowColor }}>
                                <div className="mockup-titlebar">
                                  <div className="mockup-dots">
                                    <span className="mockup-dot red" />
                                    <span className="mockup-dot yellow" />
                                    <span className="mockup-dot green" />
                                  </div>
                                  <div className="mockup-url">
                                    {p.mockupUrl || 'https://omify-pearl.vercel.app'}
                                  </div>
                                  <div className="mockup-actions">
                                    <span className="mockup-status-dot" />
                                    <span>ONLINE</span>
                                  </div>
                                </div>
                                <div className="mockup-screen">
                                  {p.imgComponent ? (
                                    p.imgComponent
                                  ) : (
                                    <img src={p.img} alt={p.title} className="mockup-img" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="slider-progress-track">
                <div
                  className="slider-progress-fill"
                  style={{ width: `${((currentSlide + 1) / PROJECTS.length) * 100}%` }}
                />
              </div>

              {/* Bottom Bar: Dots + Counter + Auto-play toggle */}
              <div className="slider-bottom-bar">
                <div className="slider-dots-group">
                  {PROJECTS.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`slider-dot-btn ${currentSlide === idx ? 'active' : ''}`}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      <span className="slider-dot-pill" />
                    </button>
                  ))}
                </div>

                <div className="slider-counter-info">
                  PROJECT 0{currentSlide + 1} OF 0{PROJECTS.length}
                </div>

                <button
                  type="button"
                  className="slider-autoplay-btn"
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  title="Toggle Auto-Slide Animation"
                >
                  <span>{isAutoPlay ? '⏸ Pause Auto' : '▶ Auto Slide'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Tech Stack */}
        {activeTab === 'techstack' && (
          <div className="tech-stack-grid" data-stagger>
            {[
              { icon: TbSql, color: '#00758F', name: 'SQL', type: 'Data Analytics' },
              { icon: SiPowerbi, color: '#F2C811', name: 'Power BI', type: 'Data Visualization' },
              { icon: RiFileExcel2Line, color: '#217346', name: 'Excel', type: 'Data Analytics' },
              { icon: SiPython, color: '#3776AB', name: 'Python', type: 'Programming' },
              { icon: SiPandas, color: '#E70488', name: 'Pandas · NumPy', type: 'Data Science' },
              { icon: FaBrain, color: '#38BDF8', name: 'Machine Learning', type: 'AI / ML' },
              { icon: SiOpencv, color: '#5C3EE8', name: 'OpenCV', type: 'Computer Vision' },
              { icon: SiYolo, color: '#00FFFF', name: 'YOLOv8', type: 'Object Detection' },
              { icon: SiPytorch, color: '#EE4C2C', name: 'PyTorch', type: 'Deep Learning' },
              { icon: SiFigma, color: '#F24E1E', name: 'Figma', type: 'Design' },
              { icon: SiCanva, color: '#00C4CC', name: 'Canva', type: 'Design' },
              { icon: SiGithub, color: '#FFFFFF', name: 'Git · GitHub', type: 'Version Control' },
            ].map((t) => {
              const TechIcon = t.icon;
              return (
                <div className="tech-stack-cell" key={t.name}>
                  <span className="tech-cell-icon">
                    {typeof t.icon === 'string' ? t.icon : <TechIcon size={30} color={t.color} />}
                  </span>
                  <div className="tech-cell-name">{t.name}</div>
                  <div className="tech-cell-type">{t.type}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab: Achievements — 3D Perspective Moving Deck */}
        {activeTab === 'achievements' && (
          <div
            className="ach-3d-stage"
            tabIndex={0}
            onMouseEnter={() => setIsAchHovered(true)}
            onMouseLeave={() => setIsAchHovered(false)}
            onTouchStart={(e) => {
              achTouchStartRef.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const diff = achTouchStartRef.current - e.changedTouches[0].clientX;
              if (diff > 45) nextAchSlide();
              else if (diff < -45) prevAchSlide();
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') nextAchSlide();
              if (e.key === 'ArrowLeft') prevAchSlide();
            }}
          >
            <div className="tech-count-eyebrow" data-reveal style={{ textAlign: 'center', marginBottom: '16px' }}>
              {ACHIEVEMENTS.length} HONORS & RECOGNITIONS · PERSPECTIVE DECK
            </div>

            <div className="ach-3d-stack-viewport">
              <div className="ach-3d-stack">
                {ACHIEVEMENTS.map((a, i) => {
                  const AchIcon = a.icon;
                  const diff = (i - currentAchSlide + ACHIEVEMENTS.length) % ACHIEVEMENTS.length;
                  return (
                    <div
                      className={`ach-3d-card-wrap pos-${diff}`}
                      key={a.num}
                      onClick={() => setCurrentAchSlide(i)}
                      title={`Click to view ${a.title}`}
                    >
                      <div className="ach-pro-card">
                        {/* Header Strip */}
                        <div className="ach-pro-header">
                          <div className="ach-pro-header-left">
                            <span className="ach-pro-index">{a.num}</span>
                            <span className="ach-pro-mini-title">{a.title}</span>
                          </div>
                          <div className="ach-pro-header-right">
                            <span>{a.org}</span>
                            <span>•</span>
                            <span className="ach-pro-header-badge">{a.metric} ★</span>
                          </div>
                        </div>

                        {/* Card Content Body */}
                        <div className="ach-pro-body">
                          <div className="ach-pro-top-row">
                            <div className="ach-pro-icon-box">
                              <AchIcon size={22} />
                            </div>
                            <div className="ach-pro-meta">
                              <span className="ach-pro-org">
                                <span className="ach-pro-dot" />
                                {a.org}
                              </span>
                              <span className="ach-pro-metric">
                                {a.metric}
                              </span>
                            </div>
                            <div className="ach-pro-watermark">{a.num}</div>
                          </div>

                          <h3 className="ach-pro-title">{a.title}</h3>
                          <p className="ach-pro-desc">{a.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="ach-controls-bar">
              <div className="ach-arrows-group">
                <button
                  type="button"
                  className="ach-arrow-btn"
                  onClick={prevAchSlide}
                  title="Previous Achievement"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="ach-arrow-btn"
                  onClick={nextAchSlide}
                  title="Next Achievement"
                >
                  →
                </button>
              </div>

              <div className="ach-dots-group">
                {ACHIEVEMENTS.map((a, idx) => (
                  <button
                    key={a.num}
                    type="button"
                    className={`ach-dot-pill ${currentAchSlide === idx ? 'active' : ''}`}
                    onClick={() => setCurrentAchSlide(idx)}
                    title={`Achievement 0${idx + 1}`}
                  >
                    {currentAchSlide === idx && isAchAutoPlay && !isAchHovered && (
                      <span className="ach-dot-progress" />
                    )}
                  </button>
                ))}
              </div>

                            <div className="ach-counter-badge" title="Active Slide">
                <span className="ach-counter-current">0{currentAchSlide + 1}</span>
                <span className="ach-counter-sep">/</span>
                <span className="ach-counter-total">0{ACHIEVEMENTS.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>

    <div className="h-rule" />

    {/* ─── CONTACT ─── */}
    <section id="contact" className="contact-section">
      <div className="container">
        <div data-reveal style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-eyebrow">Contact</div>
          <h2 className="section-big-title">LET'S CONNECT</h2>
        </div>

        <div className="contact-grid">
          {/* Left */}
          <div data-reveal="left">
            <p className="contact-big">
              Let's build<br />something<br /><span className="red">great.</span>
            </p>

            <div className="contact-detail-rows">
              <a href={`mailto:${EMAIL}`} className="c-row">
                <span className="c-label">Email</span>
                <span className="c-val">{EMAIL}</span>
                <span className="c-arrow">→</span>
              </a>
              <a href={`tel:${PHONE}`} className="c-row">
                <span className="c-label">Phone</span>
                <span className="c-val">{PHONE}</span>
                <span className="c-arrow">→</span>
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="c-row">
                <span className="c-label">LinkedIn</span>
                <span className="c-val">om-soni-407789317</span>
                <span className="c-arrow">→</span>
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="c-row">
                <span className="c-label">Instagram</span>
                <span className="c-val">@__om_soni__08</span>
                <span className="c-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div data-reveal="right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="cf-field">
                <label>Your Name</label>
                <input type="text" placeholder="Alex Johnson" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="cf-field">
                <label>Email</label>
                <input type="email" placeholder="alex@company.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="cf-field">
                <label>Topic</label>
                <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                  <option>Data Analytics</option>
                  <option>AI / Data Science</option>
                  <option>Machine Learning</option>
                  <option>Internship / Job Offer</option>
                  <option>Hackathon Collab</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="cf-field" style={{ borderBottom: 'none' }}>
                <label>Message</label>
                <textarea placeholder="Tell me about your project or opportunity..."
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              </div>
              <button type="submit" className="cf-submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send Message'}
                <span className="cf-submit-arrow">{sending ? '⏳' : '→'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    {/* ─── FOOTER ─── */}
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-copy">© 2026 Om Soni — Data Analytics · AI &amp; Data Science</span>
        <button className="footer-top-btn" onClick={() => scrollTo('home')}>↑ BACK TO TOP</button>
      </div>
    </footer>

    {/* ─── ABOUT DETAIL PANEL ─── */}
    {aboutOpen && (
      <div className="about-panel-overlay" onClick={() => setAboutOpen(false)}>
        <div className="about-panel" onClick={(e) => e.stopPropagation()}>
          <button className="panel-back-btn" onClick={() => setAboutOpen(false)}>
            ← Back
          </button>

          <div className="panel-title-wrap">
            <h2 className="panel-title">
              About Myself<span className="panel-cursor" />
            </h2>
          </div>

          <div className="panel-body">
            <p className="panel-para">
              I'm currently a <strong>B.Tech AI & Data Science student</strong> at Samrat Ashok Technological Institute, Vidisha (M.P.), maintaining a <strong>GPA of 8.10/10.0</strong>. My focus is on <strong>data analytics</strong> — using SQL, Power BI, Excel and Python to turn raw, messy data into clear, decision-ready insights.
            </p>
            <p className="panel-para">
              That interest in structured, evidence-based problem-solving extends into <strong>AI and machine learning</strong>, where I've worked hands-on with Python, Pandas, NumPy, and computer-vision tooling to build and support real-world ML systems.
            </p>
            <p className="panel-para">
              I've competed at national level — won at <strong>Smart India Hackathon 2025</strong>, achieved <strong>All-India Rank 19 at IIT Bombay's E-Summit</strong>, earned a <strong>Cummins Scholarship</strong> (top 32 of 5,000+ students), and served twice at the <strong>NCC All India Thal Sainik Camp</strong>.
            </p>
            <p className="panel-para">
              Outside of data work, I lead the Graphic Design team for E-Cell S.A.T.I., creating visual assets for national entrepreneurship competitions.
            </p>

            <div className="panel-info-grid">
              <div className="panel-info-cell">
                <div className="panel-info-key">Degree</div>
                <div className="panel-info-val">B.Tech AI & Data Science</div>
              </div>
              <div className="panel-info-cell">
                <div className="panel-info-key">College</div>
                <div className="panel-info-val">SATI Vidisha, M.P.</div>
              </div>
              <div className="panel-info-cell">
                <div className="panel-info-key">GPA</div>
                <div className="panel-info-val">8.10 / 10.0</div>
              </div>
              <div className="panel-info-cell">
                <div className="panel-info-key">Batch</div>
                <div className="panel-info-val">2023 – 2027</div>
              </div>
              <div className="panel-info-cell">
                <div className="panel-info-key">Location</div>
                <div className="panel-info-val">Narmadapuram / Vidisha, M.P.</div>
              </div>
              <div className="panel-info-cell">
                <div className="panel-info-key">Email</div>
                <div className="panel-info-val">
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </div>
              <div className="panel-info-cell">
                <div className="panel-info-key">LinkedIn</div>
                <div className="panel-info-val">
                  <a href={LINKEDIN} target="_blank" rel="noreferrer">om-soni-407789317</a>
                </div>
              </div>
              <div className="panel-info-cell">
                <div className="panel-info-key">Instagram</div>
                <div className="panel-info-val">
                  <a href={INSTAGRAM} target="_blank" rel="noreferrer">@__om_soni__08</a>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-footer">
            <a href={RESUME_URL} download className="download-btn">
              <span>⬇</span> Download Resume
            </a>
          </div>
        </div>
      </div>
    )}

    {/* ─── PROJECT MODAL ─── */}
    {selectedProj && (
      <div className="modal-overlay" onClick={() => setSelectedProj(null)}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedProj(null)}>✕</button>

          {selectedProj.imgComponent ? (
            <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
              {selectedProj.imgComponent}
            </div>
          ) : (
            <img className="modal-img" src={selectedProj.img} alt={selectedProj.title} />
          )}

          <div className="modal-body">
            <div className="modal-cat">{selectedProj.cat}</div>
            <h2 className="modal-title">{selectedProj.title}</h2>
            <p className="modal-desc" style={{ whiteSpace: 'pre-line' }}>{selectedProj.detail}</p>
            <div className="modal-stack-wrap">
              {selectedProj.stack.map((t) => <span className="m-tag" key={t}>{t}</span>)}
            </div>
            <div className="modal-actions">
              {selectedProj.link && (
                <a
                  href={selectedProj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-btn-primary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  Live Demo ↗
                </a>
              )}
              <button className="m-btn-ghost" onClick={() => setSelectedProj(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* ─── TOAST ─── */}
    {toast.show && (
      <div className={`toast ${toast.success ? 'toast-success' : 'toast-error'}`}>
        <span className={`toast-dot ${toast.success ? '' : 'toast-dot-error'}`} />
        {toast.msg}
      </div>
    )}
  </>
);
}
