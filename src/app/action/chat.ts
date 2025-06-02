"use server";
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server";

export const getChannels = async (
 
)=>{
try {

    const user = await currentUser();
    if (!user) return { status: 404 };
const channels = await client.channel.findMany({
    where:{
        User: {
            clerkId: user.id,
        },
    }
})
//console.log(channels, " YE HAI CHANNELS")    
return {status: 200, data: channels}
}
 catch (error) {
    return {status: 500}
}
}

export const getAllChatam = async (
    channelId: string
)=>{
try {
 
        const chatams = await client.chatam.findMany({
            where: {
             channelId: channelId
            },
        })
        //console.log("bhai chatams chal gaya getallchatam")
        if (chatams) 
        return { status: 200, data: chatams};
    return {status: 404, data: "no chatams"}
} catch (error) {
    //console.log("CHATS LENE ME DIKAT ", error)
    return {status: 500}
}
}

export const createChatam = async (

    chatam: string,
    channelId: string,
)=>{
    console.log(chatam, "Createchatam ka chatam")
    const newChatam = await client.channel.update({
where:{
    id: channelId,

},data:{

    chats:{
        create:{
            chatam: chatam, 
        }
    }
    },
 })
 console.log("NEW CHATTAM HAI ", newChatam)
    if (newChatam) return { status: 200, data: "New chatam added" };
 
}