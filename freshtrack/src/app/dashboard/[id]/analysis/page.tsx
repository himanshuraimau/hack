"use client";

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '@/components/dashboard/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Fallback mock data
const MOCK_DATA = {
  temperature: [22.5, 23.1, 23.4, 22.8, 22.9, 23.2, 23.5, 23.1, 22.7, 22.4],
  humidity: [45, 46, 44, 45, 47, 46, 45, 44, 46, 45],
  timeLabels: Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - (9 - i) * 30);
    return date.toLocaleTimeString();
  }),
};

const AnalyticsPage = () => {
  const params = useParams();
  const deviceId = params?.id as string;
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    temperature: [] as number[],
    humidity: [] as number[],
    timeLabels: [] as string[],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/device-data/${deviceId}/analytics`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        if (!response.data || response.data.length === 0) {
          // Use mock data if no data is available
          setData(MOCK_DATA);
          toast.warning('Using sample data for demonstration');
          return;
        }

        // Process the data
        const processedData = {
          temperature: response.data.map((d: any) => d.temperature) || MOCK_DATA.temperature,
          humidity: response.data.map((d: any) => d.humidity) || MOCK_DATA.humidity,
          timeLabels: response.data.map((d: any) => 
            new Date(d.createdAt).toLocaleTimeString()
          ) || MOCK_DATA.timeLabels,
        };

        setData(processedData);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        // Fallback to mock data on error
        setData(MOCK_DATA);
        toast.warning('Using sample data due to API error');
      } finally {
        setIsLoading(false);
      }
    };

    if (deviceId && auth.token) {
      fetchAnalytics();
      // Set up polling every 5 minutes
      const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);
      return () => clearInterval(interval);
    } else {
      // Use mock data if no deviceId or token
      setData(MOCK_DATA);
      setIsLoading(false);
    }
  }, [deviceId, auth.token]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sensor Data Analytics",
        color: '#1f2937',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: (value: number) => {
            return value.toFixed(1);
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  const temperatureGraphData = {
    labels: data.timeLabels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.temperature,
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const humidityGraphData = {
    labels: data.timeLabels,
    datasets: [
      {
        label: "Humidity (%)",
        data: data.humidity,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)]">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="hover:bg-gray-100"
          >
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Temperature Trend</h2>
            <Line options={options} data={temperatureGraphData} />
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Humidity Trend</h2>
            <Line options={options} data={humidityGraphData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
