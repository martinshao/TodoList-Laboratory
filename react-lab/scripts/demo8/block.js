function foo() {
  console.info(Math.random())
  foo()
}

foo()

// ----------------
function foo() {
  console.info(Math.random())
  return Promise.resolve().then(foo)
}

foo()

// -----------------
function foo() {
  console.info(Math.random())
  setTimeout(foo, 0)
}
foo()