import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../constants/api';
import './ResetPassword.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import images from '../../constants/images';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const email = location.state?.email || '';
  const code = location.state?.code || '';

  if (!email || !code) {
    return <div className="error-message">Invalid request. Please try again.</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    const response = await resetPassword(email, code, formData.newPassword);
    setLoading(false);

    if (response.message) {
      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    } else {
      toast.error(response.error || "Failed to reset password.");
    }
  };

  return (
    <>
    <div className="logo-icon-singup" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
  <img src={images.eden_logo_Black} alt="Logo" className="logo-singup" />
</div>

    <div className="container-Reset">
      <ToastContainer position="top-right" autoClose={3000} />

     

      <div className="form-section-Reset">
        <div className="welcome-text-Reset">
          <h1>Reset Password</h1>
        </div>

        <div className="cont-form-field-Reset">
          <form onSubmit={handleResetPassword}>
            
            <div className="form-field-Reset">
              <input 
                type="password" 
                id="newPassword" 
                placeholder="Enter your new password" 
                onChange={handleChange} 
                required 
              />
              <label htmlFor="newPassword">New Password</label>
            </div>

            <div className="form-field-Reset">
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Confirm your new password" 
                onChange={handleChange} 
                required 
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>

            <button 
              
              type="submit" 
              disabled={loading}
            >
              {loading ? <span className="loader"></span> : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      <div className="image-section-singup">
    
    <img src={images.Illustration_autho_} alt="Background" className="background-image-login" />
    
  </div>
       
    </div>
    </>
  );
};

export default ResetPassword;
