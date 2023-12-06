import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function () {

  const navigate = useNavigate();
  let [authMode, setAuthMode] = useState("signin")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [username, setUsername] = useState("")
  let [error, setError] = useState(null);

  const changeAuthMode = () => {
    setEmail("")
    setPassword("")
    setUsername("")
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const checkUserDetails = async () => {
    try {
        console.log("details", email, password)
        await axios.post("http://localhost:8002/api/users/login",{
            "email": email,
            "password": password
        }).then((response) => {
          const token = response?.data?.accessToken
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("roles", response.data.roles);
            { token && navigate("/dashboard") }
        })
    } catch (error) {
        console.log("error")
        setError(error.response.data)
    }
  }

  const addUserDetails = async () => {
    try {
          console.log("details",username, email,password)
          await axios.post(`http://localhost:8002/api/users/register`,{
              "username": username,
              "email": email,
              "password": password
          }).then((response) => {
                const token = response.data.access_token
                window.localStorage.setItem("token", token);
                window.localStorage.setItem("roles", response.data.roles);
                { token && navigate("/dashboard") }
          }).catch(err => console.log(err))
        } catch (error) {
          console.log(error)
        }
  }


  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>{setEmail(e?.target?.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>{setPassword(e?.target?.value)}}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              { error ? <p className="text-danger">{error.message}</p> : null}
              <button type='button' className="btn btn-primary" onClick={checkUserDetails}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={username}
              onChange={(e)=>{setUsername(e?.target?.value)}}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>{setEmail(e?.target?.value)}}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e)=>{setPassword(e?.target?.value)}}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="button" className="btn btn-primary" onClick={addUserDetails}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}