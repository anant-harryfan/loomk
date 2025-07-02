import React from 'react'
import "@/app/globals.css"


type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <div className="mainu ">
      {children}
    </div>
  )
}

export default layout

// TO HAM KYA KARENGE KI YE cleark ko udaenge. phir dashboard ki jagaha node banaenge jisme info hogi