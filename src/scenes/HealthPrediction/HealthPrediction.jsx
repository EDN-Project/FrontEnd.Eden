import { useState } from "react";
import { Box, Typography, useTheme ,Button} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
// import './HealthPrediction.css';
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import images from "../../constants/images";


const HealthPrediction = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);


  const [uploadedImage, setUploadedImage] = useState(null);
  
  // Mock plant health data (in a real app, this would come from an API)
  const [plantHealth, setPlantHealth] = useState(null);
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        // Mock plant analysis results
        setPlantHealth({
          status: "Healthy",
          issues: ["Slight leaf discoloration"],
          recommendations: [
            "Water every 2-3 days", 
            "Add nitrogen-rich fertilizer", 
            "Ensure adequate sunlight"
          ]
        });
      };
      reader.readAsDataURL(file);
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
            <Box m="20px">
              <Box>
                <Typography
                  variant="h1"
                  color={'#CEFBE2'}
                  fontWeight="bold"
                  align='left'
                  sx={{ m: "0 0 5px 0" }}
                >
                  Health Prediction
                </Typography>
              </Box>
<Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "24px" ,marginTop: "-34px"}}>
  {!uploadedImage ? (
    // Upload Photo View - Centered
    <Box
      sx={{
        backgroundColor: "#2d2d2d",
        borderRadius: "10px",
        padding: "32px",
        width: "730px",
        height: "350px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Box>
            <img src={images.cameraIcon} alt="cameraIcon" style={{ width: 50, height: 50 }} />
          </Box>
          <Typography variant="h3" mt={2} fontWeight={'bold'} color="#CEFBE2">Upload Photo</Typography>
        </Box>
        <input 
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </label>
    </Box>
  ) : (
    // Results View - Full Width Layout
    <Box sx={{ width: "100%", maxWidth: "1300px", display: "flex", flexDirection: "column", gap: "16px" }}>
      
      {/* Image Box */}
      <Box sx={{ backgroundColor: "#2d2d2d", borderRadius: "10px", overflow: "hidden" }}>
        <img 
          src={uploadedImage} 
          alt="Uploaded plant" 
          style={{ width: "100%", height: "260px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "/api/placeholder/400/320";
          }}
        />
      </Box>
      
      {/* Results Box */}
      <Box sx={{ backgroundColor: "#2d2d2d", borderRadius: "10px", padding: "24px" ,textAlign: "left" }}>
        <Typography variant="h3" fontWeight={'bold'} color="#CEFBE2" mb={2}>Plant Health</Typography>
        <Box mb={3}>
          <Box
            sx={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "999px",
              backgroundColor: plantHealth?.status === "Healthy" ? "green" : "red",
              color: "white",
            }}
          >
            {plantHealth?.status}
          </Box>
        </Box>

        {/* {plantHealth?.issues && plantHealth.issues.length > 0 && (
          <Box mb={3}>
            <Typography variant="subtitle1" color="#ccc" mb={1}>Issues Detected:</Typography>
            <ul style={{ paddingLeft: "20px", color: "#aaa" }}>
              {plantHealth.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </Box>
        )} */}

        <Typography variant="h3" fontWeight={'bold'} color="#CEFBE2" mb={2}>Recommendations</Typography>
        <ul style={{ paddingLeft: "20px", color: "#aaa" }}>
          {plantHealth?.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </Box>

      {/* Upload Another Photo Button */}
      <Button
        variant="contained"
        onClick={() => {
          setUploadedImage(null);
          setPlantHealth(null);
        }}
        sx={{
          backgroundColor: "#333",
          ":hover": { backgroundColor: "#aaa" },
          color: "#CEFBE2",
         fontSize:18,
                    borderRadius: "30px",
                    padding: "8px 40px",
          alignSelf: 'center',
          fontWeight: 'bold',
        }}
      >
        Upload Another Photo
      </Button>
    </Box>
  )}
</Box>

             
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default HealthPrediction;
