import React from 'react';
import './ProductStatistics.css';

const ProductStatistics = ({ data }) => {
  return (
    <div>
      <h2>Thống kê sản phẩm</h2>
      <div className='summary'>
        <h3>Thông tin sản phẩm</h3>
        <table className='summary-table'>
          <thead>
            <tr>
              <th>Chỉ số</th>
              <th>Giá trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tổng số sản phẩm</td>
              <td>{data.totalProducts}</td>
            </tr>
            {data.categories.map((category, index) => (
              <tr key={index}>
                <td>Số lượng {category.name}</td>
                <td>{category.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductStatistics;
