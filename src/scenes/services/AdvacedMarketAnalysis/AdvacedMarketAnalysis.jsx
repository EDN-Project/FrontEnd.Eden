import React, {useState, useEffect} from "react";
import "./AdvacedMarketAnalysis.css";
import Navbar from "../../../components/Navbar/Navbar/Navbar";
import images from "../../../constants/images";
import ContantUsFooter from "../../../components/Navbar/ContantUsFooter/ContantUsFooter";
import PopupModal from "../../../components/PopupModal/PopupModal";
import MainNavbar from "../../../components/Navbar/Navbar/MainNavbar/MainNavbar";
const AdvacedMarketAnalysis = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
    image: "",
    keyFeatures: [],
  });

  const openModal = (title, description, image, keyFeatures) => {
    setModalContent({title, description, image, keyFeatures});
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
    <div className='AdvacedMarketAnalysis-container'>
             { user ? (<Navbar />) : (<MainNavbar />)}


      <div className='AdvacedMarketAnalysis-container2'>
        <header className='AdvacedMarketAnalysis-header'>
          <div
            className='AdvacedMarketAnalysis-header-bg'
            style={{backgroundImage: `url(${images.AdvacedMarketAnalysis})`}}
          >
            <div className='AdvacedMarketAnalysis-header-text'>
              <h1>Advaced Market Analysis</h1>
              <p>Real-Time Market Analysis for Smarter</p>
              <p> Farming Decisions.</p>
            </div>
          </div>
        </header>

        <div className='nav-center'>
          <h2 className='main-title'>
            Know when to plant, harvest, and export for the highest .
          </h2>
          <h2 className='subtitle'>profitability</h2>
        </div>

        {/* AdvacedMarketAnalysis Cards Section */}

        <div className='monitoring-section'>
          <h2 className='section-title'>Key Features</h2>
          <div className='cards-container'>
            <div className='card gray-card '>
              <h3 className='card-title'>
                Optimal Planting & <br /> Harvesting Times
              </h3>
              <p className='card-text'>
                Know the best time to plant <br />
                and harvest based on <br />
                historical market trends <br />
                and climate conditions.
              </p>
              <div
                className='card-image'
                style={{backgroundImage: `url(${images.MonitoringCard1})`}}
              ></div>
              <div
                className='arrow'
                onClick={() =>
                  openModal(
                    "Optimal Planting & Harvesting Times",
                    "Our Optimal Planting & Harvesting Times feature helps you determine the best times to plant and harvest based on real-time data and historical trends. Maximize yield, reduce waste, and ensure healthier crops with AI-driven insights tailored to your specific conditions.",
                    images.AdvacedMarketAnalysisCardPop1,
                    [
                      {
                        title: "AI-Driven Recommendations",
                        description:
                          "Get data-backed suggestions for the best planting and harvesting periods.",
                      },
                      {
                        title: "Historical Yield Insights",
                        description:
                          "Leverage past data to improve future planting decisions.",
                      },
                      {
                        title: "Yield Forecasting",
                        description:
                          "Predict production volumes for better market planning.",
                      },
                      {
                        title: "Growth Stage Tracking",
                        description:
                          "Monitor crop development for precise harvesting.",
                      },
                    ]
                  )
                }
              >
                {" "}
              </div>
            </div>
            <div className='card gray-card '>
              <h3 className='card-title'>Top Export Destinations</h3>
              <p className='card-text'>
                Identify the best countries to export your crops based on
                demand, pricing, and trade regulations.
              </p>
              <div
                className='card-image'
                style={{backgroundImage: `url(${images.MonitoringCard1})`}}
              ></div>
              <div
                className='arrow'
                onClick={() =>
                  openModal(
                    "Top Export Destinations",
                    "Gain insights into the best global markets for your crops with real-time data on demand, pricing trends, and trade opportunities. Our system helps you identify profitable export destinations, optimize logistics, and stay ahead in the agricultural market.",
                    images.AdvacedMarketAnalysisCardPop2,
                    [
                      {
                        title: "Market Demand Analysis",
                        description:
                          " Identify the most in-demand crops in different regions.",
                      },
                      {
                        title: "Pricing Trends & Insights",
                        description:
                          "Track export prices and fluctuations across global markets.",
                      },
                      {
                        title: "Historical & Predictive Data",
                        description:
                          "Analyze past trends and forecast future market potential.",
                      },
                      {
                        title: "Competitor Analysis",
                        description:
                          " Understand market competition and positioning.",
                      },
                    ]
                  )
                }
              >
                {" "}
              </div>
            </div>
            <div className='card gray-card '>
              <h3 className='card-title'>
                Real-Time Market
                <br /> Insights
              </h3>
              <p className='card-text'>
                Stay updated with live price trends, supply-demand fluctuations,
                <br /> and emerging
                <br /> opportunities
              </p>
              <div
                className='card-image'
                style={{backgroundImage: `url(${images.MonitoringCard1})`}}
              ></div>
              <div
                className='arrow'
                onClick={() =>
                  openModal(
                    "Real-Time Market Insights",
                    "Stay ahead with live updates on market trends, pricing fluctuations, and demand shifts. Our system provides real-time data on crop values, emerging opportunities, and competitive analysis, helping you make informed decisions to maximize profitability and optimize your export strategy.",
                    images.AdvacedMarketAnalysisCardPop3,
                    [
                      {
                        title: "Live Price Tracking",
                        description:
                          " Get real-time updates on crop prices across different markets.",
                      },
                      {
                        title: "Demand Analysis",
                        description:
                          ": Identify the most in-demand crops and emerging market opportunities..",
                      },
                      {
                        title: "Historical Data Comparison",
                        description:
                          "Analyze past trends to predict future market fluctuations.",
                      },
                      {
                        title: "Smart Recommendations",
                        description:
                          "Receive AI-driven insights on the best selling times and locations.",
                      },
                    ]
                  )
                }
              ></div>
            </div>
            <div className='card gray-card '>
              <h3 className='card-title'>
                Climate & Season-Based <br /> Recommendations
              </h3>
              <p className='card-text'>
                Get tailored advice on which crops thrive best in specific
                seasons <br /> and regions.
              </p>
              <div
                className='card-image'
                style={{backgroundImage: `url(${images.MonitoringCard1})`}}
              ></div>
              <div
                className='arrow'
                onClick={() =>
                  openModal(
                    "Climate & Season-Based  Recommendations",
                    "Optimize your farming with AI-driven insights tailored to seasonal and climatic conditions. Get personalized recommendations on the best crops to plant, ideal harvesting periods, and climate-adaptive strategies to maximize yield and sustainability. Stay ahead with data-backed decisions for every season and for each market!",
                    images.AdvacedMarketAnalysisCardPop3,
                    [
                      {
                        title: "Seasonal Crop Suggestions",
                        description:
                          "Get tailored recommendations for the best crops to grow based on climate conditions.",
                      },
                      {
                        title: "Optimal Planting & Harvesting Windows",
                        description:
                          "Receive insights on the best time frames for planting and harvesting.",
                      },
                      {
                        title: "Consumer Preference Insight",
                        description:
                          "Understand what crops are in high demand for better planning.",
                      },
                      {
                        title: "Historical Price Trends ",
                        description:
                          "Analyze past market data to predict future price movements.",
                      },
                    ]
                  )
                }
              >
                {" "}
              </div>
            </div>
          </div>
          <h1 className='footer-text'>
            Experience Precision Farming with Eden’s Modular System. Access only
            the tools you need
            <br /> Irrigation, AdvacedMarketAnalysis, Mapping, Tasks, and more
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

export default AdvacedMarketAnalysis;
