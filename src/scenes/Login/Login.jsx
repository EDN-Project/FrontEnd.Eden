import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../constants/api";
import "./Login.css";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import images from "../../constants/images";
import { getUserData } from "../../constants/api";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({email: "", password: ""});
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = localStorage.getItem("userData");
        if (data) {
          const parsedData = JSON.parse(data);
          setUserData(parsedData);
          // console.log("User Data:", parsedData); 
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleGoogleLogin = () => {
    console.log("Google Login Clicked");
    // إضافة منطق تسجيل الدخول بجوجل هنا
  };

  const handleFacebookLogin = () => {
    console.log("Facebook Login Clicked");
    // إضافة منطق تسجيل الدخول بفيسبوك هنا
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

// const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await loginUser(formData);

//       if (response.token) {
//         localStorage.setItem("token", response.token);
//         toast.success("Login successful! Redirecting...");
//         setTimeout(() => {
//           navigate("/");
//         }, 1500);
//       } else {
//         toast.error(`${response.error || "Login failed! Try again."}`);
//         console.log(response.error);
//       }
//     } catch (error) {
//       toast.error("Error connecting to server.");
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forget-password");
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await loginUser(formData);

        if (response.token) {
            localStorage.setItem("token", response.token); // تخزين التوكن
            toast.success("Login successful! Redirecting...");

            // 🔹 جلب بيانات المستخدم بعد تسجيل الدخول
            const userData = await getUserData();
            if (userData) {
                localStorage.setItem("userData", JSON.stringify(userData));

                console.log("User Data After Login:", userData); // ✅ طباعة البيانات هنا

            }

            setTimeout(() => {
                navigate("/");
            }, 1500);
        } else {
            toast.error(`${response.error || "Login failed! Try again."}`);
        }
    } catch (error) {
        toast.error("Error connecting to server.");
    } finally {
        setLoading(false);
    }
};


  return (
    <>
      <div
        className='logo-icon-singup'
        onClick={() => navigate("/")}
        style={{cursor: "pointer"}}
      >
        <img
          draggable='false'
          src={images.eden_logo_Black}
          alt='Logo'
          className='logo-singup'
        />
      </div>

      <div className='container-login'>
        <ToastContainer position='top-right' autoClose={3000} />

        <disv className='form-section'>
          <div className='welcome-text'>
            <h1>Welcome back!</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className='form-section-login'>
              <div className='form-field'>
                <input
                  type='email'
                  id='email'
                  placeholder='Enter your E-mail'
                  onChange={handleChange}
                  required
                />
                <label htmlFor='email'>E-mail</label>
              </div>

              <div className='form-field'>
                <input
                  type='password'
                  id='password'
                  placeholder='Enter your password'
                  onChange={handleChange}
                  required
                />
                <label htmlFor='password'>Password</label>
              </div>

              <div className='form-options'>
                <label className='checkbox-label'>
                  <input type='checkbox' id='remember-me' />
                  Remember for 30 days
                </label>
                <span
                  className='forgot-password'
                  onClick={handleForgotPassword}
                >
                  Forget Password?
                </span>
              </div>
            </div>

            <button type='submit' className='login-button' disabled={loading}>
              {loading ? <span className='loader'></span> : "Login"}
            </button>
          </form>

          <div className='social-login-container'>
            <div className='separator'>
              <span>Or</span>
            </div>

            <div className='social-buttons'>
              <button className='social-btn google' onClick={handleGoogleLogin}>
                <img draggable='false' src={images.gmail} alt='Google' />
                Sign in with Google
              </button>

              <button
                className='social-btn facebook'
                onClick={handleFacebookLogin}
              >
                <img draggable='false' src={images.appel} alt='iphone' />
                Sign in with Apple
              </button>
            </div>

            <p className='login-text'>
              Don't have an account? <a href='/signup'>Sign Up</a>
            </p>
          </div>
        </disv>

        <div className='image-section-singup'>
          <img
            draggable='false'
            src={images.Illustration_autho_}
            alt='Background'
            className='background-image-login'
          />
        </div>
      </div>
    </>
  );
};

export default Login;
