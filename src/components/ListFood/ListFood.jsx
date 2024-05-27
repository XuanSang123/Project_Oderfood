import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListFood.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function ListFood() {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/foods")
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the foods!", error);
      });
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
    history.push("/details");
  };

  return (
    <>
      <Header />

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
            <button onClick={() => handleDetails(food.id)}>Đặt món</button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
