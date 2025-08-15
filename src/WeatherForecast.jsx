import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import WeatherIcon from "./WeatherIcon";

// Helper: Split forecastDays into chunks of at most 7
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

// Her satıra tam 7 gün sığdırmak için grid sistemini override eden bir stil uygulanıyor.
// Her satırda 7 gün varsa her biri xs=12/7≈1.714, yoksa her biri xs=12/(günSayısı) (örn. kalan 2 gün varsa xs=6).
function WeatherForecast({ forecastDays = [], showCount = 7 }) {
    const days = forecastDays.slice(0, showCount);
    const rows = chunkArray(days, 7);

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            {rows.map((row, idx) => {
                // 7 günlük satırda: 7 sütun, kalan gün satırında: kalan gün sayısı kadar sütun (eşit genişlik)
                const itemsPerRow = row.length;
                // xs değerini tam sayıya yuvarla, ama 7 ise 1.714 ile çalışmak için flexBasis kullanacağız
                return (
                    <Grid
                        key={idx}
                        container
                        spacing={1}
                        justifyContent="center"
                        alignItems="stretch"
                        sx={{
                            mb: 1,
                            // 7'li satırda her kutuyu eşit yapmak için display: flex override
                            ...(itemsPerRow === 7 && {
                                display: "flex",
                                flexWrap: "nowrap",
                            }),
                        }}
                    >
                        {row.map((day, i) => (
                            <Grid
                                item
                                key={day.date_epoch}
                                // 7'li satırda tüm kutular aynı genişlikte ve taşmayacak şekilde
                                sx={{
                                    minWidth: 0,
                                    flex: itemsPerRow === 7 ? "1 1 0%" : undefined,
                                    maxWidth: itemsPerRow === 7 ? "100%" : undefined,
                                    width: itemsPerRow === 7 ? undefined : "100%",
                                }}
                                xs={itemsPerRow === 7 ? undefined : 12 / itemsPerRow}
                            >
                                <Paper
                                    elevation={1}
                                    sx={{
                                        bgcolor: "#232323",
                                        color: "#fff",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        py: 2,
                                        borderRadius: 2,
                                        width: "100%",
                                    }}
                                >
                                    <WeatherIcon
                                        conditionCode={day.day.condition.code}
                                        size={40}
                                        alt={day.day.condition.text}
                                    />
                                    <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>
                                        {Math.round(day.day.maxtemp_c)}°C
                                    </Typography>
                                    <Typography variant="caption" sx={{ mt: 0.5, opacity: 0.7 }}>
                                        {new Date(day.date).toLocaleDateString("tr-TR", { weekday: "short" })}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                );
            })}
        </Box>
    );
}

export default WeatherForecast;