import { createElement } from './createElement'
window.DReact = {
  createElement,
  render,
}

function render(element, container) {
  // 递归解决了很多开发中问题 render/diff/koa-compose async/await
  // 1. 蹦床函数 一定不爆栈 尾调用优化 EC 拉平 while 循环
  // 2. 尾调用优化
  // 3. while 循环优化，V8 10000 for O(n) 面向错误
  // 4. 遍历树 while 深度优先 广度优先
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type)
  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  element.props.children.forEach(child => {
    render(child, dom)
  })

  container.appendChild(dom)
}

function workLoop() {
  // 1. 获取任务
  // 2. 执行任务
  // 3. 将任务放入队列
  // 4. 循环
  // 5. 循环结束
  // 6. 执行任务
  // 判断是否应该停止循环
  // 8.
  let shouldYield = false
  // 循环
  while (!shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // 如果当前任务的截止时间到了 停止工作循环 更高优先级的任务来了
    // shouldYield = nextUnitOfWork.return
    // 当前帧 因不再匀给你时间
    shouldYield = deadline.timeRemaining() < 1

  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork() {
  
}

/** @jsx DReact.createElement */
const element = (
  <div id="foo">
    <a href="https://www.baidu.com">baidu</a>
    <br />
    <b>111</b>
  </div>
)
const container = document.getElementById('root')
console.info(element)
DReact.render(element, container)
