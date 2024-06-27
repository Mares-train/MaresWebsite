import "./CompanyHeader.css";
import CHeaderLeft from "./CHeaderLeft";
import CNavbar from "./CNavbar";
import { useState } from "react";
import CHeaderRight from "./CHeaderRight"


const CompanyHeader = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <div className="header bg-white shadow-sm">

            <CHeaderRight />

            <CNavbar toggle={toggle} setToggle={setToggle} />
            <CHeaderLeft />



        </div>


    );
}

export default CompanyHeader;