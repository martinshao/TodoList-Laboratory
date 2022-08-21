import { useEffect, useLayoutEffect } from 'react'

function Grandson(
  { name }: { name: string }
) {
  console.info(`Grandson ${name} mount...`)

  useEffect(() => {
    console.info(`grandson ${name}'s effect runing`)
    return () => console.info(`grandson ${name}'s effect clear`)
  })

  useLayoutEffect(() => {
    console.info(`grandson ${name}'s layoutEffect runing`)
    return () => console.info(`grandson ${name}'s layoutEffect clear`)
  })

  return <div>grandson {name}</div>
}

export default Grandson