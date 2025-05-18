import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import images from "../../constants/images";
import { getUserData } from "../../constants/api";
const UserProfileModal = ({ open, onClose }) => {


  const [user, setUser] = useState(null);

   useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    console.log("User State:", user);
    setUser(JSON.parse(storedUser));
    // User State: Object company_name : "Edan" email : "eden111055@gmail.com" name : "Edan Edan" phone : "eden111055@gmail.com" user_name : "Edan Edan_11" }
      }, []); 
      
      const userInfo = [
        { icon: images.usericon3, text: user?.name },
        { icon: images.mail_icon, text: user?.email },
        { icon: images.call_back, text: user?.phone },
      ];
    

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // padding: "20px",
          width: "90%",
          maxWidth: "800px",
          bgcolor: "#1F1F1F",
          color: "#CEFBE2",
          boxShadow: 24,
          borderRadius: "30px",
          textAlign: "left",
          maxHeight: "200vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          zIndex: 9999,
          position: "relative",
        }}
      >
        {/* زر الإغلاق */}
        {/* <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10, color: "#CEFBE2" }}
        >
          <CloseIcon />
        </IconButton> */}

        {/* الصورة العلوية */}
        <Box
          sx={{
            width: "100%",
            height: "150px",
            // borderRadius: "10px 10px 0 0",
            position: "relative",
            overflow: "hidden",
            // background: "#000",
          }}
        >
          <img
            src={images.Union}
            alt="Banner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* صورة البروفايل */}
          <Box
            sx={{
              width: "100px",
              height: "100px",
              // borderRadius: "50%",
              overflow: "hidden",
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              // border: "5px solid #1A1A1A",
              // background: "#000", 
            }}
          >
            <img
              src={images.eden_logo_Black}
              alt="User"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>

     
        <Box m={5}>
  <Box
    sx={{
      display: "flex",
      gap: "70px",
      justifyContent: "center",
      flexWrap: "wrap"
    }}
  >
    {/* First 3 boxes */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: "40px", width: "45%" }}>
    {userInfo.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              background: "#575757",
              padding: "15px 10px",
              borderRadius: "10px",
              width: "320px",
            }}
          >
            <img src={item.icon} alt="icon" style={{ width: 20, height: 20, marginRight: 10 }} />
            <Typography variant="h5" color="#CEFBE2">{item.text}</Typography>
          </Box>
        ))}
    </Box>

    <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" , width: "45%" }}>

    {/* Plan Box */}
    <Box
      sx={{
        background: "#575757",
        padding: "15px",
        borderRadius: "10px",
        minWidth: "250px",
        height: "fit-content"
      }}
    >
      <Typography color="#CEFBE2" fontWeight="bold">
        Plan
      </Typography>
      <Box display="flex" justifyContent="space-between" mt="2px">
      <Typography variant="h4" fontWeight="bold" color="#3F3F3F">Eden Essentials</Typography>
      <Typography color="#CEFBE2" fontWeight="bold">
        USD 49/y
      </Typography>
      </Box>
      <Typography sx={{fontSize: "12px"}} color="#CEFBE2" fontWeight="bold">
      Due date: 05/02/2025
      </Typography>
    </Box>

    {/* Payment Method Box */}
    <Box
      sx={{
        background: "#575757",
        padding: "15px",
        borderRadius: "10px",
        minWidth: "250px",
        height: "fit-content"
      }}
    >
      <Typography color="#CEFBE2" fontWeight="bold">
        Payment Method
      </Typography>
      <Box display="flex" justifyContent="space-between" mt="2px" alignItems={"center"}>
      <Typography variant="h4" fontWeight="bold" color="#3F3F3F">Credit Card</Typography>
      <Button
        // variant="contained"
        sx={{ background: "#CEFBE2", color: "black", borderRadius: "30px", padding: "5px 10px" }}
      >
        Manage Subscriptions
      </Button>
      </Box>
      <Typography sx={{fontSize: "12px"}} color="#CEFBE2" fontWeight="bold">
      Due date: 05/02/2025
      </Typography>
    </Box>
      </Box>

  </Box>
</Box>

      </Box>
    </Modal>
  );
};

export default UserProfileModal;
