import React, { useState } from 'react'
import { useDebounce } from './test1'

function SearchBoxText() {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 300)
  return (
    <div>
      <input type="text" onChange={e => setValue(e.target.value)} />
      <span>{debouncedValue}</span>
    </div>
  )
}

export default SearchBoxText