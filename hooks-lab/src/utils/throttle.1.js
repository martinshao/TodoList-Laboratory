function throttle(fn, delay, immediate) {
  let flag = false
  return function (...args) {
    const context = this
    if (immediate) {
      fn.apply(context, args)
      immediate = false
    }
    if (flag) {
      return
    }
    flag = true
    setTimeout(() => {
      fn.apply(context, args)
      flag =  false
    }, delay)
  }
}

export default throttle