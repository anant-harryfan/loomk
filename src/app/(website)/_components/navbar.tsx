import { Menu } from 'lucide-react'
import React from 'react'
import '@/app/(website)/_components/navbar.css'
import Link from 'next/link'


type Props = {}
const LandingPageNavbar = (props: Props) => {
  return (
    <div className="navbar">
      <div className="menu">
        <img src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=" alt="" className='imageUser' />
        <div className="lino">
          <Link href='/auth/sign-up' > other people Name </Link>
          <Link href='/auth/sign-out' > other people Name </Link>
          <Link href='/auth/sign-in' > other people Name </Link>
        </div>
 
well shayad nahi hue kyoki ham do alag alag cheeze bhi kar paenge, to dekhte. 
        idk2
      </div>

      </div>
      )
}

      export default LandingPageNavbar