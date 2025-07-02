import { Spinner } from '@/components/global/loader/spinner'
import React from 'react'

type Props = {}

const loading = (props: Props) => {
  return (
      <div className="flex h-screen w-full justify-center items-center">
          <Spinner />
      </div>
  )
}

export default loading