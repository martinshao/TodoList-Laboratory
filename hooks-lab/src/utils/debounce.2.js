function debounce(fn, delay) {
  var timer = null;
  return function (...args) {
    if (!timer) {
      fn && fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      timer = null;
    }, delay)
  }
}
