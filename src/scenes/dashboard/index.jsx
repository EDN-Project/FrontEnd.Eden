
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
  const typecode = sessionStorage.getItem("typecode");
  const Country = sessionStorage.getItem("selectedCountry");
  
  if (typecode) setTypecode(typecode);
  if (Country) setCountry(Country);

  // console.log('typecode, Country---->', typecode, Country);
}, []);


const [typecode, setTypecode] = useState("");
const [Country, setCountry] = useState("");
const [PriceslistArray, setPriceslistArray] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        const data = await getCountryQuantity(typecode, Country);
        if (data) {
            const formattedData = Object.keys(data)
                .slice(-5)  
                .map(year => ({
                    year: year,
                    quantity: data[year]
                }));
            setQuantityListArray(formattedData);
        }
    };

    // console.log('QuantityListArray---->', QuantityListArray);

    fetchQuantityData();
}, [typecode, Country]);




const [GrowthValueListArray, setGrowthValueListArray] = useState([]);




useEffect(() => {
  const fetchGrowthData = async () => {
      const data = await getCountryGrowthValue(typecode, Country);
      if (data) {
          const formattedData = Object.keys(data)
              .map(Number) // تحويل المفاتيح إلى أرقام
              .sort((a, b) => a - b) // ترتيبها تصاعديًا
              .slice(-5)  // أخذ آخر 5 سنوات
              .map(year => ({
                  year: year.toString(),  // تحويله لنص ليكون متوافقًا مع الرسوم البيانية
                  growthValue: data[year]
              }));

          setGrowthValueListArray(formattedData);
          // console.log('GrowthValueListArray---->', GrowthValueListArray);
      }
  };

  fetchGrowthData();
}, [typecode, Country]);


 

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



const [GrowthQuantityListArray, setGrowthQuantityListArray] = useState([]);

  useEffect(() => {
    const fetchGrowthDataQuantity = async () => {
        const data = await getCountryGrowthQuantity(typecode, Country);
        if (data) {
            const formattedData = Object.keys(data)
                .map(Number) // تحويل المفاتيح إلى أرقام
                .sort((a, b) => a - b) // ترتيبها تصاعديًا
                .slice(-5)  // أخذ آخر 5 سنوات
                .map(year => ({
                    year: year.toString(),  // تحويله لنص ليكون متوافقًا مع الرسوم البيانية
                    growthQuantity: data[year]
                }));
  
                setGrowthQuantityListArray(formattedData);
            console.log('GrowthQuantityListArray---->', GrowthQuantityListArray);
        }
    };
  
    fetchGrowthDataQuantity();
  }, [typecode, Country]);
  
  
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
