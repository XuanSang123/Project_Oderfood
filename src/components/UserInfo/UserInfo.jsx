import { useState, useEffect } from 'react';
import './UserInfo.css'; 

export default function UserProfile() {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '' // Ensure address field is part of the state
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const loggedInEmail = localStorage.getItem('USER');
        if (loggedInEmail) {
            fetchUserInfo(loggedInEmail);
        }
    }, []);

    const fetchUserInfo = async (email) => {
        try {
            const response = await fetch('http://localhost:3000/users'); // Ensure correct URL
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const user = data.find(user => user.email === email);
            if (user) {
                setUserInfo(user);
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            setError(error.message);
            console.error('Error fetching user data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated user info:', userInfo);
        // Handle form submission, e.g., send updated data to server
    };

    return (
        <div id="user-info">
            <div className="title">
                <h2>Chỉnh sửa hồ sơ</h2>
            </div>
            <div className="information">
                <div className="avatar">
                    <img src="../../../public/avatar.jpg" alt="Avatar" />
                </div>
                <div className="info">
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName">Tên:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={handleChange}
                        />
                        <label htmlFor="lastName">Họ:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            readOnly // Make email read-only
                        />
                        <label htmlFor="phoneNumber">Số điện thoại:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={userInfo.phoneNumber}
                            onChange={handleChange}
                        />
                        <label htmlFor="address">Địa chỉ:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={userInfo.address}
                            onChange={handleChange}
                        />
                        <button type="submit">Lưu</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
