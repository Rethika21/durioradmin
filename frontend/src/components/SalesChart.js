import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
  axios.get("/api/sales")
    .then((res) => {
      const labels = res.data.map((item) => item.date);
      const values = res.data.map((item) => item.total);

      setChartData({
        labels,
        datasets: [
          {
            label: "Sales",
            data: values,
            borderColor: "teal",
            backgroundColor: "rgba(0, 128, 128, 0.2)",
            tension: 0.3
          }
        ]
      });
    })
    .catch((err) => {
      console.error("API fetch failed:", err.message);
    });
}, []);

  return (
    <div>
      <h3>Sales Trend</h3>
      {chartData.labels ? <Line data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
}
