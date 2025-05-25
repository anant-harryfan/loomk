"use client"
import { WorkSpace } from '@prisma/client'
import { usePathname } from 'next/navigation'
import React from 'react'
import FormGenerator from '../form-generator'
import { useCreateWorkspace } from '@/hooks/useCreateWorkspace'
import CreateFolders from '../create-folders'

type Props = {
    workspace: WorkSpace
}

const GlobalHeader = ({workspace}: Props) => {
  const pathName = usePathname().split(`/dashboard/${workspace.id}`)[1]
  // const { errors, isPending, onFormSubmit, register } = useCreateWorkspace()
  return (
    <article className='flex flex-col gap-2'>
      <span className='text-[#707070] text-xs'>
        {workspace.type.toLocaleUpperCase()}
      </span>
      <h1 className="text-4xl">
        {pathName && !pathName.includes('folder') ? pathName.charAt(0).toUpperCase() + pathName.slice(1).toLowerCase(): 'Tera godioaolp'}
      </h1>
      {/* <form onSubmit={onFormSubmit} className='flex flex-col gap-y-3'>
        <FormGenerator
          name="name"
          placeholder='workspace-name'
          label='workspace-name'
          errors={errors}
          inputType='input'
          type='text'
          register={register}
        />
      </form> */}
    </article>
  )
}

export default GlobalHeader