import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
export default function JapaneseFood() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/allfood/?categories=japanesefood");
        setFoods(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  },[])
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
