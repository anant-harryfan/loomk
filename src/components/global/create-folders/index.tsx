"use client"
import { Button } from '@/components/ui/button'
import { useCreateFolders } from '@/hooks/useCreateFolders'
import { FolderPlusIcon } from 'lucide-react'
import React from 'react'

type Props = {
  workspaceId: string
}

const CreateFolders = ({workspaceId}: Props) => {
  const { onCreateNewFolder } = useCreateFolders(workspaceId)
  return (
    <Button onDoubleClick={onCreateNewFolder} onClick={()=>{console.log('ddd')}} className='bg-[#1d1d1d] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl'>
      <FolderPlusIcon/>
      create a code not worku
    </Button>
  )
}

export default CreateFolders