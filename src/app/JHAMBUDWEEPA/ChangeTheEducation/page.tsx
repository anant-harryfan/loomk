"use client"
import { redirect } from 'next/navigation'
import React from 'react'



const page = () => {
  return (
    <div>
      <div>
        to dekh bhai jo bhi school me padhate hai vo kam ka nahi hai
      </div>

      <div onClick={() => { redirect('/ChangeTheEducation/Borepanti1') }} className='grid w-full p-19 gap-4  lg:grid-cols-3 grid-flow-row h-screen  text-white md:grid-cols-2 sm:grid-cols-1 '>
        <div  className="flex flex-col items-center justify-center p-3 rounded-2xl border-2  ">1st</div>
        <div  className="flex flex-col items-center justify-center p-3 rounded-2xl border-2  ">2nd</div>
   
    
       
      </div>
    </div>
  )
}

export default page