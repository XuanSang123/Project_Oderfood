import { useState } from 'react';
import ProductStatistics from './ProductStatistics/ProductStatistics';
import UserStatistics from './UserStatistics/UserStatistics';
import PendingOrders from './PendingOrders/PendingOrders';
import Sidebar from './SiderBar/SiderBar';
import './Dashboard.css';

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState(null);

  const toggleItem = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };

  return (
    <>
    <div id='dashboard'>
      <div className='siderbar'>
        <Sidebar toggleItem={toggleItem} activeItem={activeItem} />
      </div>
      <div className='dashboard-content'>
        <h1>Dashboard</h1>
        {activeItem === 'product' && <ProductStatistics />}
        {activeItem === 'user' && <UserStatistics />}
        {activeItem === 'pendingOrders' && <PendingOrders />}
        {!activeItem && <div>Chọn một mục từ menu để xem thống kê.</div>}
      </div>
    </div>
    </>
  );
};

export default Dashboard;

