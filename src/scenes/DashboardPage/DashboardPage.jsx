import { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
// import './DashboardPage.css';
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

const DashboardPage = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ backgroundColor: "#121212", minHeight: '100vh' }}>
          <Sidebar isSidebar={isSidebar} />
          <main className="content" style={{ backgroundColor: "#121212" }}>
            <Topbar setIsSidebar={setIsSidebar} />
            <Box m="20px">
              <Box>
                <Typography
                  variant="h1"
                  color={'#CEFBE2'}
                  fontWeight="bold"
                  align='left'
                  sx={{ m: "0 0 5px 0" }}
                >
                  Dashboard
                </Typography>
                
              </Box>

              <Box 
                mt='30px' 
                display="flex" 
                gap="20px"
                sx={{ flexWrap: { xs: 'wrap', lg: 'nowrap' } }}
              >
                {/* Left Side (Weather and Metrics) */}
                <Box 
                  flex="3" 
                  display="flex" 
                  flexDirection="column" 
                  gap="20px"
                >
                  {/* Weather Box */}
                  <Box
                    backgroundColor={'#1b1b1b'}
                    borderRadius="20px"
                    padding="25px"
                    height="250px"
                    // width="95%"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Typography variant="h2" color="#FFFFFF" fontWeight="bold" mb="15px" textAlign="left">
                      Cairo, Egypt
                    </Typography>
                    <Typography variant="h3" color="#CEFBE2" fontWeight="bold" textAlign="left">
                      34°C
                    </Typography>
                    <Typography color="#FFFFFF" fontSize="20px" mt="25px" textAlign="left">
                      Sunny
                    </Typography>
                    <Typography fontSize="20px" color="#FFFFFF" mt="10px" textAlign="left">
                      H: 36°C &nbsp;&nbsp; L: 22°C
                    </Typography>
                  </Box>

                  {/* Metrics Grid */}
                  <Box
                    display="grid"
                    gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                    gap="25px"
                  >
                    {/* Plant Health */}
                    <Box
                      backgroundColor={'#282828'}
                      borderRadius="15px"
                      padding="20px"
                      height="180px"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Typography variant="h2" fontWeight="bold"  color="#8B8B8B" mb="10px" textAlign="left" width="100%">
                        Plant Health
                      </Typography>
                      <Typography variant="h2" color="#CEFBE2" fontWeight="bold" textAlign="left" width="100%">
                        96%
                      </Typography>
                      <Typography color="#575757" fontSize="18px" fontWeight="bold" mt="15px" textAlign="left" width="100%">
                        Your Plant is showing an excellent health
                      </Typography>
                    </Box>

                    {/* salts*/}
                    <Box
                      backgroundColor={'#282828'}
                      borderRadius="15px"
                      padding="20px"
                      height="180px"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Typography variant="h2" fontWeight="bold" color="#8B8B8B" mb="10px" textAlign="left" width="100%">
                        Wind
                      </Typography>
                      <Box display="flex" alignItems="baseline" justifyContent="flex-start" width="100%">
                        <Typography variant="h2" color="#CEFBE2" fontWeight="bold">
                          2
                        </Typography>
                        <Typography color="#575757" ml="5px">m/s</Typography>
                      </Box>
                      <Typography color="#575757" fontSize="18px" fontWeight="bold" mt="15px" textAlign="left" width="100%">
                        Make Sure There is Still Airflow
                      </Typography>
                    </Box>

                    {/* Humidity */}
                    <Box
                      backgroundColor={'#282828'}
                      borderRadius="15px"
                      padding="20px"
                      height="180px"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Typography variant="h2" fontWeight="bold" color="#8B8B8B" mb="10px" textAlign="left" width="100%">
                        Humidity
                      </Typography>
                      <Typography variant="h2" color="#CEFBE2" fontWeight="bold" textAlign="left" width="100%">
                        86%
                      </Typography>
                      <Typography color="#575757" fontSize="18px" fontWeight="bold" mt="15px" textAlign="left" width="100%">
                        Ensure Moisture is sufficient to prevent disease
                      </Typography>
                    </Box>

                    {/* EC */}
                    <Box
                      backgroundColor={'#282828'}
                      borderRadius="15px"
                      padding="20px"
                      height="180px"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Typography variant="h2" fontWeight="bold" color="#8B8B8B" mb="10px" textAlign="left" width="100%">
                        EC
                      </Typography>
                      <Typography variant="h2" color="#CEFBE2" fontWeight="bold" textAlign="left" width="100%">
                        0.8 → 1.2
                      </Typography>
                      <Typography color="#575757" fontSize="18px" fontWeight="bold" mt="15px" textAlign="left" width="100%">
                        Maintain Electrical Conductivity
                      </Typography>
                    </Box>

                    {/* pH Level */}
                    <Box
                      backgroundColor={'#282828'}
                      borderRadius="15px"
                      padding="20px"
                      height="180px"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Typography variant="h2" fontWeight="bold" color="#8B8B8B" mb="10px" textAlign="left" width="100%">
                        pH Level
                      </Typography>
                      <Typography variant="h2" color="#CEFBE2" fontWeight="bold" textAlign="left" width="100%">
                        5.5
                      </Typography>
                      <Typography color="#575757" fontSize="18px" fontWeight="bold" mt="15px" textAlign="left" width="100%">
                        Add Acidic Compost to balance the pH
                      </Typography>
                    </Box>

                    {/* Temperature */}
                    <Box
                      backgroundColor={'#282828'}
                      borderRadius="15px"
                      padding="20px"
                      height="180px"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Typography variant="h2" fontWeight="bold" color="#8B8B8B" mb="10px" textAlign="left" width="100%">
                        Temperature
                      </Typography>
                      <Typography variant="h2" color="#CEFBE2" fontWeight="bold" textAlign="left" width="100%">
                        20 °C 
                      </Typography>
                      <Typography color="#575757" fontSize="18px" fontWeight="bold" mt="15px" textAlign="left" width="100%">
                        Stay Consistent between 17°C and 22°C
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Right Side (Recommendations, Alerts, Light intensity) */}
                <Box flex="1" display="flex" flexDirection="column" gap="20px">
                  {/* Recommendations */}
                  <Box
                    backgroundColor={'#282828'}
                    borderRadius="15px"
                    padding="20px"
                    minHeight="320px"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Typography variant="h3" color="#CEFBE2" fontWeight="bold" mb="15px" textAlign="left">
                      Recommendations
                    </Typography>
                    <Box>
                      <Box sx={{ mb: '15px' }}>
                        <Typography color="#FFFFFF" variant="h5" mb="5px" textAlign="left">
                          Crop Yield Prediction
                        </Typography>
                        <Typography color="#8B8B8B" fontSize="14px" textAlign="left">
                          AI estimates your basil crop will be ready for harvest in 4 days. Prepare harvesting resources.
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="#FFFFFF" variant="h5" mb="5px" textAlign="left">
                          Light Cycle Suggestion
                        </Typography>
                        <Typography color="#8B8B8B" fontSize="14px" textAlign="left">
                          Based on current growth data, try extending grow light exposure by 1 hour for tomatoes.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Alerts */}
                  <Box
                    backgroundColor={'#282828'}
                    borderRadius="15px"
                    padding="20px"
                    minHeight="320px"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Typography variant="h3" color="#CEFBE2" fontWeight="bold" mb="15px" textAlign="left">
                      Alerts
                    </Typography>
                    <Box>
                      <Box sx={{ mb: '15px' }}>
                        <Typography color="#FFFFFF" variant="h5" mb="5px" textAlign="left">
                          Temperature Too High!
                        </Typography>
                        <Typography color="#8B8B8B" fontSize="14px" textAlign="left">
                          Warning: Greenhouse temperature has exceeded 30°C. Check cooling system immediately.
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="#FFFFFF" variant="h5" mb="5px" textAlign="left">
                          Sensor Disconnected
                        </Typography>
                        <Typography color="#8B8B8B" fontSize="14px" textAlign="left">
                          Sensor #4 not responding. Last signal received 10 minutes ago. Check wiring or battery.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Light intensity */}
                  <Box
                    backgroundColor={'#282828'}
                    borderRadius="15px"
                    padding="20px"
                    height="180px"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Typography variant="h3" fontWeight="bold" color="#8B8B8B" mb="10px" textAlign="left" width="100%">
                      Light intensity
                    </Typography>
                    <Typography variant="h3"  color="#CEFBE2" fontWeight="bold" textAlign="left" width="100%">
                      12
                    </Typography>
                    <Typography  variant="h4" fontWeight="bold"  color="#575757" mt="15px" textAlign="left" width="100%">
                      Ensure your plants have enough light
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DashboardPage;
