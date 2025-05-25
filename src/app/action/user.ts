'use server'

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser()
        if (!user) {
            console.log('no user')
            return { status: 403 }
        }


        const userExist = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            include: {
                workspace: {
                    where: {
                        User: {
                            clerkId: user.id
                        }
                    }
                }
            }
        }) 

        if (userExist) {
            return { status: 200, user: userExist }
        }
        console.log('newUser ke phele')
        const newUser = await client.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstname: user.firstName,
                lastname: user.lastName,
                image: user.imageUrl,
                studio: {
                    create: {},
                },
      
              
                workspace: {
                    create: {
                        name: `${user.firstName}'s borepanti`,
                        type: 'PERSONAL'
                    }
                }
            },
            include: {
                workspace: true
            },
        })
console.log(newUser)
        if (newUser) {
            
            console.log('new User sahi')    
            return (
          
            { status: 201, user: newUser }
        )}
        console.log('new User Dikkat')    

        return { status: 400 }
    }
    catch (error) {

        return { status: 500 }
    }

}


export const getNotifications = async () => {
    try {
        const user = await currentUser()
        if (!user) return { status: 404 }
        const notifications = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                notifications: true,
                _count: {
                    select: {
                        notifications: true,
                    },
                },
            },
        })
        if (notifications && notifications.notifications.length > 0)
            return { status: 200, data: notifications }
        console.log(notifications, 404)
        return { status: 404, data: [0] }
    } catch (error) {
        console.log( 409)
        return { status: 400, data: [] }
    }
}


export const searchUsers= async (query:string) =>{
    try{
        const user = await currentUser()
        if(!user)return{status: 404}

        const Users = await  client.user.findMany({
            where:{
                OR:[{firstname: {contains: query}},
                    {email: {contains: query}},
                    {lastname: {contains: query}}
                ],
                NOT:[{clerkId: user.id}]
            },
            select:{
                id:true,
                firstname: true,
                lastname: true,
                image: true,
                email:true
                }
    })
    if(Users && Users.length>0){
        return {status: 200, data: Users}
    }
    return {status: 404, data: undefined}
    } catch(e){
        return {status: 500, data: undefined}
    }
}