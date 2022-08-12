import { createElement } from './createElement'
window.DReact = {
  createElement,
  render,
}

function render(element, container) {
  // 第一个工作单元
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    // 判断链表中正在工作切换
    alternate: currentRoot,
  }
  nextUnitOfWork = wipRoot
}

// 下一个工作单元
let nextUnitOfWork = null
// react 双缓存技术 跟踪当前渲染的节点
let wipRoot = null
// 当前渲染树 最后准备提交的渲染树
let currentRoot = null

function workLoop(deadline) {
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
  console.info('nextUnitOfWork && !shouldYield')
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // 如果当前任务的截止时间到了 停止工作循环 更高优先级的任务来了
    // shouldYield = nextUnitOfWork.return
    // 当前帧 因不再匀给你时间

    console.info(' deadline', deadline.timeRemaining())
    console.info('tree', nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1

  }
  requestIdleCallback(workLoop)
}

// 告知浏览器的一个调度 (vue? microtask + macrotask)
requestIdleCallback(workLoop)

// 承载下一个工作单元
function performUnitOfWork(fiber) {
  // 初始化渲染 Fiber dom => virtual dom
  if (!fiber?.dom) { }

  // react 代码 router
  const elements = fiber.props.children
  // 真正的渲染页面的设置
  reconcileChildren(fiber, elements)
  if (fiber.child) {
    console.info('fiber.child', fiber)
    return fiber.child
  }

  console.info('***************')
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      console.info('----------')
      return nextFiber.sibling
    }
      console.info('nextFiber', nextFiber)
      nextFiber = nextFiber.parent
  }
}

// 所谓的 dom diff 变成真正的双向链表
function reconcileChildren(fiber, elements) {
  // fiber 根结点
  let index = 0
  // 没变化之前的节点
  let oldFiber = wipRoot.alternate && wipRoot.alternate.child
  let preSibling = null
  // 遍历child
  while (index < elements.length) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      dom: null,
      // 父节点
      parent: fiber,
      // 下一个节点
      sibling: null,
      // 子节点
      child: null,
      // 比较的时候用的
      alternate: oldFiber,
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      preSibling.sibling = newFiber
    }
    // js 模拟指针移动
    preSibling = newFiber
    index++
  }
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
