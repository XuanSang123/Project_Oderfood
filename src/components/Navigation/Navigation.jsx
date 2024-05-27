// components/Navigation/Navigation.js
import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import "./Navigation.css";

const cityOptions = [
  { value: "TPHCM", label: "TP.HCM" },
  { value: "HN", label: "Hà Nội" },
  { value: "DN", label: "Đà Nẵng" },
  { value: "HP", label: "Hải Phòng" },
  { value: "CT", label: "Cần Thơ" },
  { value: "BH", label: "Biên Hòa" },
  { value: "NT", label: "Nha Trang" },
];

export default function Navigation() {
  return (
    <>
      <div id="nav-search">
        <div className="advanve">
          <div className="advanced-search-city">
            <Select
              options={cityOptions}
              placeholder="Search City"
              className="city-select"
              isClearable
            />
          </div>
          <div className="advance-input">
            <input type="text" placeholder="Search" className="search-input" />
            <button className="search-btn">Search</button>
          </div>
        </div>
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
