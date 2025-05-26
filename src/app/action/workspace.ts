"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAcessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    // console.log( `USERRRRRRR:  `, user)
    if (!user) return { status: 404 };
    // console.log(` CLIENT KI WORKSPACE ID::::::   ${client.workSpace.findUnique}`)
    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkId: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkId: user.id,
                },
              },
            },
          },
        ],
      },
    });
    console.log(` ISUSERINWORKSPACE???::::::     ${isUserInWorkspace}`);
    console.log("verified");
    return {
      status: 200,
      data: { workspace: isUserInWorkspace },
    };
  } catch (error) {
    console.log("error");
    return {
      status: 403,
      data: { workspace: null },
    };
  }
};

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (isFolders && isFolders.length > 0) {
      return { status: 200, data: isFolders };
    }

    return { status: 404, data: [] };
  } catch (error) {
    return { status: 403, data: [] };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const videos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder:{
          select:{
            id: true,
            name:true
          }
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    console.log(videos.length, '1 bar chal bas ye hai video');
    if (videos && videos.length > 0) {
      
      return { status: 200, data: videos };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 400 };
  }
};

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };
    // console.log("GETWORKSPACEuSERRRRR: ", user)
    const workspaces = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workspaces) {
      return { status: 200, data: workspaces };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 400 };
  }
};

export const createWorkspace = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const authorized = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (authorized?.subscription?.plan == "FREE" || "PRO") {
      const workspace = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });
      if (workspace) return { status: 201, data: "Workspace Created" };
    }
    return { status: 401, data: "tera cut gaya" };
  } catch (error) {
    return { status: 500 };
  }
};

export const renameFolders = async (folderId: string, name: string) => {
  try {
    const folder = await client.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });
    if (folder) {
      console.log("folder rename ho gaya");
      return { status: 200, data: "Folder Renamed" };
    }
    console.log("folder rename nahi hua");
    return { status: 400, data: "cant find the folder" };
  } catch (error) {
    console.log("kuch na hua");
    return { status: 500, data: "checkout your code" };
  }
};

export const createFolder = async (workspaceId: string) => {
  try {
    const isNewFolder = await client.workSpace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folders: {
          create: { name: "bagh" },
        },
      },
    });
    if (isNewFolder) {
      // console.log("newfolder");
      return { status: 200, message: "New codebase taiyar" };
    }
  } catch (error) {
    return { status: 500, message: "pagal mat bana" };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (folder) return { status: 200, data: folder };
    return { status: 400, data: null };
  } catch (error) {
    return {
      status: 500,
    };
  }
};

export const movewVideoLocation = async (
  videoId: string,
  folderId: string,
  workSpaceId: string
) => {
  try {
    const location = await client.video.update({
      where:{
        id: videoId
      },
      data:{
        folderId: folderId||null,
        workSpaceId,
      }
    })
    if (location) return{status: 200, data: 'folder rename sucessfull(can take the data here also)'}
    return {status: 404, data:'ye kaise kiya mujhe bhi sikha, no folder ke nam change'}
  } catch (error) {
    return{status: 500, data:'ye server side error hai, ho jaega sahi'}
  }
};
