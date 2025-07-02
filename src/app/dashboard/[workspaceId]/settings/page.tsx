'use client'
import { enableFirstView, getFirstView } from '@/app/dashboard/action/user'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {}

const SettingsPage = (props: Props) => {
    const [firstView, setFirstView] = useState<undefined | boolean > (undefined) 
    // const { setTheme, theme } = useTheme()

    useEffect(() => {
        if(firstView!==undefined) return
        const fetchData = async () => {
            const response = await getFirstView()
            if(response.status === 200) setFirstView(response?.data)
            }
                fetchData()
}, [firstView])

const switchState = async (checked: boolean)=>{
const view = await enableFirstView(checked)
if (view){
    { view.status !== 200 && toast('', {description: view.data}) }
    
}
}


  return (
    <div>



        <h2 className="text-2xl font-bold mt-4">Bore</h2>
        <p className='text-muted-foreground'>
            see the code not this
        </p>
        <Label className='flex items-center gap-x-3 mt-4 text-md'>
            First View
            <Switch
            onCheckedChange={switchState}
            disabled={firstView == undefined}
            checked={firstView} 
            onClick={()=>setFirstView(!firstView)}
            />
        </Label>
    </div>
  )
}

export default SettingsPage