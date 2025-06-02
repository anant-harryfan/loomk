"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
// import nodemailer from "nodemailer"

// export const sendEmail=(
//   to: string, 
//   subject: string,
//   text?: string,
//   html?: string
// )=>{
// const transporter = nodemailer.createTransport({
//   host:"smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth:{
//     user: process.env.MAILER_EMAIL,
//     pass: process.env.MAILER_PASSWORD
//   }
// })
// const mailOptions = {
//   to, subject, text, html
// }
// return{transporter, mailOptions}
// }

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      //console.log("no user");
      return { status: 403 };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkId: user.id,
            },
          },
        },
      },
    });

    if (userExist) {
      return { status: 200, user: userExist };
    }
    //console.log("newUser ke phele");
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
            type: "PERSONAL",
          },
        },
      },
      include: {
        workspace: true,
      },
    });
    //console.log(newUser);
    if (newUser) {
      //console.log("new User sahi");
      return { status: 201, user: newUser };
    }
    //console.log("new User Dikkat");

    return { status: 400 };
  } catch (error) {
    return { status: 500 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
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
    });
    if (notifications && notifications.notifications.length > 0)
      return { status: 200, data: notifications };
    //console.log(notifications, 404);
    return { status: 404, data: [0] };
  } catch (error) {
    //console.log(409);
    return { status: 400, data: [] };
  }
};


export const getFirstView = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const userData = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        firstView: true,
      },
    });
    if (userData) {
      return { status: 200, data: userData.firstView };
    }
    return { status: 400, data: false };
  } catch (error) {
    return { status: 500 };
  }
};

export const enableFirstView = async (state: boolean) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const view = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        firstView: state,
      },
    });

    if (view) {
      return { status: 200, data: "Settings updated" };
    }
  } catch (error) {
    return { status: 500 };
  }
};

export const createCommentAndReply = async (
  userId: string,
  comment: string,
  videoId: string,
  commentId?: string | undefined
) => {
  try {
    if(commentId){
      //console.log(commentId, "YE HAI TERE BAP KA COMMENT")
    const reply = await client.comment.update({
      where: {
        id: commentId,
      },
      data: {
        reply: {
          create: {
            comment,
            userId,
            videoId,
          },
        },
      },
    });
    //console.log("Reply", reply)
    if (reply) {
      return { status: 200, data: "Reply posted" };
    }
  }
//console.log('ye hai ham new comment ke uper')
    const newComment = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        Comment: {
          create: {
            comment,
            userId,
          },
        },
      },
    });
    // //console.log(newComment, "NEW COMMENT")
    if (newComment) return { status: 200, data: "New Comment added" };
    //console.log('comment new repl me dikatfdfsfsdfd')
  } catch (error) {
    //console.log('comment new repl me dikat')
    //console.log(error, '\n \n \n \n')
    return { status: 500 };
  }
};

export const getUserProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const profileIdAndImage = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        image: true,
        id: true,
      },
    });
    if (profileIdAndImage) return { status: 200, data: profileIdAndImage };
  } catch (error) {
    return { status: 400 };
  }
};

export const getVideoComments = async (Id: string) => {
  try {
    const comments = await client.comment.findMany({
      where: {
        OR: [{ videoId: Id }, { commentId: Id }],
        commentId: null,
      },
      include: {
        reply: {
          include: {
            User: true,
          },
        },
        User: true,
      },
    });
// //console.log(comments, 'COMMENTSSSSS')
 return { status: 200, data: comments };
  } catch (error) {
    return { status: 500 };
  }
};




export const inviteMembers = async (
  workspaceId: string, recieverId: string
) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }
    //console.log('send info ke uper')
    const senderInfo = await client.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        id: true
      }
    })
    if (senderInfo?.id) {
      //console.log("sendInfo.id confirm", senderInfo?.id)
      const workspace = await client.workSpace.findUnique({
        where: {
          id: workspaceId
        },
        select: {
          name: true
        }
      })
      if (workspace) {
        //console.log("workspace confirm", workspace)
        const invitation = await client.invite.create({
          data: {
            senderId: senderInfo.id, 
            receiverId: recieverId,
            workSpaceId: workspaceId,
            content: `a url send you a url to invert the if of a url, ${workspace.name}`
          },
          select:{
            id: true,

          }
        })
     const notification =  await client.user.update({
          where:{
            clerkId: user.id,
          },
            data:{
              notifications: {
                create:{
                  content:`abe is wale url pe ja, `
                }
              }
            }
        })
        //console.log('workspace ke nichhe', notification)
      }
      //console.log('senderinfo wala khatam')
    }
    //console.log('hogaya')
  } catch (error) {

  }
}












































