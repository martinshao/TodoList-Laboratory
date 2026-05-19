console.log('start');

setTimeout(() => {
  console.log('timeout 1');

  Promise.resolve().then(() => {
    console.log('promise 1-1');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('promise 1');
});

setTimeout(() => {
  console.log('timeout 2');

  Promise.resolve().then(() => {
    console.log('promise 2-1');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('promise 2');
});

console.log('end');

export const MAX_COUNT = 1