import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductStatistics.css";
import foodApi from "../../api/foodApi";

export default function ProductStatistics() {
  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    restaurant: "",
    address: "",
    price: "",
    review: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const productsPerPage = 5;
  //lấy danh sách sản phẩm từ server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await foodApi.getListFood();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  //sắp xếp sản phẩm
  const handleSortClick = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  //thêm sản phẩm mới hoặc chỉnh sửa sản phẩm
  const handleToggle = () => {
    setToggle(!toggle);
    setEditProduct(null);
    setFormData({
      image: "",
      name: "",
      restaurant: "",
      address: "",
      price: "",
      review: "",
    });
  };
  //lưu sản phẩm
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //lưu sản phẩm
  const handleSave = async () => {
    try {
      if (editProduct) {
        await axios.put(
          `http://localhost:3000/allfood/${editProduct.id}`,
          formData
        );
        setProducts(  //cập nhật sản phẩm sau khi chỉnh sửa
          products.map((p) =>
            p.id === editProduct.id ? { ...formData, id: editProduct.id } : p
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:3000/allfood",
          formData
        );
        const newProduct = response.data;
        setProducts([...products, newProduct]);
      }
      handleToggle();
    } catch (error) {
      console.error("Error saving product", error);
    }
  };  
  //chuyển trang
  const handlePageChange = (pageNumber) => { //
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setToggle(true);
    setFormData(product);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/allfood/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div id="productStatistics">
        <h2>Thống kê sản phẩm</h2>
        <div className="searchProduct">
          <input
            type="text"
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSortClick}>Sắp xếp</button>
          <button onClick={handleToggle}>
            {toggle ? "Đóng" : "Thêm sản phẩm"}
          </button>
        </div>
        {toggle && (
          <div id="addProduct">
            <h3>{editProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h3>
            <input
              type="text"
              name="image"
              placeholder="Ảnh sản phẩm"
              value={formData.image}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Tên sản phẩm"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="restaurant"
              placeholder="Tên nhà hàng"
              value={formData.restaurant}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              value={formData.address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Giá"
              value={formData.price}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="review"
              placeholder="Mô tả"
              value={formData.review}
              onChange={handleInputChange}
            />
            <select
              name="categories"
              id="catecategoriesgory"
              value={formData.categories}
              onChange={handleInputChange}
            >
              <option value="">Chọn danh mục</option>
              <option value="foods">foods</option>
              <option value="vietfood">vietfood</option>
              <option value="asiafood">asiafood</option>
              <option value="europeanfood">europeanfood</option>
              <option value="koreanfood">koreanfood</option>
              <option value="japanesefood">japanesefood</option>
              <option value="dessertsfood">dessertsfood</option>
            </select>
            <div className="btn">
              <button onClick={handleSave}>
                {editProduct ? "Lưu" : "Thêm sản phẩm mới"}
              </button>
              <button onClick={handleToggle}>Hủy</button>
            </div>
          </div>
        )}
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={number === currentPage ? "active" : ""}
            >
              {number}
            </button>
          ))}
        </div>
        <table>
          <thead>
            <tr>
              <th>Ảnh sản phẩm</th>
              <th onClick={handleSortClick}>
                Tên sản phẩm {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th>Tên nhà hàng</th>
              <th>Địa chỉ</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Danh mục</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={index}>
                <td>
                  <img src={product.image} alt="product" />
                </td>
                <td>{product.name}</td>
                <td>{product.restaurant}</td>
                <td>{product.address}</td>
                <td>{product.price}</td>
                <td>{product.review}</td>
                <td>{product.categories}</td>
                <td>
                  <button onClick={() => handleEditClick(product)}>Sửa</button>
                  <button onClick={() => handleDelete(product.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
