
import React from 'react'
import { getResearch } from './research'

type Props = {
    date: string
}


const page =  async({date}: Props) => {
  
    let duoser  = await getResearch("2025")
    // console.log(duoser.data)
  return (
    <div className='p-10  flex items-center justify-center flex-col gap-40'>
  <div></div>
      <div className='grid grid-cols-4 gap-10 p-5 '>
      {duoser.data.map((element) => (
        <div className="size-50 transition-all  hover:size-[100vh] duration-1000  text-black " key={element.id}>
          <iframe className='  w-[100%] h-[100%] rounded-xl ' srcDoc={` <style>body{zoom:10%;}</style> ${element.code}`}>{element.date}</iframe>
        </div>
      ))}
     
 
      </div>
    </div>
  )
}

export default page