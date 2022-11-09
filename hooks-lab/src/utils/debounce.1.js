// function debounce(fn, delay, immediate) {
//   const timerId = null
//   return function(...args) {
//     const context = this
//     if(immediate) {
//       fn.apply(context, args)
//       immediate = false
//     }
//     timerId && clearInterval(timerId)
//     timerId = setTimeout(() => {
//       fn.apply(context, args)
//     }, delay)
//   }
// }

// export default debounce

export const debounce = (fn, ms = 300) => {
  let timeoutId;
  return function (...args) {
    const context = this
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(context, args), ms);
  };
};