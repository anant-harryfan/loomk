import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='p-16 bg-black flex flex-col justify-start items-start gap-10'>
      
        <div className='flex flex-row items-center text-emerald-600'> 
              <a href='https://openforge.gov.in/'>open forge</a>
              
        </div>
        <div className='flex flex-row items-center text-blue-500'> 
              <a href='https://negd.gov.in/'>negd</a>
              
        </div>
    </div>
  )
}

export default page