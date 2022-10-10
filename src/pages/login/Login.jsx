import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css"
import {loginRoute} from "../../Utils/ApiRoutes"
function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  useEffect( () => {
    if ( localStorage.getItem("app-user")) {
      navigate("/");
    }
  }, []);
  
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const validateForm= () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email and Password is required.", {
        theme: "dark",
      });
      return false;
    } else if (password === ""){
      toast.error("Email and Password is required.", {
        theme: "dark",
      });
      return false;
    } 
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, {
          theme: "dark",
        });
      }
      if (data.status === true) {
        localStorage.setItem(
          "app-user",
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <div className="login">
      <div className="loginwrapper">
      <p className="logo">Let's Chat </p>
        <form  className="form" onSubmit={(e) => handleSubmit(e)}>
          
         
            <input className="input"
            type="email"
            placeholder="abc@gmail.com"
            name="email"
            onChange={handleChange}
          />
            <input className="input"
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          
          <button type="submit">Sign IN</button>
          <span className="info">New to Let's Chat? <Link to="/register">Sign Up Now</Link></span>
        </form>
        
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
