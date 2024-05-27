
import React from 'react';
import './Login.css';

export default function Login() {
const handleSubmit = (e) => {
  e.preventDefault();
  const email = e.target.Email.value;
  const password = e.target.password.value;
  if (email === 'admin' && password === 'admin') {
    localStorage.setItem('token', 'admin');
    window.location.href = '/dashboard';
  } else {
    alert('Đăng nhập thất bại');
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}


  return (
    <div id='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Email' name='Email' />
        <input type='password' placeholder='Password' name='password' />
        <div>
          <button type='submit'>Đăng nhập</button>
        </div>
      </form>
    </div>
  );
}
