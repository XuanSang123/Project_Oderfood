import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import foodApi from "../../api/foodApi";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartReducer";

export default function DessertsFood() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const cartstore = useSelector((store) => store.cartStore);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchDessertsFood = async () => {
      try {
        const { data } = await foodApi.getDessertsfood();
        setFoods(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDessertsFood();
  }, []);

  const handleDetails = (food) => {
    dispatch(addToCart(food));
  };

  return (
    <>
      <Header />
      <Navigation />
      <h1>Quán tráng miệng ngon</h1>
      <div id="list-food">
        {foods.map((food) => (
          <div key={food.id} className="list-food">
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>Restaurant: {food.restaurant}</p>
            <p>Address: {food.address}</p>
            <p>Price: {food.price}</p>
            <p>Review: {food.review}</p>
            <button
              onClick={() => {
                handleDetails(food);
              }}
            >
              Đặt món
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
