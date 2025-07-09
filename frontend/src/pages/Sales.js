import React, { useState, useEffect } from "react";
import { FaChartLine, FaDollarSign, FaClock, FaStar, FaUsers, FaShoppingCart } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import TopNav from "../components/TopNav";
import "./Sales.css";

// Import Inter font
const interFont = document.createElement('link');
interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
interFont.rel = 'stylesheet';
document.head.appendChild(interFont);

// Sample data
const salesData = [
  { month: 'Jan', sales: 45000, orders: 120 },
  { month: 'Feb', sales: 52000, orders: 135 },
  { month: 'Mar', sales: 48000, orders: 110 },
  { month: 'Apr', sales: 61000, orders: 150 },
  { month: 'May', sales: 55000, orders: 130 },
  { month: 'Jun', sales: 67000, orders: 165 },
  { month: 'Jul', sales: 72000, orders: 180 },
];

const recentSales = [
  { id: 1, customer: "John Smith", product: "Brake Pads", amount: 120, status: "Completed", date: "2024-01-15" },
  { id: 2, customer: "Sarah Johnson", product: "Oil Filter", amount: 45, status: "Pending", date: "2024-01-15" },
  { id: 3, customer: "Mike Wilson", product: "Air Filter", amount: 35, status: "Completed", date: "2024-01-14" },
  { id: 4, customer: "Lisa Brown", product: "Spark Plugs", amount: 80, status: "Processing", date: "2024-01-14" },
  { id: 5, customer: "David Lee", product: "Battery", amount: 150, status: "Completed", date: "2024-01-13" },
];

const topCustomers = [
  { name: "John Smith", totalSpent: 2500, orders: 15, lastOrder: "2024-01-15" },
  { name: "Sarah Johnson", totalSpent: 1800, orders: 12, lastOrder: "2024-01-14" },
  { name: "Mike Wilson", totalSpent: 1200, orders: 8, lastOrder: "2024-01-13" },
  { name: "Lisa Brown", totalSpent: 900, orders: 6, lastOrder: "2024-01-12" },
];

const topProducts = [
  { name: "Brake Pads", sales: 45, revenue: 5400 },
  { name: "Oil Filter", sales: 38, revenue: 1710 },
  { name: "Air Filter", sales: 32, revenue: 1120 },
  { name: "Spark Plugs", sales: 28, revenue: 2240 },
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

const Sales = () => {
  const [activeLink, setActiveLink] = useState("Sales");

  // Animated counters
  const totalSales = useAnimatedCounter(350000);
  const todaySales = useAnimatedCounter(8500);
  const pendingOrders = useAnimatedCounter(12);
  const topProductSales = useAnimatedCounter(45);

  return (
    <div className="sales-container" style={{ fontFamily: 'Inter, sans-serif' }}>
      <TopNav activeLink={activeLink} setActiveLink={setActiveLink} />
      <div className="sales-header">
        <h1>Sales Dashboard</h1>
        <p>Manage and track your sales performance</p>
      </div>

      {/* Sales Overview Cards */}
      <div className="sales-overview">
        <div className="sales-card">
          <div className="sales-card-icon"><FaDollarSign /></div>
          <div className="sales-card-content">
            <div className="sales-card-value">${totalSales.toLocaleString()}</div>
            <div className="sales-card-label">Total Sales</div>
          </div>
        </div>
        <div className="sales-card">
          <div className="sales-card-icon"><FaChartLine /></div>
          <div className="sales-card-content">
            <div className="sales-card-value">${todaySales.toLocaleString()}</div>
            <div className="sales-card-label">Today's Sales</div>
          </div>
        </div>
        <div className="sales-card">
          <div className="sales-card-icon"><FaClock /></div>
          <div className="sales-card-content">
            <div className="sales-card-value">{pendingOrders}</div>
            <div className="sales-card-label">Pending Orders</div>
          </div>
        </div>
        <div className="sales-card">
          <div className="sales-card-icon"><FaStar /></div>
          <div className="sales-card-content">
            <div className="sales-card-value">{topProductSales}</div>
            <div className="sales-card-label">Top Product Sales</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="sales-charts">
        <div className="chart-card">
          <h3>Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Orders by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Sales and Top Customers */}
      <div className="sales-details">
        <div className="recent-sales">
          <h3>Recent Sales</h3>
          <div className="sales-table">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.customer}</td>
                    <td>{sale.product}</td>
                    <td>${sale.amount}</td>
                    <td><span className={`status ${sale.status.toLowerCase()}`}>{sale.status}</span></td>
                    <td>{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="top-customers">
          <h3>Top Customers</h3>
          <div className="customers-list">
            {topCustomers.map((customer, idx) => (
              <div key={idx} className="customer-item">
                <div className="customer-info">
                  <div className="customer-name">{customer.name}</div>
                  <div className="customer-stats">
                    <span>${customer.totalSpent.toLocaleString()}</span>
                    <span>{customer.orders} orders</span>
                  </div>
                </div>
                <div className="customer-last-order">Last: {customer.lastOrder}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales; 