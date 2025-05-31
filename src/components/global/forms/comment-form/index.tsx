"use client"
import { useVideoComment } from '@/hooks/useVideo'

import React from 'react'
import FormGenerator from '../../forms-generator'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'
import { Send } from 'lucide-react'

type Props = {
  videoId: string
  commentId?: string
  author: string
  close?: () => void
}

const CommentForm = ({videoId, commentId}: Props) => {
  const {errors, isPending, onFormSubmit, register} =  useVideoComment(videoId, commentId)
  return (
    <form className="relative w-full" onSubmit={onFormSubmit}>
{/* {close && ( */}
  
  <FormGenerator  
  register={register}
  errors={errors}
  placeholder={'kuch likh yaha'}
  name='comment'
  inputType='textarea'
  lines={8}
  type='text'
/>
<Button
className='p-0 bg-transparent absolute bottom-2 right-3 hover:bg-transparent' type='submit'>
  <Loader state={isPending}>
    <Send className='text-white/50 cursor-pointer hover:text-white/80' size={18} />
  </Loader>
</Button>
    </form>
  )
}

export default CommentForm