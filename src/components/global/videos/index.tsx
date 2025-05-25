"use client"
import { getAllUserVideos } from '@/app/action/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import { cn } from '@/lib/utils'
import { VideosProps } from '@/types/index.type'
import React from 'react'
import VideoCard from './video-card'

type Props = {
    // folderId?: string
    videoKey: string
    workspaceId: string
}
const video = {
    
        User: {
            firstname: "anant",
            lastname: "string | null",
            image: "string | null"
        }, 
        id:"string",
        processing: false,
        createdAt: new Date('2023-04-15T10:30:00Z'),
        title: "string|null",
        source: "https://example.com/videos/product-demo.mp4"
    
    }
const Videos = ({videoKey, workspaceId}: Props) => {
    const {data: videoData} = useQueryData([videoKey], ()=> getAllUserVideos(workspaceId))
    const {status: videoStatus,  data: videos} = videoData as VideosProps
  return (
    <div className="flex flex-col gap-4 mt-4">
        <div className="flex item-center justify-between">
            <div className="flex item-center gap-4">
            <section className={cn(videoStatus !== 200 ? 'p-5' 
                : 'grid gap-10 grid-tempalate-cols'
                
                )}>
                    {/* {videoStatus === 200? videos.map((video)=><VideoCard/>) : <p className='text-[#bdbdbd] '>Video banale phele</p>} */}
                      <VideoCard workspaceId={workspaceId} {...video} />
                </section>
            </div>
        </div>
    </div>
  )
}

export default Videos