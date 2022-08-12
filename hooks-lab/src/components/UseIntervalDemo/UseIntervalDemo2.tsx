import React, { useState } from 'react'
import useInterval from '../../hooks/useInterval'

const UseIntervalDemo: React.FC = () => {
  const [count, setCount] = useState<number>(0)
  const [delay, setDelay] = useState<number>(1000)

  useInterval(() => setCount(count => ++count), delay)


  return (
    <>
      <div>{count}</div>
      <input type="number" value={delay} onChange={e => setDelay(parseInt(e.target.value))} />
    </>
  )
}

export default UseIntervalDemo