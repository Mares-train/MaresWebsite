import { Link } from "react-router-dom";

const HeaderLeft = ({ setToggle, toggle }) => {
  return (
    <div className="header-left">
      <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
        {toggle ? (
          <i className="bi bi-x-lg"></i>) : (<i className="bi bi-list"></i>)}
      </div>
      {/* <div>
        <Link to={'/'}>
          <img src={image} alt="" className="header-logo" />
        </Link>
      </div> */}

    </div>

  );
};

export default HeaderLeft;