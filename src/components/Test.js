import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import GaugeChart from "react-gauge-chart";
import axios from "axios";
import { useSelector } from "react-redux";

const ProfileContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1100px",
  margin: "auto",
  padding: "32px 40px",
  borderRadius: "16px",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  [theme.breakpoints.down("sm")]: {
    padding: "16px 24px",
  },
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "32px",
  marginBottom: "24px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
}));

const InfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const HealthInfoContainer = styled(Box)(({ theme }) => ({
  flex: "1",
  minWidth: "320px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  borderRadius: "12px",
  backgroundColor: "#f9f9f9",
}));

const BmiMeterContainer = styled(Box)(({ theme }) => ({
  flexBasis: "320px",
  textAlign: "center",
  padding: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  borderRadius: "12px",
  backgroundColor: "#f9f9f9",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  margin: "auto",
  marginBottom: "16px",
  border: "4px solid #3f51b5",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "16px",
  fontWeight: 700,
  fontSize: "1.3rem",
  color: "#3f51b5",
  borderBottom: "2px solid #3f51b5",
  display: "inline-block",
}));

const StyledInfoItem = styled(Typography)(({ theme }) => ({
  marginBottom: "12px",
  fontWeight: 600,
  color: "#333",
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const EditProfileContainer = styled(Box)(({ theme }) => ({
  marginTop: "32px",
  padding: "24px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

const SelfInfo = () => {
  const { currentUser } = useSelector((state) => state.user);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post("http://127.0.0.1:8080/api/personal-info/email", formData);
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Failed to save changes.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(true);
  };

  return (
    <Box sx={{ padding: "16px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ProfileContainer>
            {/* Header Section */}
            <Header>
              <AvatarContainer>
                <StyledAvatar
                  src={`http://localhost:8080/${userData?.profilePic}` || ""}
                  alt="Profile Picture"
                />
                <Typography variant="h4" fontWeight="700" textAlign="center" color="#3f51b5">
                  {userData?.fullName || "N/A"}
                </Typography>
              </AvatarContainer>
              <Box>
                <Typography variant="body1" color="text.secondary">
                  <strong>Email:</strong> {userData?.email || "N/A"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>Address:</strong> {userData?.address || "N/A"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>Mobile:</strong> {userData?.mobileNo || "N/A"}
                </Typography>
              </Box>
            </Header>

            {/* Health Information + BMI Meter */}
            <InfoContainer>
              <HealthInfoContainer>
                <SectionTitle>Health Information</SectionTitle>
                <StyledInfoItem>
                  <strong>Height:</strong> {userData?.height || "N/A"} cm
                </StyledInfoItem>
                <StyledInfoItem>
                  <strong>Weight:</strong> {userData?.weight || "N/A"} kg
                </StyledInfoItem>
                <StyledInfoItem>
                  <strong>Age:</strong> {userData?.Age || "N/A"}
                </StyledInfoItem>
                <StyledInfoItem>
                  <strong>Gender:</strong> {userData?.Gender || "N/A"}
                </StyledInfoItem>
                <StyledInfoItem>
                  <strong>Active Level:</strong> {userData?.ActiveLevel || "N/A"}
                </StyledInfoItem>
              </HealthInfoContainer>

              <BmiMeterContainer>
                <Typography variant="h6" fontWeight="600" marginBottom={2}>
                  Body Mass Index (BMI)
                </Typography>
                <GaugeChart
                  id="bmi-gauge"
                  nrOfLevels={30}
                  colors={getGaugeColors()}
                  arcWidth={0.3}
                  percent={bmi ? bmi / 50 : 0} // Adjust max BMI to 50
                  textColor="#000"
                />
                <Typography
                  variant="h6"
                  color={
                    bmiRange === "Underweight"
                      ? "#00BFFF"
                      : bmiRange === "Normal"
                      ? "#3CB371"
                      : "#FF6347"
                  }
                  fontWeight="600"
                  marginTop={2}
                >
                  {bmiRange || "N/A"}
                </Typography>
                <Typography variant="h5" fontWeight="700" marginTop={1}>
                  {bmi || "N/A"}
                </Typography>
              </BmiMeterContainer>
            </InfoContainer>

            {/* Edit Button */}
            <Box textAlign="center">
              <Button variant="outlined" color="primary" onClick={toggleEditMode}>
                {editMode ? "Cancel" : "Edit Profile"}
              </Button>
            </Box>
          </ProfileContainer>

          {/* Edit Profile Section */}
          {editMode && (
            <EditProfileContainer>
              <SectionTitle>Edit Personal Information</SectionTitle>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Mobile No."
                name="mobileNo"
                value={formData.mobileNo || ""}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                type="tel"
              />
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </EditProfileContainer>
          )}
        </>
      )}
    </Box>
  );
};

export default SelfInfo;
