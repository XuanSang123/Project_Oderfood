import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RevenueStatistics from './RevenueStatistics/RevenueStatistics';
import ProductStatistics from './ProductStatistics/ProductStatistics';
import UserStatistics from './UserStatistics/UserStatistics';
import PendingOrders from './PendingOrders/PendingOrders';
import './Dashboard.css';

const Dashboard = () => {
  
  const  navigate  = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const toggleItem = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };

  const handleLogout = () => {
    navigate('/login');
  }

  return (
    <div id='dashboard'>
      <h1>Dashboard</h1>
      <div className='dashboard-nav'>
        <Link to="#" onClick={() => toggleItem('revenue')}>
          Thống kê doanh thu
        </Link>
        <Link to="#" onClick={() => toggleItem('product')}>
          Thống kê sản phẩm
        </Link>
        <Link to="#" onClick={() => toggleItem('user')}>
          Thống kê user
        </Link>
        <Link to="#" onClick={() => toggleItem('pendingOrders')}>
          Đơn hàng đang chờ xử lý
        </Link>
        <Link to="#" onClick={handleLogout}>
          Đăng xuất
        </Link>
      </div>
      <div className='dashboard-content'>
        {activeItem === 'revenue' && (
          <RevenueStatistics  />
        )}
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
