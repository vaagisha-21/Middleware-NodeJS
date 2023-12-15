import axios from "axios";
import { useEffect, useState } from "react";
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from 'notistack';

const action = snackbarId => (
  <button className="btn btn-link text-decoration-none text-white" onClick={()=>{closeSnackbar(snackbarId); window.location.reload() }}>X</button>
)

export const UpdateDetails = (data) => {
  const notify = (e) => {
    e.preventDefault();
    setFlag(true);
    console.log("notify")
    enqueueSnackbar('Details Updated!',  {
      variant: "success", action: action })
  }
  const [values, setValues] = useState(data);
  const [flag, setFlag] = useState(false);

    useEffect(() => {
        const updateDataFunc = async () => {
            try {
                const id = data.id
                const token = window.localStorage.getItem("token");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = flag ? await axios.patch(
                  `http://localhost:8001/api/mwr/${id}`,
                  { elements: values },
                  config
                ): null;        
            } catch (error) {
                console.error("Error fetching data:", error);
            } 
        };
    
        updateDataFunc();
    }, [flag]);
    
      const set = name => {
          return ({ target: { value } }) => {
            setValues(oldValues => ({...oldValues, [name]: {"elementType":"String", "value": value} }));
        }
      };
    
      return (
        // <SnackbarProvider >
          <form className="p-2">
            {Object.keys(data).filter(key => key !== "id").map( key => 
              <div className="w-100 p-1">
                  <label className="mx-1">{key} </label>
                  <input value={values[key]['value']} className="w-75" onChange={set(key)}/>
              </div>)
            }
            {/* <SnackbarProvider
            /> */}
            <button onClick={(e)=> notify(e)}>Submit</button>
          </form>
        // </SnackbarProvider>
      );    
}