// components/Navigation/Navigation.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
export default function Navigation() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    setSearchTerm(event.target[0].value);
  };

  // const filteredItems = { ListFood }.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>
      <div id="nav-search">
        <div className="food-nav">
          <Link to={"/"} className="food-btn">
            Trang chủ
          </Link>
          <Link to={"/mon-viet"} className="food-btn">
            Món Việt
          </Link>
          <Link to={"/mon-a"} className="food-btn">
            Món Á
          </Link>
          <Link to={"/mon-au"} className="food-btn">
            Món Âu
          </Link>
          <Link to={"/mon-han"} className="food-btn">
            Món Hàn
          </Link>
          <Link to={"/mon-nhat"} className="food-btn">
            Món Nhật
          </Link>
          <Link to={"/trang-mieng"} className="food-btn">
            Tráng Miệng
          </Link>
        </div>
      </div>
    </>
  );
}
