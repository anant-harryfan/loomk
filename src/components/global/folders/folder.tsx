"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Loader from "../loader";
import { useMutationData } from "@/hooks/useMutationData";
import { renameFolders } from "@/app/action/workspace";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();
  const router = useRouter();

  const Rename = () =>
    setOnRename(true);

  const Renamed = () =>
    setOnRename(false);

  const [onRename, setOnRename] = useState(false);
  const { mutate, ispending } = useMutationData(
    ["rename-folder"],
    (data: { name: string }) => renameFolders(id, name),
    "workspace-folders",
    Renamed
  );

  const handleFolderClick = () => {
    router.push(`${pathName}/folder/${id}`);
  };
  const handleNameClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename()
  };
  const updateFoldername = (e: React.FocusEvent<HTMLInputElement>) => {
    // console.log('THE UPDATE FOLDER NAME IS RUNNING')
    if (inputRef.current && folderCardRef.current) {
        if (inputRef.current.value) {
          mutate({ name: inputRef.current.value });
        } else Renamed();
    }
  };

  return (
    <div

      onDoubleClick={handleFolderClick}
      ref={folderCardRef}
      className={cn(
        optimistic && "opacity-50",
        "fade-layer flex justify-between hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2  max-w-[150px] min-h-[120px] py-3 px-4 rounded-lg "
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-0.5">
          {onRename ? (
            <Input
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                updateFoldername(e)
              }
              autoFocus
              placeholder={name}
              className="border-none, underline, text-base, w-full outline-none text-neutral-300 bg-transparent p-0"
              ref={inputRef}
            />
          ) : (
            <p onClick={handleNameClick} className="text-neutral-300">
              {name}
            </p>
          )}

          <span className="text-sm text-neutral-700">{count || "0"}</span>
        </div>
      </Loader>
    </div>
  );
};

export default Folder;
