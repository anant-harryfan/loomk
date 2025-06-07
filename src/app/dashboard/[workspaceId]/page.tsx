// import CreateFolders from '@/components/global/create-folders'
// import CreateWorkspace from '@/components/global/create-workspace'
// import Folders from '@/components/global/folders'
// import Videos from '@/components/global/videos'
import CreateWorkspace from '@/components/global/create-workspace'
import CreateFolders from '@/components/global/create-folders'
import Folders from '@/components/global/folders'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'
import Videos from '@/components/global/videos'

type Props = {
  params: { workspaceId: string }
}

const page = ({ params }: Props) => {
  return (
    <div>
      <div className="flex mt-10 gap-x-3">

        <CreateWorkspace />
        <CreateFolders workspaceId={params.workspaceId} />
      </div>
      <Tabs defaultValue='videos' className='mt-6'>
        <div className="flex w-full flex-col justify-between items-center overflow-x-auto">
          <Folders workspaceId={params.workspaceId} />
        </div>
      </Tabs>
            <Videos videosKey='user-videos' workspaceId={params.workspaceId} />
    </div>
  )
}

export default page