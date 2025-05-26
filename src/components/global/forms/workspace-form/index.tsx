import { useCreateWorkspace } from '@/hooks/useCreateWorkspace'
import React from 'react'
import FormGenerator from '../../forms-generator'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {}

const WorkspaceForm = (props: Props) => {
    const {errors, isPending, onFormSubmit, register} = useCreateWorkspace()
  return (
    <form onSubmit={onFormSubmit} className='flex flex-col gap-y-3'>
      <FormGenerator
      register={register}
      name='name'
      placeholder={'Workspace Name'}
      label='Name'
      errors={errors}
      inputType='input'
      type='text'
      
      />
      <Button className='text-sm w-full mt-2'
        type='submit'
        disabled={isPending}
      >
        <Loader state={isPending}> Create Code</Loader>
      </Button>
    </form>
  )
}

export default WorkspaceForm