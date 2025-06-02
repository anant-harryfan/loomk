"use client"
import React from 'react'
import ChannelInfo from '../channels/channel-info'
import Chatams from '../chatam'
import InputDiv from './inputDiv'
// import Chatams from '../chatam'

type Props = {
    channelId: string
}

const ChannelPreview = ({channelId}: Props) => {
  return (
    <div className=''>
      {channelId}
      <ChannelInfo channelId={channelId}/>
          <Chatams channelId={channelId}/>
          <InputDiv channelId={channelId}/>

    </div>
  )
}

export default ChannelPreview