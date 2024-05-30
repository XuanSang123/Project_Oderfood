import { useState, useEffect } from "react";
import "./ListFood.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import foodApi from "../../api/foodApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartReducer";
import Pagination from './Pagination';
import Select from "react-select";

export default function ListFood() {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [foodsPerPage] = useState(7);
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const dispatch = useDispatch();

    const cityOptions = [
        { value: "TPHCM", label: "TP.HCM" },
        { value: "HN", label: "Hà Nội" },
        { value: "DN", label: "Đà Nẵng" },
        { value: "HP", label: "Hải Phòng" },
        { value: "CT", label: "Cần Thơ" },
        { value: "BH", label: "Biên Hòa" },
        { value: "NT", label: "Nha Trang" },
    ];

    const categoryOptions = [
        { value: "viet", label: "Món Việt" },
        { value: "asian", label: "Món Á" },
        { value: "european", label: "Món Âu" },
        { value: "korean", label: "Món Hàn" },
        { value: "japanese", label: "Món Nhật" },
        { value: "dessert", label: "Tráng Miệng" },
    ];

    useEffect(() => {
        const fetchListFood = async () => {
            try {
                const { data } = await foodApi.getListFood();
                // Extract city from address and add to each food item
                const updatedData = data.map(food => {
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

    const extractCityFromAddress = (address) => {
        const cities = {
            "TP. HCM": "TPHCM",
            "Hà Nội": "HN",
            "Đà Nẵng": "DN",
            "Hải Phòng": "HP",
            "Cần Thơ": "CT",
            "Biên Hòa": "BH",
            "Nha Trang": "NT"
        };
        for (const [cityName, cityCode] of Object.entries(cities)) {
            if (address.includes(cityName)) {
                return cityCode;
            }
        }
        return null;
    };

    useEffect(() => {
        const handleSearch = () => {
            const filtered = foods.filter((food) => {
                const matchesCity = !selectedCity || food.city === selectedCity.value;
                const matchesCategory = !selectedCategory || food.categories.includes(selectedCategory.value);
                const matchesKeyword = !searchKeyword || food.name.toLowerCase().includes(searchKeyword.toLowerCase());

                return matchesCity && matchesCategory && matchesKeyword;
            });
            setFilteredFoods(filtered);
            setCurrentPage(1); // Reset page to 1 when filters change
        };
        handleSearch();
    }, [selectedCity, searchKeyword, selectedCategory, foods]);

    const handleDetails = (food) => {
        dispatch(addToCart(food));
    };

    // Get current foods
    const indexOfLastFood = currentPage * foodsPerPage;
    const indexOfFirstFood = indexOfLastFood - foodsPerPage;
    const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

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
