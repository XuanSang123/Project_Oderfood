// components/Navigation/Navigation.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import "./Navigation.css";
import ListFood from "../ListFood/ListFood";
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
        <div className="advanve">
          <div className="advanced-search-city">
            <Select
              options={cityOptions}
              placeholder="Search City"
              className="city-select"
              isClearable
            />
          </div>
          <form className="advance-input" onSubmit={handleSubmit}>
            <input
              type="text"
              // value={searchTerm}
              placeholder="Search"
              className="search-input"
            />
            <button className="search-btn" type="submit">
              Search
            </button>
          </form>
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
