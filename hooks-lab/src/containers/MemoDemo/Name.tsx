import React from 'react'

function Name({name}:{name: string}) {
  console.info('Name rendering...')
  return (
    <h3>Name: {name}</h3>
  )
}

export default Name