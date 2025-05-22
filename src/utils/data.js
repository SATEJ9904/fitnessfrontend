import {
  FitnessCenterRounded,
  LocalFireDepartmentRounded,
  TimelineRounded,
} from "@mui/icons-material";
import BMIMeter from "../components/BMIMeter";
import AddWorkout from "../components/AddWorkout";

export const counts = [
  {
    name: "Calories Burned",
    icon: (
      <LocalFireDepartmentRounded sx={{ color: "inherit", fontSize: "26px" }} />
    ),
    desc: "Total calories burned today",
    key: "totalCaloriesBurnt",
    unit: "kcal",
    color: "#eb9e34",
    lightColor: "#fff",
  },
  {
    name: "Workouts",
    icon: <FitnessCenterRounded sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Total no of workouts for today",
    key: "totalWorkouts",
    unit: "",
    color: "#41C1A6",
    lightColor: "#fff",
  },
  // {
  //   name: "Add Workouts",
  //   icon: <AddWorkout sx={{ color: "inherit", fontSize: "26px" }} />,
  // },
];
