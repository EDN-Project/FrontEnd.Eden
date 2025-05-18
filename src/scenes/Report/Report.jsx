// StrawberryInsightsTabs.jsx
import { useState } from "react";
import { Box, Typography, useTheme, Accordion, AccordionSummary, AccordionDetails, Grid, Button, Popover, Paper } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import images from "../../constants/images";
import { DatePicker, DateRangePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


// Sample data for charts
const humidityData = [
  { day: '01', value: 60 },
  { day: '03', value: 62 },
  { day: '05', value: 64 },
  { day: '07', value: 63 },
  { day: '09', value: 65 },
  { day: '11', value: 70 },
  { day: '13', value: 110 },
  { day: '15', value: 80 },
  { day: '17', value: 115 },
  { day: '19', value: 90 },
  { day: '21', value: 95 },
  { day: '23', value: 135 },
  { day: '25', value: 110 },
  { day: '27', value: 180 },
  { day: '29', value: 200 },
];

const phData = [
  { day: '01', value: 5.8 },
  { day: '03', value: 5.6 },
  { day: '05', value: 5.5 },
  { day: '07', value: 5.7 },
  { day: '09', value: 5.6 },
  { day: '11', value: 4.8 },
  { day: '13', value: 3.6 },
  { day: '15', value: 4.5 },
  { day: '17', value: 5.1 },
  { day: '19', value: 5.3 },
  { day: '21', value: 5.4 },
  { day: '23', value: 5.5 },
  { day: '25', value: 5.6 },
  { day: '27', value: 5.5 },
  { day: '29', value: 5.4 },
];

const tempData = [
  { day: '01', value: 20 },
  { day: '03', value: 21 },
  { day: '05', value: 19 },
  { day: '07', value: 22 },
  { day: '09', value: 23 },
  { day: '11', value: 24 },
  { day: '13', value: 22 },
  { day: '15', value: 21 },
  { day: '17', value: 23 },
  { day: '19', value: 22 },
  { day: '21', value: 20 },
  { day: '23', value: 23 },
  { day: '25', value: 21 },
  { day: '27', value: 20 },
  { day: '29', value: 22 },
];

const ecData = [
  { day: '01', value: 0.7 },
  { day: '03', value: 0.9 },
  { day: '05', value: 1.1 },
  { day: '07', value: 0.8 },
  { day: '09', value: 0.7 },
  { day: '11', value: 1.0 },
  { day: '13', value: 1.2 },
  { day: '15', value: 0.9 },
  { day: '17', value: 0.8 },
  { day: '19', value: 0.9 },
  { day: '21', value: 1.1 },
  { day: '23', value: 0.9 },
  { day: '25', value: 1.2 },
  { day: '27', value: 1.0 },
  { day: '29', value: 0.8 },
];


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

const NutrientBox = ({ element, value }) => (
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
      {value}
    </Typography>
    <Typography variant="body2" fontWeight="bold" color="#8B8B8B">
      {element}
    </Typography>
  </Box>
);

const Report = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [activeFilter, setActiveFilter] = useState('day'); // 'day', 'month', or 'year'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]);


  const handleFilterClick = (filter, event) => {
    setActiveFilter(filter);
    setAnchorEl(event.currentTarget);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    
    switch (activeFilter) {
      case 'day':
        return format(selectedDate, 'dd/MM/yyyy');
      case 'month':
        return format(selectedDate, 'MMMM yyyy');
      case 'year':
        return format(selectedDate, 'yyyy');
      default:
        return format(selectedDate, 'dd/MM/yyyy');
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
                      onClick={(e) => handleFilterClick('year', e)}
                      sx={{
                        backgroundColor: activeFilter === 'year' ? '#CEFBE2' : '#333',
                        color: activeFilter === 'year' ? '#121212' : '#fff',
                        '&:hover': {
                          backgroundColor: activeFilter === 'year' ? '#CEFBE2' : '#444',
                        },
                        borderRadius: '8px',
                        padding: '8px 16px',
                      }}
                    >
                      Year
                    </Button>
                  </Box>
                </Box>
              </Box>
              
              {/* Date picker popup */}
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
                  }
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    views={
                      activeFilter === 'day' 
                        ? ['day', 'month', 'year'] 
                        : activeFilter === 'month' 
                          ? ['month', 'year'] 
                          : ['year']
                    }
                    sx={{
                      '& .MuiPickersDay-root': {
                        color: '#fff',
                        '&.Mui-selected': {
                          backgroundColor: '#CEFBE2',
                          color: '#121212',
                        },
                      },
                    }}
                  />
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
              </Box>

              {/* Main grid container for top section */}
              <Grid container spacing={2} mt={2}>
                {/* Left side - Metric boxes in 2x2 grid */}
                <Grid item xs={12} md={3}>
  <Grid container spacing={2}>
    {/* First row of metric boxes */}
    <Grid item xs={6}>
      <StatBox title="Avg Temp" value="20°C" />
    </Grid>
    <Grid item xs={6}>
      <StatBox title="Avg pH" value="5.5" />
    </Grid>
    {/* Second row of metric boxes */}
    <Grid item xs={6}>
      <StatBox title="Avg EC" value="0.8 → 1.2" />
    </Grid>
    <Grid item xs={6}>
      <StatBox title="Avg Humidity" value="65%" />
    </Grid>

    {/* latest updates Box */}
    <Grid item xs={12}>
      <Box bgcolor="#4F4F4F" p={2} borderRadius="10px" height="220px">
        <Typography variant="h5" color="white" mb={2}>
          latest updates
        </Typography>

        <Box mt={1} display="flex" alignItems="center">
          <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="white">
            Sensor
          </Typography>
        </Box>

      
        <Box mt={1} display="flex" alignItems="center">
         <CancelIcon color="error" fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="white">
           software updates
          </Typography>
        </Box>

        <Box mt={1} display="flex" alignItems="center">
          <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="white">
            Check connectivity
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="h4" fontWeight={'bold'} color="#8B8B8B">
            Issues Found:
          </Typography>
          <Typography variant="h5" color="white" mt={1}>
            Need Backup and Update
          </Typography>
        </Box>
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
                          <LineChart data={humidityData}>
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
                          <LineChart data={phData}>
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
                          <LineChart data={tempData}>
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
                          <LineChart data={ecData}>
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
                  <NutrientBox element="Fe" value="0.7" />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <NutrientBox element="Ca" value="0.8" />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <NutrientBox element="Mg" value="0.24" />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <NutrientBox element="B" value="0.64" />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <NutrientBox element="Zn" value="0.9" />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <NutrientBox element="NPK" value="1:2:3" />
                </Grid>
              </Grid>
              
              {/* Recommendations and Yield Row */}
              {/* <Grid container spacing={2} mt={2}>
               
                <Grid item xs={12} md={6}>
  <Box bgcolor="#4F4F4F" p={3} height="220px" borderRadius="10px" textAlign="left">
    <Typography variant="h5" color="#B1B1B1" fontWeight={'bold'} mb={2}>
      Recommendations
    </Typography>
    <Typography variant="body1" color="#CEFBE2" mb={1}>
      - Adjust lighting spectrum to include red and blue wavelengths to promote photosynthesis and faster growth.
    </Typography>
    <Typography variant="body1" color="#CEFBE2" mb={1}>
      - Maintain relative humidity between 60% and 75% to reduce plant stress and improve productivity.
    </Typography>
    <Typography variant="body1" color="#CEFBE2" mb={1}>
      - Optimize nutrient solution composition and monitor pH levels regularly for better nutrient uptake.
    </Typography>
  </Box>
</Grid>

                
               
                <Grid item xs={12} md={6} >
                  <Box height={'220px'} bgcolor="#4F4F4F" p={3} borderRadius="10px" textAlign="left">
                    <Typography variant="h5" color="#B1B1B1" fontWeight={'bold'} mb={2}>
                      Yield Summary
                    </Typography>
                    <Typography variant="body1" color="#CEFBE2" mb={1}>
                      Estimated total yield this month:
                    </Typography>
                    <Typography variant="body1" color="#CEFBE2" mb={2}>
                      42 kg of Strawberry (+8% from last month)
                    </Typography>
                    <Typography variant="body1" color="#CEFBE2" mb={1}>
                      Harvested:
                    </Typography>
                    <Typography variant="body1" color="#CEFBE2" mb={0.5}>
                      Strawberry Albion - 15 kg
                    </Typography>
                    <Typography variant="body1" color="#CEFBE2">
                      Strawberry Sabrina - 7 kg
                    </Typography>
                  </Box>
                </Grid>
              </Grid> */}
              
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