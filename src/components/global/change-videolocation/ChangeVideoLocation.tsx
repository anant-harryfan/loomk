"use client"
import { getWorkspaceFolders } from "@/app/dashboard/action/workspace";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMoveVideos } from "@/hooks/useFolders";

import { QueryClient } from "@tanstack/react-query";
import React from "react";
import Loader from "../loader";
import { isPending } from "@reduxjs/toolkit";

type Props = {
  currentFolder?: string;
  currentFolderName?: string;
  currentWorkSpace: string;
  videoId: string;
};

const ChangeVideoLocation = ({
  currentFolder,
  currentFolderName,
  currentWorkSpace,
  videoId,
}: Props) => {
  const {
    folders,
    workspaces,
    isFetching,
    isFolders,
    register,
    isPending,
    onFormSubmit
  } = useMoveVideos(
    videoId,
    currentWorkSpace
  );

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((f) => f.id === currentWorkSpace);

  return (
    <form className="flex flex-col gap-y-5" onSubmit={onFormSubmit}>
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs text-[#a4a4a4]">Current Workspaces</h2>
        {workspace && <p> workspace.name </p>}
        <h3 className="text-xs  text-[#a4a4a4] mt-4 ">Current Folder</h3>
        {folder ? <p>folder.name</p> : "no folder"}
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className="text-xs text-[#a4a4a4]">To</h2>
        <Label className="flex-col gap-y-2 flex">
          <p className="text-xs">Workspace</p>
          <select
            className="rounded-xl text-base bg-transparent"
            {...register("workspace_id")}
          >
            {workspaces.map((space) => (
              <option
                key={space.id}
                className="text-[#a4a4a4]"
                value={space.id}
              >
                {space.name}
              </option>
            ))}
          </select>
        </Label>
        {isFetching ? (
          <Skeleton className="w-full h-[40px] rounded-xl" />
        ) : (
          <Label className="flex flex-col gap-y-2 ">
            <p className="text-xs">Folders in the workspace</p>
            {isFolders && isFolders.length > 0 ? (
              <select
                {...register("folder_id")}
                className="rounded-xl bg-transparent  text-base"
              >
           
                  {isFolders.map((folder, key)=> (
                    key === 0 ? (
                      <option
                        value={folder.id}
                        className="text-[#a4a4a4]"
                        key={folder.id}
                      >
                        {folder.name}
                      </option>
                    ) : (
                      <option
                        value={folder.id}
                        className="text-[#a4a4a4]"
                        key={folder.id}
                      >
                        {folder.name}
                      </option>
                    )
                  ))} 
                  
              </select>
            ) : (
              <p className="text-[#a4a4a4] text-sm">
                No folders In this Workspace
              </p>
            )}
          </Label>
        )}
      </div>
      <Button>
        <Loader state={isPending} color="#000">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
