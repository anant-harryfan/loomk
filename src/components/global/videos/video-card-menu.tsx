
import React, { useRef, useState } from 'react'
import Modal from '../modal';
import { Move } from 'lucide-react';
import ChangeVideoLocation from '../change-videolocation/ChangeVideoLocation';

type Props = {
  videoId: string;
  currentWorkspace: string
  currentFolder?: string
  currentFolderName?: string
}

const CardMenu = ({
  videoId,
  currentWorkspace,
  currentFolder,
  currentFolderName
}: Props) => {
  const [w, setw] = useState('')
  return (

    <Modal className='flex items-center justify-center cursor-pointer  '
    title='Tera Bap'
      description='AI SAAS Realtime Video Sharing + Desktop App: AWS, Cloudfront, Nextjs, Electron, Express, Socket.io'
      trigger={
        <Move
        size={20}
        fill='#a4a4a4'
        className='text-[#a4a4a4] flex justify-center items-center'
        />
      }
      
      size=''
    >
      <ChangeVideoLocation currentFolder={currentFolder}
        currentFolderName={currentFolderName}
        currentWorkSpace={currentWorkspace}
        videoId={videoId} />

    </Modal>
  )
}

export default CardMenu