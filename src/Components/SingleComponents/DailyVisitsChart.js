import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DailyVisitsChart = ({ data }) => {
  const dailyData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Günlük Ziyaretçi",
        data: Object.values(data),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "600px" }}>
      <Bar data={dailyData} />
    </div>
  );
};

export default DailyVisitsChart;
