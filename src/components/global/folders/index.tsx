"use client"
import { cn } from "@/lib/utils";
import { Ship } from "lucide-react";
import React from "react";
import Folder from "./folder";
import { getWorkspaceFolders } from "@/app/action/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { useMutationDataState } from "@/hooks/useMutationData";
import { number } from "zod";
import { FoldersProps } from "@/types/index.type";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slices/folders";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";


type Props = {
  workspaceId: string;
};


const Folders = ({ workspaceId }: Props) => {
  const dispatch = useDispatch()
  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId)
  );
  // //console.log(data, 'deutoaio')
  const { latestVariables } = useMutationDataState(['create-folder'])
  // //console.log(latestVariables, 'latestdsfkjlkadfladkf')
  const { status, data: folders } = data as FoldersProps
  // //console.log(folders, 'foldersdfksdfdsf')

  if (isFetched && folders) {
    dispatch(FOLDERS({folders: folders}))
  }


  return (
    <TabsList className='bg-transparent gap-2 w-full pl-0'>
    <div className="flex flex-col w-full gap-8 overflow-y-auto max-h-[400px] ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <Ship />
          VideoCode
        </div>

      </div>
        
      <section className={cn(status !== 200 && 'justify-center', "grid  grid-template-cols  gap-x-30 gap-y-5 w-full")}>
        {status !== 200 ? (
          <p className="text-neutral-700">CODE KARLE BEWADE</p>
        ) : (
          <>
            {latestVariables && latestVariables.status == 'pending' && (
                  <TabsTrigger className='p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]' value={latestVariables.variables.name}>
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
                optimistic
              />
              </TabsTrigger>
            )}
            {folders.map((folder) => (
              <TabsTrigger className='p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]' value={folder.name}>
              <Folder
                name={folder.name}
                count={folder._count.videos}
                id={folder.id}
                key={folder.id}
              />
              </TabsTrigger>
            ))}
          </>
        )}
      </section>
    </div>
    </TabsList>
  );
};

export default Folders;