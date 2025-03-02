import React , { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar/Navbar";
import ContantUsFooter from "../../components/Navbar/ContantUsFooter/ContantUsFooter";
import MainNavbar from "../../components/Navbar/Navbar/MainNavbar/MainNavbar";
import images from "../../constants/images";
import LightHoverbg from "../../utils/HoverBg/HoverBg";
import { getUserData } from "../../constants/api";
const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("userData");
  
      if (storedUser) {
        console.log("User Loaded from LocalStorage:", storedUser);
        setUser(JSON.parse(storedUser));
      } else {
        try {
          const userData = await getUserData();
          if (userData) {
            localStorage.setItem("userData", JSON.stringify(userData));
            setUser(userData);
            console.log("User Data Fetched from API:", userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
  
    fetchUser();
  }, []); 
  
  useEffect(() => {
    console.log("User State:", user);
    // console.log("Updated User State:", user);
  }, [user]); 
  

  const handleNavigateToDashboard = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  const handleNavigateToMonitoring = () => {
    navigate("/services/monitoring");
  };

  const handleNavigateToAdvacedMarketAnalysis = () => {
    navigate("/services/AdvacedMarketAnalysis");
  };

  const handleNavigateTodetectdiseases = () => {
    navigate("/services/detectdiseases");
  };


  const [bgColor, setBgColor] = useState("bg-gray-300");

  const boxes = [
    { text: "Identifying the best time to sell for maximum profit", color: "#87AECE" },
    { text: "Analyzing plant data to detect diseases early", color: "#F5F3D8" },
    { text: "Monitoring plant health through smart sensors", color: "#8F8E7E" },
  ];

  
  return (
    <div className='homeContainer '>
      <div className='fixed top-0 left-0'>
        <LightHoverbg />
      </div>
  { user ? (<Navbar />) : (<MainNavbar />)}
      

      <div className="relative z-10">

      <div id='firstpage' className='hero'>
        <div className='contentHome'>
          <h1
            className='!text-6xl leading-normal font-semibold'
            data-aos='fade-down'
          >
            Unlock the True Potential of Your Farm <br /> with Eden
          </h1>
          <p data-aos='fade-up' data-aos-delay='200'>
            Monitor Crops, Boost Yields, and Optimize Resources with Precision
            Agriculture
          </p>
        </div>
      </div>

      <div
        className='holographic-container'
        data-aos='fade-right'
        data-aos-delay='400'
      >
        <div className='holographic-card' onClick={handleNavigateToDashboard}>
          <h2>Get Started</h2>
        </div>
      </div>

      {/* section2 container */}

      <div className='section2-images-container'>
        {/* الصورتان */}
        <img
          src={images.testimage2}
          alt='Left Side'
          className='leftImage-section2'
        />
        <img
          src={images.testimage1}
          alt='Right Side'
          className='rightImage-section2'
        />
      </div>

      {/* section3 container our services */}

      <div id="services" className='services-container'>
        <div className='service-box'>
          <span className='service-number'>01</span>
          <h3 className='gradient-text'>Collect Data</h3>
        </div>
        <div className='service-box'>
          <span className='service-number'>02</span>
          <h3 className='gradient-text'>AI & Analysis</h3>
        </div>
        <div className='service-box'>
          <span className='service-number'>03</span>
          <h3 className='gradient-text'>Take Actions</h3>
        </div>
        <div className='service-box'>
          <span className='service-number'>04</span>
          <h3 className='gradient-text'>Generate Reports</h3>
        </div>
      </div>

      <div className='hero'>
        <div className='contentHome'>
          <h1 data-aos='fade-right'>Less Land, More Yield, Zero Waste!</h1>
          <p>Optimizing growth with data, AI, and IoT solutions!</p>
        </div>
      </div>

      {/* section4 container  */}

      {/* New Section - Updated Layout */}
      <div className='new-services-section'>
        {/* First Full-Width Card */}
        <div data-aos='fade-right' className='service-card full-width green-bg'>
          <div className='text-content'>
            <h3>Track Your Farm With IOT System</h3>
            <button
              onClick={handleNavigateToMonitoring}
              className='learn-more-btn'
            >
              Learn More
            </button>
          </div>
          <div className='image-placeholder'>
            <img
              src={images.iotimage}
              alt='Image 1'
              style={{
                width: "420px",
                position: "absolute",
                bottom: "-20px",
                right: "-4px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Two Half-Width Cards */}
        <div data-aos='fade-left' className='half-container'>
          <div className='service-card half-width blue-bg'>
            <div className='text-content'>
              <h3>Advanced Market Analysis</h3>
              <button
                onClick={handleNavigateToAdvacedMarketAnalysis}
                className='learn-more-btn'
              >
                Learn More
              </button>
            </div>
            <div className='image-placeholder'>
              <img
                src={images.analyzeimge}
                alt='Image 2'
                style={{
                  width: "330px",
                  // height:'200px',
                  position: "absolute",
                  bottom: "-20px",
                  right: "-20px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div className='service-card half-width brown-bg'>
            <div className='text-content'>
              <h3>Detect diseases & Ensure care for crops.</h3>
              <button
                onClick={handleNavigateTodetectdiseases}
                className='learn-more-btn'
              >
                Learn More
              </button>
            </div>
            <div className='image-placeholder'>
              <img
                src={images.iotplant}
                alt='Image 3'
                style={{
                  width: "320px",
                  // height:'200px',
                  position: "absolute",
                  bottom: "-20px",
                  right: "-20px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>



      {/* مممم */}


      <div className="container-cse3">
  <div className="content-cse3">
    {/* Large Box with Dynamic Background */}
    <div className="large-box-cse3" style={{ backgroundColor: bgColor }}></div>

    {/* Small Boxes */}
    <div className="small-boxes-cse3">
      {boxes.map((box, index) => (
        <div
          key={index}
          className="small-box-cse3"
          style={{ backgroundColor: box.color }}
          onMouseEnter={() => setBgColor(box.color)}
          onMouseLeave={() => setBgColor("#f0f0f0")} // اللون الافتراضي عند ترك العنصر
        >
          {box.text}
        </div>
      ))}
    </div>
  </div>
</div>

        
      {/* section5 container */}

      <div className='section5-images-container'>
        <div className='service-card-section5 full-width-section5  section5-bg'>
          <div className='text-content-section5'>
            <h3>Get the best price for your agricultural needs</h3>
            <p>
              Choose the perfect plan for your farming needs! Get valuable
              agricultural insights. upgrade to our premium packages for
              exclusive real-time insights and the latest seasonal data!
            </p>
            <button style={{ marginTop: "80px" ,
            borderWidth: '0.1px',
            borderStyle: 'solid',
            borderColor: '#000000',

            }} className='Subscribe-btn'>Subscribe Now!</button>
          </div>
          <div className='image-placeholder-section5'>
            <img
              src={images.Maskgroup}
              alt='Image 1'
              style={{
                width: "70%",
                height: "100%",
                position: "absolute",
                right: "20px",
                top: "0",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>

      <div className='containercont'>
        <h2>Do you want a more suitable solution for you?</h2>
        <p>
          Our platform is designed to provide tailored solutions for modern
          farming challenges. Whether you aim to optimize resources, boost
          productivity, or align with market trends, we offer advanced tools and
          insights to help you succeed. Embrace the future of agriculture with
          solutions built for your unique needs.
        </p>
        <a href='/about' id='contactBtn'>
          Contact Us
        </a>
      </div>

      <ContantUsFooter />

      
    </div>
    </div>
  );
};

export default Home;
