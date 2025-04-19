import './Overlay.css'
import CloseIcon from '@mui/icons-material/Close';
import { phoneNumber, showSide } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { auth } from '../utils/Config';
import firebase from '../utils/Config';
import { useNavigate } from 'react-router-dom';

export const Overlay = () => {
    const {show} = useSelector((state)=>({show:state.show}))
    const dispatch = useDispatch()
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, redirect to home
                navigate('/');
                dispatch(showSide(false));
            }
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, [navigate, dispatch]);

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
            size: "invisible",
            callback: () => {
                console.log("Captcha Resolved");
            },
            defaultCountry: "IN",
        });
    }, []);

    const handleClick = () => {
        document.getElementById("overlayLogin").style.display = "none";
        dispatch(showSide(!show))
    }

    const handleClick1 = () => {
        document.getElementById("overlayLogin1").style.display = "none";
        document.getElementById("overlayLogin").style.display = "none";
    }

    const fromsubmit = async (e) => {
        e.preventDefault();
        console.log(mobile, otp);
        window.overloginbtn.style.display = 'none'
        window.oververifybtn.style.display = 'block'

        try {
            const phone_number = "+91" + mobile;
            const appVerifier = window.recaptchaVerifier;
            const confirmationResult = await auth.signInWithPhoneNumber(phone_number, appVerifier);
            window.confirmationResult = confirmationResult;
            console.log("OTP sent");
            document.getElementById("overinput3").style.visibility = "visible";
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert(error.message);
        }
    }

    const handleverify = async () => {
        try {
            const result = await window.confirmationResult.confirm(otp);
            const user = result.user;
            console.log(JSON.stringify(user.phoneNumber))
            dispatch(phoneNumber(user.phoneNumber))
            // Store auth state in localStorage
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userPhone', user.phoneNumber);
            // Redirect to home page
            navigate('/');
            dispatch(showSide(false));
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert('Incorrect User Details Or OTP')
        }
    }

    const fromsubmit1 = (e) => {
        e.preventDefault();
        document.getElementById("overinput2").style.visibility = "visible";
    }

    const changepage = () => {
        document.getElementById("overlaySec").style.display = "none";
        document.getElementById("overlayLogin1").style.display = "block";
    }

    const changepage1 = () => {
        document.getElementById("overlayLogin1").style.display = "none";
        document.getElementById("overlaySec").style.display = "block";
    }

    return (
        <>
            <div id="overlayLogin">
                <div id='overlaySec'>
                    <div>
                        <CloseIcon onClick={handleClick} id='closeBtn'></CloseIcon>
                    </div>
                    <h2 id='loginOver'>Login</h2>
                    <div className='PorH6'>
                        <p>or</p>
                        <h6 onClick={changepage} className="overcreatebtn">create your account</h6>
                    </div>
                    <form onSubmit={fromsubmit}>
                        <input onChange={(e) => setMobile(e.target.value)} required className='overinput' type="mobile" placeholder="+91  enter your mobile" />
                        <input onChange={(e) => setOtp(e.target.value)} type="mobile" id='overinput3' placeholder='Enter Vaild Otp' />
                        <div className='overflexlast'>
                            <button type='submit' id='overloginbtn'>Login</button>
                            <button type='button' onClick={handleverify} id='oververifybtn'>Verify</button>
                            <h6 className="overcreatebtn">continue with email</h6>
                        </div>
                    </form>
                </div>
            </div>

            <div id="overlayLogin1">
                <div id='overlaySec1'>
                    <div>
                        <CloseIcon onClick={handleClick1} id='closeBtn1'></CloseIcon>
                    </div>
                    <h2 id='loginOver'>Join Unacademy</h2>
                    <div className='PorH6'>
                        <p>or</p>
                        <h6 onClick={changepage1} className="overcreatebtn">login to your account</h6>
                    </div>
                    <form onSubmit={fromsubmit1}>
                        <input required className='overinput' type="mobile" placeholder="+91  enter your mobile" />
                        <input type="mobile" id='overinput2' placeholder='Enter Vaild Otp' />
                        <button type='submit' id='overloginbtn1'>Continue</button>
                    </form>
                </div>
            </div>

            <div id="recaptcha-container"></div>
        </>
    )
}
