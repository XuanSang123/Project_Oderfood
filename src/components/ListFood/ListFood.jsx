import { useState, useEffect } from "react";
import "./ListFood.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import foodApi from "../../api/foodApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartReducer";
export default function ListFood() {
  const [foods, setFoods] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchListFood = async () => {
      try {
        const { data } = await foodApi.getListFood();
        setFoods(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchListFood();
  }, []);

  const handleDetails = (food) => {
    dispatch(addToCart(food));
  };

  return (
    <>
      <Header />
      <Navigation />
      <h1>Quán ăn nổi bật</h1>
      <div id="list-food">
        {foods.map((food) => (
          <div key={food.id} className="list-food">
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>Restaurant: {food.restaurant}</p>
            <p>Address: {food.address}</p>
            <p>Price: {food.price}</p>
            <p>Review: {food.review}</p>
            <button onClick={() => handleDetails(food)}>Đặt món</button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
