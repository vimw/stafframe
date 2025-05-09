import React from 'react'

interface PageProps {
  params: {
    id: string
  }
}

const page = ({params: {id}}: PageProps) => {
  return (
    <div>{id}</div>
  )
}

export default page