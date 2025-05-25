import React from 'react'
import Loader from '../loader'

type Props = {
    User: {
        firstname: string | null
        lastname: string | null
        image: string | null
    } | null
    id: string
    processing: boolean
    createdAt: Date
    title: string | null
    source: string
    workspaceId: string
}

const VideoCard = (props: Props) => {
  return (
    <Loader state={false}>
        <div className="overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
            <div className='absolute top-3 right-3 z-50 flex flex-col gap-y-3'></div>
        </div>
    </Loader>
  )
}

export default VideoCard