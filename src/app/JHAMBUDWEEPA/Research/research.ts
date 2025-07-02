"use server"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const getResearch = async (date: string) => {
    console.log(date)
    try {
        const Reverch = await client.research.findMany({
            where: {
                date: date
            },
            select: {
                id: true,
                code: true,
                date: true,
                Edit: true,
                User: true,
            }
        })
        if (Reverch) return { status: 200, data: Reverch }

        // const dekh = client.leftout.findMany({
        //     where:{
        //         date: date
        //     },
        //     select:{
        //         date: true
        //     }
        // })
        // console.log(dekh, " dekhooo")
        // if(date in dekh){
        //     return { status: 400, data: "hmm okay" }
        // }
        // client.leftout.create({
        //     data: {
        //         date: date,
        //         deleat: false
        //     }
        // })
        return { status: 400, data: ["hmm dekhte is date ko"] }
    } catch (error) {
        return { status: 500 }
    }
}


export const createReverch = async(code: string, date: string)=>{
    try {
        
    
    const user = await currentUser()
    if (!user) return { status: 404 };

    const verify = await client.research.findFirst({
        where:{
            code: code
        }
    })
    console.log(verify)

if(verify==null){
    const newVerch = client.user.update({
        where:{
            clerkId: user.id
        },
        data:{
            research:{
                create:{
                    code: code,
                    date: date,
                    Edit: 'abhi check nahi kiya ', 
                }
            }
        }
    })

    if(newVerch){
        return{data: newVerch, status: 200}
    }
    return { data:"nahi bana prisma ke create me dikkat", status: 500 }
    // const newReverch = client.research.create({
    //     data:{
             
    //         code: code,
    //         date: date,
    //         Edit: 'abhi check nahi kiya ', 
    //     }
    // })
}
    } catch (error) {
        console.log(error)
        alert(error)
        return { data: error, status: 500 }
    }
}