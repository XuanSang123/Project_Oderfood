import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductStatistics from './ProductStatistics/ProductStatistics';
import UserStatistics from './UserStatistics/UserStatistics';
import PendingOrders from './PendingOrders/PendingOrders';
import './Dashboard.css';

const Dashboard = () => {
  
  const [activeItem, setActiveItem] = useState(null);
  const toggleItem = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };

  return (
    <div id='dashboard'>
      <h1>Dashboard</h1>
      <div className='dashboard-nav'>
        <Link to="#" onClick={() => toggleItem('product')}>
          Thống kê sản phẩm
        </Link>
        <Link to="#" onClick={() => toggleItem('user')}>
          Thống kê user
        </Link>
        <Link to="#" onClick={() => toggleItem('pendingOrders')}>
          Đơn hàng đang chờ xử lý
        </Link>
        <Link to="/login">
          Đăng xuất
        </Link>
      </div>
      <div className='dashboard-content'>
        {activeItem === 'product' && (
          <ProductStatistics />
        )}
        {activeItem === 'user' && (
          <UserStatistics/>
        )}
        {activeItem === 'pendingOrders' && (
          <PendingOrders />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
