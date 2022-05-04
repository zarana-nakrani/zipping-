import { useState,useRef, useEffect } from "react"
import Headers from "./Headers"
import UserDetails from './UserDetails'
import InvoiceDetails from './InvoiceDetails'
import ReadingDetails from './ReadingDetails'
import Table from './Table'
import Notes from './Notes'
import Footer from './Footer'
// import TableForm from'./TableForm'
import ReactToPrint from 'react-to-print'
import { v4 as uuidv4 } from "uuid"

function Invoice (){
    const [showInvoice,setShowInvoice] = useState(false)
    const [invoiceNo , setInvoiceNo] = useState(0)
    const [invoiceDate , setInvoiceDate] = useState()
    const [fromDate , setFromDate] = useState()
    const [toDate , setToDate] = useState()
    const [UnitDropdownList , setUnitDropdownList] = useState([])
    const [building, setbuilding] = useState("")
    const [houseNo, setHouseNo] = useState("")
    const [UnitId, setUnitId] = useState(0)
    const [username, setUsername] = useState("")
    const [current , setCurrent] = useState(0)
    const [previous , setPrevious] = useState(0)
    const [consumedUnits, setConsumedUnits] = useState(0)
    const [waterCharge, setWaterCharge] =useState(0)
    const ratePUnit = 12
    const [securityCharge , setSecurityCharge] = useState(0)
    const [cleaningCharge , setCleaningCharge] = useState(0)
    const [festivalCharge , setFestivalCharge] = useState(0)
    const [dueDate, setDueDate] = useState()
    const [totalCharge, setTotalCharge] = useState(0)
    const [notes , setNotes] = useState("")
    // const[description,setDescription] = useState("")
    // const[quantity,setQuantity] = useState("")
    // const[price,setPrice] = useState("")
    // const[amount,setAmount] = useState("")
    // const[list,setList] =useState([])
    // const[total,setTotal] = useState(0)

    const userData = async () => {
        const res = await fetch("/unitownerdata", {
            method: "GET"
        })
        const data = await res.json();
        // console.log(data)
        setUnitDropdownList(data)
    }

    useEffect(()=>{userData()}, [])
    // console.log(UnitDropdownList)

    //setting owner name
    // console.log(UnitId)
    const setname = (e) => {
        e.preventDefault()
        setUnitId(e.target.value)
        console.log(UnitId)
        // console.log(UnitDropdownList)
        if(UnitId !== undefined){
            let result = UnitDropdownList.find( ({_id}) => _id === UnitId)
            console.log(result)
            setUsername(result.ownername);
            setHouseNo(result.houseNo)
            setbuilding(result.building)   
        }
    }

    const calculateConsumedUnits = ()=> {
        setConsumedUnits(current - previous)
    }
    useEffect(()=>{
        calculateConsumedUnits()
    }, [current,previous,consumedUnits])

    const calculatewaterCharge = () => {
        setWaterCharge(consumedUnits * ratePUnit)
    }
    useEffect(()=> {
        calculatewaterCharge()
    }, [consumedUnits])

    const calculatedTotalCharge = () => {
        let sum = 0
        sum = parseInt(waterCharge) + parseInt(securityCharge) + parseInt(cleaningCharge) + parseInt(festivalCharge)
        setTotalCharge(sum)
    }

    useEffect(() => {
        calculatedTotalCharge()
    }, [waterCharge, securityCharge, cleaningCharge, festivalCharge])
    // useEffect( () => {
    //     setname(UnitId)
    // }, [UnitId])

    const PostData = async (e) => {
        e.preventDefault();
       
        const unit = building + "-" + houseNo
        console.log(invoiceNo, invoiceDate, fromDate, toDate, unit, username, consumedUnits, waterCharge, securityCharge, cleaningCharge, festivalCharge, totalCharge, dueDate )
        const res = await fetch("/invoicedata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                invoiceNo, invoiceDate, fromDate, toDate, unit, username, consumedUnits, waterCharge, securityCharge, cleaningCharge, festivalCharge, totalCharge, dueDate 
            })
            
        })

        const data = await res.json()
        if(res.status === 400) {
            window.alert(data.errorMsg)
        }
        else if(res.status === 422) {
            window.alert(data.existErr)
        }
        else if(res.status === 500) {
            window.alert(data.dbErr)
        }
        else{
            window.alert(data.successMsg)
        }
    }
    
    const componentRef = useRef()
    

    const handlePrint = () =>{
        window.print()
    
         }
    return(
        <>
        
        <main className="m-5 p-5 xl:max-w-4xl" >
           
           {showInvoice ? (
               <>
               <ReactToPrint trigger={()=> <button className=" bg-blue-500 ml-5 font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                Print / Download</button>
           }
           content ={() => componentRef.current}/>
           <div ref={componentRef} className="p-5">
               <Headers handlePrint={handlePrint}/>
               <InvoiceDetails invoiceNo={invoiceNo} invoiceDate={invoiceDate} fromDate={fromDate} toDate={toDate} />
               <UserDetails name={username} houseNo={houseNo} building={building} />
               <ReadingDetails current={current} previous={previous} consumedunits={consumedUnits} ratePUnit={ratePUnit}/>
               <Table waterCharge={waterCharge} securityCharge={securityCharge} cleaningCharge={cleaningCharge} festivalCharge={festivalCharge} totalCharge={totalCharge}/>
               <Notes notes={notes}/>
               <Footer dueDate={dueDate}/>
               </div>
               <button onClick={()=>setShowInvoice (false)} className="mt-5 bg-blue-500  font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Edit Information</button>
            
           
           </>):(
               <>
               <div className="flex flex-col justify-center">
                <form className="form" method="POST">
                <article className="md:grid grid-cols-2 gap-10 mb-3">
                <div className="flex flex-col ">
                    <lable htmlFor = "name">Invoice No.</lable>
                    <input type="numeric" name="invoiceNo" id="invno" placeholder="Enter Invoice No."  value={invoiceNo} onClick={(e) =>setInvoiceNo(uuidv4())}/>
                </div>
                <div className="flex flex-col">
                    <lable htmlFor = "address">Invoice Date</lable>
                    <input type="date" name="invoiceDate" id="invdate" placeholder="Select Invoice Date" value={invoiceDate} onChange={(e) =>setInvoiceDate(e.target.value)}/>
               </div>
               </article>
               <article className="md:grid grid-cols-2 gap-10">
                   <div className="flex flex-col">
               <lable htmlFor = "email">From Date</lable>
               <input type="date" name="fromDate" id="fromdate" placeholder="Select Date" value={fromDate} onChange={(e) =>setFromDate(e.target.value)}/>
               </div>
               {/* <div className="flex flex-col">
               <lable htmlFor = "website">Enter Your website</lable>
               <input type="url" name="website" id="website" placeholder="Enter Your Website" autoComplete="off" value={website} onChange={(e) =>setWebsite(e.target.value)}/>
               </div> */}
               <div className="flex flex-col">
               <lable htmlFor = "contact">To Date</lable>
               <input type="date" name="toDate" id="todate" placeholder="Select Date" value={toDate} onChange={(e) =>setToDate(e.target.value)}/>
               </div>
               </article>
               <article className="md:grid grid-cols-2 gap-10 md:mt-10 mb-3">
                   <div className="flex flex-col">
               <lable htmlFor = "bankName">Unit</lable>
               {/* <input type="text" name="bankName" id="bankName" placeholder="Select Unit" autoComplete="off" value={bankName} onChange={(e) =>setBankName(e.target.value)}/> */}
               <select name="unit" id="unit" onChange={setname}>
                   {UnitDropdownList.map((element, id)=>{
                       return(
                           <option value={element._id}>{element.building}-{element.houseNo}</option>
                       )
                   })}
               </select>
               </div>
               <div className="flex flex-col">
               <lable htmlFor = "bankAccount">Name </lable>
               {/* <input type="text" name="bankAccount" id="bankAccount" placeholder="Name appers here" autoComplete="off" value={bankAccount} onChange={(e) =>setBankAccount(e.target.value)}/> */}
               <p>{username}</p>
               </div>
               </article>
               <article className="md:grid grid-cols-3 gap-2 md:mt-10">
               <div className="flex flex-col">
                <p className="">Water Bill</p>
                </div>
                <div className="flex flex-col">
                <div className="flex flex-col">
               <lable htmlFor = "clientName">Current Reading </lable>
               <input type="numeric" name="current" id="creading" placeholder="Enter Current Reading" autoComplete="off" value={current} onChange={(e) =>setCurrent(e.target.value)}/>
               </div>
               <div className="flex flex-col">
               <lable htmlFor = "clientAddress">Previous Reading</lable>
               <input type="numeric" name="previous" id="preading" placeholder="Enter Previous Reading" autoComplete="off" value={previous} onChange={(e) =>setPrevious(e.target.value)}/>
               </div>
               <div className="flex flex-col">
               <lable htmlFor = "clientAddress">Consumed Units</lable>
               {/* <input type="numeric" name="clientAddress" id="clientAddress" placeholder="Read Only" autoComplete="off" value={clientAddress} onChange={(e) =>setClientAddress(e.target.value)}/> */}
               <p>{consumedUnits}</p>
               </div>
               <div className="flex flex-col">
               {/* <lable htmlFor = "clientAddress">Rate per unit</lable>
               <input type="numeric" name="clientAddress" id="clientAddress" placeholder="Read Only" autoComplete="off" value={clientAddress} onChange={(e) =>setClientAddress(e.target.value)}/> */}
               <p>{ratePUnit}</p>
               </div>
               </div>
               </article>
               <article className="md:grid gap-10 md:mt-5 place-items-end">
               <div className="flex flex-col-reverse">
                <div className="flex flex-col">
                <lable htmlFor = "clientAddress">Water Charge</lable>
                {/* <input type="numeric" name="watercharge" id="clientAddress" placeholder="Read Only" autoComplete="off" value={clientAddress} onChange={(e) =>setClientAddress(e.target.value)}/> */}
                <p>{waterCharge}</p>
                <div className="flex flex-col">
               <lable htmlFor = "clientAddress">Cleaning Charge</lable>
               <input type="numeric" name="cleaningcharge" id="cleaning" placeholder="Enter Cleaning Charge" value={cleaningCharge} onChange={(e) =>setCleaningCharge(e.target.value)}/>
               </div>
               <div className="flex flex-col">
               <lable htmlFor = "clientAddress">Security Charge</lable>
               <input type="numeric" name="securitycharge" id="security" placeholder="Enter Security Charge" value={securityCharge} onChange={(e) =>setSecurityCharge(e.target.value)}/>
               </div>
               <div className="flex flex-col">
               <lable htmlFor = "clientAddress">Festival Charge</lable>
               <input type="numeric" name="festivalcharge" id="festival" placeholder="Enter Festival Charge" value={festivalCharge} onChange={(e) =>setFestivalCharge(e.target.value)}/> 
               </div>
               <div className="flex flex-col">
               <lable htmlFor = "clientAddress">Total Charge</lable>
               {/* <input type="numeric" name="clientAddress" id="clientAddress" placeholder="Calculated" autoComplete="off" value={clientAddress} onChange={(e) =>setClientAddress(e.target.value)}/> */}
               <p>{totalCharge}</p>
               </div>
               </div>
               </div>
               </article>
               {/* <article className="md:grid grid-cols-3 gap-10 md:mt-20">
                   <div className="flex flex-col">
               <lable htmlFor = "invoiceNumber">Enter Your Invoice Number</lable>
               <input type="text" name="invoiceNumber" id="invoiceNumber" placeholder="Enter Your InvoiceNumber  " autoComplete="off" value={invoiceNumber} onChange={(e) =>setInvoiceNumber(e.target.value)}/>
               </div>
               <div className="flex flex-col">
               <lable htmlFor = "invoiceDate">Enter Your Invoice Date </lable>
               <input type="date" name="invoiceDate" id="invoiceDate" placeholder="Enter Your invoiceDate " autoComplete="off" value={invoiceDate} onChange={(e) =>setInvoiceDate(e.target.value)}/>
               </div>
               <div className="flex flex-col">
                <lable htmlFor = "dueDate">Enter Your dueDate </lable>
               <input type="date" name="dueDate" id="dueDate" placeholder="Enter Your DueDate  " autoComplete="off" value={dueDate} onChange={(e) =>setDueDate(e.target.value)}/>
               </div>
               </article> */}
               <article className="md:grid grid-cols-3 gap-10 md:my-5">
                   <div className="flex flex-col">
               <lable htmlFor = "contact">due Date</lable>
               <input type="date" name="duedate" id="due" placeholder="Select Date" value={dueDate} onChange={(e) =>setDueDate(e.target.value)}/>
                   </div>
                   {/* <TableForm description={description} setDescription={setDescription} quantity={quantity} setQuantity={setQuantity} price={price} setPrice={setPrice} amount={amount} setAmount={setAmount}  setList={setList} list={list} total={total} setTotal={setTotal}/> */}
               </article>
               <article className="md:grid grid-cols-3 gap-10 md:my-5">
                   <div className="flex flex-col">
               <lable htmlFor = "notes">Enter Your notes </lable>
               <textarea name="notes" id="notes" cols="30" rows="10" placeholder="Additional notes to client" value={notes} onChange={(e)=> setNotes(e.target.value)}></textarea>
                   </div>
                   </article>
               <button type="submit" onClick={PostData} className="bg-blue-500 text-black font-bold mr-3 py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Submit</button>
               <button onClick={()=>setShowInvoice (true)} className="bg-blue-500 text-black font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Preview Invoice</button>
               </form>
               </div>
               </>
           )}
   
        </main>
        
    </>
    )

}

export default Invoice