import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RevenueStatistics from './RevenueStatistics/RevenueStatistics';
import ProductStatistics from './ProductStatistics/ProductStatistics';
import UserStatistics from './UserStatistics/UserStatistics';
import PendingOrders from './PendingOrders/PendingOrders';
import './Dashboard.css';

const orderData = {
  totalOrders: 120,
  totalRevenue: 1500000,
  products: [
    { name: 'Product A', revenue: 500000 },
    { name: 'Product B', revenue: 400000 },
    { name: 'Product C', revenue: 600000 },
  ],
};

const productData = {
  totalProducts: 50,
  categories: [
    { name: 'Category A', count: 20 },
    { name: 'Category B', count: 15 },
    { name: 'Category C', count: 15 },
  ],
};

const userData = {
  totalUsers: 300,
  activeUsers: 200,
  inactiveUsers: 100,
  users: [
    { id: 1, name: 'User A', status: 'Active' },
    { id: 2, name: 'User B', status: 'Inactive' },
    { id: 3, name: 'User C', status: 'Active' },
  ],
};

const pendingOrdersData = {
  totalPending: 10,
  orders: [
    { id: 1, customer: 'Customer A', amount: 150000 },
    { id: 2, customer: 'Customer B', amount: 200000 },
    { id: 3, customer: 'Customer C', amount: 300000 },
  ],
};

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [includeRevenueData, setIncludeRevenueData] = useState(true);

  const toggleItem = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    window.location.href = '/login';
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
        {activeItem === 'revenue' && orderData && (
          <RevenueStatistics  orderData={orderData} />
        )}
        {activeItem === 'product' && (
          <ProductStatistics data={productData} />
        )}
        {activeItem === 'user' && (
          <UserStatistics data={userData} />
        )}
        {activeItem === 'pendingOrders' && (
          <PendingOrders data={pendingOrdersData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
