import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import React from 'react'

type Props = {
    triggers: string[]
    children: React.ReactNode
    defaultValue: string
}

const TabMenu = ({children, triggers, defaultValue}: Props) => {
  return (
    <Tabs defaultValue={defaultValue} className='w-full'>
        <TabsList className='flex flex-col justify-start bg-transparent'> 
          <div>
            {triggers.map((trigger, key)=><TabsTrigger  key={trigger} value={trigger}
            className='capitalize text-base data-[state=active]:bg-[#1d1d1d]'
            >{trigger}</TabsTrigger>)}
        </div>
            {children}
        </TabsList>
    </Tabs>
  )
}

export default TabMenu