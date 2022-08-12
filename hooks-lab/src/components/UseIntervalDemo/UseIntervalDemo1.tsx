import React, { useState, useEffect, useRef } from 'react'

const UseIntervalDemo: React.FC = () => {
  const [count, setCount] = useState<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>()

  useEffect(() => {
    intervalRef.current = setInterval(() => setCount(count => ++count), 1000)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [setCount])

  console.info(intervalRef.current)


  return (
    <>
      <button onClick={() => !intervalRef.current && (intervalRef.current = setInterval(() => setCount(count => ++count), 1000))}>Continue</button>
      <button onClick={() => clearInterval(intervalRef.current)}>Pause</button>
      <div>{count}</div>
    </>
  )
}

export default UseIntervalDemo