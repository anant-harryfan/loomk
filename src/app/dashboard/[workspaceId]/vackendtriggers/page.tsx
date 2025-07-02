'use client'
import { getNotifications } from '@/app/dashboard/action/user'
import { DraggableCardBody, DraggableCardContainer } from '@/components/ui/draggable-card'
import { useQueryData } from '@/hooks/useQueryData'
import {  NotificationT } from '@/types/index.type'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import React from 'react'

type Props = {}

const Notifications = (props: Props) => {
    const { data:notifications } = useQueryData(["user-notifications"], getNotifications)

    const {data:notification, status} = notifications as NotificationT
    if (status!==200) { 
      return <div className=" bg-transparent flex flex-col items-start h-full w-full text-[#3d3d3d]">
        <p className=''>Jake bat vat karle</p>
          
      </div>
    }
  return (
    <div className="flex flex-col">
      <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
          <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
            date 
          </p>
        
      {notification.notification.map((n)=>(
        <DraggableCardBody >
        <div
        key={n.id}
        className='border-2 flex gap-x-3 items-center rounded-lg p-3'
        >
          <Avatar className=" w-5 h-5" >
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <p>{n.content}</p>
        </div>
        </DraggableCardBody>
      ))}
      </DraggableCardContainer>
    </div>
  )
}

export default Notifications