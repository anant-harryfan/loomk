"use client";
import React, { Children, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { SignInButton, useUser } from "@clerk/nextjs";
import CreateReverch from "@/components/Global/research/sidebar";
import FourDigitInput from "./submit/page";

const page = () => {
  let [codu, setcodu] = useState(``);
    const [year, setYear] = useState<string>(''); // State to hold the 4-digit year

    const handleYearChange = (newYear: string) => {
        setYear(newYear);
        if (newYear) {
            console.log('Valid 4-digit year entered:', newYear);
        } else {
            console.log('Invalid input: Please enter exactly 4 digits.');
        }
    };

  return (
    <div className="w-screen h-screen">
      <ResizablePanelGroup
        className="w-screen h-screen bg-amber-500"
        direction="horizontal"
      >
        <ResizablePanel>
          <div
            id="code"
            className="bg-black overflow-y-scroll whitespace-break-spaces  text-white h-screen cursor-none "
            onBlur={() =>
              (document.getElementById("prev").innerHTML =
                document.getElementById("code").innerText)
            }
            contentEditable={true}
            onInput={() => {
              document.getElementById("prev").innerHTML =
                document.getElementById("code").innerText;
              localStorage.setItem(
                "code",
                document.getElementById("code").innerText
              );
              setcodu(`${document.getElementById("code").innerText}`);
            }}
          >
            {localStorage.getItem("code")}
          </div>
        </ResizablePanel>
        <ResizableHandle className="w-2 text-cyan-700 bg-cyan-700  " />

        <ResizablePanel>
          <div
            className="p-10 h-screen bg-black  overflow-y-scroll  wrap-break-word"
            id="prev"
            onInput={() =>
              (document.getElementById("code").innerText =
                document.getElementById("prev").innerHTML)
            }
            contentEditable={true}
          ></div>
        </ResizablePanel>
        <ResizableHandle className=" " />
        <ResizablePanel defaultSize={0}>
          <div className="p-10 h-screen bg-black  overflow-y-scroll  wrap-break-word">
            create your html in a ide(visual studio), copy paste the code here.
            Me yaha if else nahi laga raha to kuch change nahi hoga, prev me
            thoda alag dikh raha ho to chhodho me bas code uthaunga. baki
                      javascript nahi chalega.<br /> <br /> or same code hoga to vo local storage pe bhi store nahi hoga or backend bhi nahi jaega, chahe button kuch bhi bole. localstorage me save karne ke liye kuch input dalo vo contenteditable div me.  <br /> <br />
                      <FourDigitInput value={year} onChange={handleYearChange} />
                      <br /> <br /> <br />
            {useUser().isSignedIn ? (
              year ? (
                codu.length > 10000 ? (
                  <div>
                    <CreateReverch codu={codu} date={year} />
                  </div>
                ) : (
                  <div className="bg-cyan-800 p-5 rounded-4xl ">
                    {" "}
                    abhika if lagaya hai ki 10,000 se zayada letters hone
                    chahiye :{" "}
                    ya phir wapis pura ctrl c karle ctrl v karo. 
                  </div>
                )
              ) : (
                <div className="bg-cyan-800 p-5 rounded-4xl ">
                  {" "}
                  Date dal YEAR.{" "}
                </div>
              )
            ) : (
              <div className="ml-20">
                {" "}
                <div className="bg-cyan-500 w-20 p-5 content-center rounded-2xl">
                  <SignInButton />
                </div>{" "}
                <br /> sorry for clerk, jo mujhe banana tha vo ban nahi raha,
                web dev ko scratch se hi karna hoga tabh hi kuch ho paega varna
                dikkat hai
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default page;
