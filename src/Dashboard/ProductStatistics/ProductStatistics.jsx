import React, { useState } from 'react';
import './ProductStatistics.css';

const ProductStatistics = () => {
  const [toggle, setToggle] = useState();
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
    <div id='productStatistics'>
      <h2>Thống kê sản phẩm</h2>
      <div className='searchProduct'>
        <div className='searchProductInput'>
          <input type='text' placeholder='Search product' />
          <button>Search</button>
        </div>
        <button>Sắp xếp</button>
        <button onClick={handleToggle}>Thêm sản phẩm</button>
      </div>
      {toggle && <div id='addProduct'>
        <h3>Thêm sản phẩm mới</h3>
        <input type='text' placeholder='Ảnh sản phẩm' />
        <input type='text' placeholder='Tên sản phẩm' />
        <input type='text' placeholder='Tên nhà hàng' />
        <input type='text' placeholder='Địa chỉ' />
        <input type='text' placeholder='Giá' />
        <input type="text" placeholder="Mô tả" />
      <div className='addProductButton'>
          <button>Thêm sản phẩm mới</button>
          <button onClick={handleToggle}>Hủy</button>
      </div>
      </div> }
      <div className='pagination'>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
        <table>
          <thead>
          <tr>
              <th>Ảnh sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Tên nhà hàng</th>
              <th>Địa chỉ</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
        </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src='https://via.placeholder.com/150' alt='product' /></td>
              <td>Product 1</td>
              <td>Restaurant 1</td>
              <td>Address 1</td>
              <td>100000</td>
              <td>Description 1</td>
              <td>
                <button>Sửa</button>
                <button>Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    </>
  );
};

export default ProductStatistics;
