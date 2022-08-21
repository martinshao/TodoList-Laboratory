import React, { useRef, useState } from 'react'
import { FrowardFancyInput } from '../components/FancyInputRef';

type BB = React.ComponentProps<typeof FrowardFancyInput>

function UseImhDemo() {
  const fancyInputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>('')

  const focus = () => {
    fancyInputRef.current?.focus()
  }


  return (
    <div>
      <h1>{value}</h1>
      <button onClick={focus}>focus</button>
      {/* <button onClick={() => fancyInputRef.current?.log()}>Log</button> */}
      <FrowardFancyInput
        name={'name'}
        label={'姓名'}
        ref={fancyInputRef}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
      />
    </div>
  )
}

export default UseImhDemo