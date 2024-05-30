import { useState, useEffect } from "react";
import "./ListFood.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import foodApi from "../../api/foodApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartReducer";
import Pagination from "./Pagination";
import Select from "react-select";
import axios from "axios";

export default function ListFood() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [foodsPerPage] = useState(7);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  //danh sách thành phố và danh mục
  const cityOptions = [
    { value: "TPHCM", label: "TP.HCM" },
    { value: "HN", label: "Hà Nội" },
    { value: "DN", label: "Đà Nẵng" },
    { value: "HP", label: "Hải Phòng" },
    { value: "CT", label: "Cần Thơ" },
    { value: "BH", label: "Biên Hòa" },
    { value: "NT", label: "Nha Trang" },
  ];
  //danh sách danh mục
  const categoryOptions = [
    { value: "viet", label: "Món Việt" },
    { value: "asian", label: "Món Á" },
    { value: "european", label: "Món Âu" },
    { value: "korean", label: "Món Hàn" },
    { value: "japanese", label: "Món Nhật" },
    { value: "dessert", label: "Tráng Miệng" },
  ];
  //lấy danh sách món ăn từ server
  useEffect(() => {
    const fetchListFood = async () => {
      try {
        const { data } = await foodApi.getListFood();
        const updatedData = data.map((food) => {
          const city = extractCityFromAddress(food.address);
          return { ...food, city };
        });
        setFoods(updatedData);
        setFilteredFoods(updatedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchListFood();
  }, []);
  //lấy mã thành phố từ địa chỉ
  const extractCityFromAddress = (address) => {
    const cities = {
      "TP. HCM": "TPHCM",
      "Hà Nội": "HN",
      "Đà Nẵng": "DN",
      "Hải Phòng": "HP",
      "Cần Thơ": "CT",
      "Biên Hòa": "BH",
      "Nha Trang": "NT",
    };
  
    for (const cityName in cities) { // Duyệt qua các tên thành phố
      if (address.includes(cityName)) { // Nếu địa chỉ chứa tên thành phố
        return cities[cityName]; // Trả về mã thành phố tương ứng
      }
    }
    return null; // Trả về null nếu không tìm thấy
  };
  
  //lọc món ăn theo thành phố, danh mục và từ khóa tìm kiếm
  useEffect(() => {
    const handleSearch = () => {
      const filtered = foods.filter((food) => {
        const matchesCity = !selectedCity || food.city === selectedCity.value;
        const matchesCategory =
          !selectedCategory || food.categories.includes(selectedCategory.value);
        const matchesKeyword =
          !searchKeyword ||
          food.name.toLowerCase().includes(searchKeyword.toLowerCase());

        return matchesCity && matchesCategory && matchesKeyword;
      });
      setFilteredFoods(filtered);
      setCurrentPage(1); // Reset trang về trang 1 khi search
    };
    handleSearch();
  }, [selectedCity, searchKeyword, selectedCategory, foods]);

  
  const handleDetails = async (food) => {
    try {
      const userEmail = localStorage.getItem('USER'); 
      const { data: userData } = await axios.get(`http://localhost:3000/users?email=${userEmail}`);
  
      if (userData.length > 0) {
        const user = userData[0];
        const cart = user.cart;
        const itemIndex = cart.findIndex((item) => item.id === food.id);
        if (itemIndex >= 0) {
          cart[itemIndex].quantity += 1;
        } else {
          cart.push({ ...food, quantity: 1 });
        }
        const totalPrice = user.totalPrice + food.price;
        await axios.patch(`http://localhost:3000/users/${user.id}`, { cart, totalPrice });
        dispatch(addToCart(food));
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //lấy món ăn của trang hiện tại
  const indexOfLastFood = currentPage * foodsPerPage;//tính toán một trang có bao nhiêu món ăn
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;//tính toán món ăn đầu tiên của trang
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);//lấy ra món ăn của trang hiện tại

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <Navigation />
      <div id="nav-search">
        <div className="advanced">
          <div className="advanced-search-city">
            <Select
              options={cityOptions}
              placeholder="Chọn thành phố"
              className="city-select"
              isClearable
              onChange={setSelectedCity}
            />
          </div>
          <div className="advanced-search-category">
            <Select
              options={categoryOptions}
              placeholder="Chọn danh mục"
              className="category-select"
              isClearable
              onChange={setSelectedCategory}
            />
          </div>
          <div className="advance-input">
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm"
              className="search-input"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
        </div>
        <h1>Quán ăn nổi bật</h1>
        <div id="list-food">
          {currentFoods.map((food) => (
            <div key={food.id} className="list-food">
              <img src={food.image} alt={food.name} />
              <h3>{food.name}</h3>
              <p>Nhà hàng: {food.restaurant}</p>
              <p>Địa chỉ: {food.address}</p>
              <p>Giá: {food.price}</p>
              <p>Đánh giá: {food.review}</p>
              <button onClick={() => handleDetails(food)}>Đặt món</button>
            </div>
          ))}
        </div>
        <div className="pagination">
          <Pagination
            postsPerPage={foodsPerPage}
            totalPosts={filteredFoods.length}
            paginate={paginate}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
