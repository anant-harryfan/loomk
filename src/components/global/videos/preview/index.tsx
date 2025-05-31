"use client";
import { getPreviewVideo } from "@/app/action/workspace";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useQueryData } from "@/hooks/useQueryData";
import { VideoProps } from "@/types/index.type";
import { useRouter } from "next/navigation";
import React from "react";
import "@/components/global/videos/preview/preview.css";
import CopyLink from "../video-copy-link";
import RichLink from "../rich-link";
import { truncateString } from "@/lib/utils";
import { Download } from "lucide-react";
import TabMenu from "../../tabs";
import Bots from "../../bots-";
import Activites from "../../activities/page";

type Props = {
  videoId: string;
};

const VideoPreview = ({ videoId }: Props) => {
  const router = useRouter();
  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId)
  );
  const { data: video, status, author } = data as VideoProps;
  if (status !== 200) {
    router.push("/");
  }

  return (
  
      <div className="h-screen ">
        <ResizablePanelGroup className="h-screen" direction="horizontal">
          <ResizablePanel>
            <div className=" flex flex-col overflow-y-auto p-3 videoDesc h-full">
              <div className="flex flex-col gap-y-16">
                <div className="flex justify-end items-center gap-x-3">
                  <CopyLink
                    variant="outline"
                    className="rounded-full bg-transparent px-10"
                    videoId={videoId}
                  />
                  <RichLink
                    description={truncateString(
                      video.description as string,
                      150
                    )}
                    id={videoId}
                    source={video.source}
                    title={video.title as string}

                    />
                    <Download />
                </div>
              </div>
              {/* <h1 className=" font-bold text-4xl">{video.title}</h1> */}

              {author?'':(<p className="p-1">{video.description}</p>)}
<div className="mt-10">
              <TabMenu
                triggers={["Code", "Transcript", "Activity"]}
                defaultValue="Code"

              >
                <Bots videoId="" plan="PRO" trial={false} key={videoId}/>

              </TabMenu>
              </div>
            </div>
            </ResizablePanel>
            <ResizableHandle className="bg-r" />
            <ResizablePanel defaultSize={80}>
            <div className="flex items-center justify-center m-0 p-0  h-[100%] bg-black">
              <video
                className=" object-contain h-[100%] aspect-video opacity-50  "
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
                controls
              >
                <source
                  src={`${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}#1`}
                />
              </video>
            </div>
          </ResizablePanel>
        <Activites author={video.User?.firstname as string} videoId={videoId} />

                    
        </ResizablePanelGroup>
        
      
      </div>

 
  );
};

export default VideoPreview;

/*
"use client"
import { getVideoInfo } from '@/app/action/workspace'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Skeleton } from '@/components/ui/skeleton'
import { useQueryData } from '@/hooks/useQueryData'
import { VideoInfo } from '@/types/index.type'
import React from 'react'

type Props = {
    videoId: string
}

const VideoPreview = ({videoId}: Props) => {
    const { data: videoData } = useQueryData(["preview-video"], ()=>getVideoInfo(videoId))
    // const{data: videos,  status} = videoData as VideoInfo
  return (
    <div>
          { {status !== 200 ? <Skeleton className="w-full h-[240px] rounded-xl" /> : (
              

              
        ) } } a
        </div >
      )
    }

export default VideoPreview */
