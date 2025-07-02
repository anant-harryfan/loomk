import React from 'react'
import { onAuthenticateUser } from './action/user'
import { redirect } from 'next/navigation'

type Props = {}

const DashboardPage = async (props: Props) => {
    const auth = await onAuthenticateUser()
    


    if (auth.status === 201 || auth.status === 200) {
        
        const user = auth.user;
        return redirect(`/dashboard/${user?.workspace[0].id}`)
    }

    return redirect('/auth/DashboardPageReturn')
}

export default DashboardPage