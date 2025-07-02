
import VideoEditor from '@/components/Global/VideoEditor';

import React from 'react'

type Props = {
  params: {  workspaceId: string }
}

const page = async ({ params: { workspaceId } }: Props) => {



  return (
    <div>
 {/* {workspaceId} */}
        <VideoEditor workspaceId={workspaceId} />

      

    </div>
  )
}

export default page