import React from 'react'
import MapComponent from './maplayout'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

type Props = {
  children: React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <div className='  w-screen'>
            <div className="w-full ">
              <div className=' '>{children}</div>
            </div>
      

    </div>
  )
}

export default layout