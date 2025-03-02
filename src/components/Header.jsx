import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box >
      <Typography
        variant="h1"
        color={colors.grey[100]}
        fontWeight="bold"
        align='left'
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h3" color={'#CEFBE2'}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
