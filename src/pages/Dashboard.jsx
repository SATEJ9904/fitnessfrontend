import React, { useState, useEffect } from "react";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";
import fitnessImg from "../components/fitnessImg.jpg";
import styled, { keyframes } from "styled-components";
import BMIMeter from "../components/BMIMeter";

// Styled Components

const Container = styled.div`
  flex: 1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: ${({ theme }) => theme.background_primary || "#121212"};
  overflow-y: auto;
  position: relative;
  color: ${({ theme }) => theme.text_primary || "#ffffff"};
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${"#ffffff"};
  font-weight: 500;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MotivationalScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url(${fitnessImg}) no-repeat center center/cover;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  color: white;
  font-family: "Cursive", sans-serif;
  text-align: center;
  cursor: pointer;
`;

const MotivationalText = styled.div`
  font-size: 36px;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  padding: 20px;
  line-height: 1.4;
  font-family: "Great Vibes", cursive;
  text-align: center;
  white-space: pre-line;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  animation: ${(props) => (props.visible ? fadeIn : "none")} 1s ease-in-out;
`;

const Footer = styled.footer`
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 20px;
  bottom: 0;
  width: 100%;
  margin-Bottom:5%
`;

const FooterLink = styled.a`
  color: #fff;
  margin: 0 15px;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

// Main Component

const Dashboard = () => {
  const [showMotivationalScreen, setShowMotivationalScreen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`#Legs\n-Back Squat\n-5 setsX15 reps\n-30 kg\n-10 min`);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (showMotivationalScreen) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 500); // Show text after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [showMotivationalScreen]);

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      setLoading(false);
    });
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await addWorkout(token, { workoutString: workout })
      .then(() => {
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  if (showMotivationalScreen) {
    return (
      <MotivationalScreen onClick={() => setShowMotivationalScreen(false)}>
        {showText && (
          <MotivationalText visible={showText}>
            "The pain you feel today{'\n'}will be the strength you feel tomorrow."
          </MotivationalText>
        )}
      </MotivationalScreen>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard key={item.id} item={item} data={data} />
          ))}
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <BMIMeter />
        </FlexWrap>

        <Section>
          <Title>Todays Workouts</Title>
          <CardWrapper>
            {todaysWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </CardWrapper>
        </Section>
        <Footer>
          <FooterLink href="/Trust">About Us</FooterLink>
          <FooterLink href="/Contactus">Contact Us</FooterLink>
          {/* <FooterLink href="#terms-conditions">Terms & Conditions</FooterLink> */}
          <FooterLink href="/ppolicy">Privacy Policy</FooterLink>
        </Footer>
      </Wrapper>


    </Container>
  );
};

export default Dashboard;
