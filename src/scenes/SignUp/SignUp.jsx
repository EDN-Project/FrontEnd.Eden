
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, confirmRegistration } from '../../constants/api';
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
    company_name: '',

  });
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSwitchForm = (type) => {
    setActiveTab(type);
    setCompanyField(type === 'corporate');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser(formData);
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
    console.log("Google Login Clicked");
    // إضافة منطق تسجيل الدخول بجوجل هنا
  };

  const handleFacebookLogin = () => {
    console.log("Facebook Login Clicked");
    // إضافة منطق تسجيل الدخول بفيسبوك هنا
  };
  

  return (

    <>
    <div className="logo-icon-singup" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
  <img src={images.eden_logo_Black} alt="Logo" className="logo-singup" />
</div>

    <div className="container-singup">
      <ToastContainer position="top-right" autoClose={3000} />


      <div className="form-section-singup">
        <div className="tabs-singup">
          <div className={`tab ${activeTab === 'individual' ? 'active' : ''}`} onClick={() => handleSwitchForm('individual')}>
            Individual
          </div>
          <div className={`tab ${activeTab === 'corporate' ? 'active' : ''}`} onClick={() => handleSwitchForm('corporate')}>
            Corporate
          </div>
        </div>

       

        {!isCodeSent ? (
          <form onSubmit={handleRegister}>

<div className="name-row">
            <div className="form-field-singup">
              <input type="text" id="name" placeholder="Type your name here" onChange={handleChange} required />
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-field-singup">
            <input type="text" id="company" placeholder="Enter company name" onChange={handleChange} />

              <label htmlFor="company">Company</label>
            </div>
</div>


            <div className="form-field-singup">
              <input type="email" id="email" placeholder="Enter your E-mail" onChange={handleChange} required />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="form-field-singup">
              <input type="text" id="phone" placeholder="Enter your phone number" onChange={handleChange} required />
              <label htmlFor="phone">Phone</label>
            </div>
            {/* {companyField && (
              <div className="form-field-singup">
                <input type="text" id="company" placeholder="Enter company name" onChange={handleChange} />
                <label htmlFor="company">Company</label>
              </div>
            )} */}

<div className="name-row" style={{ marginTop: '-20px' }}>

            <div className="form-field-singup">
              <input type="password" id="password" placeholder="Enter your password" onChange={handleChange} required />
              <label htmlFor="password">Password</label>
            </div>

            <div className="form-field-singup">
              <input type="ConfirmPassword" id="password" placeholder="Confirm password" onChange={handleChange} required />
              <label htmlFor="password">Confirm Password</label>
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

            <div className="terms-link-singup-2" >

            <button type="submit" className="SignUp-button" disabled={loading} style={{
              // width: '80%',
            }}>
              {loading ? <div className="loader"></div> : "Sign Up"}
            </button>

            </div>

            {/* <p className="login-link-singup">
              Already have an account? <Link to="/login">Login</Link>
            </p> */}
          </form>
        ) : (
          <div>
            <input className="code-input" type="text" placeholder="Enter Verification Code" onChange={(e) => setCode(e.target.value)} required />
            <button className="verify-button" onClick={handleConfirm} disabled={loading}>
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

        <button className="social-btn facebook" onClick={handleFacebookLogin}>
          <img src={images.appel} alt="iphone" />
          Sign in with Apple
        </button>
      </div>

      <p className="login-text">
        Have an account? <a href="/login">Login</a>
      </p>
    </div>

      </div>

      <div className="image-section-singup">
      <div className="welcome-text-singup">
          <h1>Get Started Now!</h1>
        </div>
        <img src={images.Maskgroup} alt="Background" className="background-image-login" />
        
      </div>

      {/* OR Login */}


      

    </div>
    </>
  );
};

export default SignUp;
