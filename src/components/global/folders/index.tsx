"use client"
import { cn } from "@/lib/utils";
import { Ship } from "lucide-react";
import React from "react";
import Folder from "./folder";
import { getWorkspaceFolders } from "@/app/dashboard/action/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { useMutationDataState } from "@/hooks/useMutationData";
import { number } from "zod";
import { FoldersProps } from "@/types/index.type";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slices/folders";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";


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
    <div>
    <TabsList className='bg-transparent gap-2  '>
    {/* <div className="flex flex-col w-full gap-8 overflow-y-auto max-h-[400px] "> */}

        
      <section className={cn(status !== 200 && 'justify-center', " flex flex-row-reverse overflow-x-auto  ")}>
        {status !== 200 ? (
          <p className="text-neutral-700">CODE KARLE BEWADE</p>
        ) : (
          <>
            {latestVariables && latestVariables.status == 'pending' && (
                  <TabsTrigger  className='resize' value={latestVariables.variables.name}>
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
                optimistic
                
              />
              </TabsTrigger>
            )}
            {folders.map((folder, key) => (
              <TabsTrigger className='resize ' value={folder.name} key={key}>
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

    </TabsList>

    </div>
  );
};

export default Folders;