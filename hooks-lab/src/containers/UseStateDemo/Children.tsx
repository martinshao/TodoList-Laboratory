import React from 'react';

function Children({ update, count }: { update: () => void; count: number[] }) {
  console.info('Children rerendering...');
  return (
    <div onClick={update}>
      {/* <h2>{count}</h2> */}
      <h2>
        <ul>
          {count.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </h2>
      <button>Children</button>
    </div>
  );
}

export default React.memo(Children);
