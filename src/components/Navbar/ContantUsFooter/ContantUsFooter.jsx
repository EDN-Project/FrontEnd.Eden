import React from 'react';
import './ContantUsFooter.css';

const ContantUsFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3  className="footer-title">About EDEN</h3>
          <ul className="footer-list">
            <li><a href="#">Home</a></li>
            <li><a href="#Features">Features</a></li>
            <li><a href="#about">About us</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-title">Policies</h3>
          <ul className="footer-list">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms Of Use</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Community</h3>
          <ul className="footer-list">
            <li><a href="#linkedin">LinkedIn</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#instagram">Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default ContantUsFooter;

