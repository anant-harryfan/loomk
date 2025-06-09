
"use client"
import React from 'react'
import MapComponent from './maplayout'
import { redirect } from 'next/navigation'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='h-screen w-screen'>
          <MapComponent />
          {/* <div className='block'>
              <iframe src="https://sanskritdocuments.org/doc_devii/tAmraparNImAhAtmyam.html"></iframe>
              Tan Porunai --{`>`} Thamirabarani Tampraparani, Tamirabarni, Tamiravaruni.
              Agastyarkoodam peak
              Tirunelveli
               Thoothukudi
              Gulf of Mannar.
              ancient Sangam Tamil literature Purananuru
              <iframe src="https://archive.org/details/Purananuru-Tamil/page/n155/mode/2up"></iframe>
              <iframe src="https://archive.org/embed/dli.jZY9lup2kZl6TuXGlZQdjZI9juQy.TVA_BOK_0002877" width="560" height="384" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>
              <iframe src="https://indiancolumbus.blogspot.com/2022/10/gangaikondan-kailasanathar-temple.html" width="560" height="384" ></iframe>
              
          </div> */}
          
          
    </div>
  )
}

export default page