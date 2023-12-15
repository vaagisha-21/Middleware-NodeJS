import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { MWRCard } from "./MWRCard";
import { SnackbarProvider } from "notistack";


export const MWRDashboard = () => {
  const [mwrDataList, setMwrDataList] = useState([]);
  const navigate = useNavigate()
  const roles = window.localStorage.getItem("roles")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          "http://localhost:8001/api/mwr/",
          config
        );
        setMwrDataList(response.data);
      } catch (error) {
        // console.error("Error fetching data:", error);
        return error
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
          </ul>
        </div>
        <div class="w-50"><h4 className="text-center text-secondary">{roles.toUpperCase()} PANEL</h4></div>
        { roles === "admin" && 
          <div>
            <button className="btn btn-light" onClick={() => navigate("/userRoles")}>Role Management</button>
            <Popup trigger={<button className="btn btn-light"> Add Data</button>} position="bottom center">
              <div style={{color: "orange"}}>Data Added !!</div>
            </Popup>     
          </div>
        }
        <button className="btn btn-light float-end" onClick={()=>navigate("/")}>Log Out</button>
      </nav>
      <div className="d-flex flex-wrap justify-content-around">
        { mwrDataList.map((data, index) => (
          <div id = {data._id}>
            <SnackbarProvider>
              <MWRCard
                key = {index}
                id= {data._id}
                {...(data.elements)}
              />
            </SnackbarProvider>
          </div>
        ))}
      </div>
    </div>
  );
};
