import React from 'react'
import Hero from "./Hero.jsx";
import Dashboard from '../Dashboard.jsx';

function Home() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA] flex flex-col">
      <Dashboard/>
      <Hero/>
    </div>
  );
}

export default Home;
