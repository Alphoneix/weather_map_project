import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// List of major Turkish cities for the dropdown
export const TURKISH_CITIES = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
    "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
    "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ",
    "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri",
    "Hatay", "Isparta", "İçel", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman",
    "Kars", "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir", "Kilis", "Kocaeli",
    "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Muğla", "Muş", "Nevşehir",
    "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Şanlıurfa", "Siirt",
    "Sinop", "Şırnak", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak",
    "Van", "Yalova", "Yozgat", "Zonguldak"
];

// Mock weather data for development/demo purposes


export async function fetchWeather(city = "Ankara") {
    try {
        // Use mock data if no API key or for demo purposes
        if (!API_KEY || API_KEY === "test_key_placeholder") {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Return mock data for known cities, or default Ankara data
            const mockData = MOCK_WEATHER_DATA[city] || MOCK_WEATHER_DATA["Ankara"];
            return {
                ...mockData,
                location: { name: city } // Use the requested city name
            };
        }

        // Using forecast endpoint to get current weather plus today's max/min
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&lang=tr`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Weather API error:", error);
        throw error;
    }
}

// Get user's current location
export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by this browser."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                reject(error);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    });
}

// Get weather by coordinates
export async function fetchWeatherByCoordinates(lat, lon) {
    try {
        // Use mock data if no API key
        if (!API_KEY || API_KEY === "test_key_placeholder") {
            await new Promise(resolve => setTimeout(resolve, 500));
            return MOCK_WEATHER_DATA["Ankara"]; // Default to Ankara mock data
        }

        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=1&lang=tr`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Weather API error:", error);
        throw error;
    }
}