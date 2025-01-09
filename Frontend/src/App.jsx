import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import FrogotPassword from './Components/FrogotPassword.jsx';
import SetNewPassword from './Components/SetNewPassword.jsx';
import Home from './Components/Home.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<FrogotPassword/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/:fullname" element={<Home/>} />
        <Route path="/setpassword/:token" element={<SetNewPassword />} />
      </Routes>
    </Router>
  );
}

export default App
