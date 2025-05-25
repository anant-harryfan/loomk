import { useMutationData } from "./useMutationData";
import { createFolder } from "@/app/action/workspace";

export const useCreateFolders = (workspaceId: string) => {
  const { mutate } = useMutationData(
    ["create-folder"],
    () => createFolder(workspaceId),
    "workspace-folders"
  );
  console.log(mutate, 'mutate')
  const onCreateNewFolder = ()=>{
    mutate({name:'bagh', id: 'optimitsitc--id'}) //untitled
    console.log(mutate({ name: 'bagh', id: 'optimitsitc--id' }), 'mutate ka bhai')
  }
return onCreateNewFolder
};
