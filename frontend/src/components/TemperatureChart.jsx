import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TemperatureChart() {
  const [dataPoints, setDataPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get('http://localhost:5000/temperature');
        const newEntry = res.data;
        setDataPoints(prev => [...prev.slice(-59), newEntry]); // 60-sec window
        setLoading(false);
      } catch (err) {
        console.error('Error fetching temperature:', err.message);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: dataPoints.map(dp => new Date(dp.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: dataPoints.map(dp => dp.temperature),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(255, 99, 132, 0.4)');
          gradient.addColorStop(1, 'rgba(255, 99, 132, 0)');
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 10,
        max: 50,
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time (HH:MM:SS)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: context => `Temp: ${context.raw} °C`
        }
      },
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  return (
    <div className="chart-container">
      <h2>🌡️ Real-Time Temperature Monitor</h2>
      {loading ? (
        <p className="loading-text">Loading temperature data...</p>
      ) : (
        <Line ref={chartRef} data={chartData} options={options} />
      )}
    </div>
  );
}
