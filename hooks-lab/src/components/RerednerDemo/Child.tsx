import React from 'react'

function Child(props: { log: () => void }) {
  console.info('Child rendering...')

  const { log } = props
  return (
    <div onClick={log}>Child</div>
  )
}

export default React.memo(Child)