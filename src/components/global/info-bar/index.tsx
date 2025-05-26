import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

type Props = {}

const InfoBar = (props: Props) => {
  return (
    <div className=' opacity-100 transition-opacity pl-20 md:pl-[256px] fixed p-[16.3px] w-full flex items-center justify-between gap-4 '>
      <div className="flex gap-4 justify-center items-center rounded-full px-4 w-full">
            <Search
            size={25}
            className='text-[#707070]'
            />
            <Input   className='bg-none border-none !placeholder-neutral-50' placeholder='Say Anything'/>
        </div>
<UserButton/>
    </div>
  )
}

export default InfoBar