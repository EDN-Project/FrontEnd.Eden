import { Box, Modal, Typography, IconButton, Switch, TextField, MenuItem,Button,InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import images from "../../constants/images";
const SettingsModal = ({ open, onClose }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [contrastMode, setContrastMode] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(false);
  const [activeSession, setActiveSession] = useState("Devices");
  const [fontSize, setFontSize] = useState("Size");

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "#1F1F1F",
          color: "#CEFBE2",
          boxShadow: 24,
          p: 3,
          borderRadius: "10px",
          textAlign: "left",
          maxHeight: "80vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <img style={{ width: 20, height: 20, marginRight: 5 }} src={images.setting} alt="Settings" />
          <Typography  variant="h3" fontWeight="bold"> Setting</Typography>
</Box>
          <IconButton onClick={onClose} sx={{ color: "#CEFBE2" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <hr style={{ margin: "10px 0", color: "#rgba(255, 255, 255, 0.2)" }} />


        {/* General Settings */}
        <Typography variant="h4" mt={2}>General</Typography>
        <Box 
        ml={3}
        >
        <Typography variant="h5" mt={1}>Theme</Typography>

        <Box mt={1} display="flex" alignItems="center" gap={1}>
          <Typography variant="body1" color='#8B8B8B'>Dark</Typography>
        <Switch 
        sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#FFF", 
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#000", 
            },
            "& .MuiSwitch-track": {
              backgroundColor: "#ccc",  
            },
          }}
        checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <Typography variant="body1" color='#8B8B8B'>ligt</Typography>

        </Box>

        <Typography variant="h5" mt={3}>Date & Time</Typography>
        <Box  mt={1} display="flex" gap={1}>
        <Box  display="flex" alignItems="center" gap={1}>
        <Typography variant="body1" color='#8B8B8B'>Set Date</Typography>
          <TextField size="small" placeholder="MM/DD/YY" fullWidth  sx={{ bgcolor: "#575757" , borderRadius: "5px" }} />
        <Typography variant="body1" color='#8B8B8B'>Set Time</Typography>

        </Box>
          <TextField size="small" placeholder="00:00" sx={{ bgcolor: "#575757",borderRadius: "5px" }} />
        </Box>
        </Box>
        {/* Accessibility */}
        <Typography variant="h4" mt={2}>Accessibility</Typography>
        <Box 
        ml={2}
        >

        <Typography variant="h5" mt={1} >Font Size</Typography>

        <Box mt={2}  display="flex" alignItems="center" gap={1}>
        <Typography variant="body1" color='#8B8B8B'>Font Size</Typography>

        <TextField
          select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          size="small"
          sx={{ bgcolor: "#575757", width: "100px" ,borderRadius: "5px" }}
        >

          <MenuItem value="Small">Small</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Large">Large</MenuItem>
        </TextField>
        </Box>
        <Typography variant="h5" mt={3}>High Contrast Mode</Typography>
        <Box  display="flex" alignItems="center" gap={1}>
        <Typography variant="body1" color='#8B8B8B'>Off</Typography>
        <Switch
         sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#FFF", 
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#000", 
            },
            "& .MuiSwitch-track": {
              backgroundColor: "#ccc",  
            },
          }}
        checked={contrastMode} onChange={() => setContrastMode(!contrastMode)} />
        <Typography variant="body1" color='#8B8B8B'>On</Typography>
       
        </Box>

        </Box>

        {/* Login Activity */}
        <Typography variant="h4" mt={2}>Login Activity</Typography>
        <Box 
        ml={2}
        >
        <Typography variant="h5" mt={1}>Active Sessions</Typography>
        <TextField
          select
          value={activeSession}
          onChange={(e) => setActiveSession(e.target.value)}
          size="small"
          sx={{ bgcolor: "#575757", width: "100px" ,borderRadius: "5px"}}
        >
          <MenuItem value="Devices">Devices</MenuItem>
          <MenuItem value="Sessions">Sessions</MenuItem>
        </TextField>
        
        <Typography variant="h5" mt={3}>Security Alerts</Typography>
        <Box  display="flex" alignItems="center" gap={1}>
        <Typography variant="body1" color='#8B8B8B'>Off</Typography>
        <Switch 
         sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#FFF", 
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#000", 
            },
            "& .MuiSwitch-track": {
              backgroundColor: "#ccc",  
            },
          }}
        checked={securityAlerts} onChange={() => setSecurityAlerts(!securityAlerts)} />
        <Typography variant="body1" color='#8B8B8B'>On</Typography>

</Box>
</Box>

        {/* Data & Feedback */}
        <Typography variant="h4" mt={2}>Data & Feedback</Typography>
        <Box 
        ml={2}
        >

        <Typography variant="h5" mt={1}> Data Sharing</Typography>
        <Box  display="flex" alignItems="center" gap={1}>
        <Typography variant="body1" color='#8B8B8B'>Off</Typography>

        <Switch 
         sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#FFF", 
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#000", 
            },
            "& .MuiSwitch-track": {
              backgroundColor: "#ccc",  
            },
          }}
        checked={dataSharing} onChange={() => setDataSharing(!dataSharing)} />
        {/* <Typography variant="h5" mt={2}>Submit Feedback</Typography>
        <TextField  placeholder="Message" fullWidth sx={{ bgcolor: "#575757",borderRadius: "5px", marginTop: "10px" }} /> */}
        <Typography variant="body1" color='#8B8B8B'>On</Typography>

</Box>
<Box>
      <Typography variant="h5" mt={2} sx={{ color: "#CEFBE2" }}>
        Submit Feedback
      </Typography>
      <TextField
        placeholder="Message"
        fullWidth
        sx={{
        marginTop: "10px",  
          bgcolor: "#575757",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            paddingRight: 0, // إزالة الحشو الزائد
            borderRadius: "8px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                sx={{
                 marginRight: "10px",
                  bgcolor: "#CEFBE2",
                  color: "#3F3F3F",
                  borderRadius: "15px",
                  padding: "5px 15px",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#B8E6C1" }, // تأثير hover
                }}
                onClick={() => alert("Message Sent!")}
              >
                Send
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>

      </Box>
      </Box>

    </Modal>
  );
};

export default SettingsModal;
