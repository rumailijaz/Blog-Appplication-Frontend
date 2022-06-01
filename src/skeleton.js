import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const skeleton = () => {
  return (
    <div>
        <Skeleton count={5} height={30}/>
    </div>
  )
}

export default skeleton