import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo + Nom */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="LeBonCentre Logo" className="h-20 w-30 object-contain" />
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-6 text-sm sm:text-base">
        <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium transition">
          Comparateur global
        </Link>
        <Link to="/compare" className="text-gray-800 hover:text-blue-600 font-medium transition">
          Comparer 2 formations
        </Link>
      </nav>
    </header>
  );
};

export default Header;
