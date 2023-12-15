import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from 'notistack';

const action = snackbarId => (
    <button className="btn btn-link text-decoration-none text-white" onClick={()=>{closeSnackbar(snackbarId); window.location.reload() }}>X</button>
  )

const notify = (e, msg, variant) => {
    e.preventDefault()
    enqueueSnackbar(msg,  {
      variant: variant, action: action})
    // window.location.reload()
  }


const updateUserDetails = async (e, id, roles) => {

    try {
        const token = window.localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.patch(
          `http://localhost:8001/api/users/${id}`,
          { "roles": [roles] },
          config
        )
        notify(e,"Updated User Role Successfully", "success")
    } catch (error) {
        console.error("Error fetching data:", error);
        notify(e, "Error updating role", "danger")
    }
}

const deleteUser = async(e, id) => {
    const removedProduct = document.getElementById(id)
        try {
          const token = window.localStorage.getItem("token");
          const config = { headers: { Authorization: `Bearer ${token}` } };
        //   const response = await axios.delete(
        //     `http://localhost:8001/api/users/${id}`,
        //     config
        //   );
          if(removedProduct) {
            removedProduct.remove();
            notify(e, "User Deleted Successfully", "success")
           }
        //   else console.log("no element")
        } catch (error) {
          console.error("Error fetching data:", error);
          notify(e, "Error deleting user", "danger")
        }    
  }


export const UserRoles = () => {
    const [usersList, setUsersList] = useState([])
    const rolesUsed = ["admin", "supervisor", "guest"]
    const navigate = useNavigate()

    useEffect(() => {
        const getUsers = async () => {
            try {
                const token = window.localStorage.getItem("token");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get(`http://localhost:8001/api/users/usersList`, config);  
                setUsersList(response.data)     
            } catch (error) {
                console.error("Error fetching data:", error);
            } 
        };   
        getUsers();
    }, []);

    return (
        <SnackbarProvider anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'}} >
            <nav className="bg-light p-2">
                <div className="text-center" >
                    <a className="btn btn-light text-secondary" onClick={() => navigate("/MWRdashboard")}>
                        <h4>ADMIN PANEL</h4>
                    </a>
                </div>
            </nav>
            <div className="d-flex flex-wrap justify-content-around">
                {usersList.map( user => 
                    <div class="card small border-secondary bg-light" style={{width: "18rem", margin:"1rem"}} id = {user._id}>
                        <div class="card-body position-relative" style={{padding:"1rem"}}>
                            <h5 class="card-title">{user.username}</h5>
                            <p class="card-text">{user._id}</p>
                            <p class="card-text">Email : {user.email}</p>
                            <p class="card-text">Role : {user.roles[0]}</p>
                        </div>
                        <div className="d-flex justify-content-between p-2">
                            <div class="dropdown">
                            {/* <SnackbarProvider anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'center'}}
                            /> */}
                                <button class="btn btn-secondary dropdown-toggle p-1" style={{fontSize: "0.9rem"}} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Manage roles
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                { rolesUsed.map( role => 
                                    <li>
                                        <button class="dropdown-item" value={role} type="submit"
                                                onClick={(e)=> {updateUserDetails(e, user._id, role);
                                                            // window.location.reload();
                                                }}>
                                            {role}
                                        </button>
                                    </li>
                                )}
                                </ul>
                            </div>
                            <button className="btn btn-secondary p-1" style={{fontSize: "0.9rem"}} onClick={(e) => deleteUser(e, user._id)}>Delete</button>
                        </div>
                    </div>
                )}
            </div>
        </SnackbarProvider>
    )
}