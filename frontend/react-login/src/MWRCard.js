import axios from "axios";
import { UpdateDetails } from "./UpdateDetails";
import { useState } from "react";
import { MapComponent } from "./MapComponent";


const deleteProduct = async(id) => {
    const removedProduct = document.getElementById(id)
        try {
          const token = window.localStorage.getItem("token");
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await axios.delete(
            `http://localhost:8001/api/mwr/${id}`,
            config
          );
          if(removedProduct) {removedProduct.remove()}
        } catch (error) {
          console.error("Error fetching data:", error);
        }    
  }


export const MWRCard = (props) => {
    const roles = window.localStorage.getItem("roles");
    const address = props.streetAddress.value + ", " + props.city.value + ", " + props.state.value + ", " + props.zipcode.value
    const [isModalOpen, setModalOpen] = useState(false);

    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div class="card small border-secondary bg-light" style={{width: "20rem", margin:"1rem"}}>
            <div class="card-body position-relative" style={{padding:"1rem"}}>
                <h5 class="card-title">{props?.name.value}</h5>
                <p class="card-text">{props?.description.value}</p>
                <div style={{bottom: 0}}><MapComponent latitude={props.latitude.value} longitude={props.longitude.value} /></div>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Installation: {props?.installation.value}</li>
                <li class="list-group-item">Address: {address}</li>
                <li class="list-group-item">Category: {props?.category.value}</li>
                <li class="list-group-item">
                    {roles !== "guest" && 
                    <div className = "d-flex justify-content-between">
                        { roles === "admin" &&  
                        <button type="button" className="btn btn-outline-secondary" onClick={()=>deleteProduct(props.id)}>
                            Delete
                        </button>
                        }
                        <div>
                            <button className="btn btn-outline-secondary" onClick={handleEditClick}>
                                Edit
                            </button>
                            <div
                            className={`modal fade${isModalOpen ? " show" : ""}`}
                            tabIndex="-1"
                            role="dialog"
                            style={{ display: isModalOpen ? "block" : "none" }}
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Update Element Data</h5>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                onClick={handleModalClose}
                                            >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <UpdateDetails {...props} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isModalOpen && (
                                <div className="modal-backdrop fade show"></div>
                            )}
                        </div>
                    </div>
                    }
                </li>
            </ul>
        </div>
    );
  };
  