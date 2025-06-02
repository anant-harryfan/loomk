"use client"
import { getChannels } from '@/app/action/chat';
import { useQueryData } from '@/hooks/useQueryData';
import { ChannelChatams, UserChannel } from '@/types/index.type';
import React from 'react'

type Props = {
    userId: string
}

const AllChannelSideBar = () => {
    const { data, isFetched } = useQueryData(["user-channels"], getChannels);
    const {data: channels} = data as UserChannel
  return (
    <div>
        {channels.map((channel)=>(
          <div>
            {channel.name}
          </div>
        ))}
    </div>
  )
}

export default AllChannelSideBar