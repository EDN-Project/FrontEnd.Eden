
import { useState , useEffect} from "react";
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
import {getCountryPrice,getCountryQuantity,getCountryGrowthValue,getCountryGrowthQuantity} from "../../constants/api";
import CustomBarChartperQ from "../../components/CustomBarChartperQ";
import CustomLineChartQ from "../../components/CustomLineChartQ";




const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [colorMode] = useMode();

  const [selectedDate, setSelectedDate] = useState(null);

  
useEffect(() => {
  // Retrieve values from sessionStorage
  const selectedCode = sessionStorage.getItem("selectedCode");
  const Country = sessionStorage.getItem("selectedCountry");
  
  if (selectedCode) setTypecode(selectedCode);
  if (Country) setCountry(Country);

  console.log('typecode, Country---->', selectedCode, Country);
}, []);


const [typecode, setTypecode] = useState("");
const [Country, setCountry] = useState("");
const [PriceslistArray, setPriceslistArray] = useState([]);
  

useEffect(() => {
  console.log("🟡 Fetching data with:", { typecode, Country });

  const fetchData = async () => {
      try {
          if (!typecode || !Country) {
              console.error("⚠️ Missing parameters: typecode or Country");
              return;
          }

          const data = await getCountryPrice(typecode, Country);
          if (data) {
              const formattedData = Object.keys(data)
                  .map(year => ({
                      year: year,
                      price: data[year]
                  }))
                  .sort((a, b) => a.year - b.year)
                  .slice(-5);

              setPriceslistArray(formattedData);
          }
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  fetchData();
}, [typecode, Country]);


  


  const [QuantityListArray, setQuantityListArray] = useState([]);


  
  useEffect(() => {
    const fetchQuantityData = async () => {
        if (!typecode || !Country) {
            console.error("⚠️ Missing parameters: typecode or Country");
            return;
        }

        console.log("🟡 Fetching quantity data with:", { typecode, Country });

        const data = await getCountryQuantity(typecode, Country);
        if (data) {
            const formattedData = Object.keys(data)
                .slice(-5)  // ✅ الاحتفاظ بآخر 5 سنوات فقط
                .map(year => ({
                    year: year,
                    quantity: data[year]
                }));

            setQuantityListArray(formattedData);
        }
    };

    fetchQuantityData();
}, [typecode, Country]); 




const [GrowthValueListArray, setGrowthValueListArray] = useState([]);


useEffect(() => {
  const fetchGrowthData = async () => {
      if (!typecode || !Country) {
          console.error("⚠️ Missing parameters: typecode or Country");
          return;
      }

      console.log("🟡 Fetching growth data with:", { typecode, Country });

      const data = await getCountryGrowthValue(typecode, Country);
      if (data) {
          const formattedData = Object.keys(data)
              .map(Number) 
              .sort((a, b) => a - b)
              .slice(-5)  
              .map(year => ({
                  year: year.toString(),  
                  growthValue: data[year]
              }));

          setGrowthValueListArray(formattedData);
      }
  };

  fetchGrowthData();
}, [typecode, Country]);





const [GrowthQuantityListArray, setGrowthQuantityListArray] = useState([]);
useEffect(() => {
  const fetchGrowthDataQuantity = async () => {
      if (!typecode || !Country) {
          console.error("⚠️ Missing parameters: typecode or Country");
          return;
      }

      console.log("🟡 Fetching growth quantity data with:", { typecode, Country });

      const data = await getCountryGrowthQuantity(typecode, Country);
      if (data) {
          const formattedData = Object.keys(data)
              .map(Number) 
              .sort((a, b) => a - b) 
              .slice(-5) 
              .map(year => ({
                  year: year.toString(),  
                  growthQuantity: data[year]
              }));

          setGrowthQuantityListArray(formattedData);
      }
  };

  fetchGrowthDataQuantity();
}, [typecode, Country]);


  

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

              <Box mt='30px' display="flex" gap="50px" mb="50px" alignItems="center">
                <Box display="flex" gap="20px" alignItems="center">
                  <Typography
                    style={{
                      fontWeight: "bold"
                    }}
                    variant="h3" color={'#8B8B8B'}>
                    Code</Typography>

                    <Typography
                    style={{
                      fontWeight: "bold"
                    }}
                    variant="h4" color={'#ffff'}>
                    {typecode}</Typography>
                  {/*  */}
                </Box>

                <Box display="flex" gap="20px" alignItems="center">
                  <Typography
                    style={{
                      fontWeight: "bold"
                    }}
                    variant="h3" color={'#8B8B8B'}
                  >Countries</Typography>
               <Typography
                    style={{
                      fontWeight: "bold"
                    }}
                    variant="h4" color={'#ffff'}>
                    {Country}</Typography>
                </Box>

                {/* <Box display="flex" gap="20px" alignItems="center">
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


                </Box> */}
              </Box>



              <Box display="flex" flexDirection="column" gap="20px" style={{ position: "absolute", right: "20px", top: "180px" }}>
               

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
                  width="400px"
                  
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
                // mt="0px"
              >


                {/* Prices last 10 Years */}
                {/* Detailed Prices */}
                <Box 
                flex={1}
                gridColumn="span 4" gridRow="span 4" backgroundColor={'#282828'}
                  borderRadius="20px"
                  sx={{
                    // width:'500px',
                    padding: "10px ",
                   
                   }}
                >

                  <Box sx={{ padding: "10px 10px 40px 10px" }} display="flex" alignItems="center" gap="10px">
                    <Typography variant="h3" fontWeight="600" textAlign="left" color={'#CEFBE2'}>Prices last 5 Years</Typography>
                    <Typography sx={{ fontSize: "12px", marginTop: "10px" }} variant="body2" color="#8B8B8B">Per dollar</Typography>
                  </Box>
                  {/* <Box height="250px" mt="-20px"> */}
                    <CustomBarChart data={PriceslistArray} />
                  {/* </Box> */}
                </Box>


                {/* Types */}
                <Box 
                flex={1}
                 gridColumn="span 4" gridRow="span 4" backgroundColor={'#282828'}
                  borderRadius="20px"
                  sx={{
                    // width:'500px',
                    padding: "10px ",
                    // marginLeft: "-50px",
                   }}
                >

                  <Box sx={{ padding: "10px 10px 40px 10px" }} display="flex" alignItems="center" gap="10px">
                    <Typography variant="h3" fontWeight="600" textAlign="left" color={'#CEFBE2'}>Quantities last 5 years </Typography>
                    <Typography sx={{ fontSize: "12px", marginTop: "10px" }} variant="body2" color="#8B8B8B">Per Tons</Typography>
                  </Box>
                  {/* <Box height="250px" mt="-20px" wh> */}
                    <CustomBarChartperQ data={QuantityListArray} />
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
                    <CustomLineChart data={GrowthValueListArray} unit="$"  strokeColor="#8950FC"/>
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
                    <CustomLineChartQ data={GrowthQuantityListArray} unit="k" strokeColor="#F4BE37"/>

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
