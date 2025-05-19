import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { registerUser, confirmRegistration, googleLogin, handleGoogleCallback } from '../../constants/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';
import images from '../../constants/images';

const SignUp = () => {
  const [activeTab, setActiveTab] = useState('individual');
  const [companyField, setCompanyField] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    company_name: '',
    userType: 'individual'
  });
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSwitchForm = (type) => {
    setActiveTab(type);
    setCompanyField(type === 'corporate');
    setFormData({ ...formData, userType: type });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await registerUser(dataToSend);
      if (response.message) {
        setIsCodeSent(true);
        toast.success('Verification code sent to your email.');
      } else {
        throw new Error(response.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await confirmRegistration(formData.email, code);
      if (response.message) {
        toast.success('Registration successful! Redirecting to login...');

        // ✅ حفظ بيانات المستخدم في `localStorage`
        localStorage.setItem('userData', JSON.stringify(formData));

        // ✅ توجيه المستخدم إلى صفحة تسجيل الدخول بعد ثانيتين
        setTimeout(() => navigate('/login'), 2000);
      } else {
        throw new Error(response.error || "Verification failed!");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  const handleAppleLogin = () => {
    toast.info('Apple login is not implemented yet');
  };

  useEffect(() => {
    // تحقق مما إذا كانت استجابة Google OAuth متوفرة في URL
    const checkGoogleCallback = async () => {
      // تحقق من وجود code في URL كجزء من استجابة Google OAuth
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      
      if (code && state) {
        try {
          setLoading(true);
          const result = await handleGoogleCallback();
          if (result.success) {
            toast.success("Login successful!");
            navigate("/dashboard");
          } else {
            toast.error(result.error || "Google login failed");
          }
        } catch (error) {
          toast.error("Error during Google authentication");
          console.error("Google auth error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    checkGoogleCallback();
  }, [location, navigate]);

  return (
    <>
      <div className="logo-icon-singup" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={images.eden_logo_Black} alt="Logo" className="logo-singup" />
      </div>

      <div className="container-singup">
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="form-section-singup">
          <div className="tabs-singup">
            <div 
              className={`tab ${activeTab === 'individual' ? 'active' : ''}`} 
              onClick={() => handleSwitchForm('individual')}
            >
              Individual
            </div>
            <div 
              className={`tab ${activeTab === 'corporate' ? 'active' : ''}`} 
              onClick={() => handleSwitchForm('corporate')}
            >
              Corporate
            </div>
          </div>

          {!isCodeSent ? (
            <form onSubmit={handleRegister}>
              <div className="name-row">
                <div className="form-field-singup">
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Type your name here" 
                    onChange={handleChange} 
                    required 
                  />
                  <label htmlFor="name">Name</label>
                </div>

                <div className="form-field-singup">
                  <input 
                    type="text" 
                    id="company_name" 
                    placeholder="Enter company name" 
                    onChange={handleChange} 
                  />
                  <label htmlFor="company_name">Company</label>
                </div>
              </div>

              <div className="form-field-singup">
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your E-mail" 
                  onChange={handleChange} 
                  required 
                />
                <label htmlFor="email">E-mail</label>
              </div>
              
              <div className="form-field-singup">
                <input 
                  type="text" 
                  id="phone" 
                  placeholder="Enter your phone number" 
                  onChange={handleChange} 
                  required 
                />
                <label htmlFor="phone">Phone</label>
              </div>

              <div className="name-row" style={{ marginTop: '-20px' }}>
                <div className="form-field-singup">
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password" 
                    onChange={handleChange} 
                    required 
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="form-field-singup">
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    placeholder="Confirm password" 
                    onChange={handleChange} 
                    required 
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
              </div>

              <div className="terms-link-singup">
                <label className="terms-label">
                  <input type="checkbox" id="terms" required />
                  <span>
                    I agree to the <a href="#">terms & policy</a>
                  </span>
                </label>
              </div>

              <div className="terms-link-singup-2">
                <button 
                  type="submit" 
                  className="SignUp-button" 
                  disabled={loading}
                >
                  {loading ? <div className="loader"></div> : "Sign Up"}
                </button>
              </div>
            </form>
          ) : (
            <div>
              <input 
                className="code-input" 
                type="text" 
                placeholder="Enter Verification Code" 
                onChange={(e) => setCode(e.target.value)} 
                required 
              />
              <button 
                className="verify-button" 
                onClick={handleConfirm} 
                disabled={loading}
              >
                {loading ? <div className="loader"></div> : "Verify"}
              </button>
            </div>
          )}

          <div className="social-login-container">
            <div className="separator">
              <span>Or</span>
            </div>

            <div className="social-buttons">
              <button className="social-btn google" onClick={handleGoogleLogin}>
                <img src={images.gmail} alt="Google" />
                Sign in with Google
              </button>

              <button className="social-btn facebook" onClick={handleAppleLogin}>
                <img src={images.appel} alt="iphone" />
                Sign in with Apple
              </button>
            </div>

            <p className="login-text">
              Have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>

        <div className="image-section-singup">
          <div className="welcome-text-singup">
            <h1>Get Started Now!</h1>
          </div>
          <img src={images.Maskgroup} alt="Background" className="background-image-login" />
        </div>
      </div>
    </>
  );
};

export default SignUp;