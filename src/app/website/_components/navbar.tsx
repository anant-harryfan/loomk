"use client"
import React from 'react'
// import '@/app/website/_components/navbar.css'
import Link from 'next/link'
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconTerminal2 } from '@tabler/icons-react';

type Props = {}
const LandingPageNavbar = (props: Props) => {
  const links = [
    {
      title: "Home",
      icon: (
        // <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ""
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />

        
      ),
      href: "/ChangeTheEducation",
    },
    {
      title: "Components",
      icon: (
        // <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ""
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        // <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />

        ''
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        // <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ""
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        // <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" /> 
        "dfdf"
      ),
      href: "#",
    },
  ];
  return (
    <div className="bg-transparent absolute z-1000 flex top-0 w-full py-2 items-center ">
      <svg width="100" height="72" className='' viewBox="70 40 871 635" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="356" y="212" width="14" height="18" fill="#FF6A00" />
        <rect x="321" y="65" width="14" height="18" fill="#FF6A00" />
        <rect x="370" y="240" width="14" height="18" fill="#FF6A00" />
        <rect x="363" y="187" width="14" height="18" fill="#FF6A00" />
        <rect x="349" y="169" width="14" height="18" fill="#FF6A00" />
        <rect x="331" y="146" width="14" height="18" fill="#FF6A00" />
        <rect x="342" y="105" width="14" height="18" fill="#FF6A00" />
        <rect x="328" y="89" width="14" height="18" fill="#FF6A00" />
        <rect x="324" y="119" width="14" height="18" fill="#FF6A00" />
        <rect x="210" y="212" width="14" height="18" fill="#FF6A00" />
        <rect x="663" y="517" width="14" height="18" fill="#FF6A00" />
        <rect x="287" y="191" width="14" height="18" fill="#FF6A00" />
        <rect x="563" y="517" width="14" height="18" fill="#FF6A00" />
        <rect x="330" y="579" width="14" height="18" fill="#FF6A00" />
        <rect x="142" y="561" width="14" height="18" fill="#FF6A00" />
        <rect x="701" y="581" width="14" height="18" fill="#FF6A00" />
        <rect x="827" y="517" width="14" height="18" fill="#FF6A00" />
        <rect x="806" y="481" width="14" height="18" fill="#FF6A00" />
        <rect x="387" y="517" width="14" height="18" fill="#FF6A00" />
        <rect x="439" y="579" width="14" height="18" fill="#FF6A00" />
        <rect x="349" y="286" width="14" height="18" fill="#FF6A00" />
        <rect x="416" y="327" width="14" height="18" fill="#FF6A00" />
        <rect x="577" y="579" width="14" height="18" fill="#FF6A00" />
        <rect x="621" y="354" width="14" height="18" fill="#FF6A00" />
        <rect x="762" y="563" width="14" height="18" fill="#FF6A00" />
        <rect x="739" y="517" width="14" height="18" fill="#FF6A00" />
        <rect x="453" y="508" width="14" height="18" fill="#FF6A00" />
        <rect x="121" y="460" width="14" height="18" fill="#FF6A00" />
        <rect x="192" y="442" width="14" height="18" fill="#FF6A00" />
        <rect x="550" y="474" width="14" height="18" fill="#FF6A00" />
        <rect x="324" y="494" width="14" height="4" fill="#FF6A00" />
        <rect x="189" y="424" width="14" height="18" fill="#FF6A00" />
        <rect x="609" y="528" width="14" height="18" fill="#FF6A00" />
        <rect x="787" y="536" width="14" height="18" fill="#FF6A00" />
        <rect x="897" y="597" width="14" height="18" fill="#FF6A00" />
        <rect x="834" y="563" width="14" height="18" fill="#FF6A00" />
        <rect x="91" y="581" width="14" height="18" fill="#FF6A00" />
        <rect x="192" y="581" width="14" height="18" fill="#FF6A00" />
        <rect x="275" y="561" width="14" height="18" fill="#FF6A00" />
        <rect x="355" y="561" width="14" height="18" fill="#FF6A00" />
        <rect x="188" y="527" width="14" height="18" fill="#FF6A00" />
        <rect x="224" y="518" width="14" height="18" fill="#FF6A00" />
        <rect x="247" y="545" width="14" height="18" fill="#FF6A00" />
        <rect x="128" y="536" width="14" height="18" fill="#FF6A00" />
        <rect x="167" y="313" width="14" height="18" fill="#FF6A00" />
        <rect x="132" y="424" width="14" height="18" fill="#FF6A00" />
        <rect x="139" y="488" width="14" height="18" fill="#FF6A00" />
        <rect x="241" y="485" width="14" height="18" fill="#FF6A00" />
        <rect x="462" y="543" width="14" height="18" fill="#FF6A00" />
        <rect x="408" y="527" width="14" height="18" fill="#FF6A00" />
        <rect x="355" y="527" width="14" height="18" fill="#FF6A00" />
        <rect x="318" y="543" width="14" height="18" fill="#FF6A00" />
        <rect x="366" y="503" width="14" height="18" fill="#FF6A00" />
        <rect x="281" y="433" width="14" height="18" fill="#FF6A00" />
        <rect x="299" y="472" width="14" height="18" fill="#FF6A00" />
        <rect x="283" y="516" width="14" height="18" fill="#FF6A00" />
        <rect x="261" y="507" width="14" height="18" fill="#FF6A00" />
        <rect x="430" y="490" width="14" height="18" fill="#FF6A00" />
        <rect x="338" y="456" width="14" height="18" fill="#FF6A00" />
        <rect x="373" y="476" width="14" height="18" fill="#FF6A00" />
        <rect x="195" y="499" width="14" height="18" fill="#FF6A00" />
        <rect x="91" y="490" width="14" height="18" fill="#FF6A00" />
        <rect x="40" y="597" width="14" height="18" fill="#FF6A00" />
        <rect x="206" y="563" width="14" height="18" fill="#FF6A00" />
        <rect x="649" y="563" width="14" height="18" fill="#FF6A00" />
        <rect x="507" y="545" width="14" height="18" fill="#FF6A00" />
        <rect x="635" y="460" width="14" height="18" fill="#FF6A00" />
        <rect x="556" y="388" width="14" height="18" fill="#FF6A00" />
        <rect x="231" y="232" width="14" height="18" fill="#FF6A00" />
        <rect x="98" y="291" width="14" height="18" fill="#FF6A00" />
        <rect x="514" y="451" width="14" height="18" fill="#FF6A00" />
        <rect x="337" y="415" width="14" height="18" fill="#FF6A00" />
        <rect x="153" y="424" width="14" height="18" fill="#FF6A00" />
        <rect x="146" y="345" width="14" height="18" fill="#FF6A00" />
        <rect x="160" y="284" width="14" height="18" fill="#FF6A00" />
        <rect x="128" y="367" width="14" height="18" fill="#FF6A00" />
        <rect x="248" y="442" width="14" height="18" fill="#FF6A00" />
        <rect x="394" y="442" width="14" height="18" fill="#FF6A00" />
        <rect x="363" y="406" width="14" height="18" fill="#FF6A00" />
        <rect x="262" y="374" width="14" height="18" fill="#FF6A00" />
        <rect x="234" y="304" width="14" height="18" fill="#FF6A00" />
        <rect x="195" y="291" width="14" height="18" fill="#FF6A00" />
        <rect x="153" y="397" width="14" height="18" fill="#FF6A00" />
        <rect x="280" y="397" width="14" height="18" fill="#FF6A00" />
        <rect x="202" y="397" width="14" height="18" fill="#FF6A00" />
        <rect x="220" y="345" width="14" height="18" fill="#FF6A00" />
        <rect x="182" y="327" width="14" height="18" fill="#FF6A00" />
        <rect x="701" y="385" width="14" height="18" fill="#FF6A00" />
        <rect x="694" y="415" width="14" height="18" fill="#FF6A00" />
        <rect x="302" y="336" width="14" height="18" fill="#FF6A00" />
        < rect x="753" y="424" width="14" height="18" fill="#FF6A00" />
        <rect x="409" y="410" width="14" height="18" fill="#FF6A00" />
        <rect x="467" y="424" width="14" height="18" fill="#FF6A00" />
        <rect x="500" y="397" width="14" height="18" fill="#FF6A00" />
        <rect x="516" y="419" width="14" height="18" fill="#FF6A00" />
        <rect x="602" y="485" width="14" height="18" fill="#FF6A00" />
        <rect x="621" y="442" width="14" height="18" fill="#FF6A00" />
        <rect x="460" y="442" width="14" height="18" fill="#FF6A00" />
        <rect x="591" y="410" width="14" height="18" fill="#FF6A00" />
        <rect x="708" y="494" width="14" height="18" fill="#FF6A00" />
        <rect x="776" y="485" width="14" height="18" fill="#FF6A00" />
        <rect x="764.375" y="468.219" width="14" height="18" transform="rotate(123.947 764.375 468.219)" fill="#FF6A00" />
        <rect x="728" y="403" width="14" height="18" fill="#FF6A00" />
        <rect x="694" y="445" width="14" height="18" fill="#FF6A00" />
        <rect x="670" y="485" width="14" height="18" fill="#FF6A00" />
        <rect x="642" y="406" width="14" height="18" fill="#FF6A00" />
        <rect x="267" y="171" width="14" height="18" fill="#FF6A00" />
        <rect x="188" y="263" width="14" height="18" fill="#FF6A00" />
        <rect x="274" y="273" width="14" height="18" fill="#FF6A00" />
        <rect x="220" y="283" width="14" height="18" fill="#FF6A00" />
        <rect x="213" y="318" width="14" height="18" fill="#FF6A00" />
        <rect x="238" y="327" width="14" height="18" fill="#FF6A00" />
        <rect x="294" y="309" width="14" height="18" fill="#FF6A00" />
        <rect x="266" y="302" width="14" height="18" fill="#FF6A00" />
        <rect x="324" y="309" width="14" height="18" fill="#FF6A00" />
        <rect x="303" y="285" width="14" height="18" fill="#FF6A00" />
        <rect x="182" y="212" width="14" height="18" fill="#FF6A00" />
        <rect x="175" y="239" width="14" height="18" fill="#FF6A00" />
        <rect x="224" y="263" width="14" height="18" fill="#FF6A00" />
        <rect x="462" y="380" width="14" height="18" fill="#FF6A00" />
        <rect x="507" y="354" width="14" height="18" fill="#FF6A00" />
        <rect x="318" y="397" width="14" height="18" fill="#FF6A00" />
        <rect x="345" y="406" width="14" height="18" fill="#FF6A00" />
        <rect x="331" y="362" width="14" height="18" fill="#FF6A00" />
        <rect x="437" y="433" width="14" height="18" fill="#FF6A00" />
        <rect x="514" y="498" width="14" height="18" fill="#FF6A00" />
        <rect x="481" y="460" width="14" height="18" fill="#FF6A00" />
        <rect x="174" y="476" width="14" height="18" fill="#FF6A00" />
        <rect x="262" y="472" width="14" height="18" fill="#FF6A00" />
        <rect x="370" y="463" width="14" height="18" fill="#FF6A00" />
        <rect x="245" y="406" width="14" height="18" fill="#FF6A00" />
        <rect x="182" y="374" width="14" height="18" fill="#FF6A00" />
        <rect x="234" y="363" width="14" height="18" fill="#FF6A00" />
        <rect x="355" y="327" width="14" height="18" fill="#FF6A00" />
        <rect x="369" y="358" width="14" height="18" fill="#FF6A00" />
        <rect x="408" y="385" width="14" height="18" fill="#FF6A00" />
        <rect x="430" y="433" width="14" height="18" fill="#FF6A00" />
        <rect x="569" y="442" width="14" height="18" fill="#FF6A00" />
        <rect x="446" y="460" width="14" height="18" fill="#FF6A00" />
        <rect x="303" y="451" width="14" height="18" fill="#FF6A00" />
        <rect x="283" y="353" width="14" height="18" fill="#FF6A00" />
        <rect x="255" y="266" width="14" height="18" fill="#FF6A00" />
        <rect x="209" y="241" width="14" height="18" fill="#FF6A00" />
        <rect x="314" y="257" width="14" height="18" fill="#FF6A00" />
        <rect x="289" y="241" width="14" height="18" fill="#FF6A00" />
        <rect x="335" y="239" width="14" height="18" fill="#FF6A00" />
        <rect x="324.781" y="363" width="14" height="18" transform="rotate(49.9595 324.781 363)" fill="#FF6A00" />
        <rect x="330" y="212" width="14" height="18" fill="#FF6A00" />
        <rect x="234" y="208" width="14" height="18" fill="#FF6A00" />
        <rect x="259" y="237" width="14" height="18" fill="#FF6A00" />
        <rect x="297" y="171" width="14" height="18" fill="#FF6A00" />
        <rect x="327" y="190" width="14" height="18" fill="#FF6A00" />
        <rect x="304" y="223" width="14" height="18" fill="#FF6A00" />
        <rect x="259" y="205" width="14" height="18" fill="#FF6A00" />
        <rect x="105" y="200" width="14" height="18" fill="#FF6A00" />
        <rect x="224" y="182" width="14" height="18" fill="#FF6A00" />
        <rect x="195" y="188" width="14" height="18" fill="#FF6A00" />
        <rect x="167" y="170" width="14" height="18" fill="#FF6A00" />
        <rect x="181" y="143" width="14" height="18" fill="#FF6A00" />
        <rect x="313" y="160" width="14" height="18" fill="#FF6A00" />
        <rect x="270" y="133" width="14" height="18" fill="#FF6A00" />
        <rect x="295" y="139" width="14" height="18" fill="#FF6A00" />
        <rect x="303" y="111" width="14" height="18" fill="#FF6A00" />
        <rect x="288" y="102" width="14" height="18" fill="#FF6A00" />
        <rect x="302" y="83" width="14" height="18" fill="#FF6A00" />
        <rect x="245" y="119" width="14" height="18" fill="#FF6A00" />
        <rect x="231" y="92" width="14" height="18" fill="#FF6A00" />
        <rect x="259" y="40" width="14" height="18" fill="#FF6A00" />
        <rect x="189" y="114" width="14" height="18" fill="#FF6A00" />
        <rect x="202" y="137" width="14" height="18" fill="#FF6A00" />
        <rect x="203" y="92" width="14" height="18" fill="#FF6A00" />
        <rect x="241" y="65" width="14" height="18" fill="#FF6A00" />
        <rect x="227" y="111" width="14" height="18" fill="#FF6A00" />
        <rect x="252" y="83" width="14" height="18" fill="#FF6A00" />
        <rect x="210" y="119" width="14" height="18" fill="#FF6A00" />
        <rect x="284" y="49" width="14" height="18" fill="#FF6A00" />
        <rect x="195" y="160" width="14" height="18" fill="#FF6A00" />
        <rect x="217" y="74" width="14" height="18" fill="#FF6A00" />
        <rect x="266" y="65" width="14" height="18" fill="#FF6A00" />
        <rect x="266" y="101" width="14" height="18" fill="#FF6A00" />
        <rect x="252" y="138" width="14" height="18" fill="#FF6A00" />
        <rect x="273" y="114" width="14" height="18" fill="#FF6A00" />
        <rect x="245" y="178" width="14" height="18" fill="#FF6A00" />
        <rect x="227" y="137" width="14" height="18" fill="#FF6A00" />
        <rect x="238" y="157" width="14" height="18" fill="#FF6A00" />
        <rect x="281" y="74" width="14" height="18" fill="#FF6A00" />
      </svg>

        <div className="lino">
          {/* <Link href='/auth/sign-up' > other people Name </Link>
          <Link href='/auth/sign-out' > other people Name </Link> */}
          <ul>
            <li>Jambudweep</li>
          </ul>
        </div>
 
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />

          {/* <Link href='/auth/sign-in' > other people Name </Link> */}
      </div>
      )
}

      export default LandingPageNavbar