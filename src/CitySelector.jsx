import React, { useState, useEffect } from "react";
import {
    Autocomplete,
    TextField,
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";
import { TURKISH_CITIES } from "./api";

function CitySelector({ selectedCity, onCityChange, onLocationRequest }) {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setInputValue(selectedCity);
    }, [selectedCity]);

    return (
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
            <Autocomplete
                value={selectedCity}
                onChange={(event, newValue) => {
                    onCityChange(newValue || "Ankara");
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                options={TURKISH_CITIES}
                freeSolo
                fullWidth
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Şehir seçin"
                        placeholder="Şehir adı yazın..."
                        variant="outlined"
                        size="small"
                    />
                )}
                renderOption={(props, option) => (
                    <Box component="li" {...props} key={option}>
                        {option}
                    </Box>
                )}
                filterOptions={(options, { inputValue }) => {
                    return options.filter(option =>
                        option.toLowerCase().includes(inputValue.toLowerCase())
                    );
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                    }
                }}
            />
            <Tooltip title="Konumumu kullan">
                <IconButton
                    onClick={onLocationRequest}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                        }
                    }}
                >
                    <LocationIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
}

export default CitySelector;