import React from 'react';
import './UserStatistics.css';

const UserStatistics = ({ data }) => {
  const handleView = (userId) => {
    console.log(`View details of user ${userId}`);
  };

  const handleEdit = (userId) => {
    console.log(`Edit user ${userId}`);
  };

  const handleDelete = (userId) => {
    console.log(`Delete user ${userId}`);
  };

  return (
    <div className='summary'>
      <h2>Thống kê user</h2>
      <h3>Thông tin user</h3>
      <table className='summary-table'>
        <thead>
          <tr>
            <th>Chỉ số</th>
            <th>Giá trị</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tổng số user</td>
            <td>{data.totalUsers}</td>
            <td></td>
          </tr>
          <tr>
            <td>User đang hoạt động</td>
            <td>{data.activeUsers}</td>
            <td></td>
          </tr>
          <tr>
            <td>User không hoạt động</td>
            <td>{data.inactiveUsers}</td>
            <td></td>
          </tr>
          {data.users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.status}</td>
              <td>
                
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserStatistics;XMLDocument
