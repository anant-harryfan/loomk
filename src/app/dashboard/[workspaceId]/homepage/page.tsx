"use client"
import { getAllVideo } from '@/app/action/user';
import CreateChannel from '@/components/global/chatapp/create-channels'
import VideoCard from '@/components/global/videos/video-card';
import { DraggableCardBody, DraggableCardContainer } from '@/components/ui/draggable-card';
import { useQueryData } from '@/hooks/useQueryData';
import { cn } from '@/lib/utils';
import React from 'react'

type Props = {}
export type VideosProps = {
  status: number;
  data: {
    id: string;
    processing: boolean;
    createdAt: Date;
    title: string | null;
    source: string|null;
    description: string|null;
  }[];
};
const MujhChat = (props: Props) => {
    const { data: videoData } =  useQueryData(['all_Video'], () =>
      getAllVideo()
    )
    const { status: videosStatus, data: videos } = videoData as VideosProps;
    console.log("vidoe data", videos)
    

  return (
    <div className='w-full  bg-red-700'>
      <DraggableCardContainer className="relative flex  items-center justify-center ">
      <section
        className={cn(
          videosStatus !== 200 ? "p-2" : " bg-yellow-500 grid grid-template-cols gap-10"
        )}
      >
        {videosStatus == 200 ? (
          videos.map((video)=>(
            <DraggableCardBody className='' >
            <div key={video.id}>
              {/* <img src={video.source} alt="video img" /> */}
              <h1>{video.title}</h1>
              <p>{video.description}</p>
            </div>
            </DraggableCardBody>
          )
        )
      ) : (
        <p className="text-[#575656]">aayega thodi deer me ruk</p>
      )} 
      </section>
      </DraggableCardContainer>
        

    </div>
  )
}

export default MujhChat