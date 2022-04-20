import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom"


function EditForm() {
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
    
      const[owner, setOwner] = useState({
        ownername: "",
        email: "",
        area: "",
        units: "sqmtr",
        contact: "",
        houseNo:"",
        building: ""
      })

    
      const handleOnChange = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setOwner({...owner, [name]: value})
      }
    
      const handleCancel = (e) => {
        setOwner({
          ownername: "",
          email: "",
          area: "",
          units: "sqmtr",
          contact: "",
          houseNo:"",
          building: ""
        })
      }

      const { id } = useParams()

      const getData = async () => {
        const res = await fetch(`/ownerdata/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()

        if(res.status === 500 || !data){
            console.log("error")
        }else{
            setOwner(data)
        }
      }
      useEffect(()=>{
        getData()
      },[])
      let nav = useNavigate()
      const PatchData = async (e) => {
        e.preventDefault();
        const {ownername, email, area, units, contact, houseNo, building} = owner
        // let date = new Date().toLocaleDateString()
        // date = date.split("T")[0]
        const res = await fetch(`/updatedata/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ownername, email, area, units, contact, houseNo, building
          })
        })
    
        const data = await res.json();
        // if(!data){
        //   console.log("please fill all fields");
        //   window.alert("please fill all fields")
        // }
        
        if(res.status === 400) {
          console.log("Please fill all fields")
          window.alert("Please fill all fields")
        }
        else if(res.status === 422){
          window.alert("Owner Already Exist")
        }
        // else if(res.status !== 400 && res.status !== 422) {
        //   window.alert("Registered successfully")
        // }
        else{
          window.alert("Updated Successfully");
          nav("/units");
          console.log("Updated Successfully")
        }
      }
    
    
      return(
        <>
        <main className="main" style={{maxWidth:'85rem',width:'100%',height:'auto',margin:'0 auto',padding:'0.2rem '}} >
    
    
    <div className="wrapper" style={{maxWidth:'38rem',width:'100%',margin:'0 auto',padding:'5rem 1.5 rem'}} >
    
    
        <div className="card" style={{marginTop:'50px',padding:'1.5rem 2rem',border:'none',outline:'none',borderRadius:'4px',color:'#252a32',background:'#ffffff',boxShadow:'0 1px 3px rgba(0,0,0,0.12),0 1px 3px rgba(0,0,0,0.24)'}} >
            <h2 style={{textAlign:'center',color:'blue',borderBottom:'1px solid #000',margin:'10px 0 20px'}}>Register Owner</h2>
            
            <form className="form" method="POST"  style={{width:'100%',height:'auto',margin:'2rem 0'}}>
                <div className="form-group" style={divStyle} >
                    <input type="text" name="ownername" id="name" className="input-field" onChange={handleOnChange} value={owner.ownername} placeholder="Name" style={inputStyle} required/>
                </div>
                <div className="form-group" style={divStyle}>
                    <input type="email" name="email" id="email" className="input-field" onChange={handleOnChange} value={owner.email} placeholder="Email Address" style={inputStyle} required/>
                </div>
                <div className="form-group" style={divStyle}>
                    <input type="numerical" name="area" id="area" className="input-field" onChange={handleOnChange} value={owner.area} placeholder="Area" style={inputStyle} required/>
                    <select name="units" id="unit" className='input-field' onChange={handleOnChange} value={owner.units} style={inputStyle} required>
                      <option value="sqmtr">Sq. Meter</option>                  
                      <option value="sqft">Sq. feet</option>                  
                      <option value="sqyd">Sq. yard</option>                  
                    </select>
                </div>
                <div className="form-group" style={divStyle}>
                    <input type="numerical" name="contact" id="contact" className="input-field" onChange={handleOnChange} value={owner.contact} placeholder="Contact Number" style={inputStyle} required />
                </div>
                <div className="form-group" style={divStyle}>
                    {/* <input type="numerical" name="building" id="building" className="input-field" onChange={handleOnChange} value={owner.name} placeholder="Building Number" style={inputStyle}/> */}
                    <select name="building" id="" style={inputStyle} className="input-field" onChange={handleOnChange} value={owner.building}>
                      <option value="building">Building</option>
                      <option value="a">A</option>
                      <option value="b">B</option>
                      <option value="c">C</option>
                      <option value="d">D</option>
                    </select>
                </div>
                <div className="form-group" style={divStyle}>
                    <input type="text" name="houseNo" id="flat/block" className="input-field" onChange={handleOnChange} value={owner.houseNo} placeholder="Flat/Block" style={inputStyle} required/>
                </div>
                 
                <div className="form-group" style={{float:"right"}}>
                <input type="button" name="submit" className="input-submit" onClick={PatchData} value="Update" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#7579e7',display:'inline-block',marginRight:'1rem'}} />
                <input type="button" name="cancel" className="input-submit" onClick={handleCancel} value="Cancel" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#7579e7',display:'inline-block'}} />
                </div>  
            </form>  
        </div>
    </div>
    </main>
       
        </>
        
    
      );
}

export default EditForm
