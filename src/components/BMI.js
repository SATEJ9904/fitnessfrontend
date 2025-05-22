import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Alert,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  background: "#1c1c1e",
  color: "#fff",
  borderRadius: "20px",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
  padding: "30px",
  maxWidth: "500px",
  margin: "auto",
});

const GradientButton = styled(Button)({
  background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  padding: "12px 20px",
  borderRadius: "30px",
  textTransform: "uppercase",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    background: "linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)",
  },
});

const ResultBox = styled(Box)({
  background: "rgba(255, 255, 255, 0.1)",
  padding: "20px",
  borderRadius: "15px",
  marginTop: "20px",
  textAlign: "center",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
});

const BMI = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);

      if (bmiValue < 18.5) {
        setCategory("Underweight");
        setRecommendation(
          "Consider adding nutrient-rich, high-calorie foods to your diet. Incorporate strength training to build muscle."
        );
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setCategory("Normal weight");
        setRecommendation(
          "Great job! Maintain your weight by continuing a balanced diet and regular physical activity."
        );
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setCategory("Overweight");
        setRecommendation(
          "Focus on reducing caloric intake while increasing cardio activities like running or cycling."
        );
      } else {
        setCategory("Obesity");
        setRecommendation(
          "Prioritize a healthy lifestyle. Consult a healthcare professional for guidance on weight management."
        );
      }
    }
  };

  const resetForm = () => {
    setWeight("");
    setHeight("");
    setBMI(null);
    setCategory("");
    setRecommendation("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #000428, #004e92)",
        padding: "20px",
      }}
    >
      <StyledCard>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            BMI Calculator
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Weight (kg)"
                variant="outlined"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                fullWidth
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "rgba(255, 255, 255, 0.7)" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ff416c",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff416c",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Height (cm)"
                variant="outlined"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                fullWidth
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "rgba(255, 255, 255, 0.7)" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ff416c",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff416c",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <GradientButton fullWidth onClick={calculateBMI}>
                Calculate
              </GradientButton>
            </Grid>
          </Grid>
        </CardContent>
        {bmi && (
          <CardContent>
            <ResultBox>
              <Typography variant="h5" gutterBottom>
                Your BMI: <strong>{bmi}</strong>
              </Typography>
              <Alert severity="info" sx={{ marginTop: "10px" }}>
                Category: <strong>{category}</strong>
              </Alert>
              <Typography
                variant="body1"
                sx={{ marginTop: "15px", color: "#fff" }}
              >
                {recommendation}
              </Typography>
            </ResultBox>
          </CardContent>
        )}
        <CardActions>
          <GradientButton fullWidth onClick={resetForm}>
            Reset
          </GradientButton>
        </CardActions>
      </StyledCard>
    </Box>
  );
};

export default BMI;
