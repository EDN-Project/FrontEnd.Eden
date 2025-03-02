// import { useState } from "react";
// import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PriceChangeIcon from "@mui/icons-material/PriceChange"; 
// import RecommendationIcon from "@mui/icons-material/ThumbUp"; 
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; 
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
// import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
// import BarChartTypes from "../../components/BarChartTypes";

// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
// import dashborad from "./dashborad.css";

// import Sidebar from "../global/Sidebar";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "../../theme";
// import Topbar from "../global/Topbar";

// const Dashboard = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [isSidebar, setIsSidebar] = useState(true);
//   const [ colorMode] = useMode();

//   return (

//      <ColorModeContext.Provider value={colorMode}>
//           <ThemeProvider theme={theme}>
//      <CssBaseline />
//         <div className="app"  backgroundColor={'#282828'}>
//           <Sidebar isSidebar={isSidebar} />
//           <main className="content">
//             <Topbar setIsSidebar={setIsSidebar} />


//     <Box m="20px">
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Header title="Market Analysis"  />

//         {/* <Box>
//           <Button
//             sx={{
//               backgroundColor: colors.blueAccent[700],
//               color: colors.grey[100],
//               fontSize: "14px",
//               fontWeight: "bold",
//               padding: "10px 20px",
//             }}
//           >
//             <DownloadOutlinedIcon sx={{ mr: "10px" }} />
//             Download Reports
//           </Button>
//         </Box> */}
//       </Box>

//       {/* GRID & CHARTS */}
//       <Box
//         display="grid"
//         gridTemplateColumns="repeat(12, 1fr)"
//         gridAutoRows="140px"
//         gap="20px"
//       >
//         {/* ROW 1 */}
//         <Box
//           gridColumn="span 3"
//           backgroundColor={'#282828'}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="12,361"
//             subtitle="Average Price"
//             progress="0.75"
//             increase="+14%"
//             icon={
//               <PriceChangeIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={'#282828'}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="431,225"
//             subtitle="Recommendation"
//             progress="0.50"
//             increase="+21%"
//             icon={
//               <RecommendationIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={'#282828'}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="32,441"
//             subtitle="Net Profit"
//             progress="0.30"
//             increase="+5%"
//             icon={
//               <AttachMoneyIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>

//         {/*  */}
//         <Box
//   gridColumn="span 3"
//   backgroundColor={'#282828'}
//   display="flex"
//   alignItems="center"
//   justifyContent="center"
//   padding={"10px 20px"}
// >
//   <Button
//     variant="contained"
//     width='40%'
//     sx={{
//       backgroundColor: colors.greenAccent[500],
//       color: colors.grey[100],
//       fontSize: "20px",

//       padding: "10px 20px",
//       "&:hover": {
//         backgroundColor: colors.greenAccent[600], 
//       },
//     }}
//   >
//     Timing
//   </Button>
// </Box>
// {/*  */}




// <Box
//   gridColumn="span 4"
//   gridRow="span 2"
//   backgroundColor={'#282828'}
// >
//   <Box
//     mt="20px"
//     p="0 30px"
//     display="flex"
//     justifyContent="space-between"
//     alignItems="center"
//   >
//     <Box>
//       <Typography
//         variant="h4"
//         fontWeight="600"
//         color={colors.grey[100]}
//       >
//         Prices last 10 Years
//       </Typography>
//     </Box>
//     <Box>
//       <IconButton>
//         <DownloadOutlinedIcon
//           sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
//         />
//       </IconButton>
//     </Box>
//   </Box>
//   <Box height="250px" width="100%" m="-20px 0 0 0">
//     <LineChart isDashboard={true} />
//   </Box>
// </Box>

// <Box
//   gridColumn="span 4"
//   gridRow="span 2"
//   backgroundColor={'#282828'}
//   overflow="auto"
// >
//   <Box
//     display="flex"
//     justifyContent="space-between"
//     alignItems="center"
//     borderBottom={`4px solid ${colors.primary[500]}`}
//     colors={colors.grey[100]}
//     p="15px"
//   >
//     <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
//     Competitors
//     </Typography>
//   </Box>
//   {mockTransactions.map((transaction, i) => (
//     <Box
//       key={`${transaction.txId}-${i}`}
//       display="flex"
//       justifyContent="space-between"
//       alignItems="center"
//       borderBottom={`4px solid ${colors.primary[500]}`}
//       p="15px"
//     >
//       <Box>
//         <Typography
//           color={colors.greenAccent[500]}
//           variant="h5"
//           fontWeight="600"
//         >
//           {transaction.txId}
//         </Typography>
//         <Typography color={colors.grey[100]}>
//           {transaction.user}
//         </Typography>
//       </Box>
//       <Box color={colors.grey[100]}>{transaction.date}</Box>
//       <Box
//         backgroundColor={colors.greenAccent[500]}
//         p="5px 10px"
//         borderRadius="4px"
//       >
//         %{transaction.cost}
//       </Box>
//     </Box>
//   ))}
// </Box>

// <Box
//   gridColumn="span 4"
//   gridRow="span 2"
//   backgroundColor={'#282828'}
//   overflow="auto"
// >
//   <Box
//     display="flex"
//     justifyContent="space-between"
//     alignItems="center"
//     borderBottom={`4px solid ${colors.primary[500]}`}
//     colors={colors.grey[100]}
//     p="15px"
//   >
//     <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
//     Revenue
//     </Typography>
//   </Box>
//   {mockTransactions.map((transaction, i) => (
//     <Box
//       key={`${transaction.txId}-${i}`}
//       display="flex"
//       justifyContent="space-between"
//       alignItems="center"
//       borderBottom={`4px solid ${colors.primary[500]}`}
//       p="15px"
//     >
//       <Box>
//         <Typography
//           color={colors.greenAccent[500]}
//           variant="h5"
//           fontWeight="600"
//         >
//           {transaction.txId}
//         </Typography>
//         <Typography color={colors.grey[100]}>
//           {transaction.user}
//         </Typography>
//       </Box>
//       <Box color={colors.grey[100]}>{transaction.date}</Box>
//       <Box
//         backgroundColor={colors.greenAccent[500]}
//         p="5px 10px"
//         borderRadius="4px"
//       >
//         {transaction.cost}
//       </Box>
//     </Box>
//   ))}
// </Box>



//         {/* ROW 3 */}
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={'#282828'}
//         >
//           <Typography
//             variant="h3"
//             fontWeight="600"
//             sx={{ padding: "20px 20px 0 20px" }}
//             textAlign={"left"}
//             color={'#CEFBE2'}
//           >
//           Detailed Prices
//           </Typography>
//           <Box height="250px" mt="-20px">
//             <BarChart isDashboard={true} />
//           </Box>
//         </Box>

//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={'#282828'}
//         >
//           <Typography
//             variant="h3"
//             fontWeight="600"
//             sx={{ padding: "20px 20px 0 20px" }}
//             color={'#CEFBE2'}
//             textAlign={"left"}
//           >
//             Types
//           </Typography>
//           <Box height="250px" mt="-20px">
//             <BarChartTypes isDashboard={true} />
//           </Box>
//         </Box>


// {/*  import countries*/}
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={'#282828'}
//           padding="30px"
//         >
//           <Typography
//             variant="h3"
//             fontWeight="600"
//             sx={{ marginBottom: "15px" }}
//             color={'#CEFBE2'}
//             textAlign={"left"}  

//           >
// import countries
//           </Typography>
//           <Box height="200px">
//             <GeographyChart isDashboard={true} />
//           </Box>
//         </Box>

// {/*  */}

//       </Box>
//     </Box>
//    </main>
//    </div>

//     </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };

// export default Dashboard;

import { useState } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";

import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import BarChartTypes from "../../components/BarChartTypes";
import CustomBarChart from "../../components/CustomBarChart";
import Sidebar from "../global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Topbar from "../global/Topbar";
import "./dashborad.css";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import DoughnutChart from "../../components/DoughnutChart";
import CustomLineChart from "../../components/CustomLineChart";




const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [colorMode] = useMode();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState("23434");
  const [selectedCountry, setSelectedCountry] = useState("Spain");

  const PriceslistArray = [
    { year: "2015", price: 422 },
    { year: "2016", price: 730 },
    { year: "2017", price: 350 },
    { year: "2018", price: 630 },
    { year: "2019", price: 1020 },
    { year: "2020", price: 810 },
    { year: "2021", price: 890 },
    { year: "2022", price: 1100 },
    { year: "2023", price: 620 },
    { year: "2024", price: 830 },
  ];


  const chartDataTon = [
    { year: "2015", Ton: 422 },
    { year: "2016", Ton: 730 },
    { year: "2017", Ton: 350 },
    { year: "2018", Ton: 630 },
    { year: "2019", Ton: 1020 },
    { year: "2020", Ton: 810 },
    { year: "2021", Ton: 890 },
    { year: "2022", Ton: 1100 },
    { year: "2023", Ton: 620 },
    { year: "2024", Ton: 830 },
  ];


  const DataDiffInPrices  = [
    { year: "2015", price: 140 },
    { year: "2016", price: 160 },
    { year: "2017", price: 180 },
    { year: "2018", price: 210 },
    { year: "2019", price: 230 },
    { year: "2020", price: 200 },
    { year: "2021", price: 250 },
    { year: "2022", price: 260 },
    { year: "2023", price: 220 },
    { year: "2024", price: 180 },
  ];
  
  const DataDiffInQuantity   = [
    { year: "2015", K: 190 },
    { year: "2016", K: 10 },
    { year: "2017", K: 80 },
    { year: "2018", K: 210 },
    { year: "2019", K: 230 },
    { year: "2020", K: 230 },
    { year: "2021", K: 250 },
    { year: "2022", K: 220 },
    { year: "2023", K: 220 },
    { year: "2024", K: 180 },
  ];
  
  

  return (
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}

        <div className="app" style={{ backgroundColor: "#121212" }}>
          <Sidebar isSidebar={isSidebar} />
          <main className="content" backgroundColor={'#1F1F1F'}>
            <Topbar setIsSidebar={setIsSidebar} />

            <Box m="20px">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Market Analysis" />
              </Box>

              <Box mt='30px' display="flex" gap="20px" mb="50px" alignItems="center">
                <Box display="flex" gap="20px" alignItems="center">
                  <Typography
                    style={{
                      fontWeight: "bold"
                    }}
                    variant="h3" color={'#8B8B8B'}>
                    Code</Typography>
                  <select
                    value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}
                    style={{
                      backgroundColor: "#3F3F3F",
                      color: "#FFFF",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      fontSize: "16px",
                      cursor: "pointer",
                      outline: "none",
                      width: "150px",
                    }}
                  >
                    <option value="Strawberry">2302093</option>
                    <option value="Apple">2329389</option>
                  </select>
                </Box>

                <Box display="flex" gap="20px" alignItems="center">
                  <Typography
                    style={{
                      fontWeight: "bold"
                    }}
                    variant="h3" color={'#8B8B8B'}
                  >Countries</Typography>
                  <select
                    style={{
                      backgroundColor: "#3F3F3F",
                      color: "#FFFF",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      fontSize: "16px",
                      cursor: "pointer",
                      outline: "none",
                      width: "150px",
                    }}
                    value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    <option value="Spain">Spain</option>
                    <option value="USA">USA</option>
                    <option value="Brazil">Brazil</option>
                  </select>
                </Box>

                <Box display="flex" gap="20px" alignItems="center">
                  <Typography
                    style={{
                      fontWeight: "bold"
                    }}
                    variant="h3" color={'#8B8B8B'}>Date</Typography>


                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={["year", "month"]}
                      value={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      sx={{
                        backgroundColor: "#3F3F3F",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "5px",
                        padding: "3px 8px", // Reduced padding to decrease height
                        fontSize: "20px",
                        cursor: "pointer",
                        outline: "none",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none" // Removes the default border
                        },
                        "& .MuiInputBase-root": {
                          height: "35px" // Reduced height
                        }
                      }}
                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />

                  </LocalizationProvider>


                </Box>
              </Box>



              <Box display="flex" flexDirection="column" gap="20px" style={{ position: "absolute", right: "20px", top: "200px" }}>
               

<Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={'#282828'}
          padding="30px"
          borderRadius="20px"

        >
          <Typography
            textAlign='left'
            variant="h3"
            fontWeight="600"
            color={'#CEFBE2'}
            sx={{ marginBottom: "15px" }}
          >
            Competitors
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>

                <Box
                  borderRadius="20px"
                  backgroundColor={'#282828'}
                  padding="10px"
                  width="320px"
                >
                  <Typography variant="h3" fontWeight="600" sx={{ marginBottom: "15px" }} color={'#CEFBE2'} textAlign="left">Common Types</Typography>
                  <Box height="150px">
                    {/* <PieChart isDashboard={true} /> */}
                    {/* <div className="flex justify-center items-center min-h-screen bg-gray-800"> */}
                    <DoughnutChart />
                    {/* </div> */}
                  </Box>
                </Box>
              </Box>





              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="100px"
                gap="20px"
              >


                {/* Prices last 10 Years */}
                {/* Detailed Prices */}
                <Box  gridColumn="span 5" gridRow="span 4" backgroundColor={'#282828'}
                  borderRadius="20px"
                  sx={{width:'520px',
                    padding: "10px ",
                   
                   }}
                >

                  <Box sx={{ padding: "10px 10px 40px 10px" }} display="flex" alignItems="center" gap="10px">
                    <Typography variant="h3" fontWeight="600" textAlign="left" color={'#CEFBE2'}>Prices last 10 Years</Typography>
                    <Typography sx={{ fontSize: "12px", marginTop: "10px" }} variant="body2" color="#8B8B8B">Per dollar</Typography>
                  </Box>
                  {/* <Box height="250px" mt="-20px"> */}
                    <CustomBarChart data={PriceslistArray} />
                  {/* </Box> */}
                </Box>


                {/* Types */}
                <Box  gridColumn="span 5" gridRow="span 4" backgroundColor={'#282828'}
                  borderRadius="20px"
                  sx={{width:'520px',
                    padding: "10px ",
                    marginLeft: "-50px",
                   }}
                >

                  <Box sx={{ padding: "10px 10px 40px 10px" }} display="flex" alignItems="center" gap="10px">
                    <Typography variant="h3" fontWeight="600" textAlign="left" color={'#CEFBE2'}>Quantities last 10 years </Typography>
                    <Typography sx={{ fontSize: "12px", marginTop: "10px" }} variant="body2" color="#8B8B8B">Per Tons</Typography>
                  </Box>
                  {/* <Box height="250px" mt="-20px" wh> */}
                    <CustomBarChart data={chartDataTon} />
                  {/* </Box> */}
                </Box>
                {/* Competitors */}


                {/* Prices last 10 Years */}
                <Box 
                gridColumn="span 6"
                  borderRadius="20px"
                  gridRow="span 4" backgroundColor={'#282828'}
                  
                  >
                    
                  <Box mt="20px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h3" fontWeight='bold' color={'#CEFBE2'}>Diff In Prices </Typography>
                    {/* <IconButton>
                      <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
                    </IconButton> */}
                  </Box>
                  {/* <Box height="250px" width="100%" m="-20px 0 0 0"> */}
                    {/* <LineChart isDashboard={true} /> */}
                    <CustomLineChart data={DataDiffInPrices} unit="$"  strokeColor="#8950FC"/>
                  {/* </Box> */}
                </Box>

                <Box gridColumn="span 6"
                  borderRadius="20px"
                  sx={{
                    // marginL: '-5px'
                   }}
                  gridRow="span 4" backgroundColor={'#282828'}>
                  <Box
                   
                   mt="20px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h3" fontWeight="bold"  color={'#CEFBE2'}>Diff In Quantity </Typography>
                    {/* <IconButton>
                      <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
                    </IconButton> */}
                  </Box>
                  {/* <Box height="250px" width="100%" m="-20px 0 0 0">
                    <LineChart isDashboard={true} />
                  </Box> */}
                    <CustomLineChart data={DataDiffInQuantity} unit="k" strokeColor="#F4BE37"/>

                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Dashboard;
