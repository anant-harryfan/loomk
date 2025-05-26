"use client";
import { renameFolders } from "@/app/action/workspace";
import { Input } from "@/components/ui/input";
import { useMutationData, useMutationDataState } from "@/hooks/useMutationData";
import { cn } from "@/lib/utils";
import { FolderIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

type Props = {
    name: string;
    id: string;
    optimistic?: boolean;
    count?: number;
};

const Folder = ({ name, id, optimistic, count }: Props) => {

    const pathName = usePathname();
    const router = useRouter();

    const handleFolderClick = () => {
        router.push(`${pathName}/folder/${id}`);
    };
      const { latestVariables } = useMutationDataState(['rename-folder']) // by this flicker wont happen
    
    return (
        <div
            onClick={(handleFolderClick)}
            className={cn(" flex justify-between hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2  min-w-[250px] py-3 px-4 rounded-lg border-[1px]")}
        >
            <div className="flex flex-col gap-[1px]">

                    <p  className="text-neutral-300">
                         {latestVariables && latestVariables.status === 'pending' && latestVariables.variables.id ===id ? latestVariables.variables.name : name}   {/* by this flicker wont happen */}
                        
                    </p>
                
                <span className="text-sm text-neutral-700">{count || 0}</span>
            </div>
            <FolderIcon color="#707070" fill="#707070" />
        </div>
    );
};

export default Folder;
