import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Container,
    CircularProgress,
    Chip,
    Stack,
    useMediaQuery,
    useTheme,
} from "@mui/material";

const DietaryPlan = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [recommendations, setRecommendations] = useState([]);
    const [images, setImages] = useState({});
    const [userDetails, setUserDetails] = useState({ weight: 0, height: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedMealType, setSelectedMealType] = useState("All");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const API_KEY =  process.env.image;

    const fetchImage = async (query) => {
        try {
            const response = await axios.get(
                `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
                {
                    headers: { Authorization: API_KEY },
                }
            );
            return response.data.photos[0]?.src.medium || "";
        } catch {
            return "";
        }
    };

    const filterFoodItemsByBMI = (items, bmi) => {
        return items.filter((item) => {
            if (bmi < 18.5) return item.Calories > 500 && item.Proteins > 10;
            if (bmi >= 18.5 && bmi <= 30) return item.Calories < 250 && item.Fats < 20 && item.Proteins > 10;
            if (bmi > 30 && bmi <= 45) return item.Calories < 100 && item.Fats < 15;
            return item.Calories < 50 && item.Fats < 10 && item.Proteins > 20;
        });
    };

    const filterBySelectedMeal = (items) => {
        if (selectedMealType === "All") return items;
        return items.filter((item) => item[selectedMealType] === 1);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!currentUser?.email) return;

                const [userRes, recoRes] = await Promise.all([
                    axios.get(`http://127.0.0.1:8080/api/personal-info/${currentUser.email}`),
                    axios.get(`http://localhost:8080/api/recommendations/${currentUser.email}`),
                ]);

                setUserDetails(userRes.data);
                const recoList = Array.isArray(recoRes.data) ? recoRes.data : recoRes.data.data || [];

                const filteredList = filterFoodItemsByBMI(recoList, userRes.data.currentBMI || 0);
                const imageMap = {};

                await Promise.all(
                    filteredList.map(async (item) => {
                        const img = await fetchImage(item.Food_items);
                        imageMap[item.Food_items] = img;
                    })
                );

                setImages(imageMap);
                setRecommendations(filteredList);
            } catch {
                setError("Failed to load dietary recommendations. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [currentUser]);

    const visibleItems = filterBySelectedMeal(recommendations);

    return (
        <Box
            sx={{
                background: "linear-gradient(to bottom right, #121212, #1f1f1f)",
                minHeight: "100vh",
                color: "white",
                py: 4,
                overflowX: "hidden",
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "white" }}>
                    Dietary Recommendations for {userDetails.fullName || "User"}
                </Typography>
                <Typography variant="h6" mb={3} sx={{ color: "white" }}>
                    BMI: {userDetails.currentBMI || "--"}
                </Typography>

                <Stack direction="row" spacing={2} mb={4} flexWrap="wrap">
                    {["All", "Breakfast", "Lunch", "Dinner"].map((type) => (
                        <Chip
                            key={type}
                            label={type}
                            clickable
                            color={selectedMealType === type ? "primary" : "secondary"}
                            onClick={() => setSelectedMealType(type)}
                            sx={{ fontWeight: "bold", mb: 1 }}
                        />
                    ))}
                </Stack>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                        <CircularProgress color="primary" />
                    </Box>
                ) : error ? (
                    <Typography variant="body1" color="error" align="center">
                        {error}
                    </Typography>
                ) : visibleItems.length === 0 ? (
                    <Typography variant="body1" align="center" sx={{ color: "white" }}>
                        No recommendations available for your BMI and selected meal type.
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {visibleItems.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card
                                    sx={{
                                        height: 400,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        backgroundColor: "#2c2c2c",
                                        borderRadius: 3,
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                                        transition: "transform 0.3s",
                                        "&:hover": {
                                            transform: "scale(1.03)",
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={images[item.Food_items] || "https://via.placeholder.com/300"}
                                        alt={item.Food_items}
                                    />
                                    <CardContent sx={{ color: "white" }}>
                                        <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                                            {item.Food_items}
                                        </Typography>
                                        <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                                            <Chip label={`Calories: ${item.Calories}`} color="primary" size="small" />
                                            <Chip label={`Protein: ${item.Proteins}g`} color="secondary" size="small" />
                                            <Chip label={`Fat: ${item.Fats}g`} variant="outlined" size="small" sx={{ color: "white", borderColor: "white" }} />
                                        </Stack>
                                        <Typography variant="body2" sx={{ color: "white" }}>
                                            Carbs: {item.Carbohydrates}g | Fibre: {item.Fibre}g
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "white" }}>
                                            Iron: {item.Iron}mg | Calcium: {item.Calcium}mg
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "white" }}>
                                            Sodium: {item.Sodium}mg | Potassium: {item.Potassium}mg
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default DietaryPlan;
