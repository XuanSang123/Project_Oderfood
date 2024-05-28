import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "./Login.css";
import authApi from "../api/authApi";
import Header from '../../src/components/Header/Header'
import Navigation from '../../src/components/Navigation/Navigation'
import Footer from '../../src/components/Footer/Footer'

// sử dụng thư viện formmik
export default function Login() {
  const navigate = useNavigate();
  // See more: https://formik.org/docs/guides/validation
  // formik validate function
  const validate = (values) => {
    // Tao object errors
    const errors = {};
    // Check email khong rong

    if (values.email == "admin" && values.password == "admin") {
      navigate("/dashboard");
    }

    if (values.email == "admin" && values.password == "admin") {
      navigate("/dashboard");
    }

    if (!values.email) {
      errors.email = "Yeu cau nhap email!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) // check dinh dang email
    ) {
      errors.email = "Day khong phai la email, vui long nhap lai";
    }

    if (!values.password) {
      errors.password = "Yeu cau nhap password!";
    } else if (values.password.length < 4) {
      errors.password = "Yeu cau nhap password lon hon 4 ky tu!";
    }
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
        localStorage.setItem("TOKEN", data.accessToken);
        localStorage.setItem("USER", data.user.email);
        navigate("/");

        // window.location.href("/login");
      } catch (error) {
        console.log(error);
      }
    },
  });

  // const handleLoginSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(event);
  //   const username = event.target.elements.username.value;
  //   const password = event.target.elements.password.value;

  //   // Kiểm tra logic đăng nhập
  //   if (username === "admin" && password === "adminPassword") {
  //     // Đăng nhập thành công với quyền admin
  //     localStorage.setItem("userType", "admin");
  //     // Chuyển hướng đến trang admin
  //     window.location.href = "/dashboard";
  //   } else if (username === "user" && password === "userPassword") {
  //     // Đăng nhập thành công với quyền user
  //     localStorage.setItem("userType", "user");
  //     // Chuyển hướng đến trang user
  //     window.location.href = "/user";
  //   } else {
  //     // Đăng nhập thất bại
  //     alert("Tên đăng nhập hoặc mật khẩu không chính xác");
  //   }
  // };

  return (
   <>
   <Header/>
   <Navigation/>
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
          <Link to={"/register"}>Bạn đã có tài khoản chưa ?</Link>
        </div>
      </form>
    </div>
  <Footer/>
   </>
  );
}
