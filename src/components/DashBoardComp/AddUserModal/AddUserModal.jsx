import React, { useState } from "react";
import { Typography, Button,Select, MenuItem, TextField, InputAdornment,FormControl } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "./AddUserModal.css";
import images from "../../../constants/images";

const AddUserModal = ({ isOpen, onClose }) => {
  const [accessLevel, setAccessLevel] = useState("");

  if (!isOpen) return null;

  return (
<div className="modal-overlay-addmodal">
      <div className="modal-container-addmodal">
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

           }} variant="h5" className="modal-title-addmodal">Add User</Typography>
          <div className="profile-container-addmodal">
            <div className="profile-image-addmodal">
              <img src={images.addNewuser}  />
              {/* <button className="edit-icon-addmodal">
                <img src={images} />
              </button> */}
            </div>
            <Typography variant="h4" className="profile-name-addmodal">New Memeber</Typography>
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
                 
                 >Age</Typography>
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
                placeholder="27-12-2000" fullWidth className="form-field-addmodal" />
              </div>
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
                className="input-label-addmodal ">Password</Typography>
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
                 keyboardType='password'

                 placeholder="*******" className="form-field-addmodal" >
                 </TextField>
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
                 
                 >Re-Enter Password</Typography>
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
                placeholder="*******" fullWidth className="form-field-addmodal" />
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
    
    Add
  </Button>
</div>

        </div>
      </div>

   

    </div>
  );
};

export default AddUserModal;