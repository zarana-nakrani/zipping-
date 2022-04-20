import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./Sidebar.css";
import { logout } from "../helpers/auth";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faSignOutAlt);

function AdminDashboard() {
  const [sidebar, setSidebar] = useState(false);

  // const showSidebar=()=>setSidebar(!sidebar)
  const showSidebar = () => {
    if (sidebar === false) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  };
  let navigate = useNavigate();
  const handleLogout = (e) => {
    logout(() => {
      navigate("/signin");
    });
  };

  return (
    <>
      {/* {console.log("into dashboard")} */}
      <div className="navbar fixed-top mx-auto">
        <Link to={{ state: { fromDashboard: true } }} className="menu-bars" >
          <FaIcons.FaBars onClick={showSidebar} style={{color:"#ffffff", marginBottom:"1rem"}} />
        </Link>
        <h3>
          <span>Building-Management</span>
        </h3>
        {/* <li className="nav-item"> */}
        <button
          className="btn btn-primary"
          style={{ position: "absolute", right: "20px" }}
          onClick={handleLogout}
          aria-current="page"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
        {/* </li> */}
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          {/* <li className='navbar-toggle'>
                   <Link to={{state : {fromDashboard:true}}} className="menu-bars">
                       <AiIcons.AiOutlineClose/>
                  </Link>
               </li> */}
          {SidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </ul>
      </nav>
    </>
  );
}
export default AdminDashboard;
