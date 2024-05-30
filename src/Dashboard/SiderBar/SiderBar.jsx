import { Link } from 'react-router-dom';
import './SiderBar.css';

const Sidebar = ({ toggleItem, activeItem }) => {
  return (
    <div className='sidebar'>
      <Link
        to="#"
        onClick={() => toggleItem('product')}
        className={activeItem === 'product' ? 'active' : ''}
      >
        Thống kê sản phẩm
      </Link>
      <Link
        to="#"
        onClick={() => toggleItem('user')}
        className={activeItem === 'user' ? 'active' : ''}
      >
        Thống kê user
      </Link>
      <Link
        to="#"
        onClick={() => toggleItem('pendingOrders')}
        className={activeItem === 'pendingOrders' ? 'active' : ''}
      >
        Đơn hàng đang chờ xử lý
      </Link>
      <Link
        to="/login"
        className="logout"
      >
        Đăng xuất
      </Link>
    </div>
  );
};

export default Sidebar;
