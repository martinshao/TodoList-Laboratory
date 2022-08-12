
import React,{ useState } from 'react'
import useMount from '../hooks/useMount';
import useUnmount from '../hooks/useUnmount'

const Child = () => {

  useMount(() => {
    window.alert('首次渲染')
  });

  useUnmount(() => {
    window.alert('组件已卸载')
  })

  return <div>你好，我是小杜杜</div>
}

const Index:React.FC<any> = (props)=> {
  const [flag, setFlag] = useState<boolean>(false)

  return (
    <div style={{padding: 50}}>
      <button color='primary' onClick={() => {setFlag(v => !v)}}>切换 {flag ? 'unmount' : 'mount'}</button>
      {flag && <Child />}
    </div>
  );
}

export default Index;