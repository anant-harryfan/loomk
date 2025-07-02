import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import {
  getWorkspaceFolders,
  movewVideoLocation,
} from "@/app/dashboard/action/workspace";
import useZodForm from "./useZodForm";
import { moveVideoSchema } from "@/components/global/change-videolocation/changeLSchema";

export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
  const { folders } = useAppSelector((state) => state.FolderReducer);
  const { workspaces } = useAppSelector((state) => state.WorkSpaceReducer);

  const [isFetching, setIsFetching] = useState(false);
  const [isFolders, setIsFolders] = useState<
    | ({
        _count: {
          videos: number;
        };
      } & {
        id: string;
        name: string;
        createdAt: Date;
        workSpaceId: string | null;
      })[]
    | undefined
  >(undefined);

  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    (data: { folder_id: string; workspace_id: string }) =>
      movewVideoLocation(videoId, data.folder_id, data.workspace_id)
  );

  const { errors, onFormSubmit, watch, register } = useZodForm(
    moveVideoSchema,
    mutate,
    { folder_id: null, workspace_id: currentWorkspace }
  );

  const fetchFolders = async (workSpace: string) => {
    setIsFetching(true);
    const folders = await getWorkspaceFolders(workSpace);
    setIsFetching(false);
    setIsFolders(folders.data);
  };

  useEffect(() => {
    fetchFolders(currentWorkspace);
  }, []);


  useEffect(() => {
    const workspace = watch(async (value) => {
      if (value.workspace_id) fetchFolders(value.workspace_id);
    });

    return () => workspace.unsubscribe();
  }, [watch]);



  return {
    folders,
    workspaces,
    isFetching,
    isFolders,
    errors,
    register,
    isPending,
    onFormSubmit
  };
};
