import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

type Props = {
    plan: 'PRO'|'FREE'
    trial: boolean
    videoId: string
}

const Bots = ({plan, trial, videoId}: Props) => {
  return (
    <TabsContent value='Code' className='p-5 mt-3 bg-[#1d1d1d] rounded-xl flex flex-col gap-y-10'>
        <div className="flex items-center">
            <div className="w-8/12">
            <h2 className='text-3xl font-bold'>Code</h2>
            <p className='text-[#bdbdbd]'>
                Ye use karlo/ banalo
            </p>
            </div>
        </div>
    </TabsContent>
  )
}

export default Bots