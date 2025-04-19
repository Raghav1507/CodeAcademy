import React, { useState } from 'react';
import { auth } from '../utils/Config';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showSide } from '../../store/action';
import CloseIcon from '@mui/icons-material/Close';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleClose = () => {
    dispatch(showSide(false));
  };

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: () => {
        console.log('reCAPTCHA solved');
      },
    });
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        await auth.createUserWithEmailAndPassword(email, password);
      }
      navigate('/explore');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!showOtpInput) {
        setupRecaptcha();
        const formattedPhone = `+91${phone}`;
        const confirmation = await auth.signInWithPhoneNumber(formattedPhone, window.recaptchaVerifier);
        setConfirmationResult(confirmation);
        setShowOtpInput(true);
      } else {
        await confirmationResult.confirm(otp);
        navigate('/explore');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <div className="login-header">
          <CloseIcon onClick={handleClose} className="close-icon" />
          <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
        </div>

        <div className="auth-toggle">
          <button 
            className={isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={!isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleEmailAuth} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handlePhoneAuth} className="phone-form">
          <div className="form-group">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={showOtpInput}
            />
          </div>
          {showOtpInput && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Loading...' : (showOtpInput ? 'Verify OTP' : 'Send OTP')}
          </button>
        </form>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Login; 