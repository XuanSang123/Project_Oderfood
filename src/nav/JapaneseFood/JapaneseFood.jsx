import React, { useState, useEffect } from "react";
import axios from "axios";
import foodApi from "../../api/foodApi";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
export default function JapaneseFood() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    //   axios.get('http://localhost:3000/japanesefood')
    //     .then((response) => {
    //       setFoods(response.data);
    //     })
    //     .catch((error) => {
    //       console.error("There was an error fetching the foods!", error);
    //     });
    // }

    const fetchJapanFood = async () => {
      try {
        const { data } = await foodApi.getJapansefood();
        setFoods(data);
      } catch (error) {
        console.error("There was an error fetching the foods!", error.message);
      }
    };
    fetchJapanFood();
  }, []);
  const handleDetails = (id) => {
    const order = JSON.parse(localStorage.getItem("order")) || [];
    const food = foods.find((food) => food.id === id);
    const orderFood = order.find((orderFood) => orderFood.id === id);
    if (orderFood) {
      orderFood.quantity += 1;
    } else {
      order.push({ ...food, quantity: 1 });
    }
    localStorage.setItem("order", JSON.stringify(order));
    alert("Đặt món thành công");
    window.location.href = "/details";
  };
  return (
    <>
      {" "}
      <Header />
      <Navigation />
      <h1>Quán Nhật Bản ngon</h1>
      <div id="list-food">
        {foods.map((food) => (
          <div key={food.id} className="list-food">
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>Restaurant: {food.restaurant}</p>
            <p>Address: {food.address}</p>
            <p>Price: {food.price}</p>
            <p>Review: {food.review}</p>
            <button onClick={() => handleDetails(food.id)}>Đặt món</button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}