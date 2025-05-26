"use client";
import { getAllUserVideos } from "@/app/action/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideosProps } from "@/types/index.type";
import { VideoIcon } from "lucide-react";
import React from "react";
import VideoCard from "./video-card";

type Props = {
  folderId?: string;
  videosKey: string;
  workspaceId: string;
};

const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
  const { data: videoData } = useQueryData([videosKey], () =>
    getAllUserVideos(workspaceId)
  );
  const { status: videosStatus, data: videos } = videoData as VideosProps;
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoIcon color="#7d7d7d" fill="#7d7d7d" />
          <h2 className="text-[#bdbdbd]">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videosStatus !== 200 ? "p-2" : "grid grid-template-cols gap-10"
        )}
      >
        {videosStatus == 200 ? (
          videos.map((video) => (
            <VideoCard key={video.id} workspaceId={workspaceId} {...video} />
          ))
        ) :  (
          <p className="text-[#575656]">aayega thodi deer me ruk</p>
        )}
      </section>
    </div>
  );
};

export default Videos;
