import { Link } from "react-router-dom";

const Navbar = ({ toggle, setToggle }) => {
  return (

    <nav style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} className="navbar">
      <ul className="nav-links">
        <li onClick={() => setToggle(false)} className="nav-link">الدخول كزائر</li>
        <li onClick={() => setToggle(false)} className="nav-link">من نحن؟</li>
        <li onClick={() => setToggle(false)} className="nav-link">خدماتنا</li>


      </ul>

    </nav>
  );
};

export default Navbar;