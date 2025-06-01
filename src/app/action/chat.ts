import { client } from "@/lib/prisma"

export const getAllChatam = async (
    channelId: string
)=>{
try {
    if(channelId){
        const chatams = await client.chatam.findMany({
            where: {
                OR: [{channelId: channelId}, {chatamId: channelId}] // bughoga
            },
        })

        return { status: 200, data: chatams};
    }
} catch (error) {
    console.log("CHATS LENE ME DIKAT ", error)
    return {status: 500}
}
}