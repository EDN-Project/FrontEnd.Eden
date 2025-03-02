import React, {useEffect} from "react";
import "./PopupModal.css";
import images from "../../constants/images";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
const PopupModal = ({
  isOpen,
  onClose,
  title,
  description,
  image,
  keyFeatures,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavigateToPricing = () => {
    onClose();
    setTimeout(() => {
      navigate("/Pricing");
    }, 200);
  };

  return (
    <motion.div className='PopUpModal-class '>
      <div
        className='modal-overlay'
        onClick={(e) => {
          e.stopPropagation();

          onClose();
        }}
      >
        <button className='close-btn' onClick={onClose}>
          ✖
        </button>
        <div
          className='modal-content'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className='modal-image'
            style={{backgroundImage: `url(${image})`}}
          ></div>
          <div className='modal-body'>
            <h2 className='modal-title'>{title}</h2>
            <p className='modal-description'>{description}</p>
            <div className='features-container'>
              <h3 className='features-title'>Key Features</h3>
              <img
                src={images.Rectangle_test}
                alt='Key Feature'
                className='features-image'
              />
              <div className='features-list'>
                {keyFeatures.map((feature, index) => (
                  <div key={index} className='feature-item'>
                    <img
                      src={images.tickmark}
                      alt='check'
                      className='check-icon'
                    />
                    <div className='feature-text'>
                      <strong>{feature.title}:</strong> {feature.description}
                    </div>
                  </div>
                ))}
              </div>
              <div className='Explore-container'>
                <button
                  className='explore-btn'
                  onClick={handleNavigateToPricing}
                >
                  {"Explore Now"}
                  <img
                    src={images.arrow}
                    alt='Arrow Icon'
                    className='arrow-icon'
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PopupModal;
