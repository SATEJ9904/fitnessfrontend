import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material"; import axios from "axios";
import GaugeChart from "react-gauge-chart";


const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${"#fff"};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;



const BmiMeterContainer = styled(Box)(({ theme }) => ({
  flexBasis: "320px",
  textAlign: "center",
  padding: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  borderRadius: "12px",
  backgroundColor: "#f9f9f9",
}));
const WeeklyStatCard = ({ data }) => {
  const { currentUser } = useSelector((state) => state.user); // Assumes currentUser   contains the email.

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const fetchUserData = async () => {
    if (!currentUser?.email) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8080/api/personal-info/${currentUser.email}`
      );
      setUserData(response.data);
      setFormData(response.data);
    } catch (err) {
      console.error("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const calculatedBMI = (formData.weight / (heightInMeters * heightInMeters)).toFixed(2);
      setFormData((prev) => ({ ...prev, currentBMI: calculatedBMI }));
    }
  }, [formData.height, formData.weight]);

  const bmi = formData.currentBMI;
  const bmiRange = bmi
    ? bmi < 18.5
      ? "Underweight"
      : bmi <= 24.9
        ? "Normal"
        : "Overweight"
    : "";

  const getGaugeColors = () => ["#00BFFF", "#3CB371", "#FF6347"]; // Sky Blue, Green, Red

  const getBmiRecommendation = (bmi) => {
    if (bmi < 18.5) {
      return <span style={{ color: "white" }}>Consider increasing your calorie intake with nutrient-dense foods.</span>;
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return <span style={{ color: "white" }}>Maintain your current diet and exercise routine.</span>;
    } else {
      return <span style={{ color: "white" }}>Focus on a balanced diet and regular exercise to manage your weight.</span>;
    }
  };

    const [userDetails, setUserDetails] = useState(null);
  
    useEffect(() => {
      const fetchUserDetails = async () => {
        if (currentUser   && currentUser  .email) {
          const response = await axios.get(
            `http://127.0.0.1:8080/api/personal-info/${currentUser  .email}`
          );
          setUserDetails(response.data);
        }
      };
  
      fetchUserDetails();
    }, [currentUser  ]);
    

  return (
    <Card>
      <Typography variant="h6" fontWeight="600" marginBottom={2} color={"#fff"}>
        Body Mass Index (BMI)
      </Typography>
      <GaugeChart
        id="bmi-gauge"
        nrOfLevels={30}
        colors={getGaugeColors()}
        arcWidth={0.3}
        percent={bmi ? bmi / 50 : 0} // Adjust max BMI to 50
        textColor="#fff"
      />

      {/* Min and Max Labels Positioned Below Segments */}
      <Box
        sx={{
          position: "relative",
          marginTop: "-10px", // Adjust spacing to align labels below the gauge
        }}
      >
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            position: "absolute",
            left: "10%", // Positioned under the blue segment
            bottom: "-5px",
            transform: "translateX(-50%)",
            color: "#00BFFF", // Sky Blue
          }}
        >
          0
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            position: "absolute",
            right: "10%", // Positioned under the red segment
            bottom: "-5px",
            transform: "translateX(50%)",
            color: "#FF6347", // Red
          }}
        >
          50
        </Typography>
      </Box>

      {/* BMI Range Label */}
      <Typography
        variant="h6"
        color={bmiRange === "Underweight" ? "#00BFFF" : bmiRange === "Normal" ? "#3CB371" : "#FF6347"}
        fontWeight="600"
        marginTop={2}
      >
        {bmiRange || "N/A"}
      </Typography>

      {/* Description */}
      <Typography variant="body2" color="#fff" marginTop={1}>
        {bmiRange === "Normal"
          ? "Your weight is within normal limits."
          : bmiRange === "Underweight"
            ? "Your weight is below the normal range."
            : bmiRange === "Overweight"
              ? "Your weight is above the normal range."
              : ""}
      </Typography>

      <Typography variant="body1" marginTop={0}>
        {userDetails?.currentBMI && getBmiRecommendation(userDetails.currentBMI)}
      </Typography>

      {/* BMI Value */}
      <Typography
        variant="h5"
        fontWeight="700"
        marginTop={2}
        color="#fff"
      >
        {bmi || "N/A"}
      </Typography>
    </Card>
  );
};

export default WeeklyStatCard;