import React, { useCallback, useState } from 'react';
import Name from './Name';
import Age from './Age';
import MemoName from './MemoName';
import MemoAge from './MemoAge';
import CallbackAge from './CallbackAge';
// import WifeAge from './WifeAge';
// import MemoWifeAge from './MemoWifeAge';

function MemoDemo() {
  console.info('MemoDemo rendering...')
  const [age, setAge] = useState<number>(30);
  const [name, setName] = useState<string>('Martin');

  const onNameChange = (value: { target: { value: React.SetStateAction<string>; }; }) => setName(value.target.value)
  
  const plusAge = () => setAge(prev => prev + 1)

  const minusAge = useCallback(
    () => setAge(prev => prev - 1),
    [],
  )
  

  // const wifeAge = age - 8

  return (
    <div>
      <div>
        <span>name</span>
        <input
          type='text'
          value={name}
          onChange={onNameChange}
        />
      </div>
      <div>
        <span>age</span>
        <input
          type='number'
          name='age'
          id='age'
          value={age}
          onChange={(value) => setAge(Number(value.target.value))}
        />
      </div>

      {/* <Name name={name} />
      <Age age={age} /> */}

      {/* <MemoName name={name} /> */}
      <MemoAge plus={plusAge} age={age} />
      <CallbackAge plus={minusAge} age={age} />

      {/* <WifeAge age={wifeAge} />
      <MemoWifeAge age={wifeAge} /> */}
    </div>
  );
}

export default MemoDemo;
