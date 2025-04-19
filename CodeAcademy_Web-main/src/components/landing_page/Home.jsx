import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./Home.css";
import Login from "../Login/Login";
import { useDispatch } from "react-redux";
import { showSide } from "../../store/action";
import { useSelector } from "react-redux";
import { auth } from "../utils/Config";
import PersonIcon from '@mui/icons-material/Person';

function Home() {
  const ref = React.useRef(null);
  const {show} = useSelector((state)=>({show:state.show}))
  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    // Check authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserPhone(user.phoneNumber);
      } else {
        setIsAuthenticated(false);
        setUserPhone('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    dispatch(showSide(!show))
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setUserPhone('');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userPhone');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  React.useEffect(() => {
    ref.current.continuousStart();
    setTimeout(() => ref.current.complete(), 500);
  }, []);

  return (
    <>
    {show && <Login />}
      <LoadingBar color="#08BD80" height="4px" ref={ref} />
      <div className="parent_head">
        <div className="header">
          <div className="navbar">
            <img src="/Final Logo.jpg" alt="logo" />
            <div className="auth-buttons">
              {isAuthenticated ? (
                <div className="user-info">
                  <span className="user-phone">{userPhone}</span>
                  <Link to="/profile" className="profile-button">
                    <PersonIcon />
                  </Link>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              ) : (
                <button onClick={handleLogin} className="login-button">
                  Login
                </button>
              )}
            </div>
          </div>
          <div className="heading">
            <div className="head">
               Unlocking Solutions 
              <br />
              for Developers
            </div>
            <br />
 
            <div className="course">
              <div className="course-card">
                <div className="card-content">
                  <h2 className="card-title">Solution</h2>
                  <h3 className="card-subtitle">For Your Problem</h3>
                  <Link to="/qa-platform">
                    <button className="card-button">Start Learning</button>
                  </Link>
                </div>
                <div className="card-image">
                  <img
                    src="/Sol & Ques image.jpg"
                    alt="Solution mascot"
                    className="mascot-image"
                  />
                </div>
              </div>
              
              <div className="course-card">
                <div className="card-content">
                  <h2 className="card-title">Can't Find Helper!</h2>
                  <h3 className="card-subtitle">Don't Worry Your CodeBot is Here!</h3>
                  <Link to="/chatbot">
                    <button className="card-button">CodeBot</button>
                  </Link>
                </div>
                <div className="card-image">
                  <img
                    src="/ChatBot1.jpg"
                    alt="CodeBot assistant"
                    className="bot-image"
                  />
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            
            <div className="block4">
              <div className="block41">
                <div className="block411">
                  Get the Solving 
                  <br /> App
                </div>
                <div className="block412">
                  Solve and Earn anytime,
                  <br /> anywhere with the CodeAcademy app
                </div>
                <div className="block413">
                  <a href="https://www.instagram.com/">
                    <img
                      src="https://static.uacdn.net/production/_next/static/images/app_store.png?q=75&w=1920"
                      alt="Instagram App Store"
                    />
                  </a>
                  <a href="https://www.instagram.com/">
                    <img
                      src="https://static.uacdn.net/production/_next/static/images/play_store.png?q=75&w=1920"
                      alt="Instagram Play Store"
                    />
                  </a>
                </div>
              </div>
              <div className="block42">
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div> 
    </>
  );
}

export default Home;
