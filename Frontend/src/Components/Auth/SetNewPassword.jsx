import React, { useState } from 'react';
import {useParams, useNavigate } from 'react-router-dom'; 
import { setPasswordService } from '../../Service/Auth.service.js';

function SetNewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const { token } = useParams(); 
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    await setPasswordService(password,token);
    setError('');
    setMessage('Your password has been successfully updated.');
    navigate('/login')
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
    <button className="fixed text-xl top-10 right-10 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105" onClick={()=>{navigate('/')}}>
    Home
    </button>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Set New Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4">
              <p>{error}</p>
            </div>
          )}
          {message && (
            <div className="text-green-500 text-sm mb-4">
              <p>{message}</p>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetNewPassword;
