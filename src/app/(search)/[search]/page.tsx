import React from 'react'

type Props = {
    params: {search: string}
}

const page = ({params:{search}}: Props) => {
  return (
    <div>page</div>
  )
}

export default page