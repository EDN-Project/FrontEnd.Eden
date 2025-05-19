import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Accordion, AccordionSummary, AccordionDetails, Grid, Button, Popover, Paper } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import images from "../../constants/images";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { getDailyReadings, getMonthlyReadings, getReadingsBetweenDates } from '../../constants/api';
import { 
  getDailyReadings, 
  getMonthlyReadings, 
  getReadingsBetweenDates,
  getDailyActions,
  getMonthlyActions,
  getActionsBetweenDates,
  getStageNutrients
} from '../../constants/api';

const StatBox = ({ title, value, color = "white" }) => (
  <Box
    sx={{
      backgroundColor: "#4F4F4F",
      borderRadius: "10px",
      padding: "20px",
      textAlign: "center",
      width:'130px',
      height: "100px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Typography variant="h4" fontWeight="bold" color={'#CEFBE2'}>
      {value}
    </Typography>
    <Typography variant="body2" mt={2} color="#8B8B8B">
      {title}
    </Typography>
  </Box>
);

const NutrientBox = ({ element, value, unit }) => {
  // Extract value and unit if passed as an object
  let displayValue = value;
  let displayUnit = unit;
  
  if (typeof value === 'object' && value !== null) {
    displayValue = value.value || value.optimal || "0";
    displayUnit = value.unit || "";
  }
  
  return (
    <Box
      sx={{
        backgroundColor: "#4F4F4F",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        height: "90px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" color="#CEFBE2" mb={1}>
        {displayValue} {displayUnit && <span style={{ fontSize: '0.7em' }}>{displayUnit}</span>}
      </Typography>
      <Typography variant="body2" fontWeight="bold" color="#8B8B8B">
        {element}
      </Typography>
    </Box>
  );
};

const Report = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [activeFilter, setActiveFilter] = useState('day'); // 'day', 'month', or 'custom'
  
  // Separate state for each filter type
  const [selectedDayDate, setSelectedDayDate] = useState(new Date());
  const [selectedMonthDate, setSelectedMonthDate] = useState(new Date());
  const [selectedDateRange, setSelectedDateRange] = useState([new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]);
  
  const [anchorEl, setAnchorEl] = useState(null);
  
  // State variables for API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyAverage, setDailyAverage] = useState({
    ph: 0,
    temperature: 0,
    humidity: 0,
    salt: 0,
    light: 0,
    ec: 0
  });
  const [humidityData, setHumidityData] = useState([]);
  const [phData, setPhData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [ecData, setEcData] = useState([]);
  const [alertsData, setAlertsData] = useState([]);
  const [nutrientsData, setNutrientsData] = useState({
    stage: "",
    days_passed: 0,
    nutrients: {
      ec: { value: 0, unit: "" },
      ph: { value: 0, unit: "" },
      elements: {
        iron: { min: 0, optimal: 0, max: 0, unit: "" },
        calcium: { min: 0, optimal: 0, max: 0, unit: "" },
        magnesium: { min: 0, optimal: 0, max: 0, unit: "" },
        boron: { min: 0, optimal: 0, max: 0, unit: "" },
        zinc: { min: 0, optimal: 0, max: 0, unit: "" }
      },
      npk: ""
    }
  });

  // Function to handle filter button clicks
  const handleFilterClick = (filter, event) => {
    setActiveFilter(filter);
    setAnchorEl(event.currentTarget);
  };

  // Function to clear data when switching between filters or when errors occur
  const clearData = () => {
    setDailyAverage({
      ph: 0,
      temperature: 0,
      humidity: 0,
      salt: 0,
      light: 0,
      ec: 0
    });
    setHumidityData([]);
    setPhData([]);
    setTempData([]);
    setEcData([]);
    setAlertsData([]); // Clear alerts data too
  };

  // Separate function for fetching daily readings
  const fetchDailyReadings = async (date) => {
    try {
      setLoading(true);
      setError(null);
      
      // Format date for daily API request
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // Fetch readings
      const response = await getDailyReadings(formattedDate);
      
      // Also fetch actions/alerts for the same day
      const actionsResponse = await getDailyActions(formattedDate);
      
      console.log("Daily API Response:", response);
      console.log("Daily Actions Response:", actionsResponse);
      
      if (response.success) {
        const { readings, daily_average } = response.data || {};
        
        if (readings && daily_average) {
          // Process daily data
          setDailyAverage(daily_average);
          
          // Transform readings data for charts
          const transformedHumidityData = [];
          const transformedPhData = [];
          const transformedTempData = [];
          const transformedEcData = [];
          
          readings.forEach(reading => {
            const timeLabel = reading.time || '';
            transformedHumidityData.push({ day: timeLabel, value: reading.humidity });
            transformedPhData.push({ day: timeLabel, value: reading.ph });
            transformedTempData.push({ day: timeLabel, value: reading.temperature });
            transformedEcData.push({ day: timeLabel, value: reading.ec });
          });
          
          setHumidityData(transformedHumidityData);
          setPhData(transformedPhData);
          setTempData(transformedTempData);
          setEcData(transformedEcData);
          setError(null);
        } else {
          // Clear old data on error
          clearData();
          setError("Incomplete daily data received");
        }
      } else {
        // Clear old data on error
        clearData();
        setError(response.error || "Failed to fetch daily readings");
      }
      
      // Process actions/alerts data
      if (actionsResponse.success && actionsResponse.data) {
        const days = actionsResponse.data.days || [];
        setAlertsData(days);
      } else {
        setAlertsData([]);
      }
    } catch (err) {
      console.error("Error fetching daily readings:", err);
      clearData();
      setAlertsData([]);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  // Separate function for fetching monthly readings
  const fetchMonthlyReadings = async (date) => {
    try {
      setLoading(true);
      setError(null);
      
      // Extract month and year for monthly API request
      const month = date.getMonth() + 1; // JavaScript months are 0-indexed
      const year = date.getFullYear();
      
      // Fetch readings
      const response = await getMonthlyReadings(month, year);
      
      // Also fetch actions/alerts for the same month
      const actionsResponse = await getMonthlyActions(month, year);
      
      console.log("Monthly API Response:", response);
      console.log("Monthly Actions Response:", actionsResponse);
      
      console.log(`Requesting data for month: ${month}, year: ${year}`);
      console.log(`Original selected date:`, date);
      
      if (response.success && response.data) {
        // Access the nested data array
        const daysData = response.data.data;
        
        // Debug log to check what we're getting
        console.log("Days data:", daysData);
        
        if (daysData && Array.isArray(daysData) && daysData.length > 0) {
          // Calculate averages from days data
          const avgPh = daysData.reduce((sum, day) => sum + day.ph, 0) / daysData.length;
          const avgTemp = daysData.reduce((sum, day) => sum + day.temperature, 0) / daysData.length;
          const avgHumidity = daysData.reduce((sum, day) => sum + day.humidity, 0) / daysData.length;
          const avgEc = daysData.reduce((sum, day) => sum + day.ec, 0) / daysData.length;
          
          // Set averages
          setDailyAverage({
            ph: avgPh.toFixed(2),
            temperature: avgTemp.toFixed(1),
            humidity: avgHumidity.toFixed(1),
            ec: avgEc.toFixed(2)
          });
          
          // Transform days data for charts
          const transformedHumidityData = [];
          const transformedPhData = [];
          const transformedTempData = [];
          const transformedEcData = [];
          
          daysData.forEach(day => {
            const dayLabel = `${day.day}`; // Day of month
            transformedHumidityData.push({ day: dayLabel, value: day.humidity });
            transformedPhData.push({ day: dayLabel, value: day.ph });
            transformedTempData.push({ day: dayLabel, value: day.temperature });
            transformedEcData.push({ day: dayLabel, value: day.ec });
          });
          
          setHumidityData(transformedHumidityData);
          setPhData(transformedPhData);
          setTempData(transformedTempData);
          setEcData(transformedEcData);
          setError(null);
        } else {
          // Clear old data when no data for month
          clearData();
          setError("No data available for this month");
        }
      } else {
        // Clear old data on error
        clearData();
        setError(response.error || "Failed to fetch monthly readings");
      }
      
      // Process actions/alerts data
      if (actionsResponse.success && actionsResponse.data) {
        const days = actionsResponse.data.days || [];
        setAlertsData(days);
      } else {
        setAlertsData([]);
      }
    } catch (err) {
      console.error("Error fetching monthly readings:", err);
      clearData();
      setAlertsData([]);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  // Separate function for fetching readings between dates
  const fetchReadingsBetweenDates = async (startDate, endDate) => {
    try {
      setLoading(true);
      setError(null);
      
      // Format dates for custom range API request
      if (startDate && endDate) {
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        
        // Fetch readings
        const response = await getReadingsBetweenDates(formattedStartDate, formattedEndDate);
        
        // Also fetch actions/alerts for the same date range
        const actionsResponse = await getActionsBetweenDates(formattedStartDate, formattedEndDate);
        
        console.log("Custom Range API Response:", response);
        console.log("Custom Range Actions Response:", actionsResponse);
        
        console.log(`Requesting data between: ${formattedStartDate} and ${formattedEndDate}`);
        
        if (response.success && response.data) {
          // Access the nested data array
          const readingsData = response.data.data;
          
          // Debug log to check what we're getting
          console.log("Readings data:", readingsData);
          
          if (readingsData && Array.isArray(readingsData) && readingsData.length > 0) {
            // Calculate averages from the readings data
            const avgPh = readingsData.reduce((sum, reading) => sum + reading.ph, 0) / readingsData.length;
            const avgTemp = readingsData.reduce((sum, reading) => sum + reading.temperature, 0) / readingsData.length;
            const avgHumidity = readingsData.reduce((sum, reading) => sum + reading.humidity, 0) / readingsData.length;
            const avgEc = readingsData.reduce((sum, reading) => sum + reading.ec, 0) / readingsData.length;
            
            // Set averages
            setDailyAverage({
              ph: avgPh.toFixed(2),
              temperature: avgTemp.toFixed(1),
              humidity: avgHumidity.toFixed(1),
              ec: avgEc.toFixed(2)
            });
            
            // Transform readings data for charts
            const transformedHumidityData = [];
            const transformedPhData = [];
            const transformedTempData = [];
            const transformedEcData = [];
            
            readingsData.forEach(reading => {
              // Use date or day property, depending on what's available
              const label = reading.date || `${reading.day}/${reading.month}`;
              transformedHumidityData.push({ day: label, value: reading.humidity });
              transformedPhData.push({ day: label, value: reading.ph });
              transformedTempData.push({ day: label, value: reading.temperature });
              transformedEcData.push({ day: label, value: reading.ec });
            });
            
            setHumidityData(transformedHumidityData);
            setPhData(transformedPhData);
            setTempData(transformedTempData);
            setEcData(transformedEcData);
            setError(null);
          } else {
            // Clear old data when no data for the date range
            clearData();
            setError("No data available for this date range");
          }
        } else {
          // Clear old data on error
          clearData();
          setError(response.error || "Failed to fetch readings for date range");
        }
        
        // Process actions/alerts data
        if (actionsResponse.success && actionsResponse.data) {
          const days = actionsResponse.data.days || [];
          setAlertsData(days);
        } else {
          setAlertsData([]);
        }
      } else {
        setError("Please select both start and end dates");
      }
    } catch (err) {
      console.error("Error fetching readings between dates:", err);
      clearData();
      setAlertsData([]);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  // Separate function for fetching daily alerts
  const fetchDailyAlerts = async (date) => {
    try {
      // Format date for daily API request
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      console.log("Fetching daily alerts for:", formattedDate);
      
      const actionsResponse = await getDailyActions(formattedDate);
      
      console.log("Daily Actions Response:", actionsResponse);
      




      // Log the full structure to see what we're getting
      console.log("Daily Actions Response structure:", JSON.stringify(actionsResponse));
      
      if (actionsResponse.success && actionsResponse.data) {
        // Check different possible structures
        let alertsData = [];
        
        if (actionsResponse.data.days && Array.isArray(actionsResponse.data.days)) {
          // Structure: { days: [...] }
          alertsData = actionsResponse.data.days;
        } else if (actionsResponse.data.actions && Array.isArray(actionsResponse.data.actions)) {
          // Structure: { actions: [...] }
          // Convert to the expected format
          alertsData = [{
            day: format(date, 'dd/MM/yyyy'),
            actions: actionsResponse.data.actions
          }];
        } else if (Array.isArray(actionsResponse.data)) {
          // Structure: direct array
          alertsData = [{
            day: format(date, 'dd/MM/yyyy'),
            actions: actionsResponse.data
          }];
        } else {
          // Try to extract any actions data we can find
          const possibleActions = Object.values(actionsResponse.data)
            .find(val => Array.isArray(val) && val.length > 0 && val[0].type);
          
          if (possibleActions) {
            alertsData = [{
              day: format(date, 'dd/MM/yyyy'),
              actions: possibleActions
            }];
          }
        }
        
        console.log("Processed daily alerts data:", alertsData);
        setAlertsData(alertsData);
      } else {

        console.log("No daily alerts data found or invalid response");
        setAlertsData([]);
      }
    } catch (err) {
      console.error("Error fetching daily alerts:", err);
      setAlertsData([]);
    }
  };

  // Separate function for fetching monthly alerts
  const fetchMonthlyAlerts = async (date) => {
    try {
      // Extract month and year for monthly API request
      const month = date.getMonth() + 1; // JavaScript months are 0-indexed
      const year = date.getFullYear();
      
      console.log(`Fetching monthly alerts for: ${month}/${year}`);
      
      const actionsResponse = await getMonthlyActions(month, year);
      
      console.log("Monthly Actions Response:", actionsResponse);
      
      if (actionsResponse.success && actionsResponse.data && actionsResponse.data.days) {
        const days = actionsResponse.data.days;
        console.log("Monthly alerts data:", days);
        setAlertsData(days);
      } else {
        console.log("No monthly alerts data found or invalid response structure");
        setAlertsData([]);
      }
    } catch (err) {
      console.error("Error fetching monthly alerts:", err);
      setAlertsData([]);
    }
  };

  // Separate function for fetching alerts between dates
  const fetchAlertsBetweenDates = async (startDate, endDate) => {
    try {
      // Format dates for custom range API request
      if (startDate && endDate) {
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        
        console.log(`Fetching alerts between: ${formattedStartDate} and ${formattedEndDate}`);
        
        const actionsResponse = await getActionsBetweenDates(formattedStartDate, formattedEndDate);
        
        console.log("Custom Range Actions Response:", actionsResponse);
        




        // Log the full structure to see what we're getting
        console.log("Custom Range Actions Response structure:", JSON.stringify(actionsResponse));
        
        if (actionsResponse.success && actionsResponse.data) {
          // Check different possible structures
          let alertsData = [];
          
          if (actionsResponse.data.days && Array.isArray(actionsResponse.data.days)) {
            // Structure: { days: [...] }
            alertsData = actionsResponse.data.days;
          } else if (actionsResponse.data.actions && Array.isArray(actionsResponse.data.actions)) {
            // Structure: { actions: [...] }
            // Group by date if possible
            const actionsByDate = {};
            
            actionsResponse.data.actions.forEach(action => {
              const actionDate = action.date || format(startDate, 'dd/MM/yyyy');
              if (!actionsByDate[actionDate]) {
                actionsByDate[actionDate] = [];
              }
              actionsByDate[actionDate].push(action);
            });
            
            alertsData = Object.entries(actionsByDate).map(([date, actions]) => ({
              day: date,
              actions: actions
            }));
          } else if (Array.isArray(actionsResponse.data)) {
            // Structure: direct array
            // Group by date if possible
            const actionsByDate = {};
            
            actionsResponse.data.forEach(action => {
              const actionDate = action.date || format(startDate, 'dd/MM/yyyy');
              if (!actionsByDate[actionDate]) {
                actionsByDate[actionDate] = [];
              }
              actionsByDate[actionDate].push(action);
            });
            
            alertsData = Object.entries(actionsByDate).map(([date, actions]) => ({
              day: date,
              actions: actions
            }));
          } else {
            // Try to extract any actions data we can find
            const possibleActions = Object.values(actionsResponse.data)
              .find(val => Array.isArray(val) && val.length > 0 && val[0].type);
            
            if (possibleActions) {
              alertsData = [{
                day: `${format(startDate, 'dd/MM/yyyy')} - ${format(endDate, 'dd/MM/yyyy')}`,
                actions: possibleActions
              }];
            }
          }
          
          console.log("Processed custom range alerts data:", alertsData);
          setAlertsData(alertsData);
        } else {

          console.log("No custom range alerts data found or invalid response");
          setAlertsData([]);
        }
      }
    } catch (err) {
      console.error("Error fetching alerts between dates:", err);
      setAlertsData([]);
    }
  };

  // Handle date change for day filter
  const handleDayDateChange = (newDate) => {
    setSelectedDayDate(newDate);
  };

  // Handle date change for month filter
  const handleMonthDateChange = (newDate) => {
    setSelectedMonthDate(newDate);
  };

  // Handle date range change for custom filter
  const handleDateRangeChange = (index, newDate) => {
    const newRange = [...selectedDateRange];
    
    // If changing start date
    if (index === 0) {
      // Ensure start date doesn't exceed end date
      if (newDate <= selectedDateRange[1]) {
        newRange[index] = newDate;
      } else {
        // If start date is after end date, make end date one day after start date
        newRange[0] = newDate;
        newRange[1] = new Date(newDate.getTime() + 86400000); // Add one day
      }
    } 
    // If changing end date
    else if (index === 1) {
      // Ensure end date isn't before start date
      if (newDate >= selectedDateRange[0]) {
        newRange[index] = newDate;
      } else {
        // If end date is before start date, make start date one day before end date
        newRange[1] = newDate;
        newRange[0] = new Date(newDate.getTime() - 86400000); // Subtract one day
      }
    }
    
    setSelectedDateRange(newRange);
  };

  // Apply button handlers for each filter type
  const handleApplyDayFilter = () => {
    fetchDailyReadings(selectedDayDate);
    fetchDailyAlerts(selectedDayDate);
    setAnchorEl(null);
  };

  const handleApplyMonthFilter = () => {
    fetchMonthlyReadings(selectedMonthDate);
    fetchMonthlyAlerts(selectedMonthDate);
    setAnchorEl(null);
  };

  const handleApplyCustomRange = () => {
    fetchReadingsBetweenDates(selectedDateRange[0], selectedDateRange[1]);
    fetchAlertsBetweenDates(selectedDateRange[0], selectedDateRange[1]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Format the displayed date based on active filter
  const formatSelectedDate = () => {
    switch (activeFilter) {
      case 'day':
        return format(selectedDayDate, 'dd/MM/yyyy');
      case 'month':
        return format(selectedMonthDate, 'MMMM yyyy');
      case 'custom':
        if (selectedDateRange && selectedDateRange[0] && selectedDateRange[1]) {
          return `${format(selectedDateRange[0], 'dd/MM/yyyy')} - ${format(selectedDateRange[1], 'dd/MM/yyyy')}`;
        }
        return 'Custom Range';
      default:
        return format(new Date(), 'dd/MM/yyyy');
    }
  };

  // Load initial data when component mounts
  useEffect(() => {
    // Fetch data using default filter (day) and current date
    fetchDailyReadings(selectedDayDate);
    fetchDailyAlerts(selectedDayDate);
    
    // Fetch stage nutrients data
    fetchStageNutrients();
  }, []); // Empty dependencies means this runs once on component mount

  // Function to fetch stage nutrients data
  const fetchStageNutrients = async () => {
    try {
      const response = await getStageNutrients();
      
      console.log("Stage Nutrients Response:", response);
      
      if (response.success && response.data) {
        setNutrientsData(response.data);
      } else {
        console.error("Failed to fetch stage nutrients:", response.error);
      }
    } catch (err) {
      console.error("Error fetching stage nutrients:", err);
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ backgroundColor: "#121212", minHeight: '100vh' }}>
          <Sidebar isSidebar={isSidebar} />
          <main className="content" style={{ backgroundColor: "#121212" }}>
            <Topbar setIsSidebar={setIsSidebar} />
            <Box m="20px" flexDirection={'row'}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography
                    variant="h1"
                    color={'#CEFBE2'}
                    fontWeight="bold"
                    align='left'
                    sx={{ m: "0 0 5px 0" }}
                  >
                    Get Reports
                  </Typography>
                  <Typography
                    variant="h4"
                    color={'#CEFBE2'}
                    align='left'
                    sx={{ m: "0 0 5px 0" }}
                  >
                    Managing your Farm Reports
                  </Typography>
                </Box>
                
                {/* Date filter buttons */}
                <Box>
                  <Box display="flex" gap={2}>
                    <Button
                      onClick={(e) => handleFilterClick('day', e)}
                      sx={{
                        backgroundColor: activeFilter === 'day' ? '#CEFBE2' : '#333',
                        color: activeFilter === 'day' ? '#121212' : '#fff',
                        '&:hover': {
                          backgroundColor: activeFilter === 'day' ? '#CEFBE2' : '#444',
                        },
                        borderRadius: '8px',
                        padding: '8px 16px',
                      }}
                    >
                      Day
                    </Button>
                    <Button
                      onClick={(e) => handleFilterClick('month', e)}
                      sx={{
                        backgroundColor: activeFilter === 'month' ? '#CEFBE2' : '#333',
                        color: activeFilter === 'month' ? '#121212' : '#fff',
                        '&:hover': {
                          backgroundColor: activeFilter === 'month' ? '#CEFBE2' : '#444',
                        },
                        borderRadius: '8px',
                        padding: '8px 16px',
                      }}
                    >
                      Month
                    </Button>
                    <Button
                      onClick={(e) => handleFilterClick('custom', e)}
                      sx={{
                        backgroundColor: activeFilter === 'custom' ? '#CEFBE2' : '#333',
                        color: activeFilter === 'custom' ? '#121212' : '#fff',
                        '&:hover': {
                          backgroundColor: activeFilter === 'custom' ? '#CEFBE2' : '#444',
                        },
                        borderRadius: '8px',
                        padding: '8px 16px',
                      }}
                    >
                      Custom
                    </Button>
                  </Box>
                </Box>
              </Box>
              
              {/* Date picker popup - Now with separate handlers for each filter type */}
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: '#333',
                    color: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    padding: '16px',
                    width: 'auto',
                    minWidth: '250px',
                  }
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  {activeFilter === 'day' && (
                    <Box>
                      <Typography variant="h6" color="#CEFBE2" mb={2}>
                        Select Day
                      </Typography>
                      <DatePicker
                        value={selectedDayDate}
                        onChange={handleDayDateChange}
                        views={['day', 'month', 'year']}
                        sx={{
                          width: '100%',
                          '& .MuiInputBase-root': {
                            color: '#fff',
                            backgroundColor: '#444',
                          },
                          '& .MuiPickersDay-root': {
                            color: '#fff',
                            '&.Mui-selected': {
                              backgroundColor: '#CEFBE2',
                              color: '#121212',
                            },
                          },
                        }}
                      />
                      <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button 
                          onClick={handleApplyDayFilter}
                          sx={{
                            backgroundColor: '#CEFBE2',
                            color: '#121212',
                            '&:hover': {
                              backgroundColor: '#a0d8b8',
                            },
                            borderRadius: '8px',
                            padding: '6px 16px',
                          }}
                        >
                          Apply
                        </Button>
                      </Box>
                    </Box>
                  )}
                  
                  {activeFilter === 'month' && (
                    <Box>
                      <Typography variant="h6" color="#CEFBE2" mb={2}>
                        Select Month
                      </Typography>
                      <DatePicker
                        value={selectedMonthDate}
                        onChange={handleMonthDateChange}
                        views={['month', 'year']}
                        sx={{
                          width: '100%',
                          '& .MuiInputBase-root': {
                            color: '#fff',
                            backgroundColor: '#444',
                          },
                          '& .MuiPickersDay-root': {
                            color: '#fff',
                            '&.Mui-selected': {
                              backgroundColor: '#CEFBE2',
                              color: '#121212',
                            },
                          },
                        }}
                      />
                      <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button 
                          onClick={handleApplyMonthFilter}
                          sx={{
                            backgroundColor: '#CEFBE2',
                            color: '#121212',
                            '&:hover': {
                              backgroundColor: '#a0d8b8',
                            },
                            borderRadius: '8px',
                            padding: '6px 16px',
                          }}
                        >
                          Apply
                        </Button>
                      </Box>
                    </Box>
                  )}
                  
                  {activeFilter === 'custom' && (
                    <Box>
                      <Typography variant="h6" color="#CEFBE2" mb={2}>
                        Select Date Range
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                          <Typography variant="body2" color="#8B8B8B" mb={1}>
                            Start Date
                          </Typography>
                          <DatePicker
                            value={selectedDateRange[0]}
                            onChange={(newValue) => handleDateRangeChange(0, newValue)}
                            maxDate={selectedDateRange[1]}
                            sx={{
                              width: '100%',
                              '& .MuiInputBase-root': {
                                color: '#fff',
                                backgroundColor: '#444',
                              },
                              '& .MuiPickersDay-root': {
                                color: '#fff',
                                '&.Mui-selected': {
                                  backgroundColor: '#CEFBE2',
                                  color: '#121212',
                                },
                              },
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="#8B8B8B" mb={1}>
                            End Date
                          </Typography>
                          <DatePicker
                            value={selectedDateRange[1]}
                            onChange={(newValue) => handleDateRangeChange(1, newValue)}
                            minDate={selectedDateRange[0]}
                            sx={{
                              width: '100%',
                              '& .MuiInputBase-root': {
                                color: '#fff',
                                backgroundColor: '#444',
                              },
                              '& .MuiPickersDay-root': {
                                color: '#fff',
                                '&.Mui-selected': {
                                  backgroundColor: '#CEFBE2',
                                  color: '#121212',
                                },
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button 
                          onClick={handleApplyCustomRange}
                          sx={{
                            backgroundColor: '#CEFBE2',
                            color: '#121212',
                            '&:hover': {
                              backgroundColor: '#a0d8b8',
                            },
                            borderRadius: '8px',
                            padding: '6px 16px',
                          }}
                        >
                          Apply
                        </Button>
                      </Box>
                    </Box>
                  )}
                </LocalizationProvider>
              </Popover>
              
              <Box>
                {/* Static tabs - with one continuous underline */}
                <Box sx={{ position: 'relative', mb: 3, mt: 2 }}>
                  {/* Single continuous line under all tabs */}
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      bottom: -5,
                      left: 0,
                      width: '100%',
                      height: '1px',
                      backgroundColor: "#888"
                    }} 
                  />
                </Box>
              </Box>
              
              {/* Display selected date below the line at the far left */}
              <Box mt={8} display="flex" justifyContent="flex-start">
                <Typography variant="h2" color="#8B8B8B" fontWeight={'bold'}>
                   {formatSelectedDate()}
                </Typography>
                {error && (
                  <Typography variant="h5" color="error" ml={2}>
                    Error: {error}
                  </Typography>
                )}
              </Box>

              {/* Main grid container for top section */}
              <Grid container spacing={2} mt={2}>
                {/* Left side - Metric boxes in 2x2 grid */}
                <Grid item xs={12} md={3}>
                  <Grid container spacing={2}>
                    {/* First row of metric boxes */}
                    <Grid item xs={6}>
                      <StatBox 
                        title="Avg Temp" 
                        value={loading ? "Loading..." : error ? "N/A" : `${dailyAverage.temperature}°C`} 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <StatBox 
                        title="Avg pH" 
                        value={loading ? "Loading..." : error ? "N/A" : dailyAverage.ph} 
                      />
                    </Grid>
                    {/* Second row of metric boxes */}
                    <Grid item xs={6}>
                      <StatBox 
                        title="Avg EC" 
                        value={loading ? "Loading..." : error ? "N/A" : dailyAverage.ec} 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <StatBox 
                        title="Avg Humidity" 
                        value={loading ? "Loading..." : error ? "N/A" : `${dailyAverage.humidity}%`} 
                      />
                    </Grid>

                    {/* Alerts Box */}
                    <Grid item xs={12}>
                      <Box
                        bgcolor="#4F4F4F"
                        p={2}
                        borderRadius="10px"
                        height="220px"
                        sx={{
                          overflowY: "auto",
                        }}
                      >
                        <Typography
                          variant="h5"
                          color="white"
                          mb={2}
                          sx={{ textAlign: "left" }}
                        >
                          Alerts
                        </Typography>

                        {loading ? (
                          <Typography variant="body2" color="white" sx={{ textAlign: "left" }}>
                            Loading alerts...
                          </Typography>
                        ) : !alertsData || alertsData.length === 0 ? (
                          <Typography variant="body2" color="white" sx={{ textAlign: "left" }}>
                            No alerts found for this period.
                          </Typography>
                        ) : (
                          alertsData.map((dayData, dayIndex) => (
                            <Box key={dayIndex} mb={2}>
                              <Typography
                                variant="body2"
                                color="white"
                                sx={{ textAlign: "left", fontWeight: "bold" }}
                              >
                                Date: {dayData.day || "Unknown"}
                              </Typography>
                              
                              {dayData.actions && Array.isArray(dayData.actions) && dayData.actions.length > 0 ? (
                                dayData.actions.map((action, actionIndex) => (
                                  <Box key={actionIndex} ml={2} mt={1}>
                                    <Typography
                                      variant="body2"
                                      color="white"
                                      sx={{ textAlign: "left" }}
                                    >
                                   {action.time || ""} {action.type || action.message || JSON.stringify(action)}
                                    </Typography>
                                  </Box>
                                ))
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="white"
                                  sx={{ textAlign: "left", ml: 2 }}
                                >
                                  No alerts for this day.
                                </Typography>
                              )}
                            </Box>
                          ))
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                
                {/* Right side - Charts */}
                <Grid item xs={12} md={9}>
                  <Grid container spacing={2}>
                    {/* Top row charts */}
                    <Grid item xs={12} md={6}>
                      {/* Humidity Chart */}
                      <Box bgcolor="#1e1e1e" p={2} borderRadius="10px" height="220px">
                        <Box display="flex" justifyContent="flex-end" mb={1}>
                          <Typography variant="body2" color="#8B8B8B">
                            • Humidity
                          </Typography>
                        </Box>
                        <ResponsiveContainer width="100%" height="85%">
                          <LineChart data={loading || error ? [] : humidityData}>
                            <XAxis dataKey="day" stroke="#8B8B8B" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#8B8B8B" fontSize={10} tickLine={false} axisLine={false} />
                            <Line type="monotone" dataKey="value" stroke="#4AE290" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      {/* pH Chart */}
                      <Box bgcolor="#1e1e1e" p={2} borderRadius="10px" height="220px">
                        <Box display="flex" justifyContent="flex-end" mb={1}>
                          <Typography variant="body2" color="#8B8B8B">
                            • pH
                          </Typography>
                        </Box>
                        <ResponsiveContainer width="100%" height="85%">
                          <LineChart data={loading ? [] : phData}>
                            <XAxis dataKey="day" stroke="#8B8B8B" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#8B8B8B" fontSize={10} tickLine={false} axisLine={false} domain={[3, 6]} />
                            <Line type="monotone" dataKey="value" stroke="#59C2E6" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </Grid>
                    
                    {/* Bottom row charts */}
                    <Grid item xs={12} md={6}>
                      {/* Temperature Chart */}
                      <Box bgcolor="#1e1e1e" p={2} borderRadius="10px" height="220px">
                        <Box display="flex" justifyContent="flex-end" mb={1}>
                          <Typography variant="body2" color="#8B8B8B">
                            • Temp
                          </Typography>
                        </Box>
                        <ResponsiveContainer width="100%" height="85%">
                          <LineChart data={loading ? [] : tempData}>
                            <XAxis dataKey="day" stroke="#8B8B8B" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#8B8B8B" fontSize={10} tickLine={false} axisLine={false} domain={[15, 25]} />
                            <Line type="monotone" dataKey="value" stroke="#FF4D6D" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      {/* EC Chart */}
                      <Box bgcolor="#1e1e1e" p={2} borderRadius="10px" height="220px">
                        <Box display="flex" justifyContent="flex-end" mb={1}>
                          <Typography variant="body2" color="#8B8B8B">
                            • EC
                          </Typography>
                        </Box>
                        <ResponsiveContainer width="100%" height="85%">
                          <LineChart data={loading ? [] : ecData}>
                            <XAxis dataKey="day" stroke="#8B8B8B" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#8B8B8B" fontSize={10} tickLine={false} axisLine={false} domain={[0.4, 1.4]} />
                            <Line type="monotone" dataKey="value" stroke="#FFD166" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                
              </Grid>
             
              
              {/* Nutrients Row */}
              <Grid container spacing={2} mt={2}>
                <Grid item xs={6} sm={4} md={2}>
                  <NutrientBox 
                    element="Fe" 
                    value={nutrientsData.nutrients?.elements?.iron?.optimal || "0.7"} 
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <NutrientBox 
                    element="Ca" 
                    value={nutrientsData.nutrients?.elements?.calcium?.optimal || "0.8"} 
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <NutrientBox 
                    element="Mg" 
                    value={nutrientsData.nutrients?.elements?.magnesium?.optimal || "0.24"} 
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <NutrientBox 
                    element="B" 
                    value={nutrientsData.nutrients?.elements?.boron?.optimal || "0.64"} 
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <NutrientBox 
                    element="Zn" 
                    value={nutrientsData.nutrients?.elements?.zinc?.optimal || "0.9"} 
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <NutrientBox 
                    element="NPK" 
                    value={nutrientsData.nutrients?.npk || "1:2:3"} 
                  />
                </Grid>
              </Grid>
              
            
              {/* Action Buttons */}
              <Box display="flex" justifyContent="flex-end" mt={5} gap={8}>
                <Button
                  sx={{
                    backgroundColor: "#333",
                    color: "#CEFBE2",
                    fontWeight:'bold',
                    fontSize:18,
                    borderRadius: "30px",
                    padding: "8px 40px",
                    '&:hover': {
                      backgroundColor: "#444",
                    }
                  }}
                >
                  SAVE
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#333",
                    color: "#CEFBE2",
                    fontWeight:'bold',
                    fontSize:18,
                    borderRadius: "30px",
                    padding: "8px 40px",
                    '&:hover': {
                      backgroundColor: "#444",
                    }
                  }}
                >
                  Print
                </Button>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Report;