import React from 'react'

export default function Dates({current,previous , consumedunits, ratePUnit}) {
  return (
    <>
    <article className="mt-10 mb-14 flex  items-end justify-end" >
    <ul>
        <li className="p-1"><span className="font-bold">Current Reading:</span>{current}</li>
        <li className="p-1 bg-gray-100"><span className="font-bold" >Previuos Reading:</span>{previous} </li>
        <li className="p-1"><span className="font-bold" >Consumed Units:</span>{consumedunits}</li>
        <li className="p-1"><span className="font-bold" >Rate Per Unit:</span>{ratePUnit}</li>
    </ul>
    </article>
    </>
  )
}
