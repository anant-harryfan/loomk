import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = async (
  mutationKey: MutationKey,
  mutationFn: MutationFunction<any, any>,
  queryKey: string,
  onSuccess?: () => void
) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data, variable, context) {
      if (onSuccess) {
        return toast(data?.status === 200 ? "sucess" : "Error", {
          description: data?.data,
        });
      }
    },
    onSettled: async (data, error, variable, context) => {
      return await client.invalidateQueries({ queryKey: [queryKey] });
    },
  });
  return { mutate, isPending };
};

export const useMutationDataState = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        variables: mutation.state.variables as any,
        status: mutation.state.status,
      };
    },
  });
  const latestVariables = data[data.length-1]
  console.log(latestVariables, 'main wala latest')
  return {latestVariables}
};
