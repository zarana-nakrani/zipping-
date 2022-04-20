import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../helpers/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faEdit,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import AdminDashboard from "./AdminDashboard";

library.add(faHome, faEdit, faSignInAlt, faSignOutAlt);

const Header = () => {
  let navigate = useNavigate();

  // const handleLogout = (e)=>{
  //   logout(()=>{
  //     navigate('/signin');

  //   });

  // }
  const showNavigation = () => (
    <>
      {!isAuthenticated() && (
        <Fragment>
          <nav
            className="navbar fixed-top navbar-expand-lg"
            style={{
              width: "100%",
              height: "10%",
              color: "##b8b3a7",
              lineHeight: "75px",
              padding: "0px 0px",
            }}
          >
            <div className="container-fluid">
              <h3 >
                <Link to="/" className="navbar-brand" style={{color:"black"}}>
                  Building-Management
                </Link>
              </h3>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto ms-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link " aria-current="page">
                      <FontAwesomeIcon icon={faHome} /> Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/signup"
                      className="nav-link "
                      aria-current="page"
                    >
                      {" "}
                      <FontAwesomeIcon icon={faEdit} />
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signin" className="nav-link">
                      {" "}
                      <FontAwesomeIcon icon={faSignInAlt} /> Signin
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </Fragment>
      )}

      {isAuthenticated() && (
        // <Fragment>
        //   <li className="nav-item">
        //     <Link to="/admin/dashboard" className="nav-link " aria-current="page" > <FontAwesomeIcon  icon={faHome} /> Dashboard</Link>
        //  </li>

        // </Fragment>
        <AdminDashboard />
      )}

      {/* {isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <button  className="btn btn-link text-secondary text-decoration-none pl-0 " onClick={handleLogout} aria-current="page" ><FontAwesomeIcon  icon={faSignOutAlt} />Logout</button>
           </li>
           

          </Fragment>

)} */}
    </>
  );

  return (
    <>
      <header id="header">{showNavigation()}</header>
    </>
  );
};

export default Header;
