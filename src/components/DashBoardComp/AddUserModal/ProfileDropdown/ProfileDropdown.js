import { useState } from "react";
import "./ProfileDropdown.css";

export default function ProfileDropdown({logout,User}) {
  return (
    <div className="profile-dropdown">
      <button  className="dropdown-item">Edit Profile</button>
      <hr className="dropdown-divider" />
      <button className="dropdown-item">Help & Support</button>
      <hr className="dropdown-divider" />
      <button onClick={logout} className="dropdown-item">Log Out</button>
    </div>
  );
}
