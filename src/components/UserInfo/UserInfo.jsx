import { useState, useEffect } from "react";
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import "./UserInfo.css";

export default function UserProfile() {
  //set thông tin user,nếu không có thông tin thì set rỗng
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "", 
  });
  const [error, setError] = useState(null);
  //lấy thông tin user từ server để kiểm tra với local storage
  const fetchUserInfo = async (email) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const user = data.find((user) => user.email === email);
      if (user) {
        setUserInfo(user);
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching user data:", error);
    }
  };
  //lấy thông tin user từ local storage
   useEffect(() => {
    const loggedInEmail = localStorage.getItem("USER");
    if (loggedInEmail) {
      fetchUserInfo(loggedInEmail);
    }
  }, []);
  //lấy thông tin từ form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };
  //gửi thông tin user lên server
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated user info:", userInfo);
  };

  return (
    <>
    <Header/>
    <Navigation/>
    <div id="user-info">
      <div className="title">
        <h2>Chỉnh sửa hồ sơ</h2>
      </div>
      <div className="information">
        <div className="avatar">
          <img src="../../../public/avatar.jpg" alt="Avatar" />
          <button>Chọn ảnh</button>
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
    <Footer/>
    </>
  );
}
