import React from 'react'

export default function ClientDetails({invoiceNo , invoiceDate, fromDate, toDate}) {
  return (
    <>
      <section className="mt-5" >
                <h2 className="text-2xl uppercase font-bold mb-1" >{invoiceNo}</h2>
                <p>{invoiceDate}</p>
                <p><span>from date: {fromDate}</span><span className='mx-5'>to date: {toDate}</span></p>
      </section>
    </>
  )
}
