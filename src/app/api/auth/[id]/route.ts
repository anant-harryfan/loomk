import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params:{id} }: { params: { id: string } }
) {
    // console.log('yetry catch ke to uper hi hai')
try{  const userProfile = await client.user.findUnique({
    where: {
      clerkId: id,
    },
    include: {
        studio: true,
        subscription:{
            select:{
                plan: true
            }
        }
    },
  });
  if(userProfile) return NextResponse.json({status: 200, user: userProfile})

    const clerkInstance = await clerkClient(); // 2025 may syntax
    const clerkUserInstance = await clerkInstance.users.getUser(id);

    const createUser = await client.user.create({
        data:{
            clerkId: id,
            email: clerkUserInstance.emailAddresses[0].emailAddress,
            firstname: clerkUserInstance.firstName,
            lastname: clerkUserInstance.lastName,
            studio:{
                create: {}
            },
            workspace:{
                create:{
                    name: `${clerkUserInstance.firstName}'s borepanti`,
                    type: 'PERSONAL'
                }
            },
            
        },
    })

    if (createUser) return NextResponse.json({ status: 201, user: createUser })
    return NextResponse.json({ status: 400 })}
    catch(error){
        console.log('error hua haiiiii ', error)
    }

}
