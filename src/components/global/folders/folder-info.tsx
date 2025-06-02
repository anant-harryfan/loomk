"use client"
import { getFolderInfo, renameFolders } from '@/app/action/workspace'
import { Input } from '@/components/ui/input'
import { useMutationData, useMutationDataState } from '@/hooks/useMutationData'
import { useQueryData } from '@/hooks/useQueryData'
import { FolderProps } from '@/types/index.type'
import React, { useRef, useState } from 'react'


type Props = {
    folderId: string
}

const FolderInfo = ({folderId}: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
      const folderCardRef = useRef<HTMLDivElement | null>(null);
    const {data} = useQueryData(["folder-info"], ()=>getFolderInfo(folderId))
    const {data:folder} = data as FolderProps

  const [onRename, setOnRename] = useState(false);

  const Rename = () => {
    // //console.log(onRename)
    
    setOnRename(true);
  }
  const Renamed = () => {
    // //console.log(onRename)
    setOnRename(false);
  }

  const { mutate } = useMutationData(
    ["rename-folder"],
    (data: { name: string }) => renameFolders(folderId, data.name),
    "workspace-folders",
    Renamed
  );

  const handleNameClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    //console.log('rename chalu')
    Rename()
  };
  const { latestVariables } = useMutationDataState(['rename-folder']) // by this flicker wont happen
  const updateFoldername = (e: React.FocusEvent<HTMLInputElement>) => {
    // //console.log('THE UPDATE FOLDER NAME IS RUNNING')
    if (inputRef.current && folderCardRef.current) {
      if (inputRef.current.value) {
        // //console.log(inputRef.current.value)
        mutate({ name: inputRef.current.value });
        mutate({ name: inputRef.current.value, folderId }); // by this flicker wont happen
      } else Renamed();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      // Programmatically trigger the blur event
      inputRef.current.blur();
    }
  };
  return (
    <div ref={folderCardRef} className="flex items-center">
      {onRename ? (
        <Input
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            updateFoldername(e)
          }
          onKeyDown={handleKeyDown}
          autoFocus
          placeholder={folder.name}
          className="border-none, underline, text-base, w-full outline-none text-neutral-300 bg-transparent p-0"
          ref={inputRef}
        />
      ) : (
      <h2 onClick={handleNameClick} className="text-[#bdbdbd] text-2xl">
        {/* {latestVariables.variables.name} */}
            {latestVariables && latestVariables.status === 'success' && latestVariables.variables.folderId === folderId ? latestVariables.variables.name : latestVariables && latestVariables.status === 'pending'? 'gotosettingsforfun' : folder.name} 
        </h2>
      )
    }
    </div>
  )
}

export default FolderInfo