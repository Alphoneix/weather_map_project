import React, { useEffect, useState } from "react";
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    Container,
    Box,
    Typography,
    CircularProgress,
    Alert,
} from "@mui/material";
import WeatherCard from "./WeatherCard";
import CitySelector from "./CitySelector";
import { fetchWeather, fetchWeatherByCoordinates, getCurrentLocation } from "./api";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCity, setSelectedCity] = useState("Ankara");
    const [locationLoading, setLocationLoading] = useState(false);

    // Load weather data for selected city
    const loadWeatherData = async (city) => {
        try {
            setLoading(true);
            setError("");
            const data = await fetchWeather(city);
            setWeather(data);
            setSelectedCity(data.location.name); // Use the actual city name from API response
        } catch (err) {
            setError("Hava durumu verisi alınamadı. Lütfen daha sonra tekrar deneyin.");
            console.error("Weather fetch error:", err);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    // Load weather data by coordinates (geolocation)
    const loadWeatherByLocation = async () => {
        try {
            setLocationLoading(true);
            setError("");
            const position = await getCurrentLocation();
            const data = await fetchWeatherByCoordinates(position.latitude, position.longitude);
            setWeather(data);
            setSelectedCity(data.location.name);
        } catch (err) {
            if (err.code === 1) { // PERMISSION_DENIED
                setError("Konum izni reddedildi. Manuel olarak şehir seçebilirsiniz.");
            } else {
                setError("Konum alınamadı. Manuel olarak şehir seçebilirsiniz.");
            }
            // Fallback to Ankara
            loadWeatherData("Ankara");
        } finally {
            setLocationLoading(false);
        }
    };

    // Handle city selection
    const handleCityChange = (city) => {
        if (city && city !== selectedCity) {
            loadWeatherData(city);
        }
    };

    // Handle geolocation request
    const handleLocationRequest = () => {
        loadWeatherByLocation();
    };

    // Initial load - try geolocation first, fallback to Ankara
    useEffect(() => {
        // Try geolocation on first load
        const initializeWeather = async () => {
            try {
                setLocationLoading(true);
                setError("");
                const position = await getCurrentLocation();
                const data = await fetchWeatherByCoordinates(position.latitude, position.longitude);
                setWeather(data);
                setSelectedCity(data.location.name);
            } catch (err) {
                console.error("Initial location error:", err);
                if (err.code === 1) { // PERMISSION_DENIED
                    setError("Konum izni reddedildi. Ankara hava durumu gösteriliyor.");
                } else {
                    setError("Konum alınamadı. Ankara hava durumu gösteriliyor.");
                }
                // Fallback to Ankara
                try {
                    const data = await fetchWeather("Ankara");
                    setWeather(data);
                    setSelectedCity(data.location.name);
                } catch (fallbackErr) {
                    console.error("Fallback weather fetch error:", fallbackErr);
                    setError("Hava durumu verisi alınamadı. Lütfen daha sonra tekrar deneyin.");
                }
            } finally {
                setLocationLoading(false);
                setLoading(false);
            }
        };

        initializeWeather();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", py: 2 }}>
                <Box width="100%">
                    <Typography variant="h4" align="center" gutterBottom>
                        Türkiye Hava Durumu
                    </Typography>

                    <CitySelector
                        selectedCity={selectedCity}
                        onCityChange={handleCityChange}
                        onLocationRequest={handleLocationRequest}
                    />

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {(loading || locationLoading) ? (
                        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                            <CircularProgress />
                            <Typography mt={2}>
                                {locationLoading ? "Konum alınıyor..." : "Yükleniyor..."}
                            </Typography>
                        </Box>
                    ) : weather ? (
                        <WeatherCard weather={weather} />
                    ) : null}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;