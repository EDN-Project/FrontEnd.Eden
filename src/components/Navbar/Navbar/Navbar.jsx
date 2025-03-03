import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import images from '../../../constants/images';
import { getUserData } from '../../../constants/api';
const Navbar = () => {

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

  return (
    <nav className="navbar bg-black relative z-40 px-5">
      <div className="nav-left" onClick={() => window.location.href = '/'}>
        <img src={images.logo} alt="Logo" className="nav-logo" />
      </div>
      
      <div className="nav-right">
        <ul className="nav-tabs">

        <li className='barbtns'>
            <a href='/'>HOME</a>
          </li>
          <li className="barbtns"><a href="#services">Features</a></li>

          <li className='barbtns'>
            <a href='/Pricing'>PRICING</a>
          </li>
          <li className='barbtns'>
            <a href='/dashboard'>Dashboard</a>
          </li>
          <li className='barbtns'>
            <a href='/about'>ABOUT US</a>
          </li>
          
        </ul>

        
        <div  className="user-info-singin">
          <span className="username">{user?.company}</span>
          <img style={{
            width:'40px',
            height:'40px'
          }} src={images.userIcon} alt="User" className="user-icon-singin" />
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
