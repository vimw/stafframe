import React from 'react'

interface Props {
  params: Promise<{id: number}>
}


const page = async ({params}: Props) => {
  const {id} = await params

  return (
    <div>{id}</div>
  )
}

export default page