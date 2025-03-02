import React, { useState, useEffect } from "react";
import "./Pricing.css";
import Navbar from "../../components/Navbar/Navbar/Navbar";
import MainNavbar from "../../components/Navbar/Navbar/MainNavbar/MainNavbar";
import images from "../../constants/images";
import ContantUsFooter from "../../components/Navbar/ContantUsFooter/ContantUsFooter";
import {Link, useNavigate} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const pricingPlans = [
  {
    title: "Eden Essentials",
    priceAnnual: 499,
    priceMonthly: (499 / 12).toFixed(2),
    features: ["Real-Time Data Collection", "Automated Irrigation", "System Alerts", "Data Logging"],
  },
  {
    title: "Eden PRO",
    priceAnnual: 999,
    priceMonthly: (999 / 12).toFixed(2),
    features: [
      "Real-Time Data Collection",
      "Automated Irrigation",
      "System Alerts",
      "Data Logging",
      "AI-Driven Recommendations",
      "Customizable Reports",
      "AI-Powered Predictions",
      "Scheduling",
      "Enhanced Data Visualization",
    ],
  },
  {
    title: "Eden Ultimate",
    priceAnnual: 1999,
    priceMonthly: (1999 / 12).toFixed(2),
    features: [
      "Real-Time Data Collection",
      "Automated Irrigation",
      "System Alerts",
      "Data Logging",
      "AI-Driven Recommendations",
      "Customizable Reports",
      "AI-Powered Predictions",
      "Scheduling",
      "Enhanced Data Visualization",
      "Seamless IoT Integration",
      "Global Expansion Support",
      "Mobile Application",
      "Unlimited Users",
      "Priority Support",
      "Advanced Security",
    ],
  },
];



const Pricing = () => {

const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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


  
const handleCheckout = async () => {
  setLoading(true);

  // 👇 استخدمي Checkout Link المباشر من Stripe هنا!
  window.location.href = "https://buy.stripe.com/test_7sI29IfOYfSI1dC144"; 

  setLoading(false);
};


  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="pricing-container">
          { user ? (<Navbar />) : (<MainNavbar />)}


      <div className="pricing-container2">
        <header className="pricing-header">
          <div className="pricing-header-bg" style={{ backgroundImage: `url(${images.PricingBackGroundImage})` }}>
            <div className="pricing-header-text">
              <h1>Pricing</h1>
              <p>Grow Smarter, Not Harder</p>
              <p>Simple Pricing for Smarter Farming</p>
            </div>
          </div>
        </header>

        <div className="nav-center">
          <h2 className="main-title">Grow Smarter with Eden</h2>
          <h2 className="subtitle">Pay for What Your Farm Truly Needs</h2>

          {/* Switch Button */}
          <div className="switch-container">
            <label className="switch">
              <input
                type="checkbox"
                checked={isAnnual}
                onChange={() => setIsAnnual(!isAnnual)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* Pricing Cards Section */}
        <div className="pricing-plans">
          {pricingPlans.map((plan, index) => (
            <div className="pricing-card" key={index}>
              <h2 className="plan-title">{plan.title}</h2>
              <h3 className="plan-price">
  ${isAnnual ? plan.priceAnnual : plan.priceMonthly}
  <br />
  <span className="plan-duration">{isAnnual ? "Per Year" : "Per Month"}</span>
</h3>


              {isAnnual && (
                <h4 className="discount-text">Instead of ${plan.priceMonthly * 12}</h4>
              )}

              <button className="get-started-btn" onClick={handleCheckout} disabled={loading} > 
          {loading ? "Processing..." : "Get Started"}
        </button>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <img src={images.tickmark} alt="check icon" className="check-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <footer className="pricing-footer">
          <p style={{ color: "#000" }}>
            Experience Precision Farming with Eden’s Modular System. Access only the tools you need: <br />
            Irrigation, Monitoring, Mapping, Tasks, and more under one flexible subscription. <br />
            Pay for what you use, with tailored pricing and package discounts.
          </p>
          <p>
            Contact us at <a href="mailto:info@eden.com">info@eden.com</a> for details.
          </p>
        </footer>
      </div>

      <ContantUsFooter />
    </div>
  );
};

export default Pricing;



