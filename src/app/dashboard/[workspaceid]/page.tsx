import CreateFolders from '@/components/global/create-folders'
import CreateWorkspace from '@/components/global/create-workspace'
import Folders from '@/components/global/folders'
import Videos from '@/components/global/videos'
import React from 'react'

type Props = {
  params: {workspaceId:string}
}

const page = ({params}: Props) => {
  return (
    <div>
    <div className='flex gap-x-5 w-full' >
      {/* <CreateWorkspace/> */}
      {/* <CreateFolders workspaceId={params.workspaceId}/>
    </div>
    <Folders workspaceId={params.workspaceId}/>*/}
    </div> 
    <Videos 
    workspaceId={params.workspaceId} 
    videoKey="folder-videos"
    />
    </div>
  )
}

export default page