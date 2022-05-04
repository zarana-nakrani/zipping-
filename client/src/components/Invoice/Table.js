import React from 'react'

export default function Table({waterCharge,securityCharge, cleaningCharge, festivalCharge, totalCharge}) {
  return (
    <>
    <table width="100%" className="mb-10">
      <thead >
          <tr className="bg-gray-100 p-1 ">
            <td className='font-bold'>Water Charge</td>
          
            <td className='font-bold'>Security Charge</td>
          
            <td className='font-bold'>Cleaning Charge</td>
          
            <td className='font-bold'>Festival Charge</td>

            <td className='font-bold'>Total Charge</td>
            </tr>
        </thead>
      {/* {list.map(({id, description,quantity,price,amount}) =>( */}
        {/* <React.Fragment key={id}> */}
        
        <tbody>
          <tr>
            <td>{waterCharge}</td>
            <td>{securityCharge}</td>
            <td>{cleaningCharge}</td>
            <td>{festivalCharge}</td>
            <td>{totalCharge}</td>
          </tr>
        </tbody>
        {/* </React.Fragment> */}
      
      
      </table>
      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">Rs.{totalCharge.toLocaleString()}</h2>
      </div>
    </>
  )
}

