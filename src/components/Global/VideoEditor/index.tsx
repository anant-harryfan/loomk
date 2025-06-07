"use client";

import { saveHtmlc } from "@/app/action/workspace";
import { Button } from "@/components/ui/button";
// import { createHtmlc } from "@/app/action/workspace";
import React, { useState, useRef, useEffect, Children } from "react";


type Props = {
    workspaceId: string
};
// interface SaveHtmlcResponse {
//     status: number;
//     data: {
//         htmlcId: string;  // Assuming ID is a string  
//         htmlc: any;       // Replace 'any' with actual HTML content type  
//     };
// }  
const VideoEditor = ({ workspaceId }: Props) => {

    let hodehtm = ``
    let index = 0;
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollLeft = container.scrollLeft;
        const scrollTop = container.scrollTop;

        const relativeX = e.clientX - rect.left + scrollLeft;
        const relativeY = e.clientY - rect.top + scrollTop;

        // Check if clicking on a div to select it (left-click)  


        // Right-click to draw  
        if (e.button === 2) {
            e.preventDefault();
            setIsDrawing(true);
            setStartPos({ x: relativeX, y: relativeY });
            setMousePosition({ x: relativeX, y: relativeY });
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container || !isDrawing) return;

        const rect = container.getBoundingClientRect();
        const scrollLeft = container.scrollLeft;
        const scrollTop = container.scrollTop;

        const currentX = e.clientX - rect.left + scrollLeft;
        const currentY = e.clientY - rect.top + scrollTop;

        setMousePosition({ x: currentX, y: currentY });
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDrawing) return;

        const container = containerRef.current;

        const rect = container.getBoundingClientRect();
        const scrollLeft = container.scrollLeft;
        const scrollTop = container.scrollTop;

        const startX = startPos.x;
        const startY = startPos.y;
        const endX = e.clientX - rect.left + scrollLeft;
        const endY = e.clientY - rect.top + scrollTop;

        const width = endX - startX;
        const height = endY - startY;

        if (Math.abs(width) > 10 && Math.abs(height) > 10) {

            index = index + 1
            const style = document.createElement("div")
            style.style.cssText = `  position:absolute; width: ${Math.abs(width)}px; height:${Math.abs(height)}px; left:${Math.min(startX, endX)}px; top:${Math.min(startY, endY)}px;    resize: both;`
            style.classList = "yehoga resize absolute  backdrop-blur-3xl saturate-100 bg-[#35352d57]  shadow-xl shadow-black text-white z-10  overflow-auto no-scrollbar scroll-m-0 "
            style.contentEditable = "true";
            let hode = document.getElementsByClassName('ddo')[0]
            hode.appendChild(style)
            style.draggable = true
            style.onmousemove = (e) => { if (e.buttons == 3) { style.remove() } }
            style.onmousedown = (e) => { if (e.buttons == 3) { style.remove() } }

        }

        setIsDrawing(false);

    };

    // let code = `${document.getElementById('mehudisco').innerHTML}`
    // console.log(code)

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let tode = document.getElementById('hahaha').innerHTML;

        if (tode) {
    saveHtmlc(workspaceId, `${tode}`)



        }
    };

    function dragElement(elements: HTMLCollectionOf<Element> | HTMLElement): void {
        // Helper function to apply drag functionality to a single element
        const applyDrag = (elmnt: HTMLElement): void => {


            let relativeX = 0;
            let relativeY = 0;
            let clickOffsetX: number = 0;
            let clickOffsetY: number = 0;
            elmnt.style.position = "absolute";
            // elmnt.draggable = true;


            const dragiMouseDown = (e: any): void => {

                const rect = containerRef.current?.getBoundingClientRect();
                relativeX = e.clientX - rect.left;
                relativeY = e.clientY - rect.top;
                clickOffsetX = relativeX - elmnt.offsetLeft;
                clickOffsetY = relativeY - elmnt.offsetTop;
                elmnt.style.opacity = "0.01";
            };

            const elementDrag = (e: DragEvent): void => {
                const rect = containerRef.current?.getBoundingClientRect();
                relativeX = e.clientX - rect.left;
                relativeY = e.clientY - rect.top;

                // const newLeft = startLeft - pos1;
                // const newTop = startTop - pos2;
                elmnt.style.left = `${relativeX - clickOffsetX}px`;
                elmnt.style.top = `${relativeY - clickOffsetY}px`;

                elmnt.style.opacity = "1";
            };

            elmnt.addEventListener('dragstart', dragiMouseDown);
            elmnt.addEventListener('dragend', elementDrag);
        };
        // Check if input is a single HTMLElement or a collection
        if (elements instanceof HTMLElement) {
            applyDrag(elements);
        } else {
            // Iterate over the HTMLCollection and apply drag to each element
            Array.from(elements).forEach((elmnt) => {
                if (elmnt instanceof HTMLElement) {
                    applyDrag(elmnt);
                }
            });
        }
    }

    dragElement(document.getElementsByClassName("yehoga"));
    // if(localStorage.getItem("dunno")){
    //   document.get.innerHTML = localStorage.getItem("dunno")
    // }
    const marku = {__html: `${localStorage.getItem('dunno') }`}
    return (
<div>
    {/* {bhidu.data.htmlc} */}
        <div
            ref={containerRef}
            onMouseDown={handleMouseDown}

            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onContextMenu={handleContextMenu}
            id="hahaha"
            // draggable={true}
           
            className="bg-amber-900 bg-imag h-svw ddo  w-svw relative overflow-y-scroll"
        >




            {isDrawing && (
                <div
                    className="absolute bg-[#35352d57]  bg-opacity-50 shadow-2xl shadow-black text-white z-[1000000000000000000000]"
                    style={{
                        left: Math.min(startPos.x, mousePosition.x),
                        top: Math.min(startPos.y, mousePosition.y),
                        width: Math.abs(mousePosition.x - startPos.x),
                        height: Math.abs(mousePosition.y - startPos.y),
                    }}
                />
            )}

        
        </div>
        </div>
    );

};

export default VideoEditor;