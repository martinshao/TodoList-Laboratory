import { useEffect, useLayoutEffect } from 'react'

export default function Child(
  { name, children }: { name: string, children?: React.ReactElement }
) {
  console.info(`Child ${name} mount...`)

  useEffect(() => {
    console.info(`child ${name}'s effect runing`)
    return () => console.info(`child ${name}'s effect clear`)
  })

  useLayoutEffect(() => {
    console.info(`child ${name}'s layoutEffect runing`)
    return () => console.info(`child ${name}'s layoutEffect clear`)
  })

  return (
    <div>
      <div>Child {name}</div>
      {children}
    </div>
  )
}
