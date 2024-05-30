import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import "./UserInfo.css";
import authApi from "../../api/authApi";

export default function UserProfile() {
  const [error, setError] = useState(null);
  //lấy thông tin user từ server để kiểm tra với local storage
  const fetchUserInfo = async (userId) => {
    try {
      const { data } = await authApi.getUserInfo(userId);
      const { id, firstName, lastName, email, phoneNumber, address } = data;
      // set data vao field
      formik.setFieldValue("id", id);
      formik.setFieldValue("firstName", firstName);
      formik.setFieldValue("lastName", lastName);
      formik.setFieldValue("email", email);
      formik.setFieldValue("phoneNumber", phoneNumber);
      formik.setFieldValue("address", address);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching user data:", error);
    }
  };

  //lấy thông tin user từ local storage
  useEffect(() => {
    try {
      const { id } = JSON.parse(localStorage.getItem("USER"));
      if (id) {
        fetchUserInfo(id);
      }
    } catch (error) {
      setError(error.message);
      console.error(
        "Error getting user data from localStorage:",
        error.message
      );
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
    },
    // Ham xu ly submit
    onSubmit: async (values) => {
      //gửi thông tin user lên server
      try {
        const { data } = await authApi.updateUserInfo(values.id, values);
        console.log("Updated user info:", data);
        alert("Update user thanh cong");
      } catch (error) {
        console.log("Error when  updating user info:", error.message);
      }
    },
  });

  return (
    <>
      <Header />
      <Navigation />
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
            <form onSubmit={formik.handleSubmit}>
              <input
                type="hidden"
                id="id"
                name="id"
                value={formik.values.id}
                onChange={formik.handleChange}
              />
              <label htmlFor="firstName">Tên:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <label htmlFor="lastName">Họ:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <label htmlFor="phoneNumber">Số điện thoại:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
              <label htmlFor="address">Địa chỉ:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <button type="submit">Lưu</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
