import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencil, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
library.add(faPencil);

export const CommitteeTable = ()=> {
  const [tableData, setTableData] = useState([]);
   const getdata = async() => {
    const res = await fetch("/committee/member/get", {
      method: "GET",
    });
    const data = await res.json();
    setTableData(data);
     console.log(data)
  };

  useEffect(()=>{
      getdata()
  }, []);

  const DeleteData = async (id) => {
    const ans = window.confirm("Do you want to delete data?")
    if(ans){
      const deletemember = await fetch(`/comm/member/delete/${id}`, {
        method: 'DELETE'
      })
      const res = deletemember.json()
      window.alert(res.success);
    }
  }
  return (
    <table className="table table-striped container w-auto" style={{marginTop: "5rem"}}>
      <thead>
        <tr>
          <th>RoleId</th>
          <th>Role Name</th>
          <th>Member</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((element, id) => {
          return (
            <tr>
              <td>{element.role_data[0].roleId}</td>
              <td>{element.role_data[0].rolename}</td>
              <td>{element.membername}</td>
              <td>{element.contact}</td>
              <td>
                <Link to={`/edit/comm/${element.role_data[0].rolename}/${element._id}`}><button className="btn btn-success"><FontAwesomeIcon icon={faPencil}/> Edit</button></Link>
              </td>  
              <td>
              <button className="btn btn-primary" onClick={()=>{DeleteData(element._id)}}><FontAwesomeIcon icon={ faAnglesUp} /> delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


