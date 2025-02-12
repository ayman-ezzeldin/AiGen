import { useState } from 'react';
import '../Navbar.css';
import { BsList, BsX } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/auth-slice';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);  //حالة فتح القايمة 
  const {isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // التبديل بين حالة الفتح والإغلاق
  };

  return (
    <nav className="navbar p-5">
      <div className="logo">
      <Link to='/admin/home' className=" flex gap-2 items-center" >
          <Activity className="h-8 w-8" />
          <span className="font-bold text-2xl tracking-wider " >AiGen</span>
        </Link>
      </div>

      {/* زرار القايمة في الشاشات الصغيرة */}
      <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        {menuOpen ? <BsX /> : <BsList />} {/* التبديل بين أيقونة القائمة و الـ X */}
      </button>

      {/* القائمة تظهر عندما تكون حالة menuOpen = true */}
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <NavLink to='/user/home' className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>Home</NavLink>
        <NavLink to='/user/docs' className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>Docs</NavLink>
        <NavLink to='/user/dataset' className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>Dataset</NavLink>
        <NavLink to='/user/models' className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>Models</NavLink>
        <NavLink to='/user/learn' className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>Learn</NavLink>
      </ul>

      <div className={`buttons ${menuOpen ? 'hidden' : ''}`}>
        { isAuthenticated ?
          <button onClick={()=> dispatch(logoutUser())}  className="login-btn">Log Out</button>
          :<Link to="/auth/register" className="login-btn">Sign Up / Log In</Link>}
        <button className="download-btn">Download</button>
      </div>
    </nav>
  );
}

export default Navbar;
