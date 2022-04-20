import React from "react";
import { getLocalStorage } from "../helpers/localStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faCircleXmark,
  faCirclePlus,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
library.add(fas, faUser, faCircleXmark, faCirclePlus, faEnvelope, faPhone);

function Home() {
  const data = getLocalStorage("user");
  // console.log(data)

  return (
    <>
      {/* <main
        className="main"
        style={{
          maxWidth: "85rem",
          width: "100%",
          height: "auto",
          margin: "0 auto",
          padding: "0.2rem ",
        }}
      > */}
        <div
          className="wrapper"
          style={{
            maxWidth: "38rem",
            width: "100%",
            margin: "0 auto",
            padding: "5rem 1.5 rem",
          }}
        >
          <div
            className="card"
            style={{
              padding: "1.5rem 2rem",
              border: "none",
              outline: "none",
              borderRadius: "4px",
              color: "#252a32",
              background: "#ffffff",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.12),0 1px 3px rgba(0,0,0,0.24)"
            }}
          >
            <div className="d-inline-block justify-content-center align-middle p-2 bd-highlight h-75 w-50">
              <h2 style={{ color: "blue" }}>User Information</h2>
              <hr
                className="w-80"
                style={{ borderBottom: "3px solid #2271b1" }}
              />
              <div className="m-3">
                <div className="d-flex justify-content-between  mt-2">
                  <div className="float-left">
                    <FontAwesomeIcon className="fs-4 mt-2" icon={faUser} />
                    <p className="fs-4 d-inline-block mx-3">{data.name}</p>
                  </div>
                  <div className="float-right">
                    <FontAwesomeIcon
                      className="fs-4 mt-2 mx-1"
                      style={{ color: "red" }}
                      icon={faCircleXmark}
                    />
                    <FontAwesomeIcon
                      className="fs-4 mt-2"
                      style={{ color: "green" }}
                      icon={faCirclePlus}
                    />
                  </div>
                </div>
                <hr className="w-80 my-0" />
                <div className="d-flex justify-content-between  mt-4">
                  <div className="float-left">
                    <FontAwesomeIcon className="fs-4 mt-2" icon={faEnvelope} />
                    <p className="fs-4 d-inline-block mx-3">{data.email}</p>
                  </div>
                  <div className="float-right">
                    <FontAwesomeIcon
                      className="fs-4 mt-2 mx-1"
                      style={{ color: "red" }}
                      icon={faCircleXmark}
                    />
                    <FontAwesomeIcon
                      className="fs-4 mt-2"
                      style={{ color: "green" }}
                      icon={faCirclePlus}
                    />
                  </div>
                </div>
                <hr className="w-80 my-0" />
                <div className="d-flex justify-content-between  mt-4">
                  <div className="float-left">
                    <FontAwesomeIcon className="fs-4 mt-2" icon={faPhone} />
                    <p className="fs-4 d-inline-block mx-3">{data.phone}</p>
                  </div>
                  <div className="float-right">
                    <FontAwesomeIcon
                      className="fs-4 mt-2 mx-1"
                      style={{ color: "red" }}
                      icon={faCircleXmark}
                    />
                    <FontAwesomeIcon
                      className="fs-4 mt-2"
                      style={{ color: "green" }}
                      icon={faCirclePlus}
                    />
                  </div>
                </div>
                <hr className="w-80 my-0" />
              </div>
            </div>
          </div>
        </div>
      {/* </main> */}
    </>
  );
}

export default Home;
