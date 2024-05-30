// import './PendingOrders.css';

// const PendingOrders = () => {
  
//   return (
//    <>
//     <div id='pending-orders'>
//       <h2>Quản lý đơn hàng</h2>
//       <div className='searchOrder'>
//         <input type='text' placeholder='Search order' />
//         <button>Search</button>
//         <button>Sắp xếp</button>
//       </div>
//       <div className='pagination'>
//         <button>1</button>
//         <button>2</button>
//         <button>3</button>
//       </div>
//     </div>
//     <div id='pending-orders-table'>
//       <table>
//         <thead>
//           <tr>
//             <th>STT</th>
//             <th>Tên đơn hàng</th>
//             <th>Tên người đặt</th>
//             <th>Địa chỉ</th>
//             <th>Trạng thái</th>
//           </tr>
//         </thead>
//         <tbody>
//          {}
//         </tbody>
//       </table>
//     </div>
//    </>   
//   )
// };

// export default PendingOrders;
import { useEffect, useState } from 'react';
import './PendingOrders.css';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch cart data from local storage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setOrders(cartData);
  }, []);
      return (
    <>
      <div id='pending-orders'>
        <h2>Quản lý đơn hàng</h2>
        <div className='searchOrder'>
          <input type='text' placeholder='Search order' />
          <button>Search</button>
          <button>Sắp xếp</button>
        </div>
        <div className='pagination'>
          <button>1</button>
          <button>2</button>
          <button>3</button>
        </div>
      </div>
      <div id='pending-orders-table'>
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
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.items.map((item) => item.name).join(', ')}</td>
                  <td>{order.name}</td>
                  <td>{order.address}</td>
                  <td>
                    <select>
                      <option value='pending'>Đang chờ</option>
                      <option value='shipping'>Đang giao</option>
                      <option value='delivered'>Đã giao</option>
                    </select>
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
