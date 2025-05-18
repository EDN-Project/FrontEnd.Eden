import { useState ,useEffect} from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {Button, Box, IconButton, Typography, useTheme, Divider, Menu as MuiMenu, MenuItem as MuiMenuItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import images from "../../constants/images";
import { logoutUser } from "../../constants/api";
import UserProfileModal from "../../components/DashBoardComp/UserProfileModal";
const Item = ({ title, to, imgSrc, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // The color we want to use for both selected and hover states
  const highlightColor = "#CEFBE2";
  
  // Check if this item is currently selected
  const isSelected = selected === title;

  // Handle click on menu item
  const handleClick = () => {
    setSelected(title);
    if (onClick) onClick();
  };

  return (
    <MenuItem
      active={isSelected}
      style={{ 
        color: isSelected ? highlightColor : colors.grey[100], 
        marginBottom: 10, 
        transition: "color 0.3s ease" 
      }}
      onClick={handleClick}
      icon={
        <div style={{ 
          width: 25, 
          height: 25, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={imgSrc} 
            alt={title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              transition: "all 0.3s ease",
              filter: isSelected ? "brightness(0) saturate(100%) invert(92%) sepia(8%) saturate(1093%) hue-rotate(76deg) brightness(103%) contrast(98%)" : "none"
            }} 
          />
        </div>
      }
      className={`sidebar-menu-item ${isSelected ? 'selected-item' : ''}`}
    >
      <Typography 
        className="menu-text" 
        style={{ 
          color: isSelected ? highlightColor : colors.grey[100], 
          fontSize: 18 
        }}
      >
        {title}
      </Typography>
      {to && <Link to={to} />}
    </MenuItem>
  );
};

const useStyles = {
  "@global": {
    ".sidebar-menu-item:hover img": {
      filter: "invert(95%) sepia(12%) saturate(1090%) hue-rotate(76deg) brightness(97%) contrast(94%) !important"
    },
    ".sidebar-menu-item:hover .menu-text": {
      color: "#CEFBE2 !important"
    },
    ".pro-menu-item.active img": {
      filter: "invert(95%) sepia(12%) saturate(1090%) hue-rotate(76deg) brightness(97%) contrast(94%) !important"
    }
  }
};

const Sidebar = ({ isSidebar }) => {
  const classes = useStyles;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [anchorEl, setAnchorEl] = useState(false); 
  const [showUserProfile, setshowUserProfile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    // Map paths to menu titles
    if (path.includes("/DashboardPage")) setSelected("Dashboard");
    else if (path.includes("/CropManagement")) setSelected("Crop Management");
    else if (path.includes("/Plant")) setSelected("Market Analysis");
    else if (path.includes("/team")) setSelected("Manage Users");
    else if (path.includes("/calendar")) setSelected("Calendar");
    else if (path.includes("/HealthPrediction")) setSelected("Health Prediction");
    else if (path.includes("/Report")) setSelected("Get Reports");
    
  }, [location.pathname]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

   const [user, setUser] = useState(null);
  
     useEffect(() => {
      const storedUser = localStorage.getItem("userData");
      // console.log("User State:", user);
      setUser(JSON.parse(storedUser));
      // User State: Object company_name : "Edan" email : "eden111055@gmail.com" name : "Edan Edan" phone : "eden111055@gmail.com" user_name : "Edan Edan_11" }
        }, []); 


  const handleLogout = async () => {
      const result = await logoutUser();
      if (result.success) {
        alert(result.message);
        window.location.href = "/login";
      } else {
        alert(result.error);
      }
    };

  return (
    <>
      <style>
        {`
          .sidebar-menu-item:hover img {
            filter: brightness(0) saturate(100%) invert(92%) sepia(8%) saturate(1093%) hue-rotate(76deg) brightness(103%) contrast(98%) !important;
          }
          .sidebar-menu-item:hover .menu-text {
            color: #CEFBE2 !important;
          }
          .pro-inner-item:hover {
            color: #CEFBE2 !important;
          }
          .pro-menu-item.active {
            color: #CEFBE2 !important;
          }
          .pro-menu-item.active img {
            filter: brightness(0) saturate(100%) invert(92%) sepia(8%) saturate(1093%) hue-rotate(76deg) brightness(103%) contrast(98%) !important;
          }
          .pro-menu-item.active .menu-text {
            color: #CEFBE2 !important;
          }
        `}
      </style>
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[120]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#CEFBE2 !important",
        },
        "& .pro-menu-item.active": {
          color: "#CEFBE2 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ color: "#CEFBE2" }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" p="10px">
                <Typography variant="h3" color={"#CEFBE2"}>Welcome back!</Typography>
                <IconButton style={{ color: "#CEFBE2", marginLeft: "20px" }} onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img alt="profile-user" width="120px" height="120px" src={images.eden_logo_Black} style={{ cursor: "pointer", borderRadius: "50%" }} />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>{user?.name}</Typography>
                <Typography variant="h5" color={'#CEFBE2'}>Manager</Typography>
              </Box>
            </Box>
          )}

          <Divider style={{ backgroundColor: "#3F3F3F", margin: "10px 20px" }} />

          <Box paddingLeft={isCollapsed ? "0.6%" : "5%"}>
            
          <Item title="Dashboard" to="/DashboardPage" imgSrc={images.Dashboard} selected={selected} setSelected={setSelected} />
          <Item title="Crop Management" to="/CropManagement" imgSrc={images.plantt} selected={selected} setSelected={setSelected} />

            <Item title="Market Analysis" to="/Plant" imgSrc={images.Market_Analysis} selected={selected} setSelected={setSelected} />
            <Item title="Manage Users" to="/team" imgSrc={images.Manage_Users} selected={selected} setSelected={setSelected} />
           
            <Item title="Calendar" to="/calendar" imgSrc={images.Calendar} selected={selected} setSelected={setSelected} />

            <Item title="Health Prediction" to="/HealthPrediction" imgSrc={images.artificialntelligence} selected={selected} setSelected={setSelected} />

            <Item title="Get Reports" to="/Report" imgSrc={images.Get_Reports} selected={selected} setSelected={setSelected} />



            <Box onClick={()=>{
                           setAnchorEl(!anchorEl)

            }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", padding: "10px 20px" }}>
  <img src={images.user} alt="Profile" style={{ width: 25, height: 25 }} />
  <Typography color={colors.grey[100]} fontSize={18}>Profile</Typography>
</Box>

       
          </Box>


          
          {anchorEl && (
             <Box onClick={()=>{
              // setAnchorEl(!anchorEl)
             }} padding="0px 40px">
              <Box gap="10px" justifyContent="center" alignItems="center">
              <Button onClick={() => setshowUserProfile(true)}  >
             <Typography variant="h6" color={colors.grey[300]} fontWeight="bold" sx={{ m: "0px 0 5px 20px" }}>
             View Profile
               </Typography>
               </Button>
              <Button >

               <Typography variant="h6" color={colors.grey[300]} fontWeight="bold" sx={{ m: "0px 0 5px 20px" }}>
               Account Setting
               </Typography>
               </Button>
               <Button onClick={handleLogout} >
               <Typography variant="h6" color={colors.grey[300]} fontWeight="bold" sx={{ m: "0px 0 5px 20px" }}>
               Log Out
               </Typography>
               </Button>
           </Box>
           </Box>

          )}
         


        </Menu>

        <Box 
    display="flex" 
    alignItems="center" 
    gap="10px"
    p="20px"
    sx={{
      position: "absolute",
      bottom: 0,
      width: "100%",
      // backgroundColor: "#282828"
    }}
  >
    <img src={images.Suport} alt="support" style={{ width: 25, height: 25 }} />
    <Typography color="#CEFBE2" fontSize={18}>Support</Typography>
 
 </Box>
      </ProSidebar>
    </Box>
    {showUserProfile && (
  <UserProfileModal open={showUserProfile} onClose={() => setshowUserProfile(false)} />
  )}
    </>
  );
};

export default Sidebar;
