import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import {
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isShow, setIsShow] = useState(localStorage.getItem("USER"));
  const handleSingout = () => {
    console.log("hihi");
    localStorage.removeItem("USER");
    localStorage.removeItem("TOKEN");
    setIsShow(false);
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
          <span>{localStorage.getItem("USER")}</span>
        </Link>
        <span>
          {isShow && (
            <FontAwesomeIcon
              icon={faRightFromBracket}
              onClick={handleSingout}
            />
          )}
        </span>
        <Link to="/details">
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
      </div>
    </div>
  );
}
