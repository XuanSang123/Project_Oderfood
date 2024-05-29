import { useDispatch } from "react-redux";
import { adjustQuantity, removeFromCart } from "../../redux/slices/cartReducer";
import { moneyFormat } from "../../utilities/stringUtil";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleAdjustQuantity = (itemId, quantity) => {
    dispatch(adjustQuantity({ id: itemId, quantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

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
      <td data-label="Giá">{moneyFormat(item.price)}</td>
      <td data-label="Số Lượng">
        <button
          onClick={() => handleAdjustQuantity(item.id, item.quantity - 1)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => handleAdjustQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </td>
      <td data-label="Thành Tiền">{moneyFormat(item.price * item.quantity)}</td>
      <td data-label="Hành Động">
        <button onClick={() => handleRemoveItem(item.id)}>Xoá</button>
      </td>
    </tr>
  );
}
