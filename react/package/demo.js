let currentlyRenderingFiber = {}

const hook1 = {
  memoizedState: null,
  baseState: 'hook1',
  baseQueue: null,
  queue: null,
  next: null,
};

currentlyRenderingFiber.memoizedState = workInProgressHook = hook1;

const hook2 = {
  memoizedState: null,
  baseState: 'hook2',
  baseQueue: null,
  queue: null,
  next: null,
};

workInProgressHook = workInProgressHook.next = hook2;

let a = {
  n: 2
}

let b = a

a.x = a = {
  l: 2
}

a.l = 3

console.info(a, b)
console.info(b.x === a)

// a = { l: 2 }
// b = { n: 2, x: { l: 2 } }

let x = 1
let y = 2
let z = 3

x = y = z