
import { getAllChatam } from "@/app/action/chat";
import { useQueryData } from "@/hooks/useQueryData";
import { ChannelChatams } from "@/types/index.type";
import React, { IframeHTMLAttributes } from "react";

type Props = {
  channelId: string
};

const Chatams = ({ channelId }: Props) => {
    const { data } = useQueryData([`channel-chatam`], () =>
    getAllChatam(channelId)
  );
  // console.log(data,'chatam ka data')
  const { data: chatams } = data as ChannelChatams;
  console.log(chatams, " ye hai chattams")


  return (
    <div className=" text-amber-400 flex  max-w-full max-h-screen overflow-y-scroll">
      {chatams.map((chatam, key) => (
        <div key={key} className="">
          <iframe srcDoc={` <style>body{zoom: 90%; background-color: #171717; color:white;}</style> ${chatam.chatam}`} className="w-full size-max hover:opacity-80  bg-black resize"
          >{`${chatam.chatam}`} 
        </iframe>
       
        </div>
      ))}
    </div>
  );
};

export default Chatams;
