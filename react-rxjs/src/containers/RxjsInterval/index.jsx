import React from 'react';
import { useObservable } from 'rxjs-hooks';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

export default function RxjsInterval() {
  const value = useObservable(() => interval(500).pipe(map((val) => val * 3)));

  return (
    <div className='App'>
      <h1>Incremental number: {value}</h1>
    </div>
  );
}
