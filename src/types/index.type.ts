export type WorkSpaceProps = {
  data: {
    subscription: {
      plan: "FREE" | "PRO";
    } | null;
    workspace: {
      id: string;
      name: string;
      type: "PUBLIC" | "PERSONAL";
    }[];
    members: {
      Workspace: {
        id: string;
        name: string;
        type: "PUBLIC" | "PERSONAL";
      };
    }[];
  };
};

export type NotificationProps = {
  status: number;
  data: {
    _count: {
      notification: number;
    };
  };
};

export type NotificationT = {
  status: number;
  data: {
    notification: {
      id: string;
      userId: string | null;
      content: string;
    }[];
  };
};

export type VideosProps = {
  status: number;
  data: {
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
    } | null;
    id: string;
    processing: boolean;
    Folder: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
    title: string | null;
    source: string;
  }[];
};
export type FoldersProps = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createddAt: Date;
    workSpaceId: string | null;
  })[];
};

export type FolderProps = {
  status: number;
  data: {
    name: string;
    _count: {
      videos: number;
    };
  };
};
export type VideoProps = {
  status: number;
  data: {
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
      clearkId: string;
      trial: boolean;
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    } | null;

    // id: string
    processing: boolean;
    // Folder: {
    //     id: string
    //     name: string
    // } | null
    createdAt: Date;
    title: string | null;
    source: string;
    description: string | null;
    views: string | null;
    summary: string | null;
  };
  author: boolean;
};

export type CommentRepliesProps = {
  id: string;
  comment: string;
  createdAt: Date;
  commentId: string | null;
  userId: string | null;
  videoId: string | null;
  User: {
    id: string;
    email: string;
    firstname: string | null;
    lastname: string | null;
    createdAt: Date;
    clerkid: string;
    image: string | null;
    trial: boolean;
    firstView: boolean;
  } | null;
};

export type VideoCommentProps = {
  data: {
    User: {
      id: string;
      email: string;
      firstname: string | null;
      lastname: string | null;
      createdAt: Date;
      clerkid: string;
      image: string | null;
      trial: boolean;
      firstView: boolean;
    } | null;
 
  reply: CommentRepliesProps[];
  id: string;
  comment: string;
  createdAt: Date;
  commentId: string | null;
  userId: string | null;
  videoId: string | null;
    }[]
};
export type ChannelChatams = {
  data: { 
  id: string;
  chatam: string;
  chatamId: string | null;
  channelId: string | null;
    }[]
};

export type UserChannel ={
  data: {
    id: string, 
    name: string, 
    chats: string,
    user: string, 
    userId: string
  }[]
}