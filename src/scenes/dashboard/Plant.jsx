

import { useState, useEffect } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
import CustomBarChart2 from "../../components/CustomBarChart2";
import { getTopImporters,sendCountry,getRecommendedMonth } from "../../constants/api";
import { CircularProgress } from "@mui/material";
import CustomLineChartRecom from "../../components/CustomLineChartRecom";


const Plant = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isSidebar, setIsSidebar] = useState(true);
    const [colorMode] = useMode();
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [loading, setLoading] = useState(false);


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCode, setSelectedCode] = useState("");
    const [importersData, setImportersData] = useState([]);

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // console.log("Extracted countries:--.", countries);
// console.log("Chart Data:", chartData);
        setChartData(importersData);
    }, [importersData]);



    useEffect(() => {
        setLoading(true);
        if (!selectedDate) return; 
    
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getTopImporters(selectedDate, selectedCode);
                console.log("Received data:", response);
    
                if (!response || !response.top_importers || !response.countries) {
                    console.warn("⚠️ No data received from API");
                    setImportersData([]);
                    setCountries([]); 
                    setLoading(false);
                } else {
                    setCountries(response.countries);
    
                    const transformedData = response.top_importers.reduce((acc, item) => {
                        const { year, Importers, quantity } = item;
    
                        if (!acc[year]) {
                            acc[year] = { year };
                        }
    
                        acc[year][Importers] = quantity;
                        return acc;
                    }, {});
    
                    setImportersData(Object.values(transformedData));
                }
            } catch (error) {
                console.error("Error fetching top importers:", error);
                setImportersData([]);
                setCountries([]);
                setLoading(false);
            }
            setLoading(false); 
        };


    
        fetchData();
    }, [selectedDate, selectedCode]);
    
    
    const [typecode, setTypecode] = useState("");
    const [countryData, setCountryData] = useState(null); 

    const handleCountryChange = async (e) => {
        const newCountry = e.target.value;
        setSelectedCountry(newCountry);
    
        try {
            const response = await sendCountry(newCountry); 
            if (response) {
                setCountryData(response);
                // console.log("✅ Country data received:", response);
                setTypecode(response?.code);

            } else {
                console.warn("⚠️ No data received from API.");
            }
        } catch (error) {
            console.error("❌ Error sending country data:", error);
        }
    };
    





    useEffect(() => {
        if (!selectedCountry) return;
    
        const fetchRecommendedMonth = async () => {
            const data = await getRecommendedMonth(selectedCountry);
            if (data) {
                console.log("📌 Recommended Month Data:", data);
    
                const formattedData = [
                    { month: "Current Month", value: data?.sum_current_month },
                    { month: "Next Month", value: data?.sum_next_month },
                    { month: "After Next Month", value: data?.sum_after_next_months }
                ];
    
                setDataDiffInPrices(formattedData);
            }
        };

        console.log("DataDiffInPrices:", DataDiffInPrices);
    
        fetchRecommendedMonth();
    }, [selectedCountry]);
    
    
    const [DataDiffInPrices, setDataDiffInPrices] = useState([]);



    useEffect(() => {
        const typecode = sessionStorage.getItem("typecode");
        const savedCrop = sessionStorage.getItem("selectedCode");
        const savedDate = sessionStorage.getItem("selectedDate");
        // const savedCountry = sessionStorage.getItem("selectedCountry");
        const savedLocation = sessionStorage.getItem("selectedLocation");

        if (savedCrop) setSelectedCode(savedCrop);
        if (typecode) setSelectedCode(typecode);
        if (savedDate) setSelectedDate(new Date(savedDate));
        // if (savedCountry) setSelectedCountry(savedCountry);
        if (savedLocation) setSelectedLocation(savedLocation);
    }, []);

    useEffect(() => {
        if(typecode)  sessionStorage.setItem("typecode", typecode);
        if (selectedCode) sessionStorage.setItem("selectedCode", selectedCode);
        if (selectedDate) sessionStorage.setItem("selectedDate", selectedDate.toISOString());
        // if (selectedCountry) sessionStorage.setItem("selectedCountry", selectedCountry);
        if (selectedLocation) sessionStorage.setItem("selectedLocation", selectedLocation);
    }, [selectedCode, selectedDate, selectedCountry, selectedLocation]);




    return (
        <ColorModeContext.Provider value={colorMode} >
            <ThemeProvider theme={theme}>

                <div className="app" style={{ backgroundColor: "#121212",
                    // hight: '100vh',
                    minHeight: '100vh',
                 }}>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content" backgroundColor={'#1F1F1F'} 
                    style={{ 
                        hight: '100vh', }}
                    >
                        <Topbar setIsSidebar={setIsSidebar} />

                        <Box m="20px">

                            <Box >
                                <Typography
                                    variant="h1"
                                    color={'#CEFBE2'}
                                    fontWeight="bold"
                                    align='left'
                                    sx={{ m: "0 0 5px 0" }}
                                >
                                    {'Plant the Right Crop at the Right Time!'}
                                </Typography>
                                <Typography style={{
                                    margin: "0 0 10px 0",
                                    textAlign: "left",
                                    fontSize: "25px"
                                }} variant="h3" color={'#ffff'}>
                                    {'Enter Your Crop Details'}
                                </Typography>
                            </Box>

                            <Box mt='30px' display="flex" gap="20px" mb="50px" alignItems="center">
                                <Box display="flex" gap="20px" alignItems="center">
                                    <Typography
                                        style={{
                                            fontWeight: "bold"
                                        }}
                                        variant="h3" color={'#8B8B8B'}>
                                        Type</Typography>
                                    <select
                                        value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}
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
                                        <option value="081110">{'frozen'}</option>
                                        <option value="081010">{'fresh'}</option>
                                    </select>
                                </Box>

                                <Box display="flex" gap="20px" alignItems="center">
                                    <Typography
                                        style={{
                                            fontWeight: "bold"
                                        }}
                                        variant="h3" color={'#8B8B8B'}
                                    >Location</Typography>
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
                                        value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                                        <option value="Spain">Cairo</option>
                                        <option value="USA">gharbia</option>
                                        <option value="Brazil">alex</option>
                                    </select>
                                </Box>

                                <Box display="flex" gap="10px" alignItems="center">
                                    <Typography
                                        style={{
                                            fontWeight: "bold"
                                        }}
                                        variant="h3"
                                        color={'#8B8B8B'}
                                    >
                                        When
                                    </Typography>

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={["year", "month", "day"]}
                                            value={selectedDate}
                                            onChange={(date) => setSelectedDate(date)}
                                            sx={{
                                                backgroundColor: "#3F3F3F",
                                                color: "#FFF",
                                                border: "none",
                                                borderRadius: "5px",
                                                padding: "3px 8px",
                                                fontSize: "20px",
                                                cursor: "pointer",
                                                outline: "none",
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "none"
                                                },
                                                "& .MuiInputBase-root": {
                                                    height: "35px"
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>

                                    {selectedDate && (
                                        <Typography
                                            style={{
                                                // marginLeft: "20px",
                                                fontFamily: 'poppins',
                                                fontWeight: "bold"

                                            }}
                                            variant="h4"
                                            color={'#575757'}
                                        >
                                            Expected Harvest Date: {selectedDate.toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </Typography>
                                    )}
                                </Box>



                            </Box>


                            {selectedCode && selectedDate && (

                                <>

{loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                        <CircularProgress size={50} color="secondary" />
                    </Box>
                ) : 

                                    chartData?.length > 0 ? (

                           
                                        <Box 
                                         display="flex" justifyContent="space-between" gap="20px">

                                            <Box
                                            
                                                flex="1"
                                       
                                            >

                                                <Box display="flex" alignItems="center" gap="10px">
                                                    <Typography m='20px' variant="h2" fontWeight="600" textAlign="left" color={'#CEFBE2'}>Market Demand & Insights
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    width={'100%'}
                                                    flex="1"
                                                    backgroundColor={'#282828'}
                                                    borderRadius="20px"
                                                    padding="20px"
                                                >
                                                    <Box display="flex" alignItems="center" gap="10px">
                                                        <Typography variant="h2" fontWeight="600" textAlign="left" color={'#CEFBE2'}>Top 5 Countries</Typography>
                                                        <Typography sx={{ fontSize: "12px", marginTop: "10px" }} variant="body2" color="#8B8B8B">Per Tons</Typography>
                                                    </Box>
                                                    <CustomBarChart2 data={chartData} />
                                                </Box>




                                                <Box
    sx={{
        marginBottom: "80px",
        marginTop: "10px",
    }}
    padding="30px"
    display="flex"
    gap="20px"
    alignItems="center"
>
    <Typography
        style={{
            fontWeight: "bold",
        }}
        variant="h2"
        color={'#8B8B8B'}
    >
        Countries
    </Typography>
    <select
        style={{
            backgroundColor: "#3F3F3F",
            color: "#FFFF",
            border: "none",
            borderRadius: "5px",
            padding: "5px 5px",
            fontSize: "16px",
            cursor: "pointer",
            outline: "none",
            // width: "250px",
        }}
        value={selectedCountry}
        onChange={handleCountryChange}
    >
        <option style={{}} value="">Select a country</option> 
        {countries.map((country, index) => (
            <option key={index} value={country}>
                {country}
            </option>
        ))}
    </select>
</Box>


                                            </Box>



                                        {selectedCountry && (
                                             <Box
                                             flex="1"
                                         >
                                             <Box display="flex" alignItems="center" gap="10px">
                                                 <Typography m='20px' variant="h2" fontWeight="600" textAlign="left" color={'#CEFBE2'}>Recommendations & Actions
                                                 </Typography>
                                             </Box>
                                             <Box
                                                 flex="1"
                                                 backgroundColor={'#282828'}
                                                 borderRadius="20px"
                                                 padding="10px"
                                                 sx={{ marginBottom: "30px" }}

                                             >
{DataDiffInPrices && DataDiffInPrices?.length > 0 ? (
    <CustomLineChartRecom data={DataDiffInPrices} unit="K" strokeColor="#8884d8" />
) : (
    <Typography color="gray" textAlign="center" fontSize="20px">
        No data available for this country.
    </Typography>
)}


                                             </Box>


                                             <Typography
                                                 padding="20px"
                                                 variant="h3" color={'#CEFBE2'}
                                             >

This chart allows you to observe the country's demand in the upcoming months, not just during the expected harvest month. If the highest values appear in the following months, it may be wise to delay planting slightly to increase the chances of selling at better prices and maximizing profits.
                                             </Typography>

                                         </Box>
                                            
                                        )}
                                           
                                        </Box>

                                    ) :
                                    (
                                        <Typography color="gray" textAlign="center" fontSize="20px">
                                           No data received from API
                                        </Typography>
                                    )}



{/* receive_country */}    

{selectedCountry && (
          
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                        padding="20px"
                                    //   marginTop="20px"
                                    >
                                        
                                      <button
                                      style={{
                                          backgroundColor: "#717171",
                                          color: "#CEFBE2",
                                          border: "none",
                                          borderRadius: "8px",
                                          padding: "12px 24px",
                                          fontSize: "18px",
                                          fontWeight: "bold",
                                          cursor: "pointer",
                                          transition: "all 0.3s ease",
                                          ":hover": { backgroundColor: "#5A5A5A" } // إضافة تأثير hover
                                      }}
                                      onClick={() => navigate("/dashboard")}
                                  >
                                      Next
                                  </button>
                                  
                                    </Box>


                                    )}



                                </>

                            )}




                        </Box>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Plant;
