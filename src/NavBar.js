import './navbar.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Link to="/" className="navbarBrand">Removebg</Link>

        <ul className="navbarMenu">
          <li><Link to="/uploads">Uploads</Link></li>

          <li className="dropdown">
  <button className="dropdownBtn">Features ▾</button>
  <ul className="dropdownContent">
    <li><Link to="/backgroundremover">Background Removal</Link></li>
    <li><Link to="/Blur-Background">Blur Background</Link></li>
    <li><Link to="/custom-background">Custom Background</Link></li>
  </ul>
</li>

          <li className="dropdown">
            <button className="dropdownBtn">For Business ▾</button>
            <ul className="dropdownContent">
              <li><Link to="/high-volume">High Volume Solution</Link></li>
              <li><Link to="/photographers">Photographers</Link></li>
              <li><Link to="/automotive">Automotive Industry</Link></li>
            </ul>
          </li>

          <li><Link to="/tools">Tools & API</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
        </ul>
      </div>

      <div className="navbarRight">
        <Link to="/login"><button className="authBtn">Login</button></Link>
        <Link to="/signup"><button className="authBtn">Sign In</button></Link>
      </div>
    </div>
  );
}
