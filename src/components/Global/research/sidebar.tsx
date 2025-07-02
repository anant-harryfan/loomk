
import { createReverch } from '@/app/JHAMBUDWEEPA/Research/research'
import { useRouter } from 'next/navigation'

// import { useCreateReverch } from '@/hooks/useCreateReasearch'
import React, { useState } from 'react'


type Props = {
  codu: string
  date: string
}

const CreateReverch = ({ codu, date }: Props) => {
  const router = useRouter()
  let buotan = document.getElementById('buotan')
  // buotan.onclick
  let [set, setset] = useState(false)
  const  onCreateNewReverch  = ()=>{
    setset(true)
    if(!set) createReverch(codu, date)
      if(set) buotan.innerHTML = "HAAN BHAI BAN GAYA" 
    
    router.push('/dashboard/auth/sign-in')
    }; 

  return (
    <div className='bg-cyan-700 rounded-2xl cursor-pointer  flex  justify-center w-25'>
      <div id='buotan' className='cursor-pointer' onClick={set? ()=>{} :onCreateNewReverch }>Banade</div>
    </div>
  )
}

export default CreateReverch