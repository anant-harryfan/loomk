"use client"
import { getWorkSpaces } from '@/app/action/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import React from 'react'
import Modal from '../modal'
import { Button } from '@/components/ui/button'
import { FolderPlusIcon } from 'lucide-react'
import WorkspaceForm from '@/components/forms/workspace-form'

type Props = {}

const CreateWorkspace = (props: Props) => {
    const {data} = useQueryData(['user-workspaces'], getWorkSpaces)
  return (
    <Modal
    title='Create A Code'
    description='tu apne video ke sath kuch bhi karle'
trigger={
    <Button className='bg-[#1d1d1d] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl'>
        <FolderPlusIcon/>
        Create a Code
    </Button>
}
    >
<WorkspaceForm/>
    </Modal>
  )
}

export default CreateWorkspace