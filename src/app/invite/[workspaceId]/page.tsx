"use client"
import React from 'react'
import Page from '@/app/dashboard/[workspaceId]/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Folders from '@/components/global/folders'
import Videos from '@/components/global/videos'
import VideoPreview from '@/components/global/videos/preview'
import { getInvite } from '@/app/action/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import { QueryClient } from '@tanstack/react-query'
type Props = {
    workspaceId:string
}

const Invited = async ({workspaceId}: Props) => {
    const query = new QueryClient()
    await query.prefetchQuery({
                queryKey: ['workspace-invo'],
                queryFn: ()=>getInvite(workspaceId)
        })
    return (
        <div>
            {/* mere hisabh se */}
        </div>
      )
}

export default Invited