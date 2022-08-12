import { createElement } from './createElement'
window.DReact = {
  createElement,
  render,
  useState,
}

// 下一个工作单元
let nextUnitOfWork = null
// 当前工作的Fiber
let wipFiber = null
// 多个hook索引标识
let hookIndex = null
// react 双缓存技术 跟踪当前渲染的节点
let wipRoot = null
// 当前渲染树 最后准备提交的渲染树
let currentRoot = null
// 准备删除的节点树
let deletions = []

const isNew = (prev, next) => key => prev[key] !== next[key]
const isProperty = key => key !== 'children'
const isGone = (prev, next) => key => !(key in next)
const isEvent = key => key.startsWith('on')

// initial 表示初始化参数 在本例中 intial = 1
function useState(initial) {
  // 是否有旧的hook，旧hook存储了上一次更新的hook
  console.info(wipFiber)
  const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex]
  // 初始化hook hook的状态是旧hook的状态或者初始状态
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  }
  console.info('oldHook', oldHook)
  // 从旧的hook 队列中获取所有的动作 然后将它们意义应用到新的hook的状态上
  const actions = oldHook && oldHook.queue ? oldHook.queue : []
  actions.forEach(action => {
    hook.state = action?.(hook.state)
  })
  const setState = (action) => {
    hook.queue.push(action)
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }
  wipFiber.hooks.push(hook)
  hookIndex++
  return [hook.state, setState]
}

function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type)
  updateDom(dom, {}, fiber.props)
  return dom
}

function updateDom(dom, prevProps, nextProps) {
  // 删除旧属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => dom[name] = '')

  // 更新新属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })

  // 删除旧的或者有变化的事件
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const evnetType = name.toLowerCase().substring(2)
      dom.removeEventListener(evnetType, prevProps[name])
    })

  // 注册新事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const evnetType = name.toLowerCase().substring(2)
      dom.addEventListener(evnetType, nextProps[name])
    })

}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}

function commitRoot() {
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  // 双缓存对应的渲染树
  currentRoot = wipRoot
  wipRoot = null
  console.info('commitRoot', currentRoot)
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }

  let domParentFiber = fiber.parent
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'UPDATE' && !fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber, domParent)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
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

    console.info('**********deadline', deadline.timeRemaining())
    console.info('**********tree', nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  if (!nextUnitOfWork && wipRoot) {
    // 提交阶段
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

// 告知浏览器的一个调度 (vue? microtask + macrotask)
requestIdleCallback(workLoop)

function updateFunctionComponent(fiber) {
  console.info('updateFunctionComponent')
  wipFiber = fiber
  hookIndex = 0
  wipFiber.hooks = []
  const children = [fiber.type(fiber.props)]
  console.info('updateFunctionComponent', wipFiber)
  reconcileChildren(fiber, children)
}

function updateHostComponents(fiber) {
  // 初始化渲染 Fiber dom => virtual dom
  if (!fiber?.dom) {
    fiber.dom = createDom(fiber)
  }

  // react 代码 router
  const children = fiber.props.children
  // 真正的渲染页面的设置
  reconcileChildren(fiber, children)
}

// 承载下一个工作单元
function performUnitOfWork(fiber) {
  // 判断一下当前节点是不是函数组件
  const isFunctionComponent = fiber && fiber.type && fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponents(fiber)
  }

  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

// 所谓的 dom diff 变成真正的双向链表
function reconcileChildren(wipFiber, elements) {
  // fiber 根结点
  let index = 0
  // 没变化之前的节点
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child
  let preSibling = null
  // 遍历child
  while (index < elements.length) {
    // jsx -> fiber
    const element = elements[index]
    let newFiber = null
    const sameType = oldFiber && element && element.type === oldFiber.type;
    // 如果是同样的类型 就更新
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
    }
    // 如果节点类型不一致
    if (!sameType && element) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      }
    }
    // 如果节点类型不一致，新的没有但是老的还在
    if (!sameType && oldFiber) {
      oldFiber.effectTag = 'DELETION'
      deletions.push(oldFiber)
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    if (index === 0) {
      wipFiber.child = newFiber
    } else {
      preSibling.sibling = newFiber
    }
    // js 模拟指针移动
    preSibling = newFiber
    index++
  }
}

/** @jsx DReact.createElement */
function Counter() {
  const [state, setState] = DReact.useState(1)
  return (
    <h1 onClick={() => setState(c => c + 1)}>Count: {state}</h1>
  )
}

const element = <Counter />
const container = document.getElementById('root')
DReact.render(element, container)