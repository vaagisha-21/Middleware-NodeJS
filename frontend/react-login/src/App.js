
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import { MWRDashboard } from "./MWRDashboard"
import { UserRoles } from "./UserRoles"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/MWRdashboard" element={<MWRDashboard />} />
        <Route path="/userRoles" element={<UserRoles />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App