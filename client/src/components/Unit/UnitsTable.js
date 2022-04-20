import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencil, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
library.add(faPencil);

export const UnitsTable = ()=> {
  const [tableData, setTableData] = useState([]);
  useMemo(async () => {
    const res = await fetch("/ownerdata", {
      method: "GET",
    });
    const data = await res.json();
    setTableData(data);
     console.log(data)
  }, []);

  return (
    <table className="table table-striped container w-auto" style={{marginTop: "5rem"}}>
      <thead>
        <tr>
          <th>Building</th>
          <th>Flat/Block No.</th>
          <th>Area</th>
          <th>In unit</th>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((element, id) => {
          return (
            <tr>
              <td>{element.building}</td>
              <td>{element.houseNo}</td>
              <td>{element.area}</td>
              <td>{element.units}</td>
              <td>{element.ownername}</td>
              <td>{element.email}</td>
              <td>{element.contact}</td>
              <td>{element.startDate}</td>
              <td>
                <Link to={`/edit/${element._id}`}><button className="btn btn-success"><FontAwesomeIcon icon={faPencil}/> Edit</button></Link>
              </td>  
              <td>
              <button className="btn btn-primary"><FontAwesomeIcon icon={ faAnglesUp} /> Update</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


