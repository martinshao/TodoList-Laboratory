import React, { useState } from 'react'
import useInterval from '../hooks/useInterval'

const UseIntervalDemo: React.FC = () => {
  console.info('UseIntervalDemo start###########')
  const [count, setCount] = useState<number>(0)
  const [delay, setDelay] = useState<number>(1000)
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useInterval(() => setCount(count => ++count), isRunning ? delay : null)


  return (
    <>
      <div>{count}</div>
      {console.info('rendering$$$$$$$$$$$$$$$$$$$$')}
      <input type="number" value={delay} onChange={e => setDelay(parseInt(e.target.value))} />
      <button onClick={() => setIsRunning(isRunning => !isRunning)}>toggle</button>
    </>
  )
}

export default UseIntervalDemo