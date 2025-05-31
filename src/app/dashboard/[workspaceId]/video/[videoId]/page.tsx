import { getUserProfile, getVideoComments } from '@/app/action/user'
import { getPreviewVideo } from '@/app/action/workspace'
import VideoPreview from '@/components/global/videos/preview'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
    params: {videoId: string}
}

const Videos = async ({params:{videoId}}: Props) => {
    const query = new QueryClient()
    await query.prefetchQuery({
            queryKey: ['preview-video'],
            queryFn: ()=>getPreviewVideo(videoId)
    })
    await query.prefetchQuery({
            queryKey: ['user-profile'],
            queryFn: getUserProfile
    })
    await query.prefetchQuery({
            queryKey: ['video-comments'],
            queryFn: ()=>getVideoComments(videoId)
    })
  return (
    <HydrationBoundary state={dehydrate(query)} >


<VideoPreview  videoId={videoId}/>
 
    </HydrationBoundary>
  )
}

export default Videos