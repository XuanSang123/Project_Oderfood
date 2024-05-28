import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);

  function handleincrement() {
    setQuantity(quantity + 1);
  }

  let timeout = null;
  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      axios.post;
    }, 500);
  }, [quantity]);
  return (
    <tr key={item.id}>
      <td>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "150px", height: "150px" }}
        />
      </td>
      <td data-label="Tên Sản Phẩm">{item.name}</td>
      <td data-label="Giá">{item.price}VND</td>
      <td data-label="Số Lượng">
        <button>-</button>
        <span>{quantity}</span>
        <button
          onClick={() => {
            handleincrement();
          }}
        >
          +
        </button>
      </td>
      <td data-label="Thành Tiền">{item.price * item.quantity}</td>
      <td data-label="Hành Động">
        <button>Xoá</button>
      </td>
    </tr>
  );
}
