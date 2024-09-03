import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="bg-blue-500 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <Link to="/" className="text-xl font-bold">
            React PWA
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
