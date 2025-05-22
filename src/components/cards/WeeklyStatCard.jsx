import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Styled components
const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid #333;
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: #121212; // Light background for the card

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #fff; // Adjust title color for better contrast
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const WeeklyStatCard = ({ data }) => {
  // Extract data for the chart
  const weeks = data?.totalWeeksCaloriesBurnt?.weeks || [];
  const caloriesBurned = data?.totalWeeksCaloriesBurnt?.caloriesBurned || [];

  // Handle the case when data is not available or improperly structured
  if (weeks.length === 0 || caloriesBurned.length === 0) {
    return (
      <Card>
        <Title>No data available</Title>
      </Card>
    );
  }

  // Chart.js data and options
  const chartData = {
    labels: weeks,
    datasets: [
      {
        label: "Calories Burned",
        data: caloriesBurned,
        backgroundColor: "#76c7c0", // Light color for the bars
        borderColor: "#333", // Dark color for the border of bars
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the graph takes up more space
    plugins: {
      title: {
        display: true,
        text: "Weekly Calories Burned",
        font: {
          size: 18,
        },
        color: "#fff", // Dark color for the title
      },
      legend: {
        labels: {
          color: "#fff", // Dark color for the legend
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#121212", // Light grid lines for the x-axis
        },
        ticks: {
          color: "#fff", // Dark color for x-axis ticks
        },
      },
      y: {
        beginAtZero: true, // Start Y-axis at 0
        grid: {
          color: "#121212", // Light grid lines for the y-axis
        },
        ticks: {
          color: "#fff", // Dark color for y-axis ticks
          stepSize: 150, // Increment by 100
        },
      },
    },
  };

  return (
    <Card>
      <Title>Weekly Calories Burned</Title>
      <div style={{ height: "400px", width: "100%" }}> {/* Increased height for larger graph */}
        <Bar data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
};

export default WeeklyStatCard;
