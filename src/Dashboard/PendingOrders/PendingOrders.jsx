import React from 'react';
import './PendingOrders.css';

const PendingOrders = ({ data }) => {
  return (
    <div className='summary'>
      <h2>Đơn hàng đang chờ xử lý</h2>
      <h3>Thông tin đơn hàng đang chờ</h3>
      <p>Tổng số đơn hàng đang chờ: {data.totalPending}</p>
      <p>Tổng số đơn hàng thành công:0/{data.totalPending}</p>
      <table className='summary-table'>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Khách hàng</th>
            <th>Số tiền</th>
          </tr>
        </thead>
        <tbody>
          {data.orders.map((order, index) => (
            <tr key={index}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.amount.toLocaleString()} VND</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;
