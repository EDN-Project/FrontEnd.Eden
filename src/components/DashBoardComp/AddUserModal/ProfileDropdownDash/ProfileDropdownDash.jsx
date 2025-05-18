import { useState } from "react";
import "./ProfileDropdownDash.css";

export default function ProfileDropdownDash({logout, onEditProfile}) {
  return (
    <div className="profile-dropdown-dash">
      <button onClick={onEditProfile} className="dropdown-item-dash">Edit Profile</button>
      <hr className="dropdown-divider-dash" />
      <button className="dropdown-item-dash">Help & Support</button>
      <hr className="dropdown-divider-dash" />
      <button onClick={logout} className="dropdown-item-dash">Log Out</button>
    </div>
  );
}
