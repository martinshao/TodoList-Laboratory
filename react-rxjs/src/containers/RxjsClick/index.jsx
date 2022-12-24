import React, { useEffect, useRef } from 'react';
import { fromEvent, scan, Observable, from, of } from 'rxjs';
import * as R from 'ramda'

export default function RxjsClick() {
  const click$ = useRef(null)
  // useEffect(() => {
  //   const click$ = fromEvent(
  //     document.getElementById('clickMe'),
  //     'click'
  //   ).subscribe((clickety) => console.log({ clickety }));
  //   return () => click$.unsubscribe();
  // }, []);

  useEffect(() => {
    const numbers = [2, 3, 4, 5];
    console.info(R.scan(R.multiply, 5, numbers))

    const ob1$ = new Observable(observer => {
      setTimeout(() => {
        observer.next(1)
      }, 2000);
    })

    const ob2$ = from([1,2,3])

    const ob3$ = of(1)

    console.info(ob1$, ob2$, ob3$)

    ob1$.subscribe(console.log)

    // ob2$.subscribe(x => console.log(x));

    click$.current = fromEvent(document, 'click')
      .pipe(scan((count) => count + 1, 5))
      .subscribe((count) => console.log(`Clicked ${count} times`));

    return () => click$.current.unsubscribe();
  }, []);

  return (
    <div>
      <button id='clickMe'>add</button>
      <button onClick={() => console.info(click$.current)}>show</button>
    </div>
  );
}
