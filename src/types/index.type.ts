export type WorkSpaceProps = {
    data:{
        subscription:{
            plan:"FREE" | "PRO"
        } | null
        workspace:{
            id: string
            name: string
            type: 'PUBLIC' | 'PERSONAL'
        }[]
        members:{
            Workspace:{
                id:string
                name:string
                type: "PUBLIC" | "PERSONAL"
            }
        }[]
    }
}

export type NotificationProps = {
    status: number
    data: {
        _count:{
            notification: number
        }
    }
}

export type VideosProps = {
    status: number
    data: {
        User:{
            firstname: string | null
            lastname: string|null
            image: string| null
        }| null
        id:string
        processing:boolean
        createdAt: Date
        title: string|null
        source: string
    }[]
}