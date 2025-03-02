import React , { useState, useEffect } from 'react';
import './AboutContactUs.css';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { Link ,useNavigate} from 'react-router-dom';
import MainNavbar from '../../components/Navbar/Navbar/MainNavbar/MainNavbar';
import images from '../../constants/images';
import ContantUsFooter from '../../components/Navbar/ContantUsFooter/ContantUsFooter';
import Navbar from '../../components/Navbar/Navbar/Navbar';
const AboutContactUs = () => {
  const navigate = useNavigate();

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
    <div className="aboutContactUs">
      {/* Navigation Bar */}

    { user ? (<Navbar />) : (<MainNavbar />)}


      {/* About Section */}
      <section className="about-section">
        <h1>ABOUT US</h1>
        <p>
          Welcome to EDEN, where technology meets agriculture to revolutionize the way farms operate.
          Our mission is to empower farmers with innovative solutions that combine cutting-edge AI, IoT, and data analytics
          to optimize farm management and increase productivity.
        </p>
        <p>
          We are passionate about driving sustainability and efficiency in agriculture by offering tools that provide
          real-time monitoring, local and global market analysis, and smart fertilization management. Our goal is to make
          farming smarter, more profitable, and accessible to everyone, paving the way for a sustainable future.
        </p>
        <p>
          At EDEN, we believe in harnessing the power of technology to transform traditional farming practices and deliver
          top-quality results. Whether you're a small farm owner or managing large-scale operations, we're here to help you
          achieve your goals and thrive in an ever-changing agricultural landscape.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
      <div className="image-overlay"></div>
        <div className="contact-container">
          <div className="contact-header">
            <h1>Contact<br />Us</h1>
          </div>
          <div className="contact-form">
            <form>
     

              <p style={{color: '#000', fontSize: '16px'}} >Contact us about anything related to our company or services. We'll do our best to get back to you as soon as possible.</p>
              <input type="text" placeholder="Name*" required />
              <input type="tel" placeholder="Phone*" required />
              <input type="email" placeholder="Email*" required />
              <input type="text" placeholder="Country" />
              <textarea placeholder="Message"></textarea>
              <button className="send-button" type="submit">Send</button>
            </form>
          </div>
          <div className="contact-info">
            <h2>EDEN Company / Farm Management System</h2>
            <p>For Support:</p>
            <p><MdEmail style={{marginRight: '8px', fontSize: '20px'}} />Email: EdenSupport@Eden.com</p>
            <p><MdLocationOn style={{marginRight: '8px', fontSize: '20px'}} />Location: Cairo, Egypt</p>

          </div>
        </div>
      </section>

      {/* Footer Section */}
      <ContantUsFooter />
   
    </div>
  );
};

export default AboutContactUs;
