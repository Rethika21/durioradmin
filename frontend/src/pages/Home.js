import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { FaCogs, FaChartBar, FaShieldAlt, FaUsers, FaQuoteLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import TopNav from "../components/TopNav";
import duriorLogo from "../assets/durior_logo.jpeg";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80"
];
const HERO_QUOTES = [
  "Success is not the key to happiness. Happiness is the key to success.",
  "Quality means doing it right when no one is looking.",
  "Great things never come from comfort zones.",
  "Innovation distinguishes between a leader and a follower."
];

const QUICK_STATS = [
  { label: "Sales", value: 67343, sub: "+5.5% since last month" },
  { label: "Purchases", value: 2343, sub: "-1.2% since last month", negative: true },
  { label: "Orders", value: 35343, sub: "+2.1% since last month" },
];

const OVERVIEW = [
  { label: "Member Profit", value: "+1343", positive: true },
  { label: "Member Profit", value: "+1245", positive: true },
  { label: "Member Profit", value: "+1145", positive: true },
  { label: "Member Profit", value: "+1045", positive: true },
];

const ACTIVITY = [
  { color: "#4caf50", text: "User A updated sales data." },
  { color: "#ff9800", text: "Order #1234 pending approval." },
  { color: "#f44336", text: "Worker B marked absent." },
  { color: "#2196f3", text: "New product added to inventory." },
];

const PROFILE = {
  name: "Admin User",
  avatar: duriorLogo,
};

const NEWS_API_KEY = "YOUR_NEWSAPI_KEY_HERE"; // <-- Replace with your NewsAPI.org key
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=automobile%20OR%20auto%20parts%20OR%20bike%20accessories&language=en&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}`;

const SIDEBAR_LINKS = [
  { label: "Home", href: "/dashboard" },
  { label: "Sales", href: "#sales" },
  { label: "Attendance", href: "#attendance" },
  { label: "Wages", href: "#wages" },
  { label: "Analytics", href: "#analytics" },
];

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Sales", href: "/sales" },
  { label: "Sales Management", href: "/sales-management" },
  { label: "Attendance", href: "#attendance" },
  { label: "Wages", href: "#wages" },
  { label: "Analytics", href: "#analytics" },
];

// Add high-quality Unsplash images for cards
const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", // Car
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80", // Sales
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80", // Analytics
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80", // Team
];

const FEATURE_CARDS = [
  { icon: <FaCogs />, title: "Automation", desc: "Streamline your workflow with powerful automation tools." },
  { icon: <FaChartBar />, title: "Analytics", desc: "Gain insights with real-time analytics and reporting." },
  { icon: <FaShieldAlt />, title: "Security", desc: "Enterprise-grade security for your business data." },
  { icon: <FaUsers />, title: "Collaboration", desc: "Work together with your team efficiently and securely." },
];

const FAQS = [
  { q: "How secure is my data?", a: "We use enterprise-grade encryption and security best practices to keep your data safe." },
  { q: "Can I customize the dashboard?", a: "Yes, you can personalize widgets, themes, and notifications to fit your workflow." },
  { q: "Is support available?", a: "Our support team is available 24/7 via chat and email." },
  { q: "How do I invite my team?", a: "Go to Settings > Team and send invites to your colleagues." },
];

function useAnimatedCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration]);
  return count;
}

function CircularProgress({ percent }) {
  const radius = 38;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  return (
    <svg height={radius * 2} width={radius * 2} className="circle-progress">
      <circle
        stroke="#e3eafc"
        fill="none"
        strokeWidth={stroke}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
      />
      <circle
        stroke="#3f51b5"
        fill="none"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        style={{ transition: "stroke-dashoffset 1s" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="1.3rem"
        fill="#233a7c"
        fontWeight="bold"
      >
        {percent}%
      </text>
    </svg>
  );
}

// Helper to split text into spans for wave animation


const Home = () => {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [totalSale, setTotalSale] = useState(70); // percent
  const [heroIdx, setHeroIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const heroTimer = useRef();
  const [faqOpen, setFaqOpen] = useState(Array(FAQS.length).fill(false));

  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      try {
        const res = await fetch(NEWS_API_URL);
        const data = await res.json();
        if (data.articles) setNews(data.articles);
      } catch (err) {
        setNews([]);
      }
      setLoadingNews(false);
    };
    fetchNews();
  }, []);

  // Auto-slide for hero
  useEffect(() => {
    heroTimer.current = setInterval(() => {
      setHeroIdx((idx) => (idx + 1) % HERO_IMAGES.length);
      setQuoteIdx((idx) => (idx + 1) % HERO_QUOTES.length);
    }, 4000);
    return () => clearInterval(heroTimer.current);
  }, []);

  // Manual navigation resets timer
  const goToHero = (idx) => {
    setHeroIdx(idx);
    setQuoteIdx(idx % HERO_QUOTES.length);
    clearInterval(heroTimer.current);
    heroTimer.current = setInterval(() => {
      setHeroIdx((i) => (i + 1) % HERO_IMAGES.length);
      setQuoteIdx((i) => (i + 1) % HERO_QUOTES.length);
    }, 4000);
  };
  const prevHero = () => goToHero((heroIdx - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  const nextHero = () => goToHero((heroIdx + 1) % HERO_IMAGES.length);

  // Sidebar close on outside click (mobile)
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleClick = (e) => {
      if (
        !e.target.closest('.dashboard-sidebar') &&
        !e.target.closest('.sidebar-toggle')
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [sidebarOpen]);

  // Animated counters for quick stats
  const stat0 = useAnimatedCounter(QUICK_STATS[0].value);
  const stat1 = useAnimatedCounter(QUICK_STATS[1].value);
  const stat2 = useAnimatedCounter(QUICK_STATS[2].value);

  // Animated counter for hero (sum of all quick stats)
  const heroCounter = useAnimatedCounter(QUICK_STATS.reduce((a, s) => a + s.value, 0));

  return (
    <div className={`dashboard-root${document.body.classList.contains('dark-mode') ? ' dark-mode' : ''}`}>
      <TopNav activeLink={activeLink} setActiveLink={setActiveLink} />
      {/* Hero Section below top nav bar with animated SVG blob, floating particles, and wave text */}
      <div className="hero-section modern-hero" style={{ background: 'linear-gradient(120deg, #eaf1fb 60%, #f4f7fb 100%)' }}>
        {/* Animated SVG Blob */}
        <svg className="hero-blob-bg" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#a259ff" />
            </linearGradient>
          </defs>
          <path>
            <animate attributeName="d" dur="8s" repeatCount="indefinite"
              values="M421,320Q370,400,270,370Q170,340,120,270Q70,200,120,120Q170,40,270,70Q370,100,421,180Q472,260,421,320Z;
                      M420,300Q380,400,270,370Q160,340,120,270Q80,200,120,120Q160,40,270,70Q380,100,420,180Q460,260,420,300Z;
                      M421,320Q370,400,270,370Q170,340,120,270Q70,200,120,120Q170,40,270,70Q370,100,421,180Q472,260,421,320Z" />
          </path>
        </svg>
        {/* Floating Particles */}
        <div className="floating-particles">
          {[...Array(12)].map((_, i) => (
            <span key={i} className={`particle particle-${i+1}`}></span>
          ))}
        </div>
        <div className="hero-content">
          <h1 className="modern-hero-title">Welcome to Durior Admin</h1>
          <p className="modern-hero-subtitle">Your professional auto parts dashboard</p>
          <div className="hero-animated-counter">{heroCounter.toLocaleString()}+ parts managed</div>
        </div>
        {/* Animated SVG wave at bottom */}
        <svg className="svg-wave" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#e3edfa" fillOpacity="1" d="M0,32L60,37.3C120,43,240,53,360,69.3C480,85,600,107,720,112C840,117,960,107,1080,90.7C1200,75,1320,53,1380,42.7L1440,32L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path></svg>
      </div>
      {/* Quick Stats/Features Section */}
      <div className="home-quick-stats">
        <div className="home-stat-card">
          <div className="home-stat-label">{QUICK_STATS[0].label}</div>
          <div className="home-stat-value">{stat0.toLocaleString()}</div>
          <div className={`home-stat-sub${QUICK_STATS[0].negative ? " negative" : ""}`}>{QUICK_STATS[0].sub}</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-label">{QUICK_STATS[1].label}</div>
          <div className="home-stat-value">{stat1.toLocaleString()}</div>
          <div className={`home-stat-sub${QUICK_STATS[1].negative ? " negative" : ""}`}>{QUICK_STATS[1].sub}</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-label">{QUICK_STATS[2].label}</div>
          <div className="home-stat-value">{stat2.toLocaleString()}</div>
          <div className={`home-stat-sub${QUICK_STATS[2].negative ? " negative" : ""}`}>{QUICK_STATS[2].sub}</div>
        </div>
      </div>
      {/* Feature Highlights Section */}
      <div className="home-features">
        {FEATURE_CARDS.map((f, idx) => (
          <div className="home-feature-card" key={idx}>
            <div className="home-feature-icon">{f.icon}</div>
            <div className="home-feature-title">{f.title}</div>
            <div className="home-feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
      {/* FAQ Section */}
      <div className="home-faq">
        <h2>Frequently Asked Questions</h2>
        <ul className="faq-list">
          {FAQS.map((faq, idx) => (
            <li key={idx} className="faq-item">
              <button className="faq-question" onClick={() => setFaqOpen(faqOpen.map((v, i) => i === idx ? !v : v))}>
                {faq.q} {faqOpen[idx] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {faqOpen[idx] && <div className="faq-answer">{faq.a}</div>}
            </li>
          ))}
        </ul>
      </div>
      {/* Dashboard Content Below Hero */}
      <div className="main-content-area animated-main-content">
        {/* Dashboard Grid */}
        <div className="dashboard-grid-cards animated-cards-grid">
          {/* Top row: Stats with images */}
          {/* Middle row: Overview, Total Sale, Activity */}
          <div className="dashboard-row-cards animated-row-cards">
            <div className="overview-card dashboard-card-cards animated-card">
              <div className="card-image-wrapper">
                <img src={CARD_IMAGES[0]} alt="Overview visual" className="card-image" />
              </div>
              <div className="dashboard-card-title-cards">Overview</div>
              <ul className="overview-list-cards">
                {OVERVIEW.map((item, idx) => (
                  <li key={idx} className={item.positive ? "positive" : "negative"}>{item.label} <span>{item.value}</span></li>
                ))}
              </ul>
            </div>
            <div className="total-sale-card dashboard-card-cards animated-card">
              <div className="card-image-wrapper">
                <img src={CARD_IMAGES[1]} alt="Total Sale visual" className="card-image" />
              </div>
              <div className="dashboard-card-title-cards">Total Sale</div>
              <div className="circle-progress-wrapper">
                <CircularProgress percent={totalSale} />
              </div>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="activity-card dashboard-card-cards animated-card">
              <div className="card-image-wrapper">
                <img src={CARD_IMAGES[2]} alt="Activity visual" className="card-image" />
              </div>
              <div className="dashboard-card-title-cards">Activity</div>
              <ul className="activity-list-cards">
                {ACTIVITY.map((item, idx) => (
                  <li key={idx} className="activity-item-cards">
                    <span className="activity-dot-cards" style={{ background: item.color }} />
                    {item.text}
                  </li>
                ))}
              </ul>
              <button className="view-all-btn">View All</button>
            </div>
          </div>
        </div>
        {/* News/Trends Section */}
        <div className="news-section animated-news-section">
          <h2>Automobile Industry Trends</h2>
          {loadingNews ? (
            <div className="news-loading">Loading news...</div>
          ) : news.length > 0 ? (
            <ul className="news-list modern-news-list">
              {news.map((item, idx) => (
                <li key={idx} className="news-item modern-news-item">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="news-title modern-news-title">{item.title}</a>
                  <div className="news-desc modern-news-desc">{item.description}</div>
                  <div className="news-meta modern-news-meta">{item.source?.name} &middot; {new Date(item.publishedAt).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="news-error">No news found. Please check your API key or try again later.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 