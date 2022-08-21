import { useState } from 'react'
import Parent from './Parent'

function EffectOrderDemo() {
  const [counter, setCounter] = useState<number>(0)

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(count => count + 1)}>Add</button>
      <Parent />
    </>
  )
}

export default EffectOrderDemo