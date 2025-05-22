import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { fetchProgress } from "../api"; // Import the fetchProgress function
import { useNavigate } from "react-router-dom";

const AllOverProgress = () => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user progress data
    const fetchProgressData = async () => {
      setLoading(true);
      const token = localStorage.getItem("fittrack-app-token");

      try {
        const res = await fetchProgress(token);
        setProgressData(res?.data);
        setLoading(false);
      } catch (error) {
        // Handle 404 error and show motivational message
        if (error.response && error.response.status === 404) {
          setErrorMessage("No progress data available yet. Start logging your workouts and track your progress!");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [navigate]);

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh", width: "100%" }}
      >
        <CircularProgress size={80} color="primary" />
      </Grid>
    );
  }

  if (errorMessage) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          height: "100vh",
          width: "100%",
          flexDirection: "column",
          textAlign: "center",
          color: "#fff",
          backgroundColor:"#121212"
        }}
      >
        <Typography variant="h6" color="#fff" paragraph>
          {errorMessage}
        </Typography>
        <Typography variant="h5" color="primary" paragraph>
          Don't worry! It's just the beginning.
        </Typography>
        <Typography variant="body1" color="#fff" paragraph>
          Start logging your workouts and track your progress. Every small step
          counts!
        </Typography>
        <Typography variant="body2" color="#fff" paragraph>
          Go ahead and add your first workout to get started!
        </Typography>
      </Grid>
    );
  }

  if (!progressData) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          height: "100vh",
          width: "100%",
          flexDirection: "column",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h6" color="textSecondary" paragraph>
          No progress data available yet.
        </Typography>
        <Typography variant="h5" color="primary" paragraph>
          Don't worry! It's just the beginning.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Start logging your workouts and track your progress. Every small step
          counts!
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Go ahead and add your first workout to get started!
        </Typography>
      </Grid>
    );
  }

  const {
    dates,
    caloriesPerDay,
    totalCalories,
    activeDays,
    averageCaloriesPerDay,
    recommendation,
  } = progressData;

  // Prepare data for the chart
  const chartData = dates.map((date, index) => ({
    date,
    calories: caloriesPerDay[index],
  }));

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "100vh",
        width: "98%",
        backgroundColor: "#121212",
        padding: "16px",
      }}
    >
      <Typography variant="h4" gutterBottom color="#fff" align="center">
        Your Over-All Progress
      </Typography>

      <Grid container spacing={4} style={{ marginBottom: "24px" }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" gutterBottom color="#e0e0e0">
            Total Calories Burned:
          </Typography>
          <Typography variant="h5" color="primary">
            {totalCalories.toFixed(2)} kcal
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" gutterBottom color="#e0e0e0">
            Active Days:
          </Typography>
          <Typography variant="h5" color="primary">
            {activeDays}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" gutterBottom color="#e0e0e0">
            Avg Calories/Day:
          </Typography>
          <Typography variant="h5" color="primary">
            {averageCaloriesPerDay} kcal
          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ marginBottom: "24px", backgroundColor: "#424242" }} />

      <Box style={{ flexGrow: 1, height: "100%" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
            <XAxis dataKey="date" stroke="#e0e0e0" />
            <YAxis stroke="#e0e0e0" />
            <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
            <Line type="monotone" dataKey="calories" stroke="#3f51b5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Divider style={{ marginBottom: "24px", backgroundColor: "#424242" }} />

      <Box>
        <Typography variant="h6" gutterBottom color="#fff">
          Recommendation:
        </Typography>
        <Typography variant="body1" color="#fff">
          {recommendation}
        </Typography>
      </Box>
    </Box>
  );
};

export default AllOverProgress;
