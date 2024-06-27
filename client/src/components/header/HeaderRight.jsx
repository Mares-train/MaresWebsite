import { Link } from "react-router-dom";

const HeaderRight = () => {
  return (
  <div className="header-right">
      <Link to="/student-sign-up" className="header-right-link">
      <i className="bi bi-person"></i>
        <span>الطلاب</span>
      </Link>
      <Link to="/company-sign-up" className="header-right-link">
      <i className="bi bi-building"></i>
        <span>الشركات</span>
        
      </Link>
    </div>
  );
};

export default HeaderRight;