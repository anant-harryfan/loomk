"use client"
import { getAllChatam } from '@/app/dashboard/action/chat'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import ChannelInfo from './channel-info'
import Chatams from '../chatam'

type Props = {
    channelId: string
}

const Channel = async ({channelId}: Props) => {
<div>
    <header>{channelId}</header>
    <Chatams channelId={channelId}/>
</div>
}

export default Channel