"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommentRepliesProps } from "@/types/index.type";
import React, { useState } from "react";
import CommentForm from "../forms/comment-form";

type Props = {
  comment: string;
  author: {
    image: string;
    firstname: string | null | undefined;
    lastname: string | null | undefined;
  };
  videoId: string;
  commentId: string;
  reply: CommentRepliesProps[];
  isReply?: boolean;
};

const CommentCard = ({
  comment,
  commentId,
  author,
  videoId,
  reply,
  isReply,
}: Props) => {
  const [onReply, setOnReply] = useState<boolean>(false);
  return (
    <Card
      className={cn(
        isReply
          ? "bg-[#1d1d1d] pl-10 border-none"
          : "border-[bg-[#1d1d1d] pl-10 border-none]"
      )}
    >
      <div className="flex gap-2 items-center">
        <div>
          <p className="text-[#bdbdbd]">{comment}</p>
        </div>
        {!isReply && (
          <div className="flex justify-end mt-3">
            {!onReply ? (
              <Button
                onClick={() => setOnReply(true)}
                className="text-sm rounded-full bg-[#252525] text-white hover:text-black"
              >
                Reply
              </Button>
            ) : (
              <CommentForm
                close={() => setOnReply(false)}
                videoId={videoId}
                commentId={commentId}
                author={author.firstname + " " + author.lastname}
              />
            )}
          </div>
        )}
        {reply.length > 0 && (
          <div className="flex flex-col gap-y-10 mt-5">
            {
            reply.map( 
              (r) => (<CommentCard 
              isReply
              reply={[]}
              comment={r.comment}
              commentId={commentId}
              videoId={videoId}
              key={r.id}
              author={{
                image: r.User?.image!,
                firstname: r.User?.firstname!,
                lastname: r.User?.lastname!,
              }}
              />)
            
          )
        }
          </div>
        )}
      </div>
    </Card>
  );
};

export default CommentCard;
