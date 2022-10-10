import React from "react";
import { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";
import addavatar from "../../images/photo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import axios from "axios";
import { registerRoute } from "../../Utils/ApiRoutes";


function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const [Avatar, setAvatar] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("app-user")) {
      navigate("/");
    }
  }, []);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };

  const { username, email, password, confirmPassword, avatar } = values;
  const handleValidation = () => {
    if (password !== confirmPassword) {
      toast.error("password and confirmPassword should be same", {
        theme: "dark",
      });
      return false;
    } else if (username.length < 5) {
      toast.error("Username should contain atleast five characters", {
        theme: "dark",
      });
      return false;
    } else if (email === "") {
      toast.error("Email is required", {
        theme: "dark",
      });
      return false;
    } else if (password.length < 8) {
      toast.error("password should contain atleast eight characters", {
        theme: "dark",
      });
      return false;
    }
    return true;
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (Avatar == null) return;
    const imageRef = ref(storage, `images/${Avatar.name}`);
    uploadBytes(imageRef, Avatar).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url)
        setValues((prev) => {
          return { ...prev, avatar: url };
        });
        setUploaded((prev) => prev + 1);
      });
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        avatar
      });
      if (data.status === false) {
        toast.error(data.msg, {theme:"dark"});
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
  console.log(values)
  return (
    <div className="register">
      <div className="registerwrapper">
        <p className="logo">Let's Chat </p>
        <form className="form" onSubmit={handleSubmit}>
          <input className="input"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
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
          <input className="input"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <input className="input"
            style={{ display: "none" }}
            type="file"
            name="avatar"
            id="file"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
            }}
          />
          <label htmlFor="file">
            <img className="avatar" src={addavatar} alt="avatar" />
            <span>Add an avatar</span>
          </label>
          {uploaded === 1 ? (
            <button onClick={handleSubmit}>Sign UP</button>
          ) : (
            <button className="addProductButton" onClick={handleUpload}>
              Upload Image
            </button>
          )}
          <span className="info">
            Already have an accout ? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
