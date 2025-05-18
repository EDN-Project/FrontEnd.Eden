import React, { useState } from "react";
import { Typography, Button, Select, MenuItem, TextField, InputAdornment, FormControl, Modal, Box, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import images from "../../../constants/images";
// import { Typography, Box, IconButton, Modal, TextField, Button } from "@mui/material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const EditUserModal = ({ isOpen, onClose }) => {
  const [accessLevel, setAccessLevel] = useState("");

    const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [open, setOpen] = useState(false);


   const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    
    // Here you would call your API to update the password
    console.log("Password update data:", passwordData);
    
    // Close the modal
    setShowPasswordModal(false);
    
    // Reset form
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };


  if (!isOpen) return null;

  return (
<div className="modal-overlay-addmodal" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay for better contrast
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div className="modal-container-addmodal" style={{
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)", // Strong shadow for depth
        borderRadius: "15px", // Rounded corners
        overflow: "hidden" // Ensures the shadow respects the border radius
      }}>
      <div className="modal-header-addmodal">

      <button onClick={onClose} className="close-button-addmodal">✖</button>
  
      </div>
        <div className="modal-left-addmodal">
          <Typography 
          sx={{ 
          color: "#FFF",
          fontSize: "25px",
          fontWeight: "bold",
          fontFamily:'poppins',
          textAlign:'left'

           }} variant="h5" className="modal-title-addmodal">Edit Profile</Typography>
          <div className="profile-container-addmodal">
            <div className="profile-image-addmodal">
              <img src={images.addNewuser}  />
              {/* <button className="edit-icon-addmodal">
                <img src={images} />
              </button> */}
            </div>
            <Typography variant="h3" fontWeight="bold" className="profile-name-addmodal">New Memeber</Typography>
            <Typography variant="body2" className="profile-role-addmodal">EDEN</Typography>
          </div>
        </div>


        <div className="modal-right-addmodal">
          <form className="modal-form-addmodal">
            <div className="form-row-addmodal">
              <div className="input-group-addmodal">
                <Typography sx={{
                  color: "#8B8B8B",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily:'poppins',
                  textAlign:'left'
                }} className="input-label-addmodal">First Name</Typography>
                <TextField
                 style={{
                  width: "300px",
                  borderRadius: "10px",
                 }}
                 sx={{
                  '& .MuiOutlinedInput-root': {
                    '& input::placeholder': {
        fontSize: '16px',
        color: '#D4FCE5',
        fontFamily: 'Poppins'
      },
                    borderRadius: '40px',
                    '& fieldset': {
                      border: 'none'
                    }
                  }
                }}
                 
                 placeholder="Tom" className="form-field-addmodal" />
              </div>

              <div className="input-group-addmodal">
                <Typography
                sx={{
                  color: "#8B8B8B",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily:'poppins',
                  textAlign:'left'
                }} 

                 className="input-label-addmodal"
                 
                 >Last Name</Typography>
                <TextField 
                 style={{
                  width: "300px",
                  borderRadius: "10px",
                 }}
                 sx={{
                  '& .MuiOutlinedInput-root': {
                    '& input::placeholder': {
                      fontSize: '16px',
                      color: '#D4FCE5',
                      fontFamily: 'Poppins'
                    },
                    borderRadius: '40px',
                    '& fieldset': {
                      border: 'none'
                    }
                  }
                }}
                placeholder="Elbes" fullWidth className="form-field-addmodal" />
              </div>
            </div>
            <div className="input-group-addmodal">
              <Typography 
                sx={{
                  color: "#8B8B8B",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily:'poppins',
                  textAlign:'left'
                
              }} 
              className="input-label-addmodal">Email</Typography>
              <TextField
              style={{
                //  backgroundColor: "transparent",
                borderRadius: "10px",
               }}
               sx={{
                '& .MuiOutlinedInput-root': {
                  '& input::placeholder': {
                    fontSize: '16px',
                    color: '#D4FCE5',
                    fontFamily: 'Poppins'
                  },
                  // borderRadius: '40px',
                // backgroundColor: '#8B8B8B',
                  '& fieldset': {
                    border: 'none'
                  }
                }
              }}
              placeholder="Tom.Elbes@gmail.com" fullWidth className="form-field-addmodal" />
            </div>

          

          {/*  */}

         <div className="form-row-addmodal">
              <div className="input-group-addmodal">
                <Typography 
                 sx={{
                  color: "#8B8B8B",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily:'poppins',
                  textAlign:'left'
                }} 
                className="input-label-addmodal ">Access Level</Typography>
               
                <FormControl fullWidth sx={{ minWidth: 300, backgroundColor: "#333", borderRadius: "10px" }}>
                <Select
  value={accessLevel}
  onChange={(e) => setAccessLevel(e.target.value)}
  displayEmpty
  renderValue={(selected) => selected || "Choose access level"}
  disablePortal
  MenuProps={{
    PaperProps: {
      sx: {
        zIndex: 2000,  // التأكد من أن القائمة تظهر فوق باقي العناصر
      },
    },
  }}
  sx={{
    borderRadius: "10px",
    color: accessLevel ? "white" : "#aaa",
    ".MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
    "& .MuiSvgIcon-root": { color: "white" },
  }}
>
  <MenuItem value="" disabled>Choose access level</MenuItem>
  <MenuItem value="Analyst">Analyst</MenuItem>
  <MenuItem value="Manager">Manager</MenuItem>
  <MenuItem value="Farmer">Farmer</MenuItem>
  <MenuItem value="Owner">Owner</MenuItem>
</Select>

</FormControl>



              </div>

          
            </div>

            {/*  */}

            <div className="form-row-addmodal">
                 

              <div className="input-group-addmodal">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "300px",backgroundColor:'#575757',borderRadius:'10px' ,padding:'10px'}}>
        <Typography
          sx={{
            color: "#ffff",
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: 'Poppins',
            textAlign: 'left',
            cursor: 'pointer',

          }}
          className="input-label-addmodal"
          onClick={() => setShowPasswordModal(true)}
        >
          Change Password
        </Typography>

        <IconButton onClick={() => setOpen(true)}>
          <VpnKeyIcon sx={{ color: "#8B8B8B" }} />
        </IconButton>
      </Box>

              </div>
            </div> 
          
          </form>

          




          <div className="modal-footer-addmodal">
  <Button onClick={onClose} variant="text" style={{
    color:'#fff',
    fontSize:'16px',
    fontWeight:'600',
    fontFamily:'poppins',
  }} className="cancel-button-addmodal">Cancel</Button>
  <Button 
    // variant="contained" 
    className="save-button-addmodal"
    onClick={onClose}
    variant="text" style={{
      color:'#fff',
      fontSize:'16px',
      fontWeight:'600',
      fontFamily:'poppins',
    }}

    startIcon={
      <img src={images.adduser} alt="Save Icon" style={{ marginLeft: '8px' }} />
    }
  >
    
    Edit
  </Button>
</div>

        </div>
      </div>

   

    </div>
  );
};

export default EditUserModal;