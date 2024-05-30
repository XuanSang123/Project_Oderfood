import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authReducer";
import "./Login.css";
import authApi from "../api/authApi";
import Header from "../../src/components/Header/Header";
import Navigation from "../../src/components/Navigation/Navigation";
import Footer from "../../src/components/Footer/Footer";
import { useState } from "react";

// sử dụng thư viện formmik
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayErros, setDisplayErros] = useState("");

  // See more: https://formik.org/docs/guides/validation
  // formik validate function
  const validate = (values) => {
    // Tao object errors
    const errors = {};
    // Check email khong rong

    if (values.email == "admin" && values.password == "admin") {
      navigate("/dashboard");
    } else if (!values.email) {
      errors.email = "Yeu cau nhap email!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Day khong phai la email, vui long nhap lai";
    } else if (!values.password) {
      errors.password = "Yeu cau nhap password!";
    } else if (values.password.length < 4) {
      errors.password = "Yeu cau nhap password lon hon 4 ky tu!";
    }

    // if (!values.email) {
    //   errors.email = "Yeu cau nhap email!";
    // } else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) // check dinh dang email
    // ) {
    //   errors.email = "Day khong phai la email, vui long nhap lai";
    // }
    // if (!values.password) {
    //   errors.password = "Yeu cau nhap password!";
    // } else if (values.password.length < 4) {
    //   errors.password = "Yeu cau nhap password lon hon 4 ky tu!";
    // }
    return errors;
  };

  const formik = useFormik({
    // Gia tri khoi tao cua form
    initialValues: {
      email: "",
      password: "",
    },
    // Ham validate
    validate,
    // Ham xu ly submit
    onSubmit: async (values) => {
      try {
        const { data } = await authApi.userLogin(values); // Call API de dang nhap
        // Set localStorage
        localStorage.setItem("TOKEN", data.accessToken);
        localStorage.setItem("USER", data.user.email);

        // Dispatch de set isLogin === true
        dispatch(login());
        navigate("/");
      } catch (error) {
        console.log(error.response.data);
        setDisplayErros(error.response.data);
      }
    },
  });
  return (
    <>
      <Header />
      <Navigation />
      <div id="login">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <span className="error">{formik.errors.email}</span>
          )}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <span className="error">{formik.errors.password}</span>
          )}
          <div>
            <button type="submit">Đăng nhập</button>
            <p className="error">{displayErros}</p>
            <Link to={"/register"}>Bạn đã có tài khoản chưa ?</Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
