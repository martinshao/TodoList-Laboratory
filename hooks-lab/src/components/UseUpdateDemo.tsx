
import React from 'react';
import useUpdate from '../hooks/useUpdate'


const UseUpdateDemo: React.FC<any> = (props) => {
  const update = useUpdate();

  return (
    <div style={{ padding: 50 }}>
      <div>时间：{Date.now()}</div>
      <button color='primary' onClick={update}>更新时间</button>
    </div>
  );
}

export default UseUpdateDemo;