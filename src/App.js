import {useEffect, useState , } from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "./theme";
import Calendar from "./scenes/calendar/calendar";
import DashboardPage from "./scenes/DashboardPage/DashboardPage";
import Home from "./scenes/Home/Home";
import Login from "./scenes/Login/Login";
import SignUp from "./scenes/SignUp/SignUp";
import ForgetPassword from "./scenes/ForgetPassword/ForgetPassword";
import ResetPassword from "./scenes/ResetPassword/ResetPassword";
import AboutContactUs from "./scenes/AboutContactUs/AboutContactUs";
import Pricing from "./scenes/Pricing/Pricing";
import Monitoring from "./scenes/services/Monitoring/Monitoring";
import AdvacedMarketAnalysis from "./scenes/services/AdvacedMarketAnalysis/AdvacedMarketAnalysis";
import Detectdiseases from "./scenes/services/Detectdiseases/Detectdiseases";
import Plant from "./scenes/dashboard/Plant";
import CropManagement from "./scenes/CropManagement/CropManagement";
import Report from './scenes/Report/Report'
import HealthPrediction  from "./scenes/HealthPrediction/HealthPrediction";
import AOS from "aos";
import "aos/dist/aos.css";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


  
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: false, // Whether to animate elements only once
    });
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth"
    });
  }, [location]);


  return (
      

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        {/* <div className="app"> */}
        {/* <Sidebar isSidebar={isSidebar} /> */}
        {/* <main className="content"> */}
        {/* <Topbar setIsSidebar={setIsSidebar} /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/about' element={<AboutContactUs />} />

          <Route path='/services/monitoring' element={<Monitoring />} />
          <Route
            path='/services/advacedmarketanalysis'
            element={<AdvacedMarketAnalysis />}
          />
          <Route path='/services/detectdiseases' element={<Detectdiseases />} />

          <Route path='/Pricing' element={<Pricing />} />
          {/* <Route path='/PaymentPage' element={<PaymentPage />} /> */}


          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/team' element={<Team />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/invoices' element={<Invoices />} />
          <Route path='/form' element={<Form />} />
          <Route path='/bar' element={<Bar />} />
          <Route path='/pie' element={<Pie />} />
          <Route path='/line' element={<Line />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/DashboardPage' element={<DashboardPage />} />
          <Route path='/CropManagement' element={<CropManagement />} />
          <Route path='/Report' element={<Report />} />
          <Route path='/HealthPrediction' element={<HealthPrediction />} />
          <Route path='/geography' element={<Geography />} />
          <Route path='/Plant' element={<Plant />} />

        </Routes>
        {/* </main> */}
        {/* </div> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
