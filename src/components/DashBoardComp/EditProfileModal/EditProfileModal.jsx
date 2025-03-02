import React from "react";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "./AddUserModal.css";

const AddUserModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
<div className="modal-overlay-addmodal">
      <div className="modal-container-addmodal">
       
        <div className="modal-left-addmodal">
          <Typography variant="h5" className="modal-title-addmodal">Edit Profile</Typography>
          <div className="profile-container-addmodal">
            <div className="profile-image-addmodal">
              <img src="profile-placeholder.png" alt="User" />
              <button className="edit-icon-addmodal">✎</button>
            </div>
            <Typography variant="h6" className="profile-name-addmodal">Tom Elbes</Typography>
            <Typography variant="body2" className="profile-role-addmodal">Farmer</Typography>
          </div>
        </div>

        {/* القسم الأيمن - النموذج */}
        <div className="modal-right-addmodal">
          <button onClick={onClose} className="close-button-addmodal">✖</button>
          <form className="modal-form-addmodal">
            <div className="form-row-addmodal">
              <div className="input-group-addmodal">
                <Typography className="input-label-addmodal">First Name</Typography>
                <TextField placeholder="Tom" fullWidth className="form-field-addmodal" />
              </div>
              <div className="input-group-addmodal">
                <Typography className="input-label-addmodal">Last Name</Typography>
                <TextField placeholder="Elbes" fullWidth className="form-field-addmodal" />
              </div>
            </div>
            <div className="input-group-addmodal">
              <Typography className="input-label-addmodal">Email</Typography>
              <TextField placeholder="Tom.Elbes@gmail.com" fullWidth className="form-field-addmodal" />
            </div>
            <div className="input-group-addmodal">
              <Typography className="input-label-addmodal">Access Level</Typography>
              <TextField placeholder="Farmer" fullWidth className="form-field-addmodal access-level-addmodal" disabled />
            </div>
            <Button variant="contained" className="change-password-addmodal">Change Password</Button>
          </form>
          <div className="modal-footer-addmodal">
            <Button className="cancel-button-addmodal">Cancel</Button>
            <Button className="save-button-addmodal">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;