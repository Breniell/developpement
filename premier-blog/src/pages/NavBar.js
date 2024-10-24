import { NavLink } from "react-router-dom";
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">My Futuristic Blog</div>
      <ul className="nav-links">
        <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
        <li><NavLink to="/articles" activeClassName="active">Articles</NavLink></li>
      </ul>
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default NavBar;
