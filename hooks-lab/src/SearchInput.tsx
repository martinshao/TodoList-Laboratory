import React, { useCallback, useEffect, useState } from 'react'

function SearchInput() {
  const [inputValue, setInputValue] = useState<string>('')
  const [outputValue, setOutputValue] = useState<string>('')

  const DELAY_TIME = 500

  const debounceSetOutput = useCallback(
    () => {
      const timer = setTimeout(() => {
        setOutputValue(inputValue)
      }, DELAY_TIME)

      return () => clearTimeout(timer)
    },
    [inputValue],
  )

  useEffect(() => {
    const cleanup = debounceSetOutput()
  
    return cleanup
  }, [inputValue, debounceSetOutput])
  
  

  return (
    <div>
      <label htmlFor="输入框">输入框</label>
      <input type="text"
        onChange={event => setInputValue(event.target.value)}
        placeholder='请输入内容.....'
      />
      <div>------------</div>
      <label htmlFor="output">防抖输出框：{`延迟 DELAY_TIME ${DELAY_TIME}ms显示：`}</label>
      <span>{outputValue || "没有内容"}</span>
    </div>
  )
}

export default SearchInput