import React from 'react';
import './RevenueStatistics.css';

const RevenueStatistics = ({ data, orderData }) => {
  return (
    <div>
      <h2>Thống kê doanh thu</h2>
      <div className='summary'>
        <h3>Thông tin đơn hàng</h3>
        <table className='summary-table'>
          <thead>
            <tr>
              <th>Chỉ số</th>
              <th>Giá trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tổng số đơn hàng</td>
              <td>{orderData.totalOrders}</td>
            </tr>
            <tr>
              <td>Tổng doanh thu</td>
              <td>{orderData.totalRevenue.toLocaleString()} VND</td>
            </tr>
            {orderData.products.map((product, index) => (
              <tr key={index}>
                <td>Doanh thu từ {product.name}</td>
                <td>{product.revenue.toLocaleString()} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueStatistics;
