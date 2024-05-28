import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";

export default function Cart() {
  const cartStore = useSelector((store) => store.cart.data);
  console.log(cartStore, "aaaa");
  const dispacth = useDispatch();

  return (
    <>
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
            {cartStore.map((item) => (
              <CartItem item={item} />
            ))}
          </tbody>
        </table>
        <div className="grand-total">
          <h2>Tổng tiền:</h2>
          <button>Thanh Toán</button>
        </div>
      </div>
    </>
  );
}
