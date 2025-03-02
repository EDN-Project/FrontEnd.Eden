import React, { useState, useEffect } from "react";
import "./Detectdiseases.css";
import Navbar from "../../../components/Navbar/Navbar/Navbar";
import images from "../../../constants/images";
import ContantUsFooter from "../../../components/Navbar/ContantUsFooter/ContantUsFooter";
import PopupModal from "../../../components/PopupModal/PopupModal";
import MainNavbar from "../../../components/Navbar/Navbar/MainNavbar/MainNavbar";
const Detectdiseases = () => {

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
        console.log("User State:", user);
        // console.log("Updated User State:", user);
      }, [user]); 

  return (
    <div className="Detectdiseases-container">
                { user ? (<Navbar />) : (<MainNavbar />)}


      <div className="Detectdiseases-container2">
        <header className="Detectdiseases-header">
          <div className="Detectdiseases-header-bg" style={{ backgroundImage: `url(${images.Detectdiseases})` }}>
            <div className="Detectdiseases-header-text">
              <h1>Detect diseases</h1>
              <p>Disease Detection for Stronger, </p>
              <p>Healthier Crops.</p>
            </div>
          </div>
        </header>

        <div className="nav-center">
          <h2 className="main-title">AI-powered detection for faster, smarter disease </h2>
          <h2 className="subtitle">management</h2>

        
        
        </div>

        {/* Detectdiseases Cards Section */}
       

        <div className="monitoring-section">
      <h2 className="section-title">Key Features</h2>
      <div className="cards-container">
        <div className="card gray-card">
          <h3 className="card-title">Early Disease <br/> Detection</h3>
          <p className="card-text">Our AI model identifies lettuce<br/> diseases at an early stage,<br/> allowing farmers to <br/>take action before<br/> it's too late</p>
          <div className="card-image" style={{ backgroundImage: `url(${images.MonitoringCard1})`  }}></div>
          <div className="arrow" 
        onClick={() => openModal(
          "Early Disease Detection",
          "Detect plant diseases at an early stage with advanced monitoring and AI-powered analysis. Our system continuously tracks plant health indicators, identifying potential issues before they spread. By leveraging real-time sensor data and predictive analytics, you can take proactive measures to protect your crops, reduce losses, and ensure healthier yields.",
          images.AdvacedMarketAnalysisCardPop3,
          [
            { title: "Real-Time Health Monitoring", description: " Continuously tracks plant health indicators using IoT sensors." },
            { title: "Predictive Analytics", description: " Identifies disease risks based on environmental conditions and historical data." },
            { title: "Image-Based Detection", description: "Uses computer vision to analyze plant symptoms and detect abnormalities." },
            { title: "Integration with Treatment Plans", description: "Suggests optimal disease control strategies based on data." }
          ]
        )}
          > </div>
        </div>

        <div className="card gray-card ">
          <h3 className="card-title">Image-Based <br/> Diagnosis</h3>
          <p className="card-text">Simply upload a photo of your lettuce, and the system will instantly <br/> analyze and detect any <br/> potential diseases.</p>
          <div className="card-image" style={{ backgroundImage: `url(${images.MonitoringCard1})`  }}></div>
          <div className="arrow" onClick={() => openModal(
                "Image-Based Diagnosis",
                "Leverage AI-powered image analysis to detect plant diseases with high accuracy. By capturing and analyzing plant images, the system identifies early symptoms, classifies diseases, and suggests tailored treatment plans. Enhance precision farming with automated, data-driven insights for healthier crops and higher yields.",
                images.AdvacedMarketAnalysisCardPop2,
                [
                  { title: "AI-Powered Image Analysis", description: " Detects plant diseases with high accuracy." },
                  { title: "Automated Symptom Identification", description: "Recognizes early signs of diseases through image recognition." },
                  { title: "Disease Classification", description: " Categorizes diseases and provides severity levels." },
                  { title: "Treatment Recommendations", description: " Suggests tailored solutions based on diagnosis." }

                ]
              )}
          > </div>
        </div>
        
      </div>
      <h1 className="footer-text">Experience Precision Farming with Eden’s Modular System. Access only the tools you need 
      <br /> Irrigation, Detectdiseases, Mapping, Tasks, and more
</h1>


    
    </div>

      </div>

      

      {/* Pop up modales */}

      <PopupModal 
  isOpen={modalOpen} 
  onClose={closeModal} 
  title={modalContent.title} 
  description={modalContent.description} 
  image={modalContent.image} 
  keyFeatures={modalContent.keyFeatures} 
/>


      <ContantUsFooter />
    </div>
  );
};

export default Detectdiseases;



