import React from "react";
import { Box } from "@mui/material";

// Import SVG icons as URLs
import sunnyIcon from "./icons/sunny.svg";
import partlyCloudyIcon from "./icons/partly-cloudy.svg";
import cloudyIcon from "./icons/cloudy.svg";
import rainyIcon from "./icons/rainy.svg";
import heavyRainIcon from "./icons/heavy-rain.svg";
import snowIcon from "./icons/snow.svg";
import thunderstormIcon from "./icons/thunderstorm.svg";
import mistIcon from "./icons/mist.svg";

// Weather condition code mapping for WeatherAPI
const WEATHER_ICON_MAPPING = {
    // Sunny/Clear
    1000: sunnyIcon, // Sunny/Clear

    // Partly cloudy
    1003: partlyCloudyIcon, // Partly cloudy

    // Cloudy
    1006: cloudyIcon, // Cloudy
    1009: cloudyIcon, // Overcast

    // Mist/Fog
    1030: mistIcon, // Mist
    1135: mistIcon, // Fog
    1147: mistIcon, // Freezing fog

    // Light rain
    1063: rainyIcon, // Patchy rain possible
    1150: rainyIcon, // Patchy light drizzle
    1153: rainyIcon, // Light drizzle
    1180: rainyIcon, // Patchy light rain
    1183: rainyIcon, // Light rain
    1240: rainyIcon, // Light rain shower

    // Heavy rain
    1186: heavyRainIcon, // Moderate rain at times
    1189: heavyRainIcon, // Moderate rain
    1192: heavyRainIcon, // Heavy rain at times
    1195: heavyRainIcon, // Heavy rain
    1243: heavyRainIcon, // Moderate or heavy rain shower
    1246: heavyRainIcon, // Torrential rain shower

    // Snow
    1066: snowIcon, // Patchy snow possible
    1114: snowIcon, // Blowing snow
    1117: snowIcon, // Blizzard
    1210: snowIcon, // Patchy light snow
    1213: snowIcon, // Light snow
    1216: snowIcon, // Patchy moderate snow
    1219: snowIcon, // Moderate snow
    1222: snowIcon, // Patchy heavy snow
    1225: snowIcon, // Heavy snow
    1255: snowIcon, // Light snow showers
    1258: snowIcon, // Moderate or heavy snow showers
    1279: snowIcon, // Patchy light snow with thunder
    1282: snowIcon, // Moderate or heavy snow with thunder

    // Thunderstorm
    1087: thunderstormIcon, // Thundery outbreaks possible
    1273: thunderstormIcon, // Patchy light rain with thunder
    1276: thunderstormIcon, // Moderate or heavy rain with thunder

    // Mixed conditions - use appropriate fallbacks
    1069: snowIcon, // Patchy sleet possible
    1072: rainyIcon, // Patchy freezing drizzle possible
    1198: rainyIcon, // Light freezing rain
    1201: heavyRainIcon, // Moderate or heavy freezing rain
    1204: snowIcon, // Light sleet
    1207: snowIcon, // Moderate or heavy sleet
    1237: snowIcon, // Ice pellets
    1249: snowIcon, // Light sleet showers
    1252: snowIcon, // Moderate or heavy sleet showers
    1261: snowIcon, // Light showers of ice pellets
    1264: snowIcon, // Moderate or heavy showers of ice pellets
};

function WeatherIcon({ conditionCode, size = 100, alt = "Weather condition" }) {
    const iconUrl = WEATHER_ICON_MAPPING[conditionCode] || sunnyIcon;

    return (
        <Box
            sx={{
                width: size,
                height: size,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
            }}
        >
            <img
                src={iconUrl}
                alt={alt}
                width={size}
                height={size}
                style={{ width: "100%", height: "100%" }}
            />
        </Box>
    );
}

export default WeatherIcon;