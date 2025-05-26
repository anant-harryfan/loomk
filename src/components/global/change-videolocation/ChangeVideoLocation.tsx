
import { getWorkspaceFolders } from '@/app/action/workspace'
import { useMoveVideos } from '@/hooks/useFolders'


import { QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
    currentFolder?: string
    currentFolderName?: string
    currentWorkSpace: string
    videoId: string
}

const ChangeVideoLocation =  ({currentFolder, currentFolderName, currentWorkSpace, videoId}: Props) => {
    const {
      folders,
      workspaces,
      isFetching,
      isFolders
    } = useMoveVideos(videoId, currentWorkSpace )

    const folder = folders.find((f)=>f.id === currentFolder)
    const workspace = workspaces.find((f)=>f.id === currentWorkSpace)

  return (
    <div className="flex flex-col  text-[#615d5d]">
       {workspace && 
        <h2 className='text-[#979797]'>Current Workspace</h2>} 
        { workspaces && <p>{workspace?.name}</p>}
      <p className='text-[#979797] text-sm mt-3'>Folder</p>
        <div className='flex flex-col gap-y-5 border-[1px] rounded-xl'>
            {/* all folders shown here */}
        </div>
    </div>
  )
}

export default ChangeVideoLocation