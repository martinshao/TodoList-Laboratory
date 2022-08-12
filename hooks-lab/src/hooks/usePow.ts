import { useMemo, useRef } from 'react'

function usePow(value: number[]): number[] {
  // console.info('usePow runing...')
  const valueRef = useRef(value)

  console.info(valueRef.current === value)
  console.info('valueRef', valueRef.current)

  return useMemo(() => value.map(item => {
    console.info('calculate pow')
    return Math.pow(item, 2)
  }), [value])
}

export default usePow