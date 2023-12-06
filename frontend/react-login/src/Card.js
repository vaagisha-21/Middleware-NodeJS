import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';

const deleteProduct = async(id) => {
  console.log("deleted")
      try {
        console.log("id", id)
        const token = window.localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.delete(
          `http://localhost:8002/api/products/${id}`,
          config
        );
        console.log("res", response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }    
}

const updateProduct = async(id) => {
  console.log("updated")
      try {
        console.log("id", id)
        const token = window.localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        // const response = await axios.put(
        //   `http://localhost:8002/api/products/${id}`,
        //   config
        // );
        // console.log("res", response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }    
}

export const Card = (props) => {
    const { title, description, price, image, rating, _id } = props;
    const roles = window.localStorage.getItem("roles");
    // const navigate = useNavigate()

    return (
    <div className="card" style={{ width: "20rem", height: "100%", margin:"40px"}}>
      <img className="card-img-top" src={image} style={{width:"15rem",height: "8rem", padding: "1px"}} />
      <div className="card-body small">
        <h6 className="card-text">{title}</h6>
        <p className="card-text">{description}</p>
        <div className = "d-flex justify-content-between">
          <p>Rating: {rating.rate}%</p>
          <p>Price: ${price}</p>
        </div>
        {roles !== "guest" && 
          <div className = "d-flex justify-content-between">
            { roles === "admin" &&   
              <Popup trigger={<button> Delete</button>} position="right center">
                <div style={{color: "red"}}>Product Deleted !!</div>
                
                {/* {navigate("/dashboard")} */}
              </Popup> 
            // <div>
            //   <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            //     Delete
            //   </button>
            //   <div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            //     <div className="modal-dialog" role="document">
            //       <div className="modal-content">
            //         <div className="modal-header">
            //           <h5 className="modal-title" id="exampleModalLabel">Delete Product</h5>
            //           <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            //             <span aria-hidden="true">&times;</span>
            //           </button>
            //         </div>
            //         <div className="modal-body">
            //           Are you sure?
            //         </div>
            //         <div className="modal-footer">
            //           <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            //           <button type="button" className="btn btn-primary" onClick={()=>deleteProduct(_id)}>Yes</button>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            }
            <Popup trigger={<button onClick={()=>updateProduct(_id)}> Edit</button>} position="bottom center">
              <div style={{color: "blue"}}>You can edit the product details !!</div>
            </Popup>
          </div>
        }
      </div>
    </div>
    );
  };
  