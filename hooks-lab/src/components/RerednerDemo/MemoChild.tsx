import React from 'react'

function Child(props: { log: () => void }) {
  console.info('MemoChild rendering...')

  const { log } = props
  return (
    <h4 onClick={log}>Child</h4>
  )
}

export default React.memo(Child)