import { Box } from "@mui/material";
import Header from "../../components/Header";
// import BarChart from "../../components/BarChart";
import BarChart from "../../components/BarChartTypes";
import './bar.css';
const Bar = () => {
  return (
    <div className="bar-container">
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart  />
      </Box>
    </Box>
    </div>
  );
};

export default Bar;
