"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { redirect } from "next/navigation";

import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";

export default function HomePage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="no-scrollbar">
      <Carousel
        // plugins={[plugin.current]}
        className="resize-y"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="border-none">
          {Array.from({ length: 50 }).map((_, index) => (
            <CarouselItem className="border-none rounded-none " key={index}>
              <div className=" ">
                <Card className="rounded-none border-none">
                  <CardContent className="flex h-[100vh] items-center border-none justify-center ">
                    {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>




      <div className="flex flex-row  p-3    bg-[#000000]">
        <div className="grid bg-black overflow-hidden size-230 resize mt-10 rounded-xl   gap-10  ml-10 columns-4 grid-cols-2">
          <div className="group  size-100 h-70 flex flex-col items-start justify-center rounded-2xl bg-gradient-to-br hover:shadow-md transition-all duration-300   group-hover:opacity-100 hover:to-cyan-900 hover:from-black  gap-y-4 border-b-gray-400 border-1 p-10 " onClick={()=>{redirect('/tamilNadu')}}>
            <h1 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-amber-500 ">
              Tamil Nadu
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accus
            </p>
          </div>
          <div className="group  size-100 h-70 flex flex-col items-start justify-center rounded-2xl bg-gradient-to-br hover:shadow-md transition-all duration-300   group-hover:opacity-100 hover:to-cyan-900 hover:from-black  gap-y-4 border-b-gray-400 border-1 p-10 ">
            <h1 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-amber-500 ">
              अरुणाचल
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accus
            </p>
          </div>
          <div className="group  size-100 h-70 flex flex-col items-start justify-center rounded-2xl bg-gradient-to-br hover:shadow-md transition-all duration-300   group-hover:opacity-100 hover:to-cyan-900 hover:from-black  gap-y-4 border-b-gray-400 border-1 p-10 ">
            <h1 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-amber-500 ">
              Tamil Nadu
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accus
            </p>
          </div>
        </div>

        <div className="bg-transparent gap-0 grid-col-1 grid mt-10 ">
          <div className="group mt-4 size-90 ml-4  h-50 flex flex-col  items-start justify-center rounded-2xl bg-gradient-to-br hover:shadow-md transition-all duration-300  mb-2  group-hover:opacity-100 bg-black gap-y-4 border-b-gray-400 border-1 p-10 ">
            <h1 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-amber-500 ">
              Tamil Nadu
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accus
            </p>
          
          </div>
          <div className="group  size-90 ml-6  h-100 flex flex-col  items-start justify-center rounded-2xl bg-gradient-to-br hover:shadow-md transition-all duration-300  mb-2  group-hover:opacity-100 bg-black gap-y-4 border-b-gray-400 border-1 p-10 ">
            <h1 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-amber-500 ">
              अरुणाचल 
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accus
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accus
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accus
            </p>
          </div>
          <div className="group  size-90 ml-6  h-70 flex flex-col  items-start justify-center rounded-2xl bg-gradient-to-br hover:shadow-md transition-all duration-300  mb-2  group-hover:opacity-100 bg-black gap-y-4 border-b-gray-400 border-1 p-10 ">
            <h1 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-amber-500 ">
              Tamil Nadu
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accus
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accus
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accus
            </p>
          </div>

        </div>
      </div>

      <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip bg-black">
        <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
          
        </p>
        
          <DraggableCardBody className="">
            <img
              
              className="pointer-events-none relative z-10 h-80 w-80 object-cover"
            />
            <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
              
            </h3>
          </DraggableCardBody>
 
      </DraggableCardContainer>
    </div>
  );
}
