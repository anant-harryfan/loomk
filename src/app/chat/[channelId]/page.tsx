
import { getAllChatam, getChannels } from '@/app/action/chat'
import ChannelPreview from '@/components/global/chatapp/channelPreview'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
    params: { channelId: string }
}

const HomePage = async ({ params: { channelId } }: Props) => {

    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ['user-channel'],
        queryFn: () => getChannels,
    })
    await query.prefetchQuery({
        queryKey: ['channel-chatam'],
        queryFn: () => getAllChatam(channelId),
    })
    // console.log(channelId, "THIS IS CHANNEL ID")

    return (
        <div >
            <HydrationBoundary state={dehydrate(query)}>
                {/* {channelId} */}
                <ChannelPreview channelId={channelId} />
                {/* <ChannelInfo channelId={channelId} /> */}
                {/* <Chatams channelId={channelId} /> */}
            </HydrationBoundary>

        </div>
    )
}

export default HomePage