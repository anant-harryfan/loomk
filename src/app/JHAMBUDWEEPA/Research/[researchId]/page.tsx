import React from 'react'

type Props = {
    params: { researchId: string },
}

const page = ({params:{researchId}}: Props) => {
  return (
    <div>page</div>
  )
}

export default page