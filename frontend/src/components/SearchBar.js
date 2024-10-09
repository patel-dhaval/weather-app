import React, { useState, useCallback, useEffect } from "react";
import { TextField, InputAdornment, Autocomplete, Alert, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import debounce from "lodash/debounce";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.light,
    },
  },
  backgroundColor: theme.palette.primary.main,
}));

const TopCitiesContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
  }));
  
  const CityButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#202b3b',
    color: '#fff',
    margin: theme.spacing(0, 1, 1, 0),
    '&:hover': {
      backgroundColor: '#2c3e50',
    },
  }));

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    marginLeft: theme.spacing(2),
    '& .MuiToggleButton-root': {
      color: '#fff',
      backgroundColor: '#202b3b',
      '&.Mui-selected': {
        backgroundColor: '#2c3e50',
        color: '#fff',
      },
    },
  }));
  

const SearchBarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  width: '1500px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  margin: '0 auto',
}));

const SearchBarRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));


const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    width: '1500px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& .MuiAutocomplete-paper': {
      backgroundColor: '#202b3b', // Dark background for dropdown
      color: '#9399a2', // Grey text color
    },
    '& .MuiAutocomplete-option': {
      '&[data-focus="true"]': {
        backgroundColor: '#0b131e',
      },
      '&:hover': {
        backgroundColor: '#0b131e',
      },
      color: '#9399a2',
    },
  }));

const SearchBar = ({ onDataFetched, setForecastData }) => {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');
  const topCities = ['New York', 'London', 'Sydney'];
  const [suggestions, setSuggestions] = useState([]);
  const [hasSettings, setHasSettings] = useState(true);

  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;

  useEffect(() => {
    const checkUserSettings = async () => {
      try {
        const response = await fetch('http://localhost:8080/settings', {
          method: 'GET',
          credentials: 'include',
        });
        console.log(response);
        if (!response.ok) {
            setHasSettings(false);
            throw new Error('Failed to fetch user settings');
        }
        setHasSettings(true);
      } catch (error) {
        console.error("Failed to fetch user settings", error);
        setHasSettings(false);
      }
    };

    checkUserSettings();
  }, []);

  const fetchSuggestions = async (input) => {
    try {
      const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}&limit=5&sort=-population`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSuggestions(data.data.map(city => `${city.name}, ${city.countryCode}`));
    } catch (error) {
      console.error("Failed to fetch city suggestions. Please check your API key (settings page) and try again.", error);
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    []
  );

  const handleInputChange = (event, newInputValue) => {
    setCity(newInputValue);
    if (newInputValue.length > 2) {
      debouncedFetchSuggestions(newInputValue);
    } else {
      setSuggestions([]);
    }
  };

  const fetchWeather = async (searchCity, unit) => {
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`/weather?city=${encodeURIComponent(searchCity)}&unit=${unit}`, {
          credentials: 'include',
        }),
        fetch(`/forecast?city=${encodeURIComponent(searchCity)}&unit=${unit}`, {
          credentials: 'include',
        })
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('One or more API calls failed');
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      onDataFetched(currentData, forecastData);
      setForecastData(forecastData);
      toast.success("Found the weather data for " + searchCity);
    } catch (error) {
      console.error("Failed to fetch weather data. Please check your API key (settings page) and try again.", error);
      onDataFetched(null, null);
      setForecastData(null);
      toast.error("Failed to find the weather data of " + searchCity + ". Please check your API key (settings page) and try again.");
    }
  };

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) {
      console.log(newUnit);
      setUnit(newUnit);
      fetchWeather(city, newUnit);
    }
  };


  return (
    <SearchBarContainer>
      <ToastContainer theme="dark" />
      <SearchBarRow>
        <StyledAutocomplete
          freeSolo
          options={suggestions}
          inputValue={city}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              fullWidth
              placeholder="Search for cities"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#9399a2' }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
          onChange={(event, newValue) => {
            if (newValue) {
              setCity(newValue);
              fetchWeather(newValue, unit);
            }
          }}
        />
        <StyledToggleButtonGroup
          value={unit}
          exclusive
          onChange={handleUnitChange}
          aria-label="temperature unit"
          size="small"
        >
          <ToggleButton value="metric" aria-label="metric">
            °C
          </ToggleButton>
          <ToggleButton value="imperial" aria-label="imperial">
            °F
          </ToggleButton>
        </StyledToggleButtonGroup>
      </SearchBarRow>
      <TopCitiesContainer>
        {topCities.map((topCity) => (
          <CityButton
            key={topCity}
            variant="contained"
            onClick={() => { fetchWeather(topCity, unit); setCity(topCity); }}
          >
            {topCity}
          </CityButton>
        ))}
      </TopCitiesContainer>
      {!hasSettings && (
        <Alert 
          severity="warning" 
          action={
            <Button color="inherit" size="small" component={Link} to="/settings">
              Go to Settings
            </Button>
          }
        >
          Please set up your API keys in the settings page to use the weather search.
        </Alert>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;