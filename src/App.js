import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Workout from "./components/Workouts"
import BMI from "./components/BMI";
import AllOverProgress from "./components/AllOverProgress";
import SelfInfo from "./components/SelfInfo";
import DietaryPlan from "./components/DietaryPlan";
import EditProfileForm from "./components/EditProfileForm";
import BMIMeter from "./components/BMIMeter";
import ChatGPTTest from "./components/ChatGPTTest";
import TrustedRecommendations from "./components/Trust";
import Privacy from "./pages/Privacy";
import ContactUs from "./pages/ContactUs";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              <Route path="/Tutorials" exact element={<Workout />} />
              <Route path="/BMI" exact element={<BMI />} />
              <Route path="/AllOverProgress" exact element={<AllOverProgress />} />
              <Route path="/SelfInfo" exact element={<SelfInfo />} />
              <Route path="/DietaryPlan" exact element={<DietaryPlan />} />
              <Route path="/EditProfileForm" exact element={<EditProfileForm />} />
              <Route path="/BMIMeter" exact element={<BMIMeter />} />
              <Route path="/EditProfileForm" exact element={<EditProfileForm />} />
              <Route path="/ChatGPTTest" exact element={<ChatGPTTest />} />
              <Route path="/Trust" exact element={<TrustedRecommendations />} />
              <Route path="/ppolicy" exact element={<Privacy />} />
              <Route path="/Contactus" exact element={<ContactUs />} />

            </Routes>
          </Container>
        ) : (
          <Container>
            <Authentication />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
