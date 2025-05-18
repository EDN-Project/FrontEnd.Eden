// StrawberryInsightsTabs.jsx
import { useState } from "react";
import { Box, Typography, useTheme, Accordion, AccordionSummary, AccordionDetails, Grid } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import './CropManagement.css';
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import images from "../../constants/images";
import DoughnutChartStr from "../../components/DoughnutChartStr";
const SectionBox = ({ label, value }) => (
  <Box
    sx={{
      backgroundColor: "#282828",
      borderRadius: "10px",
      padding: "16px",
      width: "100%",
      textAlign: "center",
      height: "95px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Typography variant="h5" mb={1} color="#CEFBE2" fontWeight="bold">
      {value}
    </Typography>
    <Typography variant="body1" color="#888" fontSize="12px">
      {label}
    </Typography>
  </Box>
);

const CustomAccordion = ({ title, icon, children, defaultExpanded = false }) => (
  <Accordion 
    defaultExpanded={defaultExpanded}
    sx={{ 
      marginBottom: "20px",
      // backgroundColor: "#121212",
      // borderRadius: "10px",
      overflow: "hidden",
      // border: "1px solid #2a2a2a",
      '& .MuiAccordionSummary-root': {
        backgroundColor: "#717171",
        // borderTopLeftRadius: "10px",
        // borderTopRightRadius: "10px",
      },
      
    }}
  >
    <AccordionSummary style={{
      borderRadius: "15px",
    }} expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
      <Box sx={{ display: 'flex', alignItems: 'center', color: "#CEFBE2",}}>
        {icon}
        <Typography variant="h4" fontWeight="bold"  >{title}</Typography>
      </Box>
    </AccordionSummary>
    <AccordionDetails sx={{ backgroundColor: "#121212", color: "#CEFBE2",fontWeight: "bold",marginTop: "10px"}}>
      {children}
    </AccordionDetails>
  </Accordion>
);

const CropManagement = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const plantIcon = (
    <img 
      src={images.plantt}
      alt="Crop" 
      width="24" 
      height="24" 
      style={{ marginRight: '8px' }} 
    />
  );

  const aiIcon = (
    <SmartToyIcon sx={{ marginRight: '8px' }} />
  );

  const renderStrawberryInsightsContent = () => (
    <Box sx={{ backgroundColor: "#121212",minHeight: "100vh", padding: "20px" }}>
      <CustomAccordion 
        title="Crop Details"
        icon={plantIcon}
        defaultExpanded
      >
        <Grid container spacing={2}>
                    <Grid item xs={10} md={8}>
            <Box
              sx={{
                backgroundColor: "#1b1b1b",
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                display: "flex",
                // alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box ml={2} mt={3}>
                <Typography marginBottom={2} variant="h3" fontWeight='bold' color="#CEFBE2" textAlign={'left'}>Strawberry</Typography>
                <Typography variant="h4" color="#888">Tip - Water regularly during hot days</Typography>
              </Box>
              <img
                src={images.StrawberryInsights}
                alt="Strawberry"
                style={{ 
                  height: "100%", 
                  width: "30%", 
                  objectFit: "cover",
                  marginRight: "-3px",
                  // marginBottom: "-10px",
                }}
              />
            </Box>
          </Grid>

          
          <Grid item xs={7} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={18} md={6}><SectionBox label="Planting Date" value="15 Sep 2025" /></Grid>
              <Grid item xs={18} md={6}><SectionBox label="Yield Date" value="15 Sep 2025" /></Grid>
              <Grid item xs={18} md={6}><SectionBox label="Harvest Duration" value="15 Sep 2025" /></Grid>
              <Grid item xs={18} md={6}><SectionBox label="Growth Stage" value="Flowering" /></Grid>
            </Grid>
          </Grid>
        </Grid>
      </CustomAccordion>
      
     <CustomAccordion 
  title="Fertilization Plan"
  icon={plantIcon}
>
  <Grid container style={{

  }} spacing={2}>
   
    <Grid item xs={16} md={6}>
      <Grid container spacing={2}>
        <Grid item xs={4} md={6}><SectionBox label="NPK" value="1 : 2 : 3" /></Grid>
        <Grid item xs={4} md={6}><SectionBox label="PH" value="5.5" /></Grid>
        <Grid item xs={4} md={6}><SectionBox label="EC" value="0.8 - 1.2" /></Grid>
        <Grid item xs={4} md={6}><SectionBox label="Temp" value="20°C" /></Grid>
        <Grid item xs={4} md={6}><SectionBox label="Humidity" value="65%" /></Grid>
        <Grid item xs={4} md={6}><SectionBox label="Light Hours" value="12" /></Grid>
      </Grid>
    </Grid>

   
       <Grid item xs={16} md={6}>
            <Box 
        sx={{
          backgroundColor: "#1b1b1b",
          borderRadius: "10px",
          height: "100%",
          minHeight: "250px",
          position: "relative",
          padding: "30px",
          textAlign: "center"
        }}
      >
        <Box sx={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)",
          width: "75%" 
        }}>
          <DoughnutChartStr />
        </Box>
      </Box>

    </Grid>


  </Grid>
    </CustomAccordion>

      
     <CustomAccordion 
  title="Preferences"
  icon={plantIcon}
  defaultExpanded
>
  <Grid container spacing={2}>
 
    <Grid item xs={12} md={6}>
      <SectionBox value="Common Type" label="Festival" />
    </Grid>
    <Grid item xs={6} md={3}>
      <SectionBox value="Taste" label="Very Sweet" />
    </Grid>
    <Grid item xs={6} md={3}>
      <SectionBox value="Size" label="Medium" />
    </Grid>

    <Grid item xs={12} md={3}>
      <SectionBox value="Suger Percentage" label="7 — 9" />
    </Grid>
    <Grid item xs={12} md={3}>
      <SectionBox value="Packaging" label="Small transparent boxes" />
    </Grid>
    <Grid item xs={12} md={3}>
      <SectionBox value="Shelf Life" label="High" />
    </Grid>
    <Grid item xs={12} md={3}>
      <SectionBox value="Color" label="Deep Red" />
    </Grid>
  </Grid>
</CustomAccordion>


      <CustomAccordion 
        title="AI Recommendations"
        icon={plantIcon}
        defaultExpanded
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#1b1b1b",
                borderRadius: "10px",
                padding: "20px",
                height: "100%",
              }}
            >
              <Typography variant="h4" fontWeight="bold"  color="#CEFBE2" mb={2}>
                Recommendations
              </Typography>
              <Box sx={{ color: "#ddd" }}>
                <Typography variant="body1" fontWeight="bold" mb={1}>
                  Leaf Color & Turgidity
                </Typography>
                <Typography variant="body2" color="#aaa" mb={2}>
                  Observation: Slight wilting observed during peak temperature hours.
                </Typography>
                
                <Typography variant="body1" mb={1}>
                  Recommendation: Increase humidity slightly during midday (10-3 PM) to reduce plant stress.
                </Typography>
                
                <Typography variant="body2" color="#aaa" mb={2}>
                  Observation: Growth rate is within expected range.
                </Typography>
                
                <Typography variant="body1" mb={1}>
                  Recommendation: No immediate action required, continue current nutrient schedule.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#1b1b1b",
                borderRadius: "10px",
                padding: "20px",
                height: "100%",
              }}
            >
              <Typography variant="h4" fontWeight="bold"color="#CEFBE2" mb={2}>
                Yield Summary
              </Typography>
              <Box sx={{ color: "#ddd" }}>
                <Typography variant="body1" mb={1}>
                  Estimated total yield: 42 kg of Strawberry (18% from last month)
                </Typography>
                <Typography variant="body1" mb={1}>
                  Varieties breakdown:
                </Typography>
                <Typography variant="body2" mb={0.5} color="#aaa">
                  Strawberry Albion – 15 kg
                </Typography>
                <Typography variant="body2" mb={0.5} color="#aaa">
                  Strawberry Galante – 27 kg
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CustomAccordion>
    </Box>
  );

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
                  Strawberry Insights
                </Typography>
                
                {/* Static tabs - with continuous underline */}
                <Box sx={{ position: 'relative', mb: 3, mt: 2 }}>
                  <Box display="flex" gap={4}>
                    <Typography
                      sx={{ 
                        color: "#CEFBE2",
                        fontWeight: "bold",
                        fontSize: "22px",
                      }} 
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{ 
                        color: "#CEFBE2",
                        fontWeight: "bold",
                        fontSize: "22px",
                      }} 
                    >
                      Fertilization Plan
                    </Typography>
                    <Typography
                      sx={{ 
                        color: "#CEFBE2",
                        fontWeight: "bold",
                        fontSize: "22px",
                      }} 
                    >
                      Preferences
                    </Typography>
                    <Typography
                      sx={{ 
                        color: "#CEFBE2",
                        fontWeight: "bold",
                        fontSize: "22px",
                      }} 
                    >
                      AI Insights
                    </Typography>
                  </Box>
                  
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

              {renderStrawberryInsightsContent()}
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CropManagement;