import React, { Children } from 'react'

import '@/app/website/layout.(website).css'
import { ClerkProvider } from '@clerk/nextjs'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {``
    return (
        <div className="">
            <ClerkProvider>
            {children}
            </ClerkProvider>
            
        </div>
    )
}

export default layout