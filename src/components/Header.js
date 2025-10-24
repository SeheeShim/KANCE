import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { MdAccountCircle } from "react-icons/md";

const Header = ({ openModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">KANCE</Link>
      </h1>

      {/* PC nav */}
      <nav className="nav">
        <ul>
          <li><Link to="/Challenge">Challenge</Link></li>
          <li><Link to="/Learning">Learning</Link></li>
          <li><Link to="/Community">Community</Link></li>
          <li>
            <Link to="/Square">Square</Link>
            <ul>
              <li><Link to="/Square/Store">Store</Link></li>
              <li><Link to="/Square/Ticketing">Ticketing</Link></li>
              <li><Link to="/Square/Partners">Partners</Link></li>
            </ul>
          </li>
          <li><Link to="/About">About</Link></li>
          <li onClick={openModal}><span><MdAccountCircle /></span></li>
        </ul>
      </nav>

      {/* 햄버거 버튼 */}
      <div 
        className="hamburger" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 모바일 nav */}
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/Challenge">Challenge</Link>
        <Link to="/Learning">Learning</Link>
        <Link to="/Community">Community</Link>
        <Link to="/Square">Square</Link>
        <Link to="/About">About</Link>
        <div onClick={openModal}><span><MdAccountCircle /></span></div>
      </nav>
    </header>
  );
};

export default Header;
