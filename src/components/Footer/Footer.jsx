import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <>
     <footer>
            <div className="footer-container">
                <div className="footer-section about">
                    <h3>Về Chúng Tôi</h3>
                    <p>Chúng tôi cung cấp dịch vụ đặt hàng thức ăn trực tuyến với đa dạng các món ăn phong phú, đảm bảo chất lượng và dịch vụ tận tình.</p>
                </div>
                <div className="footer-section links">
                    <h3>Liên Kết Nhanh</h3>
                    <ul>
                        <li><Link to="/">Trang Chủ</Link></li>
                        <li><Link to="/menu">Thực Đơn</Link></li>
                        <li><Link to="/gio-hang">Giỏ Hàng</Link></li>
                        <li><Link to="/lien-he">Liên Hệ</Link></li>
                        <li><Link to="/gioi-thieu">Giới Thiệu</Link></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3>Thông Tin Liên Hệ</h3>
                    <p>Địa chỉ: 123 Đường ABC, Phường XYZ, TP. HCM</p>
                    <p>Điện thoại: (012) 345-6789</p>
                    <p>Email: info@orderfood.com</p>
                </div>
                <div className="footer-section social">
                    <h3>Kết Nối Với Chúng Tôi</h3>
                    <ul>
                        <li><a href="https://facebook.com/orderfood">Facebook</a></li>
                        <li><a href="https://twitter.com/orderfood">Twitter</a></li>
                        <li><a href="https://instagram.com/orderfood">Instagram</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </>
  )
}
