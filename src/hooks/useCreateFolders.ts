import { useMutationData } from "./useMutationData";
import { createFolder } from "@/app/action/workspace";

export const useCreateFolders = (workspaceId: string) => {
    const { mutate } = useMutationData(
        ["create-folder"],
        () => createFolder(workspaceId),
        "workspace-folders"
    );

    const onCreateNewFolder = () => {
        mutate({ name: 'Bagh', id: 'optimitsitc--id' }) //untitled
        // console.log(mutate({ name: 'Untitled', id: 'optimitsitc--id' }), 'mutate ka bhai')
    }
    console.log('ONCREATEUIONNEWFOLDER')
    return {onCreateNewFolder}
};