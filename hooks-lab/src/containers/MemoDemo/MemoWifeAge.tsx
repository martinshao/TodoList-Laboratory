import React, { memo } from 'react'

function WifeAge({age}:{age: number}) {
  console.info('MemoWifeAge rendering...')
  return (
    <div>WifeAge: {age}</div>
  )
}

export default memo(WifeAge)