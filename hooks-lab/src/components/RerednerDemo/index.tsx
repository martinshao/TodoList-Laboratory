import { useCallback, useState } from 'react'
import Child from './Child'

const array = [1, 2, 3, 4, 5, 6, 7, 8]


export default function RerednerDemo() {
  console.info('RerednerDemo runing...')
  const [count, setcount] = useState(0)

  const handleClick = useCallback(
    () => {
      console.info('click run...')
    },
    [],
  )



  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setcount(count => count + 1)}>Count add</button>
      {
        array.map(item => <Child key={item} log={handleClick} />)
      }
    </div>
  )
}
