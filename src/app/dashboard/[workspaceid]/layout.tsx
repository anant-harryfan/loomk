import React from 'react'
import { getNotifications, onAuthenticateUser } from '@/app/action/user'
import { redirect } from 'next/navigation'
import { getAllUserVideos, getWorkspaceFolders, getWorkSpaces, verifyAcessToWorkspace } from '@/app/action/workspace'
import {
             dehydrate,
             HydrationBoundary,
             QueryClient,
} from '@tanstack/react-query'
import Sidebar from '@/components/global/sidebar'
import GlobalHeader from '@/components/global/global-header'

type Props = { 
  params: { workspaceid: string }, 
  children: React.ReactNode 
}

const layout = async ({ params: { workspaceid }, children }: Props) => {
  
    const auth = await onAuthenticateUser()
  
    if (!auth.user?.workspace) {
        return (
            <div>
                <h1>Um tera workspace nahi bana to kya karna hai dekhle, ye error hai</h1>
                <button onClick={() => redirect('/auth/sign-in1')}>sign in wapis karle</button>
            </div>
        )
    }
    if (!auth.user.workspace.length) return (
        <div>
            <p>`tera workspace exist karta, per length 0 hai. `</p>
            <button onClick={() => redirect('/auth/sign-in2')}>sign in wapis karle</button>
        </div>
    )
    const hasAccess = await verifyAcessToWorkspace(workspaceid)
// console.log(hasAccess.status)
    if(hasAccess.status !==200){
      console.log('notacessdashboard')
        redirect(`/DFDFSSDFDSF`)
    }

    if(!hasAccess.data?.workspace){
        return 'bhai ese to hack na ho raha, in sabh ke liye alag alag if banae hai bekar panti wale'
    }

    const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ['workspace-folders'],
    queryFn: () => getWorkspaceFolders(workspaceid),
  })

  await query.prefetchQuery({
    queryKey: ['user-videos'],
    queryFn: () => getAllUserVideos(workspaceid),
  })

  await query.prefetchQuery({
    queryKey: ['user-workspaces'],
    queryFn: () => getWorkSpaces(),
  })

  await query.prefetchQuery({
    queryKey: ['user-notifications'],
    queryFn: () => getNotifications(),
    })
  
// ab kya itna timewaste karu vo ghatiya ki cheezo ke liye. bhai sahab. dekh raho ho kya chal raha hai tum logo ko behudi wali feelings dene ke liye. marketing bhi iski sahi karo. chumtiya pa cheezo ko pagalpanti define kar rahe. in sabh me time waste na karke kam ki cheezo me karo!!!!!!!!!!!. jabh screen recorder bola hai to screen recorder hi chaiye. ab uske liye sign in wagera karne ki zarurat nahi
  return (
            <HydrationBoundary state={dehydrate(query)}>
              <div className="flex  h-screen w-screen">
                <Sidebar activeWorkspaceId={workspaceid}/>
          
              <div className="w-full  p-6 overflow-y-scroll overflow-x-hidden">
                <GlobalHeader workspace={hasAccess.data.workspace}/>
                <div className='mt-4'>{children}</div>
              </div>
      </div>
            </HydrationBoundary>
        )
}

export default layout