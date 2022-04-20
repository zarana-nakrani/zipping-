
import React,{useState,useEffect} from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { showErrorMsg } from '../helpers/message';
import { showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { isAuthenticated } from "../helpers/auth";
import {Link,useNavigate} from 'react-router-dom';
import {signup} from '../api/auth';

const Signup=()=> {
    let navigate = useNavigate();
    useEffect(()=>{
        if(isAuthenticated()){
            navigate('/admin/dashboard');
        }


    },[navigate]);
    const[formData,setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        cpassword:'',
        successMsg:false,
        errorMsg:false,
        loading:false,

    });

    const {name,email,phone,password,cpassword,successMsg,errorMsg,loading} =formData;

    const handleChange = (e) =>{
        // console.log(e);

        setFormData({...formData ,[e.target.name]:e.target.value,
            successMsg:'',
            errorMsg:'',
        })
        
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(formData);

         if(isEmpty(name) || isEmpty(email) || isEmpty(phone) || isEmpty(password) || isEmpty(cpassword)){
             setFormData({
                 ...formData,
                 errorMsg:"All Fields are required"
             })
         }else if(!isEmail(email)){
             setFormData({
                 ...formData,errorMsg:"Invalid Email"
             });


         }else if(!equals(password,cpassword)){
             setFormData({
              ...formData,errorMsg:"Passwords Do Not Match"
             });
         }else{
             
             const {name,email,phone,password} = formData;
             const data = {name,email,phone,password};

             setFormData({...formData,loading:true});
         
            

             signup(data)
                .then(response =>{
                console.log('Axios signup success',response);
                 setFormData({
                     name:'',
                     email:'',
                     phone:'',
                     password:'',
                     cpassword:'',
                     loading:false,
                     successMsg:response.data.successMessage
                 })

             })
             .catch((err) =>{
                console.log('Axios signup error',err);
                setFormData({...formData,loading:false});

             });

         }


    };
  const showSignupForm=()=>(
    <>
    {/* <main className="main" style={{maxWidth:'85rem',width:'100%',height:'auto',margin:'0 auto',padding:'0.2rem '}} > */}


<div className="wrapper" style={{maxWidth:'38rem',width:'100%',margin:'0 auto',padding:'5rem 1.5 rem'}} >

    <div className="card" style={{padding:'1.5rem 2rem',border:'none',outline:'none',borderRadius:'4px',color:'#252a32',background:'#ffffff',boxShadow:'0 1px 3px rgba(0,0,0,0.12),0 1px 3px rgba(0,0,0,0.24)',marginTop:'50px'}} >
    <h2 style={{textAlign:'center',color:'blue',borderBottom:'1px solid #000',margin:'10px 0 20px'}}>Signup</h2>


        <form className="form" method='POST' onSubmit={handleSubmit} noValidate style={{width:'100%',height:'auto',margin:'2rem 0'}}>
            <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                <input type="text" name="name" value={name} onChange={handleChange} id="name" className="input-field" placeholder="Name" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'auto',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
            </div>
            <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                <input type="email" name="email" value={email} onChange={handleChange}  className="input-field" placeholder="Email-id" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'auto',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
            </div>
            <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                <input type="number" name="phone" value={phone} onChange={handleChange}  className="input-field" placeholder="Phone" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'auto',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
            </div>
            <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                <input type="password" name="password" value={password} onChange={handleChange}  className="input-field" placeholder="Password" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'auto',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
            </div>
            <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                <input type="password" name="cpassword" value={cpassword} onChange={handleChange}  className="input-field" placeholder="Confirm Password" style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'400',lineHeight:'inherit',width:'100%',height:'auto',padding:'0.75rem 1.25rem',border:'none',outline:'none',borderRadius:'2rem',color:'#252a32',background:'#f1f5f8'}}/>
            </div>
            

            <div className="form-group" style={{display:'-webkit-box',display:'flex',WebkitBoxOrient:'horizontal',WebkitBoxDirection:'normal',flexDirection:'row',WebkitBoxPack:'justify',justifyContent:'space-between',WebkitBoxAlign:'center',marginBottom:'1rem'}}>
                <button type="submit" className='btn btn-primary btn-block' style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'teal',display:'inline-block',float:'left'}} 
 >Signup</button>   
            </div>

            <p className='text-center text-black'>Have an Account? <Link to='/signin' >Login</Link></p>
    
        </form>     
    </div>
</div>
{/* </main> */}
    
    </>
  );
  return(
      <div className='signup-container'>
          <div className='row px-3 vh-100'>
              <div className='col-md-4 mx-auto align-self-center'>
                {successMsg && showSuccessMsg(successMsg)} 
                {errorMsg && showErrorMsg(errorMsg)}
                {loading && <div className='text-center'>{showLoading()}</div>}
                {showSignupForm()}
          
                {/* {JSON.stringify(formData)} */}
              </div>
            </div>

      </div>
  )
}

export default Signup