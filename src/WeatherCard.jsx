import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
} from "@mui/material";
import WeatherIcon from "./WeatherIcon";

function WeatherCard({ weather }) {
    if (!weather) return null;

    const {
        current,
        forecast,
    } = weather;

    // Get today's forecast data for max/min temps
    const todayForecast = forecast?.forecastday?.[0]?.day;

    const description = current.condition.text;

    return (
        <Card sx={{ bgcolor: "background.paper", boxShadow: 3 }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid xs={12} display="flex" justifyContent="center">
                        <WeatherIcon
                            conditionCode={current.condition.code}
                            size={100}
                            alt={description}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant="h5" align="center">
                            {Math.round(current.temp_c)}°C
                        </Typography>
                        <Typography variant="subtitle1" align="center" textTransform="capitalize">
                            {description}
                        </Typography>
                        {todayForecast && (
                            <Typography variant="body2" align="center" sx={{ mt: 1, opacity: 0.8 }}>
                                En Yüksek: {Math.round(todayForecast.maxtemp_c)}°C • En Düşük: {Math.round(todayForecast.mintemp_c)}°C
                            </Typography>
                        )}
                        {!todayForecast && (
                            <Typography variant="body2" align="center" sx={{ mt: 1, opacity: 0.6 }}>
                                Günlük min/max sıcaklık verisi mevcut değil
                            </Typography>
                        )}
                    </Grid>
                    <Grid xs={6}>
                        <Typography variant="body2">Hissedilen: {Math.round(current.feelslike_c)}°C</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography variant="body2">Nem: {current.humidity}%</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant="body2" align="center">Rüzgar: {current.wind_kph} km/sa</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default WeatherCard;