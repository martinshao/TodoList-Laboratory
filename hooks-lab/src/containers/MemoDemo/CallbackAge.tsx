import React, { memo } from 'react'

function Age({ age, plus }: { age: number, plus: () => void }) {
  console.info('CallbackAge rendering...')
  return (
    <div>
      <button onClick={plus}>+</button>
      <h4>Age: {age}</h4>
    </div>
  );
}

export default memo(Age)