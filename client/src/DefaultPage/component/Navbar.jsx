import { useState } from 'react';
import '../Navbar.css';
import logo from '../Screenshot 2024-11-04 193746.png';
import { BsList, BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);  //حالة فتح القايمة 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // التبديل بين حالة الفتح والإغلاق
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <span>Model Craft</span>
      </div>

      {/* زرار القايمة في الشاشات الصغيرة */}
      <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        {menuOpen ? <BsX /> : <BsList />} {/* التبديل بين أيقونة القائمة و الـ X */}
      </button>

      {/* القائمة تظهر عندما تكون حالة menuOpen = true */}
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <button className="nav-button active">Home</button>
        <button className="nav-button">Docs</button>
        <button className="nav-button">Dateset</button>
        <button className="nav-button">Models</button>
        <button className="nav-button">Learn</button>
      </ul>

      <div className={`buttons ${menuOpen ? 'hidden' : ''}`}>
        <Link to="/auth/register" className="login-btn">Sign Up / Log In</Link>
        <button className="download-btn">Download</button>
      </div>
    </nav>
  );
}

export default Navbar;
