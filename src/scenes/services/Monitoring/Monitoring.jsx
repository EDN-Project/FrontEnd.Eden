import React, { useState, useEffect } from "react";
import "./Monitoring.css";
import Navbar from "../../../components/Navbar/Navbar/Navbar";
import images from "../../../constants/images";
import ContantUsFooter from "../../../components/Navbar/ContantUsFooter/ContantUsFooter";
import PopupModal from "../../../components/PopupModal/PopupModal";
import MainNavbar from "../../../components/Navbar/Navbar/MainNavbar/MainNavbar";
const Monitoring = () => {

const [modalOpen, setModalOpen] = useState(false);
const [modalContent, setModalContent] = useState({
  title: "",
  description: "",
  image: "",
  keyFeatures: []
});


const openModal = (title, description, image, keyFeatures) => {
  setModalContent({ title, description, image, keyFeatures });
  setModalOpen(true);
};

// دالة إغلاق المودال
const closeModal = () => {
  setModalOpen(false);
};

const [user, setUser] = useState(null);
  
    useEffect(() => {
      
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      
    }, []); 
    
    useEffect(() => {
      // console.log("User State:", user);
      // console.log("Updated User State:", user);
    }, [user]); 

  

  return (
    <>
    
    <div className="Monitoring-container">
           { user ? (<Navbar />) : (<MainNavbar />)}


      <div className="Monitoring-container2">
        <header className="Monitoring-header">
          <div className="Monitoring-header-bg" style={{ backgroundImage: `url(${images.Monitoring})` }}>
            <div className="Monitoring-header-text">
              <h1>Monitoring</h1>
              <p>Stay in Control, Anytime, Anywhere</p>
              <p>Real-Time Monitoring for Smarter Farming</p>
            </div>
          </div>
        </header>

        <div className="nav-center">
          <h2 className="main-title">Always Watching, Always Optimizing</h2>
          <h2 className="subtitle">Smarter Monitoring for Healthier Crops and Stronger Yields</h2>

        
        
        </div>

        {/* Monitoring Cards Section */}
       

        <div className="monitoring-section">
      <h2 className="section-title">Key Features</h2>
      <div className="cards-container">
        <div className="card gray-card">
          <h3 className="card-title">Environmental <br /> Dashboard</h3>
          <p className="card-text">Track sensor data,<br /> environmental changes,<br /> and fertilization plans—all<br /> in one smart dashboard.</p>
          <div className="card-image" style={{ backgroundImage: `url(${images.MonitoringCard1})`  }}></div>
          <div className="arrow" 
        onClick={() => openModal(
          "Environmental Dashboard",
          "Our IoT Monitoring Dashboard provides real-time insights into moisture, temperature, humidity, and fertilization plans, ensuring optimal plant health. Stay informed and make data-driven decisions—all in one powerful, user-friendly interface!",
          images.MonitoringCardPop1,
          [
            { title: "Real-Time Environmental Tracking", description: "Monitor temperature, humidity, moisture, and other key conditions." },
            { title: "Sensor Data Visualization", description: "View live data from IoT sensors in an interactive, easy-to-read format." },
            { title: "Historical Data Analysis", description: "Access past records to track trends and optimize future farming decisions." },
            { title: "Fertilization Plan", description: "Keep track of fertilization schedules and nutrient levels." }
          ]
        )}
          > </div>
        </div>
        <div className="card gray-card">
          <h3 className="card-title">Smart Irrigation & Fertilization</h3>
          <p className="card-text">Optimize water and nutrient delivery <br /> with real-time monitoring and <br />  automated control for <br /> healthier, more efficient<br />  growth!</p>
          <div className="card-image" style={{ backgroundImage: `url(${images.MonitoringCard1})`  }}></div>
          <div className="arrow" onClick={() => openModal(
                "Smart Irrigation & Fertilization",
                "Our Smart Irrigation & Fertilization system optimizes water and nutrient delivery based on real-time and environmental data. By automating irrigation schedules and fertilization plans, it ensures efficient resource use, healthier plants, and higher yields—all while reducing waste and operational costs.",
                images.MonitoringCardPop2,
                [
                  { title: "Automated Irrigation Scheduling", description: "Adjusts water delivery based on real-time soil moisture and weather conditions." },
                  { title: "Precision Fertilization", description: " Delivers the right amount of nutrients at the right time to enhance plant growth." },
                  { title: "Water Usage Optimization ", description: "Reduces water waste by applying only the needed amount." },
                  { title: "Customizable Plans", description: "Allows users to set irrigation and fertilization schedules based on plant type and growth stage." }

                ]
              )}
          > </div>
        </div>
        <div className="card gray-card">
          <h3 className="card-title">Analytics & <br /> Reports</h3>
          <p className="card-text">Gain valuable insights with detailed <br /> analytics and reports, <br /> helping you make <br />data-driven decisions for <br />  better crop management!</p>
          <div className="card-image" style={{ backgroundImage: `url(${images.MonitoringCard1})`  }}></div>
          <div className="arrow" onClick={() => openModal(
                "Analytics & Reports",
                "Our Analytics & Reports feature provides in-depth insights into your farm’s performance. Track key metrics like plant health, water usage, and fertilization efficiency. Generate detailed reports and visual trends to optimize decision-making and improve productivity. Stay data-driven and maximize your yield with actionable insights.",
                images.MonitoringCardPop3,
                [
                  { title: "Customizable Reports", description: "Generate detailed reports based on selected parameters." },
                  { title: "Predictive Analytics", description: "Forecast future conditions based on data trends." },
                  { title: "Performance Metrics", description: "Assess crop yield, resource efficiency, and overall farm health." },
                  { title: "Export & Share Reports ", description: " Easily download or share reports for better collaboration." },

                ]
              )}>
          
          </div>
        </div>
        <div className="card gray-card">
          <h3 className="card-title">Alerts & <br /> Notifications</h3>
          <p className="card-text">Stay informed and manage <br />  your farm efficiently with <br />  real-time updates on <br /> environmental changes <br /> and plant needs!</p>
          <div className="card-image" style={{ backgroundImage: `url(${images.MonitoringCard1})`  }}></div>
          <div className="arrow" 
          onClick={() => openModal(
            "Alerts & Notifications",
            "Alerts & Notifications keep you informed of critical changes in your farm. Get instant updates on environmental shifts, irrigation schedules, and fertilization needs. Stay proactive with real-time notifications, ensuring optimal plant health and efficient farm management.",
            images.MonitoringCardPop4,
            [
              { title: "Abnormal Condition Detection ", description: "Get notified of unexpected changes affecting plant health." },
              { title: "Historical Alerts Log", description: "Track past notifications for better analysis and decision-making." },
              { title: "Customizable Preferences", description: "Choose alert types and frequency to suit your needs." },
              { title: "Fertilization & Irrigation Reminders", description: "Stay on schedule with timely alerts." },

            ]
          )}
          > </div>
        </div>
      </div>
      <h1 className="footer-text">Experience Precision Farming with Eden’s Modular System. Access only the tools you need 
      <br /> Irrigation, Monitoring, Mapping, Tasks, and more
</h1>


    
    </div>

      </div>

   
  {/* <div className="relative z-50"> */}
  <PopupModal 
    isOpen={modalOpen} 
    onClose={closeModal} 
    title={modalContent.title} 
    description={modalContent.description} 
    image={modalContent.image} 
    keyFeatures={modalContent.keyFeatures} 
    style={{zIndex: 9999999999999}}
  />
{/* </div> */}

      <ContantUsFooter />
    </div>


   

      {/* Pop up modales */}

    
</>
  );
};

export default Monitoring;



