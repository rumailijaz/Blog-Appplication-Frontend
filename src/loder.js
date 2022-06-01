import React from 'react'
import { Spinner } from 'react-bootstrap'

const loader = () => {
  return (
    <div>
      <Spinner animation="border" variant="dark" /> 
    </div>
  )
}

export default loader