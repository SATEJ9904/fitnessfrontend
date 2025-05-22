import { createTheme } from "@mui/material/styles"; // Ensure you import createTheme
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { getWorkouts } from "../api";
import WorkoutCard from "../components/cards/WorkoutCard";
import { useDispatch } from "react-redux";

const customTheme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#fff", // Default date color
          "&.Mui-selected": {
            backgroundColor: "#fff", // Selected date circle
            color: "#000", // Text color for the selected date
          },
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)", // Hover effect
          },
        },
        today: {
          border: "2px solid #fff", // Ring around today's date
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        switchViewButton: {
          color: "#fff", // Color of the dropdown button (year/month view switch)
        },
        label: {
          color: "#fff", // Year and month label color
        },
        iconButton: {
          color: "#fff", // Arrow buttons color
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#fff", // Dropdown items color
          "&:hover": {
            backgroundColor: "#333", // Dropdown item hover effect
          },
        },
      },
    },
  },
});

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
  background-color: ${({ theme }) => (theme === "dark" ? "#222" : "#121212")};
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 0.2;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Right = styled.div`
  flex: 1;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  border-radius: 14px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const SecTitle = styled.div`
  font-size: 22px;
  color: #fff;
  font-weight: 500;
`;

const ChartWrapper = styled.div`
  height: 350px;
`;

const Workouts = () => {
  const dispatch = useDispatch();
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, date ? `?date=${date}` : "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      setLoading(false);
    });
  };

  useEffect(() => {
    getTodaysWorkout();
  }, [date]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
              sx={{
                "& .MuiPickersDay-root": {
                  color: "#fff", // Default color for dates
                },
                "& .Mui-selected": {
                  backgroundColor: "#fff", // Background color for selected date
                  color: "#000", // Text color for selected date
                  border: "2px solid #fff", // Ring around selected date
                },
                "& .MuiPickersDay-root:hover": {
                  backgroundColor: "#555", // Hover color for dates
                },
              }}
            />
          </LocalizationProvider>
        </Left>
        <Right>
          <Section>
            <SecTitle>Todays Workout</SecTitle>
            {loading ? (
              <CircularProgress />
            ) : (
              <CardWrapper>
                {todaysWorkouts.map((workout) => (
                  <WorkoutCard workout={workout} />
                ))}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
