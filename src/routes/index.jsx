import { Routes, Route, BrowserRouter } from "react-router-dom";
import VietFood from "../nav/VietFood/VietFood";
import AsiaFood from "../nav/AsiaFood/AsiaFood";
import EuropeanFood from "../nav/EuropeanFood/EuropeanFood";
import KoreanFood from "../nav/KoreanFood/KoreanFood";
import JapaneseFood from "../nav/JapaneseFood/JapaneseFood";
import DessertsFood from "../nav/DessertsFood/DessertsFood";
import UserInfo from "../components/UserInfo/UserInfo";
import ListFood from "../components/ListFood/ListFood";
import Login from "../Login/Login";
import Register from "../Resgister/Register";
import Dashboard from "../Dashboard/Dashboard";
import Cart from "../components/Cart/Cart";
import Contact from "../nav/Contact/Contact";
import ProductStatistics from '../Dashboard/ProductStatistics/ProductStatistics'
import UserStatistics from '../Dashboard/UserStatistics/UserStatistics'
import PendingOrders from '../Dashboard/PendingOrders/PendingOrders'

export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListFood />} />
        <Route path="/mon-viet" element={<VietFood />} />
        <Route path="/mon-a" element={<AsiaFood />} />
        <Route path="/mon-au" element={<EuropeanFood />} />
        <Route path="/mon-han" element={<KoreanFood />} />
        <Route path="/mon-nhat" element={<JapaneseFood />} />
        <Route path="/trang-mieng" element={<DessertsFood />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productstatistics" element={<ProductStatistics />} />
        <Route path="/userstatistics" element={<UserStatistics />} />
        <Route path="/pendingorders" element={<PendingOrders />} />
      </Routes>
    </BrowserRouter>
  );
}
