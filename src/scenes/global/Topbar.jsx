import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import images from "../../constants/images";
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={'#3F3F3F'}
        borderRadius="30px"
        width="400px"
        mt='10px'
        padding="5px 5px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon  />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
      
        <IconButton>
          <img style={{width: 25, height: 25}} src={images.notification} alt="logo" />
        </IconButton>
        <IconButton>
        <img style={{width: 25, height: 25}} src={images.setting} alt="logo" />

        </IconButton>
        <IconButton>
         <img style={{width: 25, height: 25,color:'#FFF'}} src={images.userwhite} alt="logo" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;