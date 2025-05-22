import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  Button,
  TextField,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useSelector } from "react-redux";

const ProfileContainer = styled(Box)(({ theme }) => ({
  maxWidth: "900px",
  margin: "auto",
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#1f1f2e",
  color: "#f5f5f5",
  overflowY: "auto",
}));

const InfoCard = styled(Card)(({ theme }) => ({
  marginBottom: "24px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  borderRadius: "16px",
  backgroundColor: "#29293d",
  color: "#f5f5f5",
  overflowY: "auto",
}));

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  overflowY: "auto",
  padding: "24px",
  backgroundColor: "#121212",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  textTransform: "none",
}));

const SelfInfo = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchUserData = async () => {
    if (!currentUser?.email) {
      setError("No email found for the logged-in user.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `http://127.0.0.1:8080/api/personal-info/${currentUser.email}`
      );
      setUserData(response.data);
      setFormData(response.data);
    } catch (err) {
      setError("Failed to fetch user details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const calculatedBMI = (formData.weight / (heightInMeters * heightInMeters)).toFixed(2);
      setFormData((prev) => ({ ...prev, currentBMI: calculatedBMI }));
    }
  }, [formData.height, formData.weight]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(
        `http://127.0.0.1:8080/api/personal-info/${currentUser.email}`,
        formData
      );
      setUserData(formData);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <PageContainer>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" textAlign="center">
          {error}
        </Typography>
      ) : (
        <ProfileContainer>
          <Typography
            variant="h4"
            fontWeight="700"
            textAlign="center"
            marginBottom={3}
            color="primary"
          >
            {isEditing ? "Edit Profile" : "User Profile"}
          </Typography>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={4} textAlign="center">
              <Avatar
                src={`http://localhost:8080/${userData?.profilePic}` || ""}
                alt="Profile Picture"
                sx={{
                  width: 140,
                  height: 140,
                  margin: "auto",
                  border: "4px solid #3f51b5",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="fullName"
                  label="Full Name"
                  value={formData.fullName || ""}
                  onChange={handleInputChange}
                  margin="normal"
                  InputLabelProps={{ style: { color: "#f5f5f5" } }}
                  InputProps={{ style: { color: "#f5f5f5" } }}
                />
              ) : (
                <Typography variant="h5" fontWeight="600">
                  {userData?.fullName || "N/A"}
                </Typography>
              )}
              <Typography variant="body1" color="#fff" gutterBottom>
                {userData?.email || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          <Box marginTop={4}>
            <InfoCard>
              <CardContent>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Personal Details
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {isEditing ? (
                  <>
                    <TextField
                      fullWidth
                      name="address"
                      label="Address"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      margin="normal"
                      InputLabelProps={{ style: { color: "#f5f5f5" } }}
                      InputProps={{ style: { color: "#f5f5f5" } }}
                    />
                    <TextField
                      fullWidth
                      name="mobileNo"
                      label="Mobile Number"
                      value={formData.mobileNo || ""}
                      onChange={handleInputChange}
                      margin="normal"
                      InputLabelProps={{ style: { color: "#f5f5f5" } }}
                      InputProps={{ style: { color: "#f5f5f5" } }}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="body2">
                      <strong>Address:</strong> {userData?.address || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Mobile:</strong> {userData?.mobileNo || "N/A"}
                    </Typography>
                  </>
                )}
              </CardContent>
            </InfoCard>

            <InfoCard>
              <CardContent>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Health Information
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {isEditing ? (
                  <>
                    <TextField
                      fullWidth
                      name="weight"
                      label="Weight (kg)"
                      value={formData.weight || ""}
                      onChange={handleInputChange}
                      margin="normal"
                      InputLabelProps={{ style: { color: "#f5f5f5" } }}
                      InputProps={{ style: { color: "#f5f5f5" } }}
                    />
                    <TextField
                      fullWidth
                      name="height"
                      label="Height (cm)"
                      value={formData.height || ""}
                      onChange={handleInputChange}
                      margin="normal"
                      InputLabelProps={{ style: { color: "#f5f5f5" } }}
                      InputProps={{ style: { color: "#f5f5f5" } }}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="body2">
                      <strong>Weight:</strong> {userData?.weight || "N/A"} kg
                    </Typography>
                    <Typography variant="body2">
                      <strong>Height:</strong> {userData?.height || "N/A"} cm
                    </Typography>
                    <Typography variant="body2">
                      <strong>currentBMI:</strong> {userData?.currentBMI || "N/A"} cm
                    </Typography>
                  </>
                )}
              </CardContent>
            </InfoCard>
          </Box>

          <Box textAlign="center" marginTop={3} display="flex" justifyContent="center" flexWrap="wrap" marginBottom={"10%"}>
            {isEditing ? (
              <>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ marginRight: 2, marginBottom: 2 }}
                >
                  Save Changes
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  color="secondary"
                  onClick={handleEditToggle}
                  sx={{ marginBottom: 2 }}
                >
                  Cancel
                </StyledButton>
              </>
            ) : (
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleEditToggle}
              >
                Edit Profile
              </StyledButton>
            )}
          </Box>
        </ProfileContainer>
      )}
    </PageContainer>
  );
};

export default SelfInfo;
