import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';
import FrogotPassword from './Components/Auth/FrogotPassword.jsx';
import SetNewPassword from './Components/Auth/SetNewPassword.jsx';
import Home from './Components/Home/Home.jsx';
import Profile from './Components/Profile/Profile.jsx'
import AllPassword from './Components/Password/AllPassword.jsx';
import AddPassword from './Components/Password/AddPassword.jsx';
import PasswordDetail from './Components/PasswordDetail/PasswordDetail.jsx';
import PrivateKey from './Components/PrivateKey/PrivateKey.jsx';
import toast from "react-hot-toast";
import { regeneratePrivateKey } from './Features/todoslice.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const changeKeys = () => {
    dispatch(regeneratePrivateKey());
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      changeKeys();
      toast.success("Client Keys Changed");
    }, 5 * 60 * 1000);
    changeKeys();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<FrogotPassword/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/setpassword/:token" element={<SetNewPassword />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/passwords" element={<AllPassword />} />
        <Route path="/add_password" element={<AddPassword/>} />
        <Route path="/passwords/:id" element={<PasswordDetail />} />
        <Route path="/keys" element={<PrivateKey />} />
      </Routes>
    </Router>
  );
}

export default App
