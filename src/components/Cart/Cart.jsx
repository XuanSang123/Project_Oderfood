import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { moneyFormat } from "../../utilities/stringUtil";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Cart.css'

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  return (
    <>
    <Header/>
    <Navigation/>
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
          <button>Thanh Toán</button>
        </div>
      </div>
      <Footer/>
    </>
  );
}
