import React from 'react'

function UseMemoDemo({ person }: { person: any }) {
  console.info('UseMemoDemo rendering...')

  return (
    <>
      <h1>UseMemoDemo</h1>
      <div>{String(person)}</div>
    </>
  )
}

export default React.memo(UseMemoDemo)