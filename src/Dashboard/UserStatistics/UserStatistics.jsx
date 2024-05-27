import {useState} from 'react';
import './UserStatistics.css';

const UserStatistics = () => {
  const [toggle, setToggle] = useState();
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
   <> 
   <div id='userStatistics'>
    <h2>Quản lý người dùng</h2>
      <div className='search-sort-pagivation'>
        <div className='search-user'>
          <input type='text' placeholder='Search user' />
          <button>Tìm kiếm</button>
          <button>Sắp xếp</button>
          <button onClick={handleToggle}>Thêm người dùng</button>
        </div>
      </div>
      {toggle && <div id='addUser'>
        <h3>Thêm người dùng mới</h3>
        <input type='text' placeholder='Ảnh đại diện' />
        <input type='text' placeholder='Tên người dùng' />
        <input type='text' placeholder='Email' />
        <input type='text' placeholder='Mật khẩu' />
        <input type='text' placeholder='Địa chỉ' />
        <input type='text' placeholder='Số điện thoại' />
        </div>}
      <div className='pagination'>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        </div>
   <div id='userStatistics-table'>
      <table>
        <thead>
          <tr>
            <th>Ảnh đại diện</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src='https://picsum.photos/200/300' alt='avatar' /></td>
            <td>Nguyễn Văn A</td>
            <td>nguyenvana@gmail.com</td>
            <td>123, ABC, XYZ</td>
            <td>0123456789</td>
            <td>
              <button>Sửa</button>
              <button>Xóa</button>
            </td>
          </tr>
          <tr>
            <td><img src='https://picsum.photos/200/300' alt='avatar' /></td>
            <td>Nguyễn Văn B</td>
            <td>nguyenvana@gmail.com</td>
            <td>456, ABC, XYZ</td>
            <td>0123456789</td>
            <td>
              <button>Sửa</button>
              <button>Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
   </div>
   </div>
   </>
  );
};

export default UserStatistics;
