import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';


export const Dashboard = () => {
  const [productsList, setProductsList] = useState([]);
  const navigate = useNavigate()
  const roles = window.localStorage.getItem("roles")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          "http://localhost:8002/api/products/",
          config
        );
        setProductsList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse w-15" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
          </ul>
        </div>
        <div class="w-50"><h4 className="text-start">{roles.toUpperCase()} PANEL</h4></div>
        { roles === "admin" && 
            <Popup trigger={<button> Add Product</button>} position="bottom center">
              <div style={{color: "orange"}}>Product Added !!</div>
            </Popup> 
        }
        <button className="primary float-end" onClick={()=>navigate("/")}>Log Out</button>
      </nav>
      <div className="d-flex flex-wrap justify-content-around">
        {productsList.map((user, index) => (
          <Card
            key = {index}
            title = {user.title}
            description = {user.description}
            price = {user.price}
            image = {user.image}
            rating = {user.rating}
            _id = {user._id}
          />
        ))}
      </div>
    </div>
  );
};
