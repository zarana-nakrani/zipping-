import { useState } from "react"
import Headers from "./Headers"
import MainDetails from './MainDetails'
import ClientDetails from './ClientDetails'
import Dates from './Dates'
import Table from './Table'
import Notes from './Notes'
import Footer from './Footer'
import TableForm from'./TableForm'

function Invoice (){
    const [showInvoice,setShowInvoice] = useState(false)
    const [name , setName] = useState("")
    const [address , setAddress] = useState("")
    const [email , setEmail] = useState("")
    const [contact , setContact] = useState("")
    const [bankName , setBankName] = useState("")
    const [bankAccount , setBankAccount] = useState("")
    const [website , setWebsite] = useState("")
    const [clientName , setClientName] = useState("")
    const [clientAddress , setClientAddress] = useState("")
    const [invoiceNumber , setInvoiceNumber] = useState("")
    const [invoiceDate , setInvoiceDate] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [notes , setNotes] = useState("")
    const[description,setDescription] = useState("")
    const[quantity,setQuantity] = useState("")
    const[price,setPrice] = useState("")
    const[amount,setAmount] = useState("")
    const[list,setList] =useState([])
    

    const handlePrint = () =>{
        window.print()
    
         }
    
    return(
        <>
        <main className=" m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl  bg-white rounded shadow" >
           {showInvoice ? (<div>
               <Headers handlePrint={handlePrint}/>
               <MainDetails name={name} address={address} />
               <ClientDetails clientName={clientName} clientAddress={clientAddress}/>
               <Dates invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate}/>
               <Table description={description} quantity={quantity} price={price} amount={amount} list={list} setList={setList}/>
               <Notes notes={notes}/>
               <Footer name={name} address={address} website={website} email={email} contact={contact} bankAccount={bankAccount} bankName={bankName} />
               <button onClick={()=>setShowInvoice (false)} className="mt-5 bg-blue-500  font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Edit Information</button>
            
           </div>):(
               <>
               <div className="flex flex-col justify-center">
                   <article className="md:grid grid-cols-2 gap-10">
                       <div className="flex flex-col">
                   <lable htmlFor = "name">Your full name</lable>
               <input type="text" name="text" id="name" placeholder="Enter Your Name" autoComplete="off" value={name} onChange={(e) =>setName(e.target.value)}/>
               </div>
               <lable htmlFor = "address">Enter Your Address</lable>
               <div>
               <input type="text" name="address" id="address" placeholder="Enter Your Address" autoComplete="off" value={address} onChange={(e) =>setAddress(e.target.value)}/>
               </div>
               </article>
               <article className="md:grid grid-cols-3 gap-10">
                   <div className="flex flex-col">
               <lable htmlFor = "email">Enter Your Email</lable>
               <input type="email" name="email" id="email" placeholder="Enter Your Email" autoComplete="off" value={email} onChange={(e) =>setEmail(e.target.value)}/>
               
               </div>
               <div className="flex flex-col">
               <lable htmlFor = "website">Enter Your website</lable>
               <input type="url" name="website" id="website" placeholder="Enter Your Website" autoComplete="off" value={website} onChange={(e) =>setWebsite(e.target.value)}/>
               </div>
               <div className="flex flex-col">
               <lable htmlFor = "contact">Enter Your Contact</lable>
               <input type="text" name="contact" id="contact" placeholder="Enter Your Contact" autoComplete="off" value={contact} onChange={(e) =>setContact(e.target.value)}/>
               </div>
               </article>
               <article className="md:grid grid-cols-2 gap-10 md:mt-16">
                   <div className="flex flex-col">
               <lable htmlFor = "bankName">Enter Your Bank Name </lable>
               <input type="text" name="bankName" id="bankName" placeholder="Enter Your BankName " autoComplete="off" value={bankName} onChange={(e) =>setBankName(e.target.value)}/>
               </div>
               <div className="flex flex-col">
               <lable htmlFor = "bankAccount">Enter Your BankAccount </lable>
               <input type="text" name="bankAccount" id="bankAccount" placeholder="Enter Your bankAccount  " autoComplete="off" value={bankAccount} onChange={(e) =>setBankAccount(e.target.value)}/>
               </div>
               </article>
               <article className="md:grid grid-cols-2 gap-10 ">
                   <div className="flex flex-col">
               <lable htmlFor = "clientName">Enter Your clientName </lable>
               <input type="text" name="clientName" id="clientName" placeholder="Enter Your clientName  " autoComplete="off" value={clientName} onChange={(e) =>setClientName(e.target.value)}/>
               </div>
               <div className="flex flex-col">
               <lable htmlFor = "clientAddress">Enter Your ClientAddress </lable>
               <input type="text" name="clientAddress" id="clientAddress" placeholder="Enter Your clientAddress  " autoComplete="off" value={clientAddress} onChange={(e) =>setClientAddress(e.target.value)}/>
               </div>
               </article>
               <article className="md:grid grid-cols-3 gap-10 md:mt-20">
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
               </article>
               <article>
                   <TableForm description={description} setDescription={setDescription} quantity={quantity} setQuantity={setQuantity} price={price} setPrice={setPrice} amount={amount} setAmount={setAmount}  setList={setList} list={list}/>
               </article>
               <lable htmlFor = "notes">Enter Your notes </lable>
               <textarea name="notes" id="notes" cols="30" rows="10" placeholder="Additional notes to client" value={notes} onChange={(e)=> setNotes(e.target.value)}></textarea>
               
              
              
              
               <button onClick={()=>setShowInvoice (true)} className="bg-blue-500 text-black font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Preview Invoice</button>
               </div>
               </>
           )}
               
               
               
              

          

            
            

            
            

            
            
        </main>
        
    </>
    )

}

export default Invoice