import { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authReducer";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((acc, currentValue) => {
    return acc + currentValue.quantity;
  }, 0);

  const handleSingout = () => {
    localStorage.removeItem("USER");
    localStorage.removeItem("TOKEN");
    dispatch(logout());
    navigate("/login");
  };

  const renderHeaderCtas = (
    <div className="user-info">
      {isLogged ? (
        <>
          <Link to="/userInfo">Thông tin cá nhân</Link>
          <Link to="/cart">Đơn hàng</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );

  return (
    <div id="header">
      <div className="header-img">
        <img src="../../../public/header.jpg" alt="Header-img" />
      </div>
      <div className="header">
        <h1>Food Web</h1>
      </div>
      <div className="header-user-shopping">
        <div className="user-icon">
          <Link to="#">
            <FontAwesomeIcon icon={faUser} />
            {isLogged && (
              <span>{JSON.parse(localStorage.getItem("USER"))?.email}</span>
            )}
          </Link>
          {renderHeaderCtas}
        </div>
        <span>
          {isLogged && (
            <FontAwesomeIcon
              icon={faRightFromBracket}
              onClick={handleSingout}
            />
          )}
        </span>
        <Link to="/cart">
          <FontAwesomeIcon icon={faCartShopping} />
          {totalQuantity}
        </Link>
      </div>
    </div>
  );
}
