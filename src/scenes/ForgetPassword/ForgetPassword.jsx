import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../constants/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgetPassword.css';
import images from '../../constants/images';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      if (response.message) {
        setIsCodeSent(true);
        setMessage('Verification code sent to your email.');
        toast.success('Verification code sent!');
      } else {
        setMessage(response.error);
        toast.error(response.error);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (code.length === 6) {
      navigate('/reset-password', { state: { email, code } });
    } else {
      setMessage('Please enter a valid 6-digit code.');
      toast.error('Invalid verification code!');
    }
  };

  return (
    <>
  <div className="logo-icon-singup" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
  <img src={images.eden_logo_Black} alt="Logo" className="logo-singup" />
</div>

    <div className="container-forgetpassword">
      <ToastContainer position="top-right" autoClose={3000} />


      <div className="form-section-forgetpassword">
        <div className="welcome-text-forgetpassword">
          <h1>Forget Your <br />Password?</h1>
        </div>

        <form>
          <div className="form-field-forgetpassword">
            <input 
              type="email" 
              placeholder="Enter your E-mail" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              disabled={isCodeSent} 
            />
            <label htmlFor="email">E-mail</label>
            <div className="divider"></div>
            <button 
              type="button" 
              className="send-button" 
              onClick={handleSendCode} 
              disabled={loading || isCodeSent} 
            >
              {loading ? <span className="loader"></span> : 'Send'}
            </button>
          </div>

          {isCodeSent && (
            <>
              <div className="form-field-forgetpassword">
                <input 
                  type="text" 
                  placeholder="Enter Verification code" 
                  onChange={(e) => setCode(e.target.value)} 
                  required 
                  style={{ height: '60px' }}
                />
                <label htmlFor="Verification">Verification</label>
              </div>
              <button type="button" className="next-button" onClick={handleNext}>Next</button>
            </>
          )} 
        </form>

        {/* <p>{message}</p> */}
      </div>

      
      <div className="image-section-singup">
    
        <img src={images.Illustration_autho_} alt="Background" className="background-image-login" />
        
      </div>
      
    </div>
    </>
  );
};

export default ForgetPassword;
