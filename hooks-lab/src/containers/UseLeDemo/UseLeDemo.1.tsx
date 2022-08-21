import { useEffect, useLayoutEffect, useState } from 'react'

function UseLeDemo() {
  console.info('%cUseLeDemo start rendering ...', 'color: gold')
  const [count, setCount] = useState<number>(0)
  const [step, setStep] = useState<number>(0)

  useEffect(() => {
    console.info('%cuseEffect start ...', 'color: deepskyblue')
    // let timer = setInterval(() => setCount(count => count + 1), 1000)

    return () => {
      console.info('useEffect start clear...')
      // clearInterval(timer)
    }
  }, [])

  useLayoutEffect(() => {
    console.info('%cuseLayoutEffect start ...', 'color: yellowgreen')
    // let timer = setInterval(() => setStep(step => step + 1), 1000)

    return () => {
      console.info('useLayoutEffect start clear...')
      // clearInterval(timer)
    }
  }, [])

  return (
    <>
      <h1>count is {count}</h1>
      <h1>step is {step}</h1>
      {console.info('%c------cUseLeDemo is rendering------', 'color: gold')}
    </>
  )
}

export default UseLeDemo