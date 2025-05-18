import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import images from "../../constants/images";
import ProfileDropdownDash from "../../components/DashBoardComp/AddUserModal/ProfileDropdownDash/ProfileDropdownDash";
import NotificationModal from "../../components/DashBoardComp/NotificationModal";
import { logoutUser } from "../../constants/api";
import SettingsModal from "../../components/DashBoardComp/SettingsModal";
import EditUserModal from "../../components/DashBoardComp/EditProfileModal/EditProfileModal";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [showSetting, setshowSetting] = useState(false);
  const [showUserProfile, setshowUserProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      alert(result.message);
      window.location.href = "/login";
    } else {
      alert(result.error);
    }
  };

  // Function to handle opening the edit profile modal
  const handleEditProfile = () => {
    setShowEditProfile(true);
    setShowDropdown(false); // Close the dropdown when opening the modal
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} position="relative">
      <Box
        display="flex"
        backgroundColor="#3F3F3F"
        borderRadius="30px"
        width="400px"
        padding="5px 5px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

     
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => setShowNotify(prev => !prev)}>
          <img style={{ width: 25, height: 25 }} src={images.notification} alt="Notifications" />
        </IconButton>

        <IconButton onClick={() => setshowSetting(prev => !prev)}>
          <img style={{ width: 25, height: 25 }} src={images.setting} alt="Settings" />
        </IconButton>

        <Box
          position="relative"
          display="inline-block"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <IconButton>
            <img style={{ width: 25, height: 25, color: "#FFF" }} src={images.userwhite} alt="User" />
          </IconButton>

          {showDropdown && (
            <Box
              position="absolute"
              top="0px"
              right="0"
              boxShadow="0px 4px 10px rgba(0,0,0,0.15)"
              borderRadius="8px"
              minWidth="150px"
              padding="10px"
              zIndex={9999}
            >
              <ProfileDropdownDash logout={handleLogout} onEditProfile={handleEditProfile} />
            </Box>
          )}
        </Box>
      </Box>

      {showNotify && (
        <NotificationModal open={showNotify} onClose={() => setShowNotify(false)} />     
      )}

      {showSetting && (
        <SettingsModal open={showSetting} onClose={() => setshowSetting(false)} />
      )}

      {/* Add the EditUserModal component */}
      {showEditProfile && (
        <EditUserModal isOpen={showEditProfile} onClose={() => setShowEditProfile(false)} />
      )}
    </Box>
  );
};

export default Topbar;
