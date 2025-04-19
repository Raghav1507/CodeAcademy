import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Profile = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        bio: ''
    });
    const [earnings, setEarnings] = useState({
        total: 0,
        recent: []
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Load user details from localStorage
        const savedDetails = JSON.parse(localStorage.getItem('userDetails')) || {};
        setUserDetails(savedDetails);

        // Load earnings from localStorage
        const savedEarnings = JSON.parse(localStorage.getItem('userEarnings')) || [];
        
        // Calculate total earnings
        const total = savedEarnings.reduce((sum, earning) => sum + earning.amount, 0);
        
        // Sort earnings by date and get the most recent ones
        const sortedEarnings = [...savedEarnings].sort((a, b) => 
            new Date(b.earned_at) - new Date(a.earned_at)
        );

        setEarnings({
            total: total,
            recent: sortedEarnings.slice(0, 5) // Get last 5 earnings
        });
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('userDetails');
        navigate('/');
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    {userDetails.name ? userDetails.name[0].toUpperCase() : '?'}
                </div>
                <h1>Profile</h1>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <div className="profile-field">
                        <label>Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={userDetails.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                            />
                        ) : (
                            <p>{userDetails.name || 'Not set'}</p>
                        )}
                    </div>

                    <div className="profile-field">
                        <label>Email</label>
                        <p>{userDetails.email || 'Not set'}</p>
                    </div>

                    <div className="profile-field">
                        <label>Phone</label>
                        <p>{userDetails.phone || 'Not set'}</p>
                    </div>

                    <div className="profile-field">
                        <label>Bio</label>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={userDetails.bio}
                                onChange={handleChange}
                                placeholder="Tell us about yourself"
                            />
                        ) : (
                            <p>{userDetails.bio || 'Not set'}</p>
                        )}
                    </div>
                </div>

                <div className="earnings-section">
                    <div className="earnings-header">
                        <AttachMoneyIcon className="earnings-icon" />
                        <h2>Your Earnings</h2>
                    </div>
                    <div className="total-earnings">
                        <span className="earnings-label">Total Earned:</span>
                        <span className="earnings-amount">${earnings.total.toFixed(2)}</span>
                    </div>
                    <div className="recent-earnings">
                        <h3>Recent Earnings</h3>
                        {earnings.recent.length > 0 ? (
                            <div className="earnings-list">
                                {earnings.recent.map((earning, index) => (
                                    <div key={index} className="earning-item">
                                        <div className="earning-details">
                                            <span className="question-title">{earning.question_title}</span>
                                            <span className="earned-date">
                                                {new Date(earning.earned_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <span className="earned-amount">${earning.amount.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-earnings">No earnings yet. Start solving questions to earn!</p>
                        )}
                    </div>
                </div>

                <div className="profile-actions">
                    {isEditing ? (
                        <button className="save-button" onClick={handleSave}>
                            Save Changes
                        </button>
                    ) : (
                        <button className="edit-button" onClick={handleEdit}>
                            Edit Profile
                        </button>
                    )}
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile; 