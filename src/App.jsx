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
    ButtonGroup,
    Button,
} from "@mui/material";
import WeatherCard from "./WeatherCard";
import CitySelector from "./CitySelector";
import WeatherForecast from "./WeatherForecast";
import { fetchWeather, fetchWeatherByCoordinates, getCurrentLocation } from "./api";

// EK: Forecast endpoint'i
async function fetchWeatherForecast(city, days = 7) {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=${days}&lang=tr`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Tahmin alınamadı");
    return response.json();
}

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCity, setSelectedCity] = useState("Ankara");
    const [locationLoading, setLocationLoading] = useState(false);
    const [mode, setMode] = useState("anlik"); // 'anlik' | '7gun' | '14gun'

    // Anlık modda bugünkü hava durumu yükle
    const loadWeatherData = async (city) => {
        try {
            setLoading(true);
            setError("");
            const data = await fetchWeather(city);
            setWeather(data);
            setSelectedCity(data.location.name);
        } catch (err) {
            setError("Hava durumu verisi alınamadı. Lütfen daha sonra tekrar deneyin.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    // Forecast verisi yükle
    const loadForecastData = async (city, days) => {
        try {
            setLoading(true);
            setError("");
            const data = await fetchWeatherForecast(city, days);
            setForecast(data);
            setSelectedCity(data.location.name);
        } catch (err) {
            setError("Tahmin verisi alınamadı.");
            setForecast(null);
        } finally {
            setLoading(false);
        }
    };

    // Konuma göre bugünkü hava durumu ve forecast
    const loadWeatherByLocation = async (days) => {
        try {
            setLocationLoading(true);
            setError("");
            const position = await getCurrentLocation();
            if (mode === "anlik") {
                const data = await fetchWeatherByCoordinates(position.latitude, position.longitude);
                setWeather(data);
                setSelectedCity(data.location.name);
            } else {
                const data = await fetchWeatherForecast(
                    `${position.latitude},${position.longitude}`,
                    mode === "7gun" ? 7 : 14
                );
                setForecast(data);
                setSelectedCity(data.location.name);
            }
        } catch (err) {
            if (err.code === 1) {
                setError("Konum izni reddedildi. Manuel olarak şehir seçebilirsiniz.");
            } else {
                setError("Konum alınamadı. Manuel olarak şehir seçebilirsiniz.");
            }
            if (mode === "anlik") loadWeatherData("Ankara");
            else loadForecastData("Ankara", mode === "7gun" ? 7 : 14);
        } finally {
            setLocationLoading(false);
        }
    };

    // Şehir değişimi
    const handleCityChange = (city) => {
        if (city && city !== selectedCity) {
            if (mode === "anlik") {
                loadWeatherData(city);
            } else {
                loadForecastData(city, mode === "7gun" ? 7 : 14);
            }
        }
    };

    // Konum isteği
    const handleLocationRequest = () => {
        if (mode === "anlik") {
            loadWeatherByLocation();
        } else {
            loadWeatherByLocation(mode === "7gun" ? 7 : 14);
        }
    };

    // Mod değişimi
    const handleModeChange = (newMode) => {
        if (mode === newMode) return;
        setMode(newMode);
        if (newMode === "anlik") {
            loadWeatherData(selectedCity);
        } else {
            loadForecastData(selectedCity, newMode === "7gun" ? 7 : 14);
        }
    };

    // İlk yükleme
    useEffect(() => {
        if (mode === "anlik") {
            const initializeWeather = async () => {
                try {
                    setLocationLoading(true);
                    setError("");
                    const position = await getCurrentLocation();
                    const data = await fetchWeatherByCoordinates(position.latitude, position.longitude);
                    setWeather(data);
                    setSelectedCity(data.location.name);
                } catch (err) {
                    if (err.code === 1) {
                        setError("Konum izni reddedildi. Ankara hava durumu gösteriliyor.");
                    } else {
                        setError("Konum alınamadı. Ankara hava durumu gösteriliyor.");
                    }
                    try {
                        const data = await fetchWeather("Ankara");
                        setWeather(data);
                        setSelectedCity(data.location.name);
                    } catch {
                        setError("Hava durumu verisi alınamadı.");
                    }
                } finally {
                    setLocationLoading(false);
                    setLoading(false);
                }
            };
            initializeWeather();
        } else {
            const initializeForecast = async () => {
                try {
                    setLocationLoading(true);
                    setError("");
                    const position = await getCurrentLocation();
                    const data = await fetchWeatherForecast(
                        `${position.latitude},${position.longitude}`,
                        mode === "7gun" ? 7 : 14
                    );
                    setForecast(data);
                    setSelectedCity(data.location.name);
                } catch (err) {
                    if (err.code === 1) {
                        setError("Konum izni reddedildi. Ankara tahmini gösteriliyor.");
                    } else {
                        setError("Konum alınamadı. Ankara tahmini gösteriliyor.");
                    }
                    try {
                        const data = await fetchWeatherForecast(
                            "Ankara",
                            mode === "7gun" ? 7 : 14
                        );
                        setForecast(data);
                        setSelectedCity(data.location.name);
                    } catch {
                        setError("Tahmin verisi alınamadı.");
                    }
                } finally {
                    setLocationLoading(false);
                    setLoading(false);
                }
            };
            initializeForecast();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    // Sabit border rengi (gri)
    const borderColor = "#333";

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

                    {/* Butonlar */}
                    <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                        <ButtonGroup variant="contained" fullWidth>
                            <Button
                                variant={mode === "anlik" ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => handleModeChange("anlik")}
                                sx={{
                                    bgcolor: mode === "anlik" ? "#1E1E1E" : undefined,
                                    color: mode === "anlik" ? "#fff" : theme.palette.text.secondary,
                                    border: `1px solid ${borderColor} !important`,
                                    '&:hover': {
                                        bgcolor: mode === "anlik" ? "#1E1E1E" : undefined,
                                    }
                                }}
                            >
                                Anlık
                            </Button>
                            <Button
                                variant={mode === "7gun" ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => handleModeChange("7gun")}
                                sx={{
                                    bgcolor: mode === "7gun" ? "#1E1E1E" : undefined,
                                    color: mode === "7gun" ? "#fff" : theme.palette.text.secondary,
                                    border: `1px solid ${borderColor} !important`,
                                    '&:hover': {
                                        bgcolor: mode === "7gun" ? "#1E1E1E" : undefined,
                                    }
                                }}
                            >
                                7 Günlük
                            </Button>
                            <Button
                                variant={mode === "14gun" ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => handleModeChange("14gun")}
                                sx={{
                                    bgcolor: mode === "14gun" ? "#1E1E1E" : undefined,
                                    color: mode === "14gun" ? "#fff" : theme.palette.text.secondary,
                                    border: `1px solid ${borderColor} !important`,
                                    '&:hover': {
                                        bgcolor: mode === "14gun" ? "#1E1E1E" : undefined,
                                    }
                                }}
                            >
                                14 Günlük
                            </Button>
                        </ButtonGroup>
                    </Box>

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
                        <>
                            <WeatherCard weather={weather} />
                            {(mode === "7gun" || mode === "14gun") && forecast && forecast.forecast && (
                                <WeatherForecast
                                    forecastDays={forecast.forecast.forecastday}
                                    showCount={mode === "14gun" ? 14 : 7}
                                />
                            )}
                        </>
                    ) : null}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;