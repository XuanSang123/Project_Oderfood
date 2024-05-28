import { useState, useEffect } from 'react';
import axios from 'axios';
import './UserStatistics.css';

const UserStatistics = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [toggle, setToggle] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    avatar: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: ''
  });
  const usersPerPage = 4;

  useEffect(() => {
    axios
      .get('http://localhost:3000/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortClick = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  const handleToggle = () => {
    setToggle(!toggle);
    setEditUser(null); 
    setFormData({
      lastName: '',
      email: '',
      phoneNumber: ''
    }); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setToggle(true);
    setFormData({
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    const user = {
      id: editUser ? editUser.id : Date.now(),
      ...formData
    };
  try {
      if (editUser) {
        await axios.put(`http://localhost:3000/users/${editUser.id}`, user);
        setUsers(users.map(u => (u.id === editUser.id ? user : u)));
      } else {
        const response = await axios.post('http://localhost:3000/users', user);
        setUsers([...users, response.data]);
      }
      setToggle(false);
      setEditUser(null);
    } catch (error) {
      console.error('Error saving user', error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.lastName.localeCompare(b.lastName);
    } else {
      return b.lastName.localeCompare(a.lastName);
    }
  });

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
                  <div id='userStatistics'>
              <div id='userStatistics'>
                <h2>Quản lý người dùng</h2>
                <div className='search-sort-pagination'>
                  <div className='search-user'>
                    <input 
                      type='text' 
                      placeholder='Search user'
                      value={searchTerm} 
                      onChange={handleSearchChange}
                    />
                    <button onClick={handleSortClick}>Sắp xếp</button>
                    <button onClick={handleToggle}>{toggle ? 'Đóng' : 'Thêm người dùng'}</button>
                  </div>
                </div>
                {toggle && (
                  <div id='addUser'>
                    <h3>{editUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h3>
                    <input
                      type='text'
                      name='firstName'
                      placeholder='First Name'
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <input
                      type='text'
                      name='lastName'
                      placeholder='Last Name'
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <input
                      type='text'
                      name='email'
                      placeholder='Email'
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <input
                      type='text'
                      name='phoneNumber'
                      placeholder='Số điện thoại'
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                    <div className='btn'>
                      <button onClick={handleSave}>{editUser ? 'Lưu' : 'Thêm mới người dùng'}</button>
                      <button onClick={handleToggle}>Huỷ</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          <div className='pagination'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div id='userStatistics-table'>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Điện thoại</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <button onClick={() => handleEditClick(user)}>Sửa</button>
                    <button onClick={() => handleDelete(user.id)}>Xoá</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
};

export default UserStatistics;

