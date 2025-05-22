import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button as MuiButton,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
} from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import axios from "axios";

const FormContainer = muiStyled(Box)(({ theme }) => ({
  maxWidth: "600px",
  margin: "auto",
  padding: "20px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.1)`,
  backgroundColor: "#333", // Dark background
  color: "#fff", // Light text color for dark theme
}));

const EditProfileForm = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    profilePic: null,
    weight: "",
    height: "",
    mobileNo: "",
    email: "",
  });

  const [bmi, setBmi] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData.weight && formData.height) {
      const heightInMeters = formData.height / 100;
      const calculatedBMI = (formData.weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBMI);
    }
  }, [formData.weight, formData.height]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser?.email) return;
      setLoading(true);
      try {
        const { data } = await axios.get(`http://127.0.0.1:8080/api/personal-info/${currentUser.email}`);
        setFormData((prev) => ({
          ...prev,
          ...data,
          email: currentUser.email,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, profilePic: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("currentBMI", bmi);

    try {
      const response = await axios.post(`${process.env.Backendbaseurl}/api/personal-info1`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormContainer>
      <Typography variant="h5" fontWeight="600" marginBottom={3}>
        Edit Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{
              style: { color: "#fff" }, // Label text color
            }}
            InputProps={{
              style: { color: "#fff" }, // Input text color
            }}
            sx={{
              backgroundColor: "#444", // Dark input background
              borderRadius: 1,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={3}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { color: "#fff" },
            }}
            sx={{
              backgroundColor: "#444",
              borderRadius: 1,
            }}
          />
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center" gap={2}>
          <Avatar
            src={formData.profilePic ? URL.createObjectURL(formData.profilePic) : ""}
            alt="Profile Picture"
            sx={{ width: 56, height: 56 }}
          />
          <MuiButton variant="outlined" component="label" sx={{ color: "#fff", borderColor: "#fff" }}>
            Upload Profile Picture
            <input type="file" hidden onChange={handleFileChange} />
          </MuiButton>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Weight (kg)"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            variant="outlined"
            type="number"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { color: "#fff" },
            }}
            sx={{
              backgroundColor: "#444",
              borderRadius: 1,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Height (cm)"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            variant="outlined"
            type="number"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { color: "#fff" },
            }}
            sx={{
              backgroundColor: "#444",
              borderRadius: 1,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="#fff">
            Current BMI: <strong>{bmi || "N/A"}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Mobile No."
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { color: "#fff" },
            }}
            sx={{
              backgroundColor: "#444",
              borderRadius: 1,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiButton
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#1976d2", // Blue color for the button
              "&:hover": {
                backgroundColor: "#1565c0", // Darker blue on hover
              },
            }}
          >
            Submit
          </MuiButton>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default EditProfileForm;
