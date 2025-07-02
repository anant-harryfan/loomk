import React from 'react'
import { getAllVideo, getNotifications, onAuthenticateUser } from '@/app/dashboard/action/user'
import { redirect } from 'next/navigation'
import { getAllUserVideos, getFolderInfo, getWorkspaceFolders, getWorkSpaces, verifyAcessToWorkspace } from '@/app/dashboard/action/workspace'
import {
             dehydrate,
             HydrationBoundary,
             QueryClient,
} from '@tanstack/react-query'
import Sidebar from '@/components/global/sidebar'
import GlobalHeader from '@/components/global/global-header'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

type Props = { 
  params: { workspaceId: string }, 
  children: React.ReactNode 
}

const layout = async ({ params: { workspaceId }, children }: Props) => {
  
    const auth = await onAuthenticateUser()
  
    if (!auth.user?.workspace) {
        return (
            <div>
                <h1>Um tera workspace nahi bana to kya karna hai dekhle, ye error hai</h1>
                <button onClick={() => redirect('/auth/sign-in')}>sign in wapis karle</button>
            </div>
        )
    }
    if (!auth.user.workspace.length) return (
        <div>
            <p>`tera workspace exist karta, per length 0 hai. `</p>
            <button onClick={() => redirect('/auth/sign-in')}>sign in wapis karle</button>
        </div>
    )
    const hasAccess = await verifyAcessToWorkspace(workspaceId)
// //console.log(hasAccess.status)
    if(hasAccess.status !==200){
      //console.log('notacessdashboard')
        redirect(`/dashboard/${auth.user.workspace[0].id}`)
    }

    if(!hasAccess.data?.workspace){
        return 'bhai ese to hack na ho raha, in sabh ke liye alag alag if banae hai bekar panti wale'
    }

    const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ['workspace-folders'],
    queryFn: () => getWorkspaceFolders(workspaceId),
  })

  await query.prefetchQuery({
    queryKey: ['user-videos'],
    queryFn: () => getAllUserVideos(workspaceId),
  })

  await query.prefetchQuery({
    queryKey: ['user-workspaces'],
    queryFn: () => getWorkSpaces(),
  })

  await query.prefetchQuery({
    queryKey: ['user-notifications'],
    queryFn: () => getNotifications(),
    })
  await query.prefetchQuery({
    queryKey: ['all_Video'],
    queryFn: () => getAllVideo(),
    })

  
// ab kya itna timewaste karu vo ghatiya ki cheezo ke liye. bhai sahab. dekh raho ho kya chal raha hai tum logo ko behudi wali feelings dene ke liye. marketing bhi iski sahi karo. chumtiya pa cheezo ko pagalpanti define kar rahe. in sabh me time waste na karke kam ki cheezo me karo!!!!!!!!!!!. jabh screen recorder bola hai to screen recorder hi chaiye. ab uske liye sign in wagera karne ki zarurat nahi
  return (
            <HydrationBoundary state={dehydrate(query)}>
              <div className="flex   h-screen w-screen">
      <ResizablePanelGroup className="" direction="horizontal">     

          
          <ResizablePanel defaultSize={79}>
              <div className="w-full h-screen  overflow-y-scroll overflow-x-hidden ">
                <div className=' '>{children}</div>
              </div>
                        </ResizablePanel>
          <ResizableHandle color='r' className="bg-r  " />
                <Sidebar activeWorkspaceId={workspaceId}/>
                      </ResizablePanelGroup>
      </div>
            </HydrationBoundary>
        )
}

export default layout