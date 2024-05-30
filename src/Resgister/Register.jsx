import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import authApi from "../api/authApi";
import { useFormik } from "formik";
import Header from "../../src/components/Header/Header";
import Navigation from "../../src/components/Navigation/Navigation";
import Footer from "../../src/components/Footer/Footer";

export default function Register() {
  const [errorMess, setErrorMess] = useState("");
  const navigate = useNavigate();
  const validate = (values) => {
    // Tao object errors
    const errors = {};
    // Check email khong rong
    if (!values.email) {
      errors.email = "email! khong duoc de trong";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) // check dinh dang email
    ) {
      errors.email = "vui long nhap dung dinh dang email";
    } else if (!values.password) {
      errors.password = "password khong duoc de trong";
    } else if (values.password.length < 8) {
      errors.password = "Yeu cau nhap password lon hon 8 ky tu!";
    } else if (!(values.password === values.confirmPassword)) {
      errors.confirmPassword = "vui long nhap dung password";
    } else if (!values.phoneNumber) {
      errors.phoneNumber = "Number khong duoc de trong";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(values.phoneNumber)) {
      errors.phoneNumber = "phai la so ";
    } else if (!values.firstName) {
      errors.firstName = "firstname khong duoc de trong";
    } else if (!values.lastName) {
      errors.lastName = "lastname khong duoc de trong";
    }

    //  if (!values.password) {
    //   errors.password = "password khong duoc de trong";
    // } else if (values.password.length < 8) {
    //   errors.password = "Yeu cau nhap password lon hon 8 ky tu!";
    // }

    // if (!(values.password === values.confirmPassword)) {
    //   errors.confirmPassword = "vui long nhap dung password";
    // }
    // if (!values.phoneNumber) {
    //   errors.phoneNumber = "Number khong duoc de trong";
    // } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(values.phoneNumber)) {
    //   errors.phoneNumber = "phai la so ";
    // }
    // if (!values.firstName) {
    //   errors.firstName = "firstname khong duoc de trong";
    // }
    // if (!values.lastName) {
    //   errors.lastName = "lastname khong duoc de trong";
    // }

    return errors;
  };

  const formik = useFormik({
    // Gia tri khoi tao cua form
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
    },
    // Ham validate
    validate,
    // Ham xu ly submit
    onSubmit: async (values) => {
      try {
        const { data } = await authApi.userRegister(values); // Call API de dang nhap
        localStorage.setItem("TOKEN", data.accessToken);
        localStorage.setItem("USER", data.user.email);
        navigate("/");
      } catch (error) {
        setErrorMess(error.response.data);
      }
    },
  });

  return (
    <>
      <Header />
      <Navigation />
      <div id="register">
        <h1>Register</h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <span className="error">{formik.errors.email}</span>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <span className="error">{formik.errors.password}</span>
          )}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword && (
            <span className="error">{formik.errors.confirmPassword}</span>
          )}
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          {formik.errors.phoneNumber && (
            <span className="error">{formik.errors.phoneNumber}</span>
          )}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.errors.firstName && (
            <span className="error">{formik.errors.firstName}</span>
          )}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.errors.lastName && (
            <span className="error">{formik.errors.lastName}</span>
          )}
          {errorMess && <span className="error">{errorMess}</span>}
          <div>
            <button type="submit">Register</button>
            <Link to="/login">Bạn đã có tài khoản</Link>
          </div>
        </form>
      </div>{" "}
      <Footer />
    </>
  );
}
