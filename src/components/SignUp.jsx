import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { Box, TextField, Button as Buttonz, Typography, Avatar, Grid, MenuItem } from "@mui/material";
import { styled as styledz } from "@mui/material/styles";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Dark Theme configuration
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#1e1e1e',
      default: '#121212',
    },
    text: {
      primary: '#fff',
      secondary: '#b0b0b0',
    },
    divider: '#333',
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

// Styled components with the dark theme
const FormContainer = styledz(Box)(({ theme }) => ({
  maxWidth: "600px",
  margin: "auto",
  padding: "20px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  boxShadow: `0px 4px 12px ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  marginTop: "10%",
  overflow: "auto",
}));

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${"#fff"};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${"#b0b0b0"};
`;

const SignUp = () => {
  const [show, setShow] = useState(0);
  const changeForm = () => {
    if(validateInputs()){
      setShow(1);

    }
  };

  // Personal info state
  const [formData, setFormData] = useState({
    address: "",
    profilePic: null,
    weight: "",
    height: "",
    mobileNo: "",
    Age: "",
    Gender: "",
    ActiveLevel: "",
  });

  const [bmi, setBmi] = useState("");

  useEffect(() => {
    if (formData.weight && formData.height) {
      const heightInMeters = formData.height / 100; // Convert height to meters
      const calculatedBMI = (formData.weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBMI);
    }
  }, [formData.weight, formData.height]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, profilePic: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    console.log(formData);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("currentBMI", bmi);
    data.append("fullName", name);
    data.append("email", email);

    try {
      const response = await axios.post("http://127.0.0.1:8080/api/personal-info", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
      handelSignUp();
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to submit form");
    }
  };

  // Signup code
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const validateInputs = () => {
    // Validate name, email, and password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
  
    // Check password against the regex
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.");
      return false;
    }
  
    return true;
  };
  

  const handelSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignUp({ name, email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          alert("Account Created Success");
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        {show === 0 ? (
          <Container>
            <div>
              <Title>Create New Account 👋</Title>
              <Span>Please enter details to create a new account</Span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexDirection: "column",
              }}
            >
              <TextInput
                label="Full name"
                placeholder="Enter your full name"
                value={name}
                handelChange={(e) => setName(e.target.value)}
                style={{ color: "#fff" }}
              />
              <TextInput
                label="Email Address"
                placeholder="Enter your email address"
                value={email}
                handelChange={(e) => setEmail(e.target.value)}
                style={{ color: "#fff" }}
              />
              <TextInput
                label="Password"
                placeholder="Enter your password"
                password
                value={password}
                handelChange={(e) => setPassword(e.target.value)}
                style={{ color: "#fff" }}
              />
              <Button
                text="SignUp"
                onClick={changeForm}
                isLoading={loading}
                isDisabled={buttonDisabled}
              />
            </div>
          </Container>
        ) : (
          <FormContainer>
            <Typography variant="h5" fontWeight="600" marginBottom={2}>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={email}
                  variant="outlined"
                  InputProps={{
                    style: { color: "#fff" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={name}
                  variant="outlined"
                  InputProps={{
                    style: { color: "#fff" },
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
                  InputProps={{
                    style: { color: "#fff" },
                  }}
                />
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center" gap={2}>
                <Avatar
                  src={formData.profilePic ? URL.createObjectURL(formData.profilePic) : ""}
                  alt="Profile"
                  sx={{ width: 56, height: 56 }}
                />
                <Buttonz variant="outlined" component="label">
                  Upload Profile Picture
                  <input type="file" hidden onChange={handleFileChange} />
                </Buttonz>
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
                  InputProps={{
                    style: { color: "#fff" },
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
                  InputProps={{
                    style: { color: "#fff" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight="500" color="white">
                  Current BMI: {bmi || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="Age"
                  value={formData.Age}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{
                    style: { color: "#fff" },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleInputChange}
                  variant="outlined"
                  select
                  InputProps={{
                    style: { color: "#fff" },
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Activity Level"
                  name="ActiveLevel"
                  value={formData.ActiveLevel}
                  onChange={handleInputChange}
                  variant="outlined"
                  select
                  InputProps={{
                    style: { color: "#fff" },
                  }}
                >
                  <MenuItem value="Not Very Active">Not Very Active</MenuItem>
                  <MenuItem value="Lightly Active">Lightly Active</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Very Active">Very Active</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile No."
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="tel"
                  InputProps={{
                    style: { color: "#fff" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Buttonz
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  size="large"
                >
                  Submit
                </Buttonz>
              </Grid>
            </Grid>
          </FormContainer>
        )}
      </div>
    </ThemeProvider>
  );
};

export default SignUp;
