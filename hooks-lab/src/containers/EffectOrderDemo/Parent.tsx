import { useEffect } from "react"
import Child from "./Child"
import Grandson from "./Grandson"

function Parent() {
  console.info('Parent mount...')

  useEffect(() => {
    console.info(`Parent effect runing`)
    return () => console.info(`Parent effect clear`)
  })

  return (
    <div>
      <h1>Parent</h1>
      <Child name="A" />
      <Child name="B">
        <Grandson name="B" />
      </Child>
    </div>
  )
}

export default Parent