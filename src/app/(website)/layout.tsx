import React, { Children } from 'react'
import LandingPageNavbar from './_components/navbar'
import '@/app/(website)/layout.(website).css'
type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className="theOthers">
            <LandingPageNavbar/>
            {children }
        </div>
    )
}

export default layout