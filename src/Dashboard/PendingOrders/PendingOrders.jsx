import { useEffect, useState } from "react";
import "./PendingOrders.css";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const ordersData = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(ordersData);
  }, []);

  const indexEnd = itemsPerPage * currentPage;
  const indexStart = indexEnd - itemsPerPage;
  const currentOrders = orders.slice(indexStart, indexEnd);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div id="pending-orders">
        <h2>Quản lý đơn hàng</h2>
        <div className="searchOrder">
          <input 
          type="text" 
          placeholder="Search order" 
          />
          <button>Search</button>
          <button>Sắp xếp</button>
        </div>
        <div className="pagination">
          {pageNumbers.map((page) => (
            <button key={page} onClick={() => handlePageChange(page)}>
              {page}
            </button>
          ))}
        </div>
      </div>
      <div id="pending-orders-table">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên đơn hàng</th>
              <th>Tên người đặt</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{indexStart + index + 1}</td>
                  <td>{order.items.map((item) => item.name).join(", ")}</td>
                  <td>{order.name}</td>
                  <td>{order.address}</td>
                  <td>
                    <select>
                      <option value="pending">Đang chờ</option>
                      <option value="shipping">Đang giao</option>
                      <option value="delivered">Đã giao</option>
                    </select>
                    <button>Xoá</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PendingOrders;
