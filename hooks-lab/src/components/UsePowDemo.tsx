import React, { useState } from 'react'
import usePow from '../hooks/usePow'

const UsePowDemo: React.FC = () => {

  const [flag, setFlag] = useState<boolean>(true)
  const [arr, setArr] = useState([1, 2, 3])
  const data = usePow(arr)

  return (
    <div>
      <div>origin{JSON.stringify(arr)}</div>
      <div>数字：{JSON.stringify(data)}</div>
      <button onClick={() => setArr(arr => arr.map(item => item + 1))}>step one</button>
      <button color='primary' onClick={() => { setFlag(v => !v) }}>切换</button>
      <div>切换状态：{JSON.stringify(flag)}</div>
    </div>
  )
}

export default UsePowDemo