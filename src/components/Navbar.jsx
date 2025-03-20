

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky bg-zinc-800 p-4">
      <div className="absolute bottom-0 shadow-gray-400 left-0 w-full h-1 bg-gray-400 opacity-30"></div>
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-xl font-semibold text-[#f23064]" to="/">
          <i>OtterMap Technical Assignment</i>
        </Link>
        <button
          className="text-[#f23064] md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <div className={`md:flex md:items-center ${isOpen ? "block" : "hidden"}`}>
          <ul className="md:flex space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <Link className="text-[#f23064] text-xl hover:text-gray-300" to="/">Home</Link>
            </li>
            <li>
              <Link className="text-[#f23064] text-xl hover:text-gray-300" to="https://www.ottermap.com/">About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
