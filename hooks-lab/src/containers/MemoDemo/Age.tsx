import React from 'react';

function Age({ age }: { age: number }) {
  console.info('Age rendering...')
  return <h3>Age: {age}</h3>;
}

export default Age;
