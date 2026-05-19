import React, { memo } from 'react'

function Name({name}:{name: string}) {
  console.info('MemoName rendering...')
  return (
    <h4>Name: {name}</h4>
  )
}

export default memo(Name)