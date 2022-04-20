import React,{ useState, useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { signin } from '../api/auth';
import { setAuthentication,isAuthenticated } from "../helpers/auth";
import { getLocalStorage } from "../helpers/localStorage";

const Signin =() =>{

    let navigate = useNavigate();
    useEffect(()=>{
        if(isAuthenticated()){
            navigate(`/admin/dashboard`);
        }
    },[navigate]);
  const[formData,setFormData] = useState({
    
    email:'',
    password:'',
    errorMsg:false,
    loading:false,
    

});  
   const {email,password,errorMsg,loading} =formData;

   const handleChange = (e) =>{
    

    setFormData({...formData ,[e.target.name]:e.target.value,
        
        errorMsg:'',
    })
    
};

const handleSubmit = (e)=>{
  e.preventDefault();
  // console.log(formData);
  if( isEmpty(email) ||  isEmpty(password) ){
    setFormData({
        ...formData,
        errorMsg:"All Fields are required"
    })
}else if(!isEmail(email)){
    setFormData({
        ...formData,errorMsg:"Invalid Email"
    });


}else{
             
    const {email,password} = formData;
    const data = {email,password};

    setFormData({...formData,loading:true});

   

    signin(data)
      .then(response=>{
          setAuthentication(response.data.token,response.data.user);

          if(isAuthenticated()){
              console.log('redirect to admindashboard');
              navigate(`/admin/dashboard`);
          }

      })
      .catch(err=>{
          console.log('signin error',err);
          setFormData({
              ...formData,loading:false,errorMsg:err.response.data.errorMessage,
          })
      })


  }

   
   

        


 };

   const showSigninForm=()=>(
    <>
    <main className="main" style={{maxWidth:'85rem',width:'100%',height:'auto',margin:'0 auto',padding:'0.2rem '}} >


<div className="wrapper" style={{maxWidth:'38rem',width:'100%',margin:'0 auto',padding:'5rem 1.5 rem'}} >

    <div className="card" style={{padding:'1.5rem 2rem',border:'none',outline:'none',borderRadius:'4px',color:'#252a32',background:'#ffffff',boxShadow:'0 1px 3px rgba(0,0,0,0.12),0 1px 3px rgba(0,0,0,0.24)',marginTop:'50px'}} >
    <h2 style={{textAlign:'center',color:'blue',borderBottom:'1px solid #000',margin:'10px 0 20px'}}>Signin</h2>


        <form className="form" method='POST' onSubmit={handleSubmit} noValidate style={{width:'100%',height:'auto',margin:'2rem 0'}}>

            <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                <input type="email" name="email" value={email} onChange={handleChange}  className="input-field" placeholder="Email-id" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'auto',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
            </div>
            
            <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                <input type="password" name="password" value={password} onChange={handleChange}  className="input-field" placeholder="Password" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'auto',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
            </div>
            
            

            <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                <button type="submit" className='btn btn-primary btn-block' style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'teal',display:'inline-block',float:'left'}} 
 >Signin</button>   
            </div>

            <p className='text-center text-black'>Don't Have an Account? <Link to='/signup' >Register Here</Link></p>
    
        </form>      
    </div>
</div>
</main>
</>
);

return(
  <div className='signin-container'>
      <div className='row px-3 vh-100'>
          <div className='col-md-4 mx-auto align-self-center'>
             
            {errorMsg && showErrorMsg(errorMsg)}
            {loading && <div className='text-center'>{showLoading()}</div>}
            {showSigninForm()}
      
            {/* {JSON.stringify(formData)} */}
          </div>
        </div>

  </div>
)
    
    

 



}



export default Signin;