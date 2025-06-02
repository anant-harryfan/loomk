import { createCommentSchema } from "@/components/global/forms/comment-form/schema";
import { useMutationData } from "./useMutationData";
import { useQueryData } from "./useQueryData";
import useZodForm from "./useZodForm";
import { createChatam } from "@/app/action/chat";
import { createChatamSchema } from "@/components/global/chatapp/channelPreview/schema";


// export const useChats = (channelId: string, chatamId: string) => {
export const useChats = (channelId: string) => {
    // console.log("Channel ID in useChats:", channelId);
    const { mutate, isPending } = useMutationData(
        ["channel-chatam"],
        (data: { chatam: string }) => createChatam(data.chatam, channelId), // Pass data.comment as chatam
        "channel-chatam",
        () => reset()
        );


    const { register, onFormSubmit, errors, reset } = useZodForm(
        createChatamSchema,
        mutate
    )

    // console.log(errors, " YE DEKH ERRORS WAGER DEKH")
    return { register, errors, onFormSubmit, isPending}
};
