import React from 'react'
import CommentForm from '../forms/comment-form'
import CommentCard from '../comment-card'
import { useQueryData } from '@/hooks/useQueryData'
import { getVideoComments } from '@/app/dashboard/action/user'
import { VideoCommentProps } from '@/types/index.type'

type Props = {
    author:   string,
    videoId: string
}

const Activites = ({author, videoId}: Props) => {
    const {data} = useQueryData(['video-comments'], ()=>
    getVideoComments(videoId)
    )
    const {data: comments} = data as VideoCommentProps
  return (
      <div className='max-w-[40vh] overflow-auto'>
        <CommentForm videoId={videoId} author={author}/>  
    {comments.map((comment)=>(
        <CommentCard
            comment={comment.comment}
            key={comment.id}
            author={{
                image: comment.User?.image!,
                firstname: comment.User?.firstname,
                lastname: comment.User?.lastname,
            }}
            videoId={videoId}
            reply={comment.reply}
            commentId={comment.id}
              />
    ))}
      </div>
  )
}

export default Activites