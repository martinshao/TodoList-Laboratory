import React from 'react'

function WifeAge({age}:{age: number}) {
  console.info('WifeAge rendering...')
  return (
    <div>WifeAge: {age}</div>
  )
}

export default WifeAge