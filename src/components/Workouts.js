import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  CircularProgress,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Tabs,
  Tab,
  useTheme,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import {
  FitnessCenter,
  DirectionsRun,
  Pool,
  SelfImprovement,
  SportsMartialArts,
  Scale,
  LocalFireDepartment,
  MonitorHeart,
  Accessible,
  Today,
  DateRange,
  PlayCircle,
  Close,
  ArrowBack,
  ArrowForward,
  Timer,
  Favorite,
  Share,
  Whatshot,
  Spa,
  SportsSoccer,
  AccessibilityNew,
  Sports
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Import your Lottie animations
import pushUpAnimation2 from "./Workouts/PushUp2.json";
import pushUpAnimation3 from "./Workouts/EXE1.json";
import pushUpAnimation4 from "./Workouts/EXE2.json";
import pushUpAnimation5 from "./Workouts/EXE3.json";
import pushUpAnimation7 from "./Workouts/EXE5.json";
import pushUpAnimation8 from "./Workouts/EXE6.json";
import pushUpAnimation9 from "./Workouts/EXE7.json";
import pushUpAnimation10 from "./Workouts/EXE8.json";
import pushUpAnimation11 from "./Workouts/EXE9.json";
import pushUpAnimation12 from "./Workouts/EXE10.json";
import exercise13 from "./Workouts/EXE13.json";
import exercise14 from "./Workouts/EXE14.json";
import exercise15 from "./Workouts/EXE15.json";
import exercise16 from "./Workouts/EXE16.json";
import exercise17 from "./Workouts/EXE17.json";
import exercise18 from "./Workouts/EX18.json";
import exercise19 from "./Workouts/EX19.json";
import exercise20 from "./Workouts/EX20.json";
import exercise21 from "./Workouts/EX48.json";
import exercise22 from "./Workouts/EX22.json";
import exercise23 from "./Workouts/EX23.json";
import exercise24 from "./Workouts/EX24.json";
import exercise25 from "./Workouts/EX25.json";
import exercise26 from "./Workouts/EX26.json";
import exercise27 from "./Workouts/EX27.json";
import exercise28 from "./Workouts/EX28.json";
import exercise29 from "./Workouts/EX29.json";
import exercise30 from "./Workouts/EX30.json";
import exercise31 from "./Workouts/EX31.json";
import exercise32 from "./Workouts/EX32.json";
import exercise33 from "./Workouts/EX33.json";
import exercise34 from "./Workouts/EX34.json";
import exercise35 from "./Workouts/EX35.json";
import exercise36 from "./Workouts/EX36.json";
import exercise37 from "./Workouts/EX37.json";
import exercise38 from "./Workouts/EX38.json";
import exercise39 from "./Workouts/EX39.json";
import exercise40 from "./Workouts/EX40.json";
import exercise41 from "./Workouts/EX41.json";
import exercise42 from "./Workouts/EX42.json";
import exercise43 from "./Workouts/EX43.json";
import exercise44 from "./Workouts/EX44.json";
import exercise45 from "./Workouts/EX45.json";
import exercise46 from "./Workouts/EX46.json";
import exercise47 from "./Workouts/EX47.json";
import exercise48 from "./Workouts/EX48.json";
import exercise49 from "./Workouts/EX49.json";

// Animation mapping
const animationMap = {
  "Push Up": pushUpAnimation2,
  "Plank Twists": pushUpAnimation3,
  "Squats": exercise13,
  "Bicep Curls": exercise14,
  "Shoulder Press": exercise15,
  "Rope Skipping": exercise16,
  "Crunches": exercise17,
  "Burpee": pushUpAnimation4,
  "Fish Squats": pushUpAnimation5,
  "Pull Rope": exercise18,
  "High Knees": exercise47,
  "Alternate Crunches": exercise21,
  "Lower Abs": exercise49,
  "Weight Lifting": pushUpAnimation7,
  "Squats Twists": pushUpAnimation8,
  "Middle Abs": exercise23,
  "Rope Jump": exercise24,
  "Biceps": exercise25,
  "Back Lats": exercise27,
  "Leg Raise Squats": pushUpAnimation9,
  "Jump Squats": pushUpAnimation10,
  "Push Ups": exercise28,
  "Step Ups": exercise29,
  "Twist Plank": exercise30,
  "Glute Bridge": exercise31,
  "Body Core": exercise32,
  "Lower Abdominal": pushUpAnimation11,
  "Tricep Dips": exercise33,
  "Lunches": exercise34,
  "Pushups": pushUpAnimation2,
  "Half Pushups": exercise36,
  "Stretch Jump": pushUpAnimation10,
  "Yoga Flow": exercise38,
  "Dynamic Stretching": exercise40,
  "Side Crunches": exercise41,
  "Plank": exercise42
};

// Styled Components
const WorkoutCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: theme.shadows[10],
  transition: "transform 0.3s, box-shadow 0.3s",
  background: theme.palette.background.paper,
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[16]
  },
  height: "100%",
  display: "flex",
  flexDirection: "column"
}));

const ExerciseCard = styled(motion.div)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  "&:hover .exercise-overlay": {
    opacity: 1
  }
}));

const ExerciseOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
  padding: theme.spacing(2),
  opacity: 0,
  transition: "opacity 0.3s",
  color: theme.palette.common.white
}));

const AnimatedTab = styled(Tab)(({ theme }) => ({
  transition: "all 0.3s",
  "&.Mui-selected": {
    transform: "scale(1.05)",
    fontWeight: "bold"
  }
}));

const WorkoutRecommendation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [workoutFilter, setWorkoutFilter] = useState('all');

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Exercises', icon: <FitnessCenter /> },
    { value: 'warmup', label: 'Warmup', icon: <Whatshot /> },
    { value: 'strength', label: 'Strength', icon: <SportsMartialArts /> },
    { value: 'cardio', label: 'Cardio', icon: <DirectionsRun /> },
    { value: 'recovery', label: 'Recovery', icon: <Spa /> },
    { value: 'beginner', label: 'Beginner', icon: <AccessibilityNew /> },
    { value: 'advanced', label: 'Advanced', icon: <Sports /> }
  ];

  // Filtered exercises based on selection
  const getFilteredExercises = () => {
    const dayExercises = plan.dailyWorkouts[daysOfWeek[activeDay]];
    if (workoutFilter === 'all') return dayExercises;
    
    return dayExercises.filter(ex => {
      switch(workoutFilter) {
        case 'warmup':
          return ['Dynamic Stretching', 'High Knees', 'Stretch Jump', 'Rope Jump', 'Yoga Flow', 'Plank Twists'].includes(ex.name);
        case 'strength':
          return ['Push Up', 'Weight Lifting', 'Bicep Curls', 'Shoulder Press', 'Tricep Dips', 'Pull Rope', 'Pushups', 'Plank'].includes(ex.name);
        case 'cardio':
          return ['Burpee', 'Rope Skipping', 'Jump Squats', 'High Knees', 'Squats Twists', 'Leg Raise Squats', 'Step Ups'].includes(ex.name);
        case 'recovery':
          return ['Yoga Flow', 'Plank Twists', 'Side Crunches', 'Twist Plank', 'Body Core', 'Middle Abs', 'Lower Abs'].includes(ex.name);
        case 'beginner':
          return ['Step Ups', 'Body Core', 'Plank', 'Dynamic Stretching', 'Side Crunches', 'Middle Abs'].includes(ex.name);
        case 'advanced':
          return ['Leg Raise Squats', 'Fish Squats', 'Pull Rope', 'Weight Lifting', 'Burpee', 'Jump Squats', 'Tricep Dips'].includes(ex.name);
        default:
          return true;
      }
    });
  };

  // Handle filter change
  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setWorkoutFilter(newFilter);
    }
  };

  // Fetch user details and recommend workout
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (currentUser && currentUser.email) {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://127.0.0.1:8080/api/personal-info/${currentUser.email}`
          );
          setUserDetails(response.data);

          const bmi = parseFloat(response.data.currentBMI);
          if (!isNaN(bmi)) {
            recommendWorkout(bmi);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  // Shuffle array helper
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Recommend workout based on BMI
  const recommendWorkout = (bmi) => {
    let planData;
  
    // Common exercises with your animation files
    const commonExercises = {
      strength: [
        { name: "Push Up", sets: "4 × 8-10", icon: <SportsMartialArts />, animation: pushUpAnimation2 },
        { name: "Weight Lifting", sets: "4 × 8-10", icon: <FitnessCenter />, animation: pushUpAnimation7 },
        { name: "Bicep Curls", sets: "3 × 6-8", icon: <SelfImprovement />, animation: exercise14 },
        { name: "Pull Rope", sets: "3 × 6-8", icon: <DirectionsRun />, animation: exercise18 },
        { name: "Shoulder Press", sets: "3 × 8-10", icon: <MonitorHeart />, animation: exercise15 },
        { name: "Tricep Dips", sets: "3 × 8-10", icon: <LocalFireDepartment />, animation: exercise33 },
        { name: "Pushups", sets: "3 × 10-12", icon: <DirectionsRun />, animation: pushUpAnimation2 },
        { name: "Plank", sets: "3 × 45 sec", icon: <MonitorHeart />, animation: exercise42 }
      ],
      cardio: [
        { name: "Burpee", sets: "30-45 mins", icon: <Pool />, animation: pushUpAnimation4 },
        { name: "Rope Jump", sets: "30-45 mins", icon: <DirectionsRun />, animation: exercise24 },
        { name: "High Knees", sets: "5 × 1 min", icon: <DirectionsRun />, animation: exercise47 },
        { name: "Stretch Jump", sets: "3 × 10", icon: <LocalFireDepartment />, animation: pushUpAnimation10 },
        { name: "Dynamic Stretching", sets: "3 × 20", icon: <MonitorHeart />, animation: exercise40 },
        { name: "Rope Skipping", sets: "3 × 10", icon: <DirectionsRun />, animation: exercise16 },
        { name: "Jump Squats", sets: "3 × 30 sec", icon: <LocalFireDepartment />, animation: pushUpAnimation10 },
        { name: "Squats Twists", sets: "10 × 30 sec", icon: <DirectionsRun />, animation: pushUpAnimation8 }
      ],
      recovery: [
        { name: "Yoga Flow", sets: "60 mins", icon: <SelfImprovement />, animation: exercise38 },
        { name: "Plank Twists", sets: "45 mins", icon: <MonitorHeart />, animation: pushUpAnimation3 },
        { name: "Side Crunches", sets: "30 mins", icon: <Accessible />, animation: exercise41 },
        { name: "Twist Plank", sets: "15 mins", icon: <SelfImprovement />, animation: exercise30 },
        { name: "Body Core", sets: "10 mins", icon: <MonitorHeart />, animation: exercise32 },
        { name: "Middle Abs", sets: "30 mins", icon: <SelfImprovement />, animation: exercise23 },
        { name: "Lower Abs", sets: "20 mins", icon: <MonitorHeart />, animation: exercise49 },
        { name: "Lower Abdominal", sets: "30 mins", icon: <DirectionsRun />, animation: pushUpAnimation11 }
      ],
      legs: [
        { name: "Squats", sets: "2-3 hours", icon: <DirectionsRun />, animation: exercise13 },
        { name: "Fish Squats", sets: "60 mins", icon: <SportsMartialArts />, animation: pushUpAnimation5 },
        { name: "Leg Raise Squats", sets: "90 mins", icon: <Pool />, animation: pushUpAnimation9 },
        { name: "Glute Bridge", sets: "60 mins", icon: <DirectionsRun />, animation: exercise31 },
        { name: "Step Ups", sets: "60 mins", icon: <SportsMartialArts />, animation: exercise29 },
        { name: "Lunches", sets: "90 mins", icon: <DirectionsRun />, animation: exercise34 },
        { name: "Half Pushups", sets: "45 mins", icon: <DirectionsRun />, animation: exercise36 },
        { name: "Alternate Crunches", sets: "60 mins", icon: <Pool />, animation: exercise21 }
      ]
    };
  
    if (bmi < 18.5) {
      planData = {
        category: "Underweight",
        goal: "Muscle Gain",
        icon: <FitnessCenter color="primary" />,
        color: "primary",
        description: "Focus on strength training with progressive overload to build muscle mass.",
        dailyWorkouts: {
          Monday: shuffleArray([...commonExercises.strength]).slice(0, 8),
          Tuesday: shuffleArray([...commonExercises.cardio]).slice(0, 8),
          Wednesday: shuffleArray([...commonExercises.strength]).slice(0, 8),
          Thursday: shuffleArray([...commonExercises.recovery]).slice(0, 8),
          Friday: shuffleArray([...commonExercises.strength]).slice(0, 8),
          Saturday: shuffleArray([...commonExercises.legs]).slice(0, 8),
          Sunday: shuffleArray([...commonExercises.recovery]).slice(0, 4)
        },
        nutritionTips: [
          "Consume 300-500 calories above maintenance",
          "Aim for 1.6-2.2g protein per kg body weight",
          "Include healthy fats like nuts and avocados"
        ]
      };
    } else if (bmi < 25) {
      planData = {
        category: "Normal Weight",
        goal: "Toning & Maintenance",
        icon: <MonitorHeart color="success" />,
        color: "success",
        description: "Balance of strength training and cardio for overall fitness.",
        dailyWorkouts: {
          Monday: shuffleArray([...commonExercises.strength]).slice(0, 8),
          Tuesday: shuffleArray([...commonExercises.cardio]).slice(0, 8),
          Wednesday: shuffleArray([...commonExercises.strength]).slice(0, 8),
          Thursday: shuffleArray([...commonExercises.cardio]).slice(0, 8),
          Friday: shuffleArray([...commonExercises.strength]).slice(0, 8),
          Saturday: shuffleArray([...commonExercises.legs]).slice(0, 8),
          Sunday: shuffleArray([...commonExercises.recovery]).slice(0, 4)
        },
        nutritionTips: [
          "Maintain balanced macros (40% carbs, 30% protein, 30% fat)",
          "Stay hydrated with 2-3L water daily",
          "Include variety of colorful vegetables"
        ]
      };
    } else if (bmi < 30) {
      planData = {
        category: "Overweight",
        goal: "Fat Loss",
        icon: <LocalFireDepartment color="warning" />,
        color: "warning",
        description: "Focus on calorie-burning exercises with strength training to preserve muscle.",
        dailyWorkouts: {
          Monday: shuffleArray([...commonExercises.strength]).slice(0, 6).concat(
            shuffleArray([...commonExercises.cardio]).slice(0, 2)
          ),
          Tuesday: shuffleArray([...commonExercises.cardio]).slice(0, 8),
          Wednesday: shuffleArray([...commonExercises.strength]).slice(0, 6).concat(
            shuffleArray([...commonExercises.cardio]).slice(0, 2)
          ),
          Thursday: shuffleArray([...commonExercises.cardio]).slice(0, 8),
          Friday: shuffleArray([...commonExercises.strength]).slice(0, 6).concat(
            shuffleArray([...commonExercises.cardio]).slice(0, 2)
          ),
          Saturday: shuffleArray([...commonExercises.legs]).slice(0, 8),
          Sunday: shuffleArray([...commonExercises.recovery]).slice(0, 4)
        },
        nutritionTips: [
          "Create 300-500 calorie deficit daily",
          "Prioritize lean proteins and fiber",
          "Limit processed sugars and refined carbs"
        ]
      };
    } else {
      planData = {
        category: "Obese",
        goal: "Joint-friendly Fat Loss",
        icon: <Accessible color="error" />,
        color: "error",
        description: "Low-impact exercises to start fitness journey while protecting joints.",
        dailyWorkouts: {
          Monday: shuffleArray([
            { name: "Step Ups", sets: "3 × 1 min", icon: <DirectionsRun />, animation: exercise29 },
            { name: "Push Up", sets: "3 × 8-10", icon: <FitnessCenter />, animation: pushUpAnimation2 },
            { name: "Body Core", sets: "3 × 12", icon: <SportsMartialArts />, animation: exercise32 },
            { name: "Dynamic Stretching", sets: "30 mins", icon: <Pool />, animation: exercise40 },
            { name: "Plank", sets: "3 × 12", icon: <MonitorHeart />, animation: exercise42 },
            { name: "Twist Plank", sets: "5 × 1 min", icon: <SelfImprovement />, animation: exercise30 },
            { name: "Side Crunches", sets: "3 × 10", icon: <LocalFireDepartment />, animation: exercise41 },
            { name: "Yoga Flow", sets: "5 mins", icon: <MonitorHeart />, animation: exercise38 }
          ]),
          Tuesday: shuffleArray([...commonExercises.recovery]).slice(0, 8),
          Wednesday: shuffleArray([
            { name: "Rope Jump", sets: "30 mins", icon: <Pool />, animation: exercise24 },
            { name: "Middle Abs", sets: "3 × 12", icon: <FitnessCenter />, animation: exercise23 },
            { name: "Lower Abs", sets: "3 × 10", icon: <MonitorHeart />, animation: exercise49 },
            { name: "Stretch Jump", sets: "30 mins", icon: <DirectionsRun />, animation: pushUpAnimation10 },
            { name: "Lower Abdominal", sets: "3 × 12", icon: <SelfImprovement />, animation: pushUpAnimation11 },
            { name: "Plank Twists", sets: "3 × 10", icon: <MonitorHeart />, animation: pushUpAnimation3 },
            { name: "High Knees", sets: "3 × 15", icon: <LocalFireDepartment />, animation: exercise47 },
            { name: "Crunches", sets: "20 mins", icon: <Accessible />, animation: exercise17 }
          ]),
          Thursday: shuffleArray([...commonExercises.recovery]).slice(0, 8),
          Friday: shuffleArray([
            { name: "Pull Rope", sets: "30 mins", icon: <Pool />, animation: exercise18 },
            { name: "Tricep Dips", sets: "3 × 30 sec", icon: <SportsMartialArts />, animation: exercise33 },
            { name: "Bicep Curls", sets: "3 × 12", icon: <LocalFireDepartment />, animation: exercise14 },
            { name: "Shoulder Press", sets: "30 mins", icon: <DirectionsRun />, animation: exercise15 },
            { name: "Glute Bridge", sets: "3 × 12", icon: <SportsMartialArts />, animation: exercise31 },
            { name: "Lunches", sets: "5 × 1 min", icon: <SelfImprovement />, animation: exercise34 },
            { name: "Fish Squats", sets: "3 × 12", icon: <MonitorHeart />, animation: pushUpAnimation5 },
            { name: "Breathing Exercises", sets: "10 mins", icon: <MonitorHeart />, animation: exercise40 }
          ]),
          Saturday: shuffleArray([...commonExercises.recovery]).slice(0, 8),
          Sunday: [
            { name: "Rest Day", sets: "", icon: <MonitorHeart /> },
            { name: "Light Stretching", sets: "20 mins", icon: <Accessible />, animation: exercise40 },
            { name: "Walking", sets: "30 mins", icon: <DirectionsRun /> },
            { name: "Foam Rolling", sets: "15 mins", icon: <SelfImprovement /> }
          ]
        },
        nutritionTips: [
          "Focus on portion control and mindful eating",
          "Increase vegetable intake for fiber",
          "Stay consistent with small, sustainable changes"
        ]
      };
    }
  
    setPlan(planData);
  };

  // Handle day change
  const handleDayChange = (event, newValue) => {
    setActiveDay(newValue);
  };

  // Handle exercise selection
  const handleExerciseClick = async (exercise) => {
    setSelectedExercise(exercise);
    setVideoDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setVideoDialogOpen(false);
  };

  // Navigation functions
  const handleStartWorkout = () => {
    navigate('/workout-session', { 
      state: { 
        workout: plan.dailyWorkouts[daysOfWeek[activeDay]],
        day: daysOfWeek[activeDay]
      } 
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!userDetails) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h6">No user data found. Please complete your profile.</Typography>
      </Box>
    );
  }

  if (!plan) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h6">Generating workout plan...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      background: theme.palette.background.default,
      overflow:"auto",
      height: '100vh'
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ 
          color: theme.palette.text.primary,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>
          <FitnessCenter fontSize="large" /> Your Personalized Workout Plan
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Based on your BMI of {userDetails.currentBMI} - {plan.category} Category
        </Typography>
      </Box>

      {/* Weekly Tabs */}
      <Box sx={{ 
        mb: 2,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: theme.palette.background.default,
        pt: 2,
        pb: 1
      }}>
        <Tabs
          value={activeDay}
          onChange={handleDayChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              height: 4,
              borderRadius: '4px 4px 0 0'
            }
          }}
        >
          {daysOfWeek.map((day, index) => (
            <AnimatedTab 
              key={index} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Today fontSize="small" />
                  {day}
                </Box>
              }
              sx={{
                minHeight: 60,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Workout Filters */}
      <Box sx={{ 
        mb: 3,
        position: 'sticky',
        top: 80,
        zIndex: 9,
        background: theme.palette.background.default,
        py: 1
      }}>
        <ToggleButtonGroup
          value={workoutFilter}
          exclusive
          onChange={handleFilterChange}
          aria-label="workout filters"
          sx={{
            flexWrap: 'wrap',
            gap: 1,
            '& .MuiToggleButtonGroup-grouped': {
              borderRadius: '20px !important',
              border: '1px solid !important',
              borderColor: `${theme.palette.divider} !important`,
              px: 2,
              py: 1,
              '&.Mui-selected': {
                backgroundColor: `${theme.palette.primary.main} !important`,
                color: `${theme.palette.primary.contrastText} !important`
              }
            }
          }}
        >
          {filterOptions.map((filter) => (
            <ToggleButton 
              key={filter.value} 
              value={filter.value}
              sx={{
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {filter.icon}
              {filter.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {/* User Profile Card */}
        <Grid item xs={12} md={4}>
          <WorkoutCard>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ 
                  bgcolor: `${plan.color}.main`, 
                  mr: 2,
                  width: 56,
                  height: 56,
                  color: theme.palette.getContrastText(theme.palette[plan.color].main)
                }}>
                  {plan.icon}
                </Avatar>
                <Box>
                  <Typography variant="h5" component="div" color="textPrimary">
                    {plan.category}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {plan.goal}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="body1" paragraph color="textPrimary">
                {plan.description}
              </Typography>
              
              <Divider sx={{ 
                my: 2,
                bgcolor: theme.palette.divider 
              }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom color="textPrimary">
                  Your Stats
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ 
                      p: 1.5, 
                      borderRadius: 2,
                      background: theme.palette.action.hover
                    }}>
                      <Typography variant="subtitle2" color="textSecondary">BMI</Typography>
                      <Typography variant="h6">{userDetails.currentBMI}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ 
                      p: 1.5, 
                      borderRadius: 2,
                      background: theme.palette.action.hover
                    }}>
                      <Typography variant="subtitle2" color="textSecondary">Target</Typography>
                      <Typography variant="h6">{plan.goal}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
              
              <Divider sx={{ 
                my: 2,
                bgcolor: theme.palette.divider 
              }} />
              
              <Box>
                <Typography variant="h6" gutterBottom color="textPrimary">
                  Nutrition Tips
                </Typography>
                <Stack spacing={1}>
                  {plan.nutritionTips.map((tip, index) => (
                    <Paper key={index} elevation={0} sx={{ 
                      p: 2, 
                      borderRadius: 2,
                      background: theme.palette.action.selected
                    }}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar sx={{ 
                          width: 24, 
                          height: 24,
                          bgcolor: `${plan.color}.light`,
                          color: theme.palette.getContrastText(theme.palette[plan.color].light)
                        }}>
                          {index + 1}
                        </Avatar>
                        <Typography variant="body2" color="textPrimary">
                          {tip}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </WorkoutCard>
        </Grid>
        
        {/* Workout Exercises */}
        <Grid item xs={12} md={8}>
          <WorkoutCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" color="textPrimary">
                  {daysOfWeek[activeDay]} Workout
                </Typography>
                <Chip 
                  label={`${getFilteredExercises().length} Exercises`}
                  color={plan.color}
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="subtitle1" color="textSecondary" paragraph>
                {plan.category} - {plan.goal} - {filterOptions.find(f => f.value === workoutFilter)?.label}
              </Typography>
              
              <Divider sx={{ 
                my: 2,
                bgcolor: theme.palette.divider 
              }} />
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {getFilteredExercises().map((exercise, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <ExerciseCard
                      whileHover={{ scale: 1.03 }}
                      onClick={() => handleExerciseClick(exercise)}
                    >
                      <Box sx={{ 
                        height: 180,
                        background: theme.palette.action.hover,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                      }}>
                        {exercise.animation ? (
                          <Lottie
                            options={{
                              loop: true,
                              autoplay: true,
                              animationData: exercise.animation,
                            }}
                            height={150}
                            width={150}
                          />
                        ) : (
                          <Box sx={{ 
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: theme.palette.action.selected
                          }}>
                            <FitnessCenter sx={{ fontSize: 48, color: theme.palette.text.disabled }} />
                          </Box>
                        )}
                        <ExerciseOverlay className="exercise-overlay">
                          <Typography variant="subtitle1" fontWeight="bold">
                            {exercise.name}
                          </Typography>
                          <Typography variant="body2">
                            {exercise.sets}
                          </Typography>
                        </ExerciseOverlay>
                        <IconButton sx={{ 
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          color: 'white',
                          background: 'rgba(0,0,0,0.5)',
                          '&:hover': {
                            background: 'rgba(0,0,0,0.7)'
                          }
                        }}>
                          <PlayCircle />
                        </IconButton>
                      </Box>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {exercise.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {exercise.sets}
                        </Typography>
                      </Box>
                    </ExerciseCard>
                  </Grid>
                ))}
              </Grid>
              
              <Box mt={4} display="flex" justifyContent="center">
                <Button 
                  variant="contained" 
                  color={plan.color}
                  onClick={handleStartWorkout}
                  startIcon={<FitnessCenter />}
                  size="large"
                  sx={{
                    width: '100%',
                    maxWidth: '400px',
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Start {daysOfWeek[activeDay]} Workout
                </Button>
              </Box>
            </CardContent>
          </WorkoutCard>
        </Grid>
      </Grid>


      {/* Exercise Detail Dialog */}
      <Dialog
        open={videoDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: theme.palette.background.paper
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="h5">
            {selectedExercise?.name}
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          {selectedExercise && (
            <Box>
              <Box sx={{
                height: { xs: 200, sm: 300, md: 400 },
                background: theme.palette.action.hover,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {selectedExercise.animation ? (
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: selectedExercise.animation,
                    }}
                    height={300}
                    width={300}
                  />
                ) : (
                  <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <FitnessCenter sx={{ fontSize: 64, color: theme.palette.text.disabled }} />
                  </Box>
                )}
                <Box sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  display: 'flex',
                  gap: 1
                }}>
                  <IconButton sx={{
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': {
                      background: 'rgba(0,0,0,0.7)'
                    }
                  }}>
                    <Favorite />
                  </IconButton>
                  <IconButton sx={{
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': {
                      background: 'rgba(0,0,0,0.7)'
                    }
                  }}>
                    <Share />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Exercise Details
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Category
                      </Typography>
                      <Typography variant="body1">
                        {selectedExercise.category || 'General'}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Your Plan
                      </Typography>
                      <Typography variant="body1">
                        {selectedExercise.sets}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Instructions
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {selectedExercise.instructions || 'Focus on proper form and controlled movements. Maintain steady breathing throughout the exercise.'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{
          justifyContent: 'space-between',
          borderTop: `1px solid ${theme.palette.divider}`,
          p: 2
        }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleCloseDialog}
          >
            Back to Workout
          </Button>
          <Button
            variant="contained"
            color={plan.color}
            endIcon={<FitnessCenter />}
            onClick={handleStartWorkout}
          >
            Start Exercise
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkoutRecommendation;