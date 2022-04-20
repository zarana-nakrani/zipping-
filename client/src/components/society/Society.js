import React, {useState} from "react";
import './Society.css';
import image from './info.svg'

function Society() {

  const [info, setInfo] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    registration : "",
    bankName: "",
    branchName: "",
    ifsc: ""
  });
  let name, value;
   const handleOnChange = (event) =>{
    name = event.target.name;
    value = event.target.value
    setInfo({...info, [name]:value})
  }

  const PostData = async (event) =>{
    event.preventDefault()
    const { name, address, city, pincode, registration, bankName, branchName, ifsc } = info
    const res = await fetch("/society", {
      method : "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name, address, city, pincode, registration, bankName, branchName, ifsc
      })
    })

    const data = await res.json();
    if(res.status === 422 || !data){
      window.alert("Something is wrong")
      console.log("Something is wrong")
    }  
    else {
      console.log("Registered Successfully")
      window.alert("Registered Successfully");
    }
  }

  return (
<>
  {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossOrigin="anonymous" /> */}
  
{/* <main className="main" style={{maxWidth:'85rem',width:'50%',height:'auto',margin:'0 auto',padding:'0.2rem'}} > */}


  <div className="wrapper" style={{maxWidth:'38rem',width:'100%',margin:'0 auto',padding:'5rem 1.5 rem'}} >
  
      <div className="card">
      <h2 style={{textAlign:'center',color:'#15AAD9',borderBottom:'1px solid #000',margin:'10px 0 20px'}}>Society Information</h2>
        <div className="d-block">
          <div className="d-inline-block" style={{width:"50%"}}>
          <form className="form" method="POST" style={{width:'100%',height:'auto',margin:'1rem 0'}}>
              <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                  <input type="text" name="name" id="name" className="input-field" onChange={handleOnChange} value={info.name} placeholder="Name"  style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'34px',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
              </div>
              <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                  <input type="text" name="address" id="address" className="input-field" onChange={handleOnChange} value={info.address} placeholder="Address" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'34px',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
              </div>
              <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                  <input type="text" name="city" id="username" className="input-field" onChange={handleOnChange} value={info.city} placeholder="City" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'34px',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
              </div>
              <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                  <input type="numerical" name="pincode" id="pincode" className="input-field" onChange={handleOnChange} value={info.pincode} placeholder="PinCode" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'34px',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}} />
              </div>
              <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                  <input type="numerical" name="registration" id="" className="input-field" onChange={handleOnChange} value={info.registration} placeholder="Registration Number" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'34px',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}} />
              </div>
              <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                  <input type="text" name="bankName" id="bankName" className="input-field" onChange={handleOnChange} value={info.bankName} placeholder="Bank Name" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'34px',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
              </div>
              <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                  <input type="text" name="branchName" id="branchName" className="input-field" onChange={handleOnChange} value={info.branchName} placeholder="Branch Name" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'34px',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
              </div>
              <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                  <input type="text" name="ifsc" id="ifsc" className="input-field" onChange={handleOnChange} value={info.ifsc} placeholder="IFSC Code" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'34px',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}} />
              </div>
              <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',WebkitBoxAlign:'center',marginBottom:'1rem', float:"right"}}>
                <input type="button" name="submit" className="input-submit " value="Submit"  onClick={PostData} style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#15AAD9',display:'inline-block', marginRight:"1rem"}} />
              <input type="button" name="cancel" className="input-submit  " value="Cancel" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#15AAD9',display:'inline-block'}} />
              
              </div>
              
       
          </form>
          </div>
          <div className="d-inline-block" style={{width:"50%", height:"100%", position:"absolute"}}> 
    <img className="img" src={image} alt={"Info image"} />
  </div>
  </div>
      </div>
  </div>
  
{/* </main> */}




</>
  );
}
export default Society;
