import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { forgotpassService } from '../Service/Auth.service';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    await forgotpassService(email);
    console.log('Sending reset password email to:', email);
    setMessage(`An email has been sent to ${email} with reset instructions.`);
  };

  return (
    <>
   
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
    <button className="fixed text-xl top-10 right-10 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105" onClick={()=>{navigate('/')}}>
    Home
    </button>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-green-600">
            <p>{message}</p>
          </div>
        )}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default ForgotPassword;
