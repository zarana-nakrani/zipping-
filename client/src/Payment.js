import React, { useEffect, useState } from "react";

function Payment(){
    let inputStyle = {
        fontFamily:'inherit',
        fontSize:'0.95rem',
        fontWeight:'400',
        lineHeight:'1rem',
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

     const [invoiceList, setInvoiceList] = useState([])
     const [invoiceNo, setInvoiceNo] = useState(0)
     const [unit, setUnit] = useState("Unit")
     const [username, setName] = useState("Name")
     const [charge, setCharge] = useState(0)
     const [formData, setFormData] = useState({
        Paid_Amount: 0,
        mode:"",
        payDate:"",
        refNo:"",
        remark:""
     })

     const getData = async () => {
         const res = await fetch("/getinvoice", {
             method: "GET"
         })

         const data = await res.json()
         setInvoiceList(data)
     }

     useEffect( () => {
         getData()
     }, [])

     const handleData = (e) => {
        e.preventDefault()
        const num = e.target.value
        const result = invoiceList.find(({invoiceNo}) => invoiceNo === num)
        //  console.log(result)
        const {invoiceNo, username, unit, totalCharge } = result
        setInvoiceNo(invoiceNo)
        setUnit(unit)
        setName(username)
        setCharge(totalCharge)
     }

     const postData = async(e) => {
         e.preventDefault()
         console.log("submitted")
        const {mode,Paid_Amount, payDate, refNo, remark} = formData
        console.log(invoiceNo, unit, username, charge, mode, payDate, refNo, remark)
        const res = await fetch("/payment/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                invoiceNo, unit, username, charge, mode, Paid_Amount, payDate, refNo, remark
            })
        })
        
        const data = await res.json()
        if(res.status === 400) {
            alert(data.err)
        }
        else if(res.status === 500){
            alert(data.dberr)
        }
        else{
            console.log(data.successMsg)
            alert(data.successMsg)
        }
     }

     let name = ""
     let value = ""
     const handleChange = (e) => {
        e.preventDefault()
        name = e.target.name
        value = e.target.value
        setFormData({...formData, [name]:value})
     }

     const handleCancel = () => {
         setInvoiceNo(0)
         setUnit("Unit")
         setName("Name")
         setCharge(0)
         setFormData(
            {
                Paid_Amount: "",
                mode:"Cash",
                payDate:"",
                refNo:"",
                remark:""
             }
         )
     }
    //  console.log(formData)
    return(
        <>
    
        {/* <main className="main" style={{maxWidth:'85rem',width:'100%',height:'auto',margin:'0 auto',padding:'0.2rem '}} > */}
    
    
    <div className="wrapper" style={{maxWidth:'38rem',width:'100%',margin:'0 auto',padding:'5rem 1.5 rem'}} >
    
        <div className="card" style={myCard} >
        <h2 style={{textAlign:'center',color:'#15AAD9',borderBottom:'1px solid #000',margin:'10px 0 20px'}}>Payment Entry</h2>
          <div className='d-block'>
            
            <form className="form" style={{width:'100%',height:'auto',margin:'2rem 0'}}>
            <div className="d-inline-block" style={{width:"50%"}}>
                <div className="form-group" style={divStyle} >
                    {/* <input type="number" name="invoiceNo" id="housenum" className="input-field"   placeholder="Invoice Number" style={inputStyle}/>  */}
                    <select name="invoiceNo" id="" style={inputStyle} onChange={handleData}>
                        {
                            invoiceList.map((element, key) => {
                                return(
                                    <option value={element.invoiceNo}>{element.invoiceNo}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div style={{width:'100%',height:'auto',margin:'2rem 0'}}>
                    <p style={inputStyle}>{unit}</p>
                </div>
                <div style={{width:'100%',height:'auto',margin:'2rem 0'}}>
                    <p style={inputStyle}>{username}</p>
                </div>
                <div style={{width:'100%',height:'auto',margin:'2rem 0'}}>
                    <p style={inputStyle}>{charge}</p>
                </div>
                </div>
                
                <div className="d-inline-block" style={{width: "50%", padding:"1rem"}}>
                <div className="form-group" style={divStyle} >
                    <input type="number" name="Paid_Amount" className="input-field" onChange={handleChange} placeholder="Paid Amount" style={inputStyle}/> 
                </div>
                
                <div style={{width:'100%',height:'auto',margin:'2rem 0'}}>
                    <select name="mode" id="" style={inputStyle} onChange={handleChange}>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>
                <div className="form-group" style={{width:'100%',height:'auto',margin:'2rem 0'}} >
                    <input type="date" name="payDate" value={formData.payDate} onChange={handleChange}   className="input-field" placeholder="Enter Payment Date" style={inputStyle}/> 
                </div>
                <div className="form-group" style={{width:'100%',height:'auto',margin:'2rem 0'}} >
                    <input type="number" name="refNo" value={formData.refNo} onChange={handleChange}   className="input-field" placeholder="Enter Reference Number if payment is online"  style={inputStyle}/> 
                </div>
                </div>
                <div className="form-group" style={{width:'100%',height:'auto',marginBottom:'1rem', paddingRight:"1rem"}} >
                    <input type="text" name="remark" value={formData.remark} onChange={handleChange}   className="input-field" placeholder="Enter Remark if any" style={inputStyle}/> 
                </div>
                <div className="form-group" style={{float:"right"}}>
                  {/* <input type="button" name="submit" className="input-submit" value="Submit" onSubmit={postData} style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#15AAd9',display:'inline-block', marginRight:"1rem"}} /> */}
                  <button type="Submit" onClick={postData} style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#15AAd9',display:'inline-block', marginRight:"1rem"}}>Submit</button>
                <input type="button" name="cancel"  onClick={handleCancel} className="input-submit" value="Cancel"  style={{fontFamily:'inherit',fontSize:'0.95rem',fontWeight:'500',lineHeight:'inherit',cursor:'pointer',padding:'0.65rem 2rem', border:'none',outline:'none',borderRadius:'2rem',textAlign:'center',color:'#ffffff',background:'#15AAD9',display:'inline-block'}} />
                
                </div>
        
            </form>
            
            </div>
            </div>
            </div>
            </>
            )
}

export default Payment