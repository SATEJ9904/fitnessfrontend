import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { Email } from "@mui/icons-material";

const DarkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full screen height */
  background-color: #121212; /* Dark screen background */
  box-sizing: border-box; /* Prevent overflow issues */
  width:100%
`;

const Input = styled.input`
  background-color: #1e1e2f; /* Same as the container background */
  border: 1px solid #444; /* Subtle border */
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
  color: #fff; /* White text */
  outline: none;

  ::placeholder {
    color: #FFF; /* Placeholder text color */
  }

  &:focus {
    border-color: #FFF; /* Highlight color on focus */
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #b0b0b0; /* Light gray for labels */
  margin-bottom: 5px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px; /* Adjust width to fit smaller screens */
  background-color: #1e1e2f; /* Dark background for the sign-in card */
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5); /* Softer shadow for a modern look */
  display: flex;
  flex-direction: column;
  gap: 20px; /* Proper spacing between elements */
  text-align: center; /* Center text inside the container */
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #ffffff; /* Primary text color */
  margin-bottom: 10px;
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #b0b0b0; /* Subtle secondary text color */
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          alert("Login Success");
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
    setButtonDisabled(false);
    setLoading(false);

  };

  return (
    <DarkContainer>
      <Container>
        <div>
          <Title>Welcome to FitFusion 👋</Title>
          <Span>Please login with your details here</Span>
        </div>
        <Label>Email</Label>
          <Input
            type={email}
            placeholder={"Enter Your Email"}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Label>Password</Label>
          <Input
            type={password ? "password" : "text"}
            placeholder={"Password"}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <Button
          text="Sign In"
          onClick={handelSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </Container>
    </DarkContainer>
  );
};

export default SignIn;
