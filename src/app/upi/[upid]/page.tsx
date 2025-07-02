import React from 'react'

type Props = {
    params: { upid: string }
}

const page = ({params:{upid}}: Props) => {
  return (
    <div>
      {upid}
    </div>
  )
}

export default page