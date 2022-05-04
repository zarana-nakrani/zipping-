import React, { useState, useEffect } from 'react'; 

export const CommitteeRole=()=>{

 

  const [data, setData] = useState({
    roleId: "",
    rolename: ""
  })

  let inputStyle = {
    fontFamily:'inherit',
    fontSize:'0.95rem',
    fontWeight:'400',
    lineHeight:'inherit',
    width:'100%',
    height:'auto',
    padding:'0.75rem 1.25rem',
    border:'none',
    outline:'none',
    borderRadius:'2rem',
    color:'#252a32',
    background:'#f1f5f8'
  }

   const divStyle = {
    display:'-webkit-box',
    display:'flex',
    WebkitBoxOrient:'horizontal',
    WebkitBoxDirection:'normal',
    flexDirection:'row',
    WebkitBoxPack:'justify',
    justifyContent:'space-between',
    WebkitBoxAlign:'center',
    marginBottom:'1rem'
  }

  let name, value;
  const handleChange = (e) => {
    name=e.target.name;
    value = e.target.value;

    setData({...data, [name]:value})
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const { roleId, rolename } = data

    const response = await fetch('/committee/role',{
      method: "POST",
      headers: {
        "Content-Type" : 'application/json'
      },
      body: JSON.stringify({roleId, rolename})
    })

    const result = await response.json();
    console.log(result)
    if(response.status === 400){
      alert(result.error)
    }

    else if(response.status === 422){
      alert(result.errmsg)
    }

    else if(response.status === 500) {
      alert(result.errMsg)
    }

    else{
      alert(result.success)
    }
  }

  const handleCancel = (e) => {
    setData({
      roleId: "",
      rolename: ""
    })
  }
  
  const [tableData, setTableData] = useState([]);
  const getTabledata = async () => {
    const res = await fetch("/committee/role/get", {
      method: "GET",
    });
    const data = await res.json();
    setTableData(data);
     console.log(data)
  }
  
 useEffect(() => {
   getTabledata()
 }, []);
   const myCard = {
      position: "absolute",
      left: "18.25rem",
      top: "4rem",
      width: "65rem",
      height: "40rem",
      padding: "1rem",
      border:"none",
      outline:"none",
      borderRadius:"4px",
      color:"#252a32",
      background:"#ffffff",
      boxShadow:"0 1px 3px rgba(0,0,0,0.12),0 1px 3px rgba(0,0,0,0.24)"
   }
  return(
    <>

    {/* <main className="main" style={{maxWidth:'85rem',width:'100%',height:'auto',margin:'0 auto',padding:'0.2rem '}} > */}


<div className="wrapper" style={{maxWidth:'38rem',width:'100%',margin:'0 auto',padding:'5rem 1.5 rem'}} >

    <div className="card" style={myCard} >
    <h2 style={{textAlign:'center',color:'#15AAD9',borderBottom:'1px solid #000',margin:'10px 0 20px'}}>Committee Role</h2>
      <div className='d-flex'>
        <div className="d-inline-block" style={{width:"50%"}}>
        <form className="form" style={{width:'100%',height:'auto',margin:'2rem 0'}}>
            <div className="form-group" style={divStyle} >
                <input type="number" name="roleId" id="housenum" value={data.roleId} onChange={handleChange} className="input-field"   placeholder="CommitteeRoleId" style={inputStyle}/> 
            </div>
            <div className="form-group" style={divStyle} >
                <input type="text" name="rolename" className="input-field" value={data.rolename} onChange={handleChange} placeholder="Role Name" style={inputStyle}/> 
            </div>
 
            <div className="form-group" style={{float:"right"}}>
              <input type="button" name="submit" className="input-submit" value="Submit" onClick={handleSubmit} style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#15AAd9',display:'inline-block', marginRight:"1rem"}} />
            <input type="button" name="cancel" className="input-submit" value="Cancel" onClick={handleCancel}  style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#15AAD9',display:'inline-block'}} />
            
            </div>
    
        </form>
        </div>
        <div className="d-inline-block" style={{width:"50%"}}>
        <table className="table table-striped container w-75" style={{marginTop:'35px',padding:'1.5rem 2rem',border:'none',outline:'none',borderRadius:'4px',color:'#252a32',background:'#ffffff',boxShadow:'0 1px 3px rgba(0,0,0,0.12),0 1px 3px rgba(0,0,0,0.24)'}} > 
          <thead>
           <tr>
          <th>RoleId</th>
          <th>Role Name</th>
          </tr>
      </thead>
      <tbody>
        {tableData.map((element, id) => {
          return (
            <tr>
              <td>{element.roleId}</td>
              <td>{element.rolename}</td>
              </tr>
          );
        })}
      </tbody>
    </table> 
    </div>
    </div>
    </div>
    </div>

{/* </main> */}

{/* <main className="main" style={{maxWidth:'85rem',width:'100%',height:'auto',margin:'0 auto',padding:'0.2rem '}} > */}


    {/* </main> */}


    </>
  );
};

export const Committees=()=>{
  const divStyle = {
    display:'-webkit-box',
    display:'flex',
    WebkitBoxOrient:'horizontal',
    WebkitBoxDirection:'normal',
    flexDirection:'row',
    WebkitBoxPack:'justify',
    justifyContent:'space-between',
    WebkitBoxAlign:'center',
    marginBottom:'1rem'
  }

  const inputStyle = {
    fontFamily:'inherit',
    fontSize:'0.95rem',
    fontWeight:'400',
    lineHeight:'inherit',
    width:'100%',
    height:'auto',
    padding:'0.75rem 1.25rem',
    margin: '0 0.5rem',
    border:'none',
    outline:'none',
    borderRadius:'2rem',
    color:'#252a32',
    background:'#f1f5f8'
  }


   const [dropDownList, setDropDownList] = useState([]) 

  const getData = async ()=>{
    const res = await fetch("/committee/role/get", {
      method:"GET"
    });
    const data = await res.json();
    setDropDownList(data)
  }

  useEffect(()=>{getData()}, [])

  

  const[member, setMember] = useState({
    rolename:"",
    membername:"",
    contact:""
  })

  
  const handleOnChange = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setMember({...member, [name]: value})
  }

  const handleCancel = () => {
    setMember({
      rolename: "",
      membername:"",
      contact: ""
    })
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { rolename, membername, contact} = member
    const res = await fetch("/committee/member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rolename, membername, contact
      })
    })

    const data = await res.json();
    if(res.status === 400) {
      console.log("Please fill all fields")
      alert(data.error)
    }
    else if(res.status === 422){
      alert(data.errMsg)
    }
    else if(res.status === 500) {
      alert(data.errMsg)
    }
    else{
      alert(data.success);
    }
  }

  return(
    <>
    <main className="main" style={{maxWidth:'85rem',width:'100%',height:'auto',margin:'0 auto',padding:'0.2rem '}} >


<div className="wrapper" style={{maxWidth:'38rem',width:'100%',margin:'0 auto',padding:'5rem 1.5 rem'}} >


    <div className="card" style={{margin:'10px 0 20px',border:'none',outline:'none',borderRadius:'4px',color:'#252a32',background:'#ffffff',boxShadow:'0 1px 3px rgba(0,0,0,0.12),0 1px 3px rgba(0,0,0,0.24)'}} >
        <h2 style={{textAlign:'center',color:'#15AAD9',borderBottom:'1px solid #000',margin:'10px 0 20px'}}>Committee</h2>
        
        <form className="form" method="POST"  style={{width:'100%',height:'auto',margin:'2rem 0'}}>
            <div className="form-group" style={divStyle}>
            
                     <select name="rolename" className='input-field'  style={inputStyle} onChange= {handleOnChange} required>
                     <option value="rolename">Role Name</option>
                     {
                       dropDownList.map((element, key)=>{
                          return(
                            <option value={element.rolename} key={key}>{element.roleId}-{element.rolename}</option>
                          ) ;
                       })
                     }
                  </select>
                
            
                </div>
                <div className="form-group" style={divStyle} >
                <input type="text" name="membername" id="name" className="input-field" value={member.membername} onChange={handleOnChange}  placeholder="Member Name" style={inputStyle}/> 
            </div>

            <div className="form-group" style={divStyle} >
                <input type="number" name="contact" id="num" className="input-field" value={member.contact} onChange={handleOnChange}  placeholder="Contact" style={inputStyle}/> 
            </div>
                       
            
            
            
             
            <div className="form-group" style={{float:"right"}}>
            <input type="button" name="submit" className="input-submit"  value="Submit" onClick={PostData} style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#15AAD9',display:'inline-block',marginRight:'1rem'}} />
            <input type="button" name="cancel" className="input-submit"  value="Cancel" onClick={handleCancel} style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#15AAD9',display:'inline-block'}} />
            </div>  
        </form>  
    </div>
</div>
</main>
   
    </>
    

  );
};