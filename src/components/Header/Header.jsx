import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import {
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authReducer";

export default function Header() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const cartstore = useSelector((store) => store.cart.data);

  // console.log(cartstore, "aaa");
  const handleSingout = () => {
    localStorage.removeItem("USER");
    localStorage.removeItem("TOKEN");
    // Set state isLogin ==== false
    dispatch(logout());
  };
  return (
    <div id="header">
      <div className="header-img">
        <img src="../../../public/header.jpg" alt="Header-img" />
      </div>
      <div className="header">
        <h1>Food Web</h1>
      </div>
      <div className="header-user-shopping">
        <Link to="/login">
          <FontAwesomeIcon icon={faUser} />
          {isLogin && <span>{localStorage.getItem("USER")}</span>}
        </Link>
        <span>
          {isLogin && (
            <FontAwesomeIcon
              icon={faRightFromBracket}
              onClick={handleSingout}
            />
          )}
        </span>
        <Link to="/cart">
          <FontAwesomeIcon icon={faCartShopping} />
          {cartstore?.reduce((current, next) => {
            return (current += next.quantity);
          }, 0)}
        </Link>
      </div>
    </div>
  );
}
