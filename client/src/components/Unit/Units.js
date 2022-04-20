import React, {useState, useEffect} from 'react'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCircleXmark, faCirclePlus, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

library.add(fas, faUser, faCircleXmark, faCirclePlus, faEnvelope, faPhone )

export const RegisterOccupier=()=>{

  // const [dropDownList, setDropDownList] = useState([]) 

  // useEffect(async ()=>{
  //   const res = await fetch("/ownerregisterget", {
  //     method:"GET"
  //   });
  //   const data = await res.json();
  //   setDropDownList(data)
  // })

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

  const [occupierInfo, setOccupierInfo] = useState({
    building: "",
    housenum: "",
    occupiername: "",
    email: "",
    contact: "",
    memnum: ""
  })
  
  const handleChange =(e) => {
    let name = e.target.name;
    let value = e.target.value;
    setOccupierInfo({...occupierInfo, [name]:value});
  }

  const handleCancel = (e) => {
    setOccupierInfo({
      building: "A",
      housenum: "",
      occupiername: "",
      email: "",
      contact: "",
      memnum: ""
    })
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { occupiername, email, contact, memnum, housenum, building } = occupierInfo
    const res = await fetch("/registeroccupier", {
      method: "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({occupiername, email, contact, memnum, housenum, building})
    })

    const data = await res.json();
    if(res.status === 400) {
      window.alert("Fill all required fields")
    }
    else if(res.status === 422) {
      window.alert("Occupier already exist")
    }
    else(
      window.alert("Occupier registered successfully")
    )
  }
  return(
    <>
    <main className="main" style={{maxWidth:'85rem',width:'100%',height:'auto',margin:'0 auto',padding:'0.2rem '}} >


<div className="wrapper" style={{maxWidth:'38rem',width:'100%',margin:'0 auto',padding:'5rem 1.5 rem'}} >

    <div className="card" style={{marginTop:'50px',padding:'1.5rem 2rem',border:'none',outline:'none',borderRadius:'4px',color:'#252a32',background:'#ffffff',boxShadow:'0 1px 3px rgba(0,0,0,0.12),0 1px 3px rgba(0,0,0,0.24)'}} >
    <h2 style={{textAlign:'center',color:'blue',borderBottom:'1px solid #000',margin:'10px 0 20px'}}>Register Occupier</h2>

        <form className="form" style={{width:'100%',height:'auto',margin:'2rem 0'}}>
        <div className="form-group" style={divStyle} >
                {/* <input type="text" name="housenum" id="flat/block" className="input-field" onChange={handleChange} value={occupierInfo.housenum} placeholder="Flat/Block" style={inputStyle} /> */}
              <select name="building" id="building" style={inputStyle} onChange={handleChange}>
                {/* {dropDownList.map((item, key) => {
                  return (
                    <option value={item.houseNo} key={key}>{item.houseNo}</option>
                  )
                })}   */}
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="form-group" style={divStyle} >
                <input type="number" name="housenum" id="housenum" className="input-field" value={occupierInfo.housenum} onChange={handleChange}  placeholder="Flat/Block No." style={inputStyle}/> 
            </div>
            <div className="form-group" style={divStyle} >
                <input type="text" name="occupiername" id="name" className="input-field" value={occupierInfo.occupiername} onChange={handleChange}  placeholder="Name" style={inputStyle}/> 
            </div>
            <div className="form-group" style={divStyle} >
                <input type="email" name="email" id="email" className="input-field" onChange={handleChange} value={occupierInfo.email} placeholder="Email Address" style={inputStyle}/>
                
            
            </div>

            <div className="form-group" style={divStyle} >
                <input type="number" name="contact" id="contact" className="input-field" onChange={handleChange} value={occupierInfo.contact} placeholder="Contact Number" style={inputStyle} />
                
            </div>
            
            <div className="form-group" style={divStyle} >
                <input type="number" name="memnum" id="no ofmember" className="input-field" onChange={handleChange} value={occupierInfo.memnum} placeholder="Number Of Member" style={inputStyle}/>
                
            </div>
            
            
            <div className="form-group" style={{float:"right"}}>
              <input type="button" name="submit" className="input-submit" value="Submit" onClick={PostData} style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#7579e7',display:'inline-block', marginRight:"1rem"}} />
            <input type="button" name="cancel" className="input-submit" value="Cancel" onClick={handleCancel} style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#7579e7',display:'inline-block'}} />
            
            </div>
    
        </form>        
    </div>
</div>
</main>


    </>
  );
};

export const RegisterOwner=()=>{
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

  const unitConversion = (e) => {
    let unit = e.target.value;
    let area = document.getElementById("area").value;
  }

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

  const PostData = async (e) => {
    e.preventDefault();
    const {ownername, email, area, units, contact, houseNo, building} = owner
    let date = new Date().toLocaleDateString()
    date = date.split("T")[0]
    const res = await fetch("/ownerregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ownername, email, area, units, contact, houseNo, building, startDate: date
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
      window.alert("Owner Registered Successfully");
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
                <select name="units" id="unit" className='input-field' onChange={handleOnChange} onSelect={unitConversion} value={owner.units} style={inputStyle} required>
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
            <input type="button" name="submit" className="input-submit" onClick={PostData} value="Submit" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#7579e7',display:'inline-block',marginRight:'1rem'}} />
            <input type="button" name="cancel" className="input-submit" onClick={handleCancel} value="Cancel" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#7579e7',display:'inline-block'}} />
            </div>  
        </form>  
    </div>
</div>
</main>
   
    </>
    

  );
};