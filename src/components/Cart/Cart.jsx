import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { moneyFormat } from "../../utilities/stringUtil";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Cart.css';
import { clearCart } from "../../redux/slices/cartReducer";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle payment
  const handlePayment = () => {
    let payment = JSON.parse(localStorage.getItem("cart")) || [];//chuyển đổi payment thành mảng
    let data = {
      items: items,
      totalPrice: totalPrice,
      totalQuantity: totalQuantity,
    };
    payment.push(data);
    localStorage.setItem("cart", JSON.stringify(payment));//chuyển đổi payment thành chuỗi
    alert("Thanh toán thành công");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <>
      <Header />
      <Navigation />
      <h1>Đơn hàng</h1>
      <div className="details">
        <table>
          <thead>
            <tr>
              <th>Hình Ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Thành Tiền</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
        <div className="grand-total">
          <h2>Tổng tiền: {moneyFormat(totalPrice)}</h2>
          <button onClick={handlePayment}>Thanh Toán</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
