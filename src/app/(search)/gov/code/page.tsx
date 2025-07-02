import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='p-16 bg-black flex flex-col justify-start items-start gap-10'>
      <div className='text-amber-700'>
              <a href="https://indiaai.gov.in/">bharatAi ~~ indiaai</a>
        </div>
        <div className='flex flex-row items-center text-emerald-600'> 
              <a href='https://openforge.gov.in/'>open forge</a>
              
        </div>
        <div className='flex flex-row items-center text-amber-600'> 
        <a href='https://www.apisetu.gov.in/'>api setu</a>
        </div>
        <div className='flex flex-row items-center text-amber-600'> 
        <a href='https://www.ux4g.gov.in/'>UX4G</a>
        </div>
      <div className='flex flex-row items-center '>
          <a href="./3dmodel">3dmodel</a>
        </div>
        FOS006822361862
      <div className='flex flex-row items-center text-purple-700 '>
        <a href="https://apps.mgov.gov.in/">gov appstore</a>
        </div>
      <div className='flex flex-row items-center text-blue-800 '>
        <a href="https://startupmission.kerala.gov.in/">Startup kerala</a>
        </div>
    </div>
  )
}

export default page