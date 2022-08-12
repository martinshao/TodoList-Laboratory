import React, { useState } from 'react'
import useCreation from '../hooks/useCreation'

const UseCreationDemo: React.FC = () => {

  const [, setFlag] = useState<boolean>(false)

  const getNowData = () => {
    return Math.random()
  }

  const nowData = useCreation(() => getNowData(), []);

  return (
    <div style={{ padding: 50 }}>
      <div>正常的函数：{getNowData()}</div>
      <div>useCreation包裹后的：{nowData}</div>
      <button color='primary' onClick={() => { setFlag(v => !v) }}> 渲染</button>
    </div>
  )
}

export default UseCreationDemo