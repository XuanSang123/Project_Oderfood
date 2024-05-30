import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import "./UserInfo.css";

export default function UserInfo() {
  return (
    <>
      <Header />
      <Navigation />
      <div id="user-info">
        <div className="title">
          <h2>Chỉnh sửa hồ sơ</h2>
        </div>
        <div className="information">
          <div className="avatar">
            <img src="../../../public/avatar.jpg" alt="Avatar" />
          </div>
          <div className="info">
            <form>
              <label htmlFor="name">Tên:</label>
              <input type="text" id="name" name="name" />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
              <label htmlFor="address">Địa chỉ:</label>
              <input type="text" id="address" name="address" />
              <label htmlFor="phone">Số điện thoại:</label>
              <input type="tel" id="phone" name="phone" />
              <button>Lưu</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
