import { useEffect, useRef } from 'react'

function useInterval(callback: Function, delay: number | null) {
  console.info('useInterval delay', delay)
  const savedCallback = useRef<Function>()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    console.info('useEffect runing')
    function tick() {
      console.info('tick runing')
      savedCallback.current?.()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => {
        console.info('clearInterval runing')
        clearInterval(id)
      }
    }
  }, [delay])
}

export default useInterval