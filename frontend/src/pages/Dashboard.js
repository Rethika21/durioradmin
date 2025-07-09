import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import { FaChartLine, FaUserCheck, FaMoneyCheckAlt, FaChartPie, FaHistory } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./Dashboard.css";

// Import Inter font
const interFont = document.createElement('link');
interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
interFont.rel = 'stylesheet';
document.head.appendChild(interFont);

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4780 },
  { name: 'May', sales: 5890 },
  { name: 'Jun', sales: 4390 },
  { name: 'Jul', sales: 6490 },
];

const summaryStats = [
  { icon: <FaChartLine />, label: 'Total Sales', value: 120000, prefix: '$' },
  { icon: <FaUserCheck />, label: 'Active Workers', value: 48 },
  { icon: <FaMoneyCheckAlt />, label: 'Profit Margin', value: 23, suffix: '%' },
  { icon: <FaChartPie />, label: 'Reports', value: 12 },
];

const recentActivity = [
  { icon: <FaHistory />, text: 'User JohnDoe logged in', time: '2 min ago' },
  { icon: <FaHistory />, text: 'Sales report generated', time: '10 min ago' },
  { icon: <FaHistory />, text: 'Worker attendance updated', time: '30 min ago' },
  { icon: <FaHistory />, text: 'Wages processed', time: '1 hr ago' },
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

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  const handleToggleDarkMode = () => setIsDarkMode((d) => !d);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-stats">
            <div className="skeleton-stat"></div>
            <div className="skeleton-stat"></div>
            <div className="skeleton-stat"></div>
            <div className="skeleton-stat"></div>
          </div>
          <div className="skeleton-cards">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ fontFamily: 'Inter, sans-serif' }}>
      <TopNav onLogout={handleLogout} onToggleDarkMode={handleToggleDarkMode} isDarkMode={isDarkMode} />
      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome to your Admin Dashboard</h2>
          <p className="dashboard-subtitle">A professional overview of your auto parts manufacturing business</p>
        </div>
        <div className="dashboard-summary-stats">
          {summaryStats.map((stat, idx) => {
            const count = useAnimatedCounter(stat.value);
            return (
              <div className="dashboard-summary-card" key={idx}>
                <div className="dashboard-summary-icon">{stat.icon}</div>
                <div className="dashboard-summary-value">
                  {stat.prefix || ''}{count}{stat.suffix || ''}
                </div>
                <div className="dashboard-summary-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
        <div className="dashboard-grid">
          {/* Sales Overview Section */}
          <div className="dashboard-card" id="sales">
            <div className="dashboard-card-accent"></div>
            <div className="dashboard-card-icon-circle"><FaChartLine /></div>
            <h3>Sales Overview</h3>
            <div className="dashboard-chart-container">
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={salesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#2563eb" fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Attendance Section */}
          <div className="dashboard-card" id="attendance">
            <div className="dashboard-card-accent"></div>
            <div className="dashboard-card-icon-circle"><FaUserCheck /></div>
            <h3>Worker Attendance</h3>
            <p>Attendance table will appear here.</p>
          </div>
          {/* Wages Section */}
          <div className="dashboard-card" id="wages">
            <div className="dashboard-card-accent"></div>
            <div className="dashboard-card-icon-circle"><FaMoneyCheckAlt /></div>
            <h3>Wages Information</h3>
            <p>Wages calculation table will appear here.</p>
          </div>
          {/* Analytics Section */}
          <div className="dashboard-card" id="analytics">
            <div className="dashboard-card-accent"></div>
            <div className="dashboard-card-icon-circle"><FaChartPie /></div>
            <h3>Business Analytics</h3>
            <p>Profit margin, top products, and more analytics will appear here.</p>
          </div>
          {/* Recent Activity Feed */}
          <div className="dashboard-card" id="activity-feed">
            <div className="dashboard-card-accent"></div>
            <div className="dashboard-card-icon-circle"><FaHistory /></div>
            <h3>Recent Activity</h3>
            <ul className="activity-feed-list">
              {recentActivity.map((item, idx) => (
                <li key={idx} className="activity-feed-item">
                  <span className="activity-feed-icon">{item.icon}</span>
                  <span className="activity-feed-text">{item.text}</span>
                  <span className="activity-feed-time">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 