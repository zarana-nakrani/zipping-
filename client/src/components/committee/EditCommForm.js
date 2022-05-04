import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';


export const EditCommForm=()=>{
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
  
  
    
  
    
  
    const[member, setMember] = useState({
      rolename:"",
      membername:"",
      contact:""
    })

    const { id, rolename } = useParams()

    const getData = async ()=>{
        const res = await fetch(`/committee/member/get/${rolename}/${id}`, {
          method:"GET"
        });
        const data = await res.json();
        setMember({
            rolename: rolename,
            membername: data.membername,
            contact: data.contact
        })
      }
  
      useEffect(()=>{getData()}, [])
    const handleOnChange = (e) => {
      let name, value;
      name = e.target.name;
      value = e.target.value;
      setMember({...member, [name]: value})
    }
    let nav = useNavigate()
    const PatchData = async (e) => {
      e.preventDefault();
      const { membername, contact} = member
      const res = await fetch(`/comm/member/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          membername, contact
        })
      })
  
      const data = await res.json();
       if(res.status === 422){
        alert(data.errMsg)
      }
      else{
        alert(data.success);
        nav("/committee");
        console.log("Updated Successfully")
      }
    }

    
  
    return(
      <>
      <main className="main" style={{maxWidth:'85rem',width:'100%',height:'auto',margin:'0 auto',padding:'0.2rem '}} >
  
  
  <div className="wrapper" style={{maxWidth:'38rem',width:'100%',margin:'0 auto',padding:'5rem 1.5 rem'}} >
  
  
      <div className="card" style={{margin:"10px 0 10px",border:'none',outline:'none',borderRadius:'4px',color:'#252a32',background:'#ffffff',boxShadow:'0 1px 3px rgba(0,0,0,0.12),0 1px 3px rgba(0,0,0,0.24)'}} >
          <h2 style={{textAlign:'center',color:'blue',borderBottom:'1px solid #000',margin:'10px 0 20px'}}>Committee</h2>
          
          <form className="form" method="POST"  style={{width:'100%',height:'auto',margin:'2rem 0'}}>
              <div className="form-group" style={divStyle}>
                <input type="text" name='rolename' value={member.rolename} style={inputStyle}/>
                  </div>
                  <div className="form-group" style={divStyle} >
                  <input type="text" name="membername" id="name" className="input-field" value={member.membername} onChange={handleOnChange}  placeholder="Member Name" style={inputStyle}/> 
              </div>
  
              <div className="form-group" style={divStyle} >
                  <input type="number" name="contact" id="num" className="input-field" value={member.contact} onChange={handleOnChange}  placeholder="Contact" style={inputStyle}/> 
              </div>
                         
              
              
              
               
              <div className="form-group" style={{float:"right"}}>
              <input type="button" name="submit" className="input-submit" onClick={PatchData} value="Submit" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#7579e7',display:'inline-block',marginRight:'1rem'}} />
              <input type="button" name="cancel" className="input-submit" value="Cancel" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#7579e7',display:'inline-block'}} />
              </div>  
          </form>  
      </div>
  </div>
  </main>
     
      </>
      
  
    );
  };