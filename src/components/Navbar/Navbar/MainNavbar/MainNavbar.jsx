import React from "react";
import { Link } from "react-router-dom";
import "./MainNavbar.css";
import images from "../../../../constants/images";

const MainNavbar = () => {
  return (
    <nav className='navbar-signup bg-black relative z-40 px-5'>
      <div className='nav-left-signup' onClick={() => (window.location.href = "/")}>
        <img src={images.logo} alt='Logo' className='nav-logo-signup' />
      </div>

      <div className='nav-right-signup'>
        <ul className='nav-tabs-signup'>
          <li className='barbtns-signup'>
            <a href='/'>HOME</a>
          </li>
          <li className='barbtns-signup'><a href="#services">Features</a></li>
          <li className='barbtns-signup'>
            <a href='/Pricing'>PRICING</a>
          </li>
          
          <li className='barbtns-signup'>
            <a href='/about'>ABOUT US</a>
          </li>
        </ul>

        <Link to='/login' className='user-info-signup'>
          <img src={images.signIn} alt='User' className='user-icon-signup' />
          <img src={images.sign_in_arrow} className='arrow-icon-signup' />
        </Link>
      </div>
    </nav>
  );
};

export default MainNavbar;
