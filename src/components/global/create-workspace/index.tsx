"use client"
import { getWorkSpaces } from '@/app/dashboard/action/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import React from 'react'
import Modal from '../modal'
import { Button } from '@/components/ui/button'
import { Folder } from 'lucide-react'
import WorkspaceForm from '../forms/workspace-form'

type Props = {}

const CreateWorkspace = (props: Props) => {
    const { data } = useQueryData(["user-workspaces"], getWorkSpaces)
    const { data: plan } = data as {
        status: number
        data: {
            subscription: {
                plan: "PRO" | "FREE"
            } | null
        }
    }
    if (plan.subscription?.plan === "FREE" || "PRO") {
        return (
            <Modal title="Create a Workspace" description='worku tera bhai'
                trigger={
                    <Button className='bg-[#1d1d1d] text-[#a7a6a6] flex items-center gap-2 py-4 px-4 rounded-2xl'>
                        <Folder color='#707070' fill='#707070' />
                        Create a WorkSpace
                    </Button>
                }
            >
                    <WorkspaceForm/>

                </Modal>
        )
    }
}

export default CreateWorkspace