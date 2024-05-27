import React from "react";
import "./App.css";
//import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Index from "./routes/index.jsx";

export default function App() {
  return (
    <>
      <div id="container">
        {/* <Navigation /> */}
        <Index />
       
      </div>
    </>
  );
}
