import { getAllChatam } from '@/app/action/chat'
import { QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
    channelId: string
}

const Channel = async ({channelId}: Props) => {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: ['channel-chatam'],
    queryFn: () => getAllChatam(channelId),
  })
  return (
    <div>


    </div>
  )
}

export default Channel