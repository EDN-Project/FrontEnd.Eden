import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme ,Divider} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import images from "../../constants/images";
const Item = ({ title, to, imgSrc, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] , marginBottom: 10, transition: "color 0.3s ease"  }}
      onClick={() => {
        setSelected(title)
      }}
      icon={<img src={imgSrc} alt={title} style={{ width: 25, height: 25 ,transition: "filter 0.3s ease"}} />}
      onMouseEnter={(e) => {
        e.currentTarget.querySelector(".menu-text").style.color = "#CEFBE2";
        e.currentTarget.querySelector("img").style.filter = "brightness(0) saturate(100%) invert(78%) sepia(15%) saturate(500%) hue-rotate(90deg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.querySelector(".menu-text").style.color = colors.grey[100];
        e.currentTarget.querySelector("img").style.filter = "none";
      }}
    
    >
      <Typography className="menu-text" style={{ color: colors.grey[100],fontSize: 18 }}>{title}</Typography>
      <Link to={to} />
      <style>{`
        .pro-menu-item:hover .menu-text {
          color: #CEFBE2 !important;
        }
        .pro-menu-item:hover img {
          filter: brightness(0) saturate(100%) invert(78%) sepia(15%) saturate(500%) hue-rotate(90deg);
        }
      `}</style>
    </MenuItem>
  );
};


const Sidebar = ({isSidebar}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
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
      <ProSidebar collapsed={isCollapsed} 
      style={{
        // height: "140vh",
      }}
      >
        <Menu 
        iconShape="square" 
        style={{ 
          padding: "20px 0 20px 0",
          
         }}

        >
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              // margin: "10px 0 20px 0",
          
              color: "#CEFBE2",
            }}
          >
           {!isCollapsed && (
              <Box
               display="flex" justifyContent="space-between" alignItems="center" width="100%" p="10px"
              >
                <Typography variant="h3" color={"#CEFBE2"}>
                Welcome back !
                </Typography>
                <IconButton style={{ color: "#CEFBE2" ,marginLeft: "20px"}}  onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )} 
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="120px"
                  height="120px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Zainab
                </Typography>
                <Typography variant="h5" color={'#CEFBE2'}>
                Manager
                </Typography>
              </Box>
            </Box>
          )} 


             <Divider style={{ backgroundColor: "#3F3F3F", margin: "10px 20px" }} />

             <Box paddingLeft={isCollapsed ? "0.6%" : "5%"}>
            <Item title="Dashboard" to="/" imgSrc={images.Dashboard} selected={selected} setSelected={setSelected}   />
            <Item title="Market Analysis" to="/Plant" imgSrc={images.Market_Analysis} selected={selected} setSelected={setSelected} />
            <Item title="Manage Users" to="/team" imgSrc={images.Manage_Users} selected={selected} setSelected={setSelected} />
            <Item title="Get Reports" to="/reports" imgSrc={images.Get_Reports} selected={selected} setSelected={setSelected} />
            <Item title="Calendar" to="/calendar" imgSrc={images.Calendar} selected={selected} setSelected={setSelected} />
            <Item title="Profile" to="/profile" imgSrc={images.user} selected={selected} setSelected={setSelected} />
          </Box> 
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
  );
};

export default Sidebar;



