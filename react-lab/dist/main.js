/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/createElement.js":
/*!******************************!*\
  !*** ./src/createElement.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement)\n/* harmony export */ });\nfunction createTextElement(text) {\n  return {\n    type: 'TEXT_ELEMENT',\n    props: {\n      nodeValue: text,\n      children: []\n    }\n  };\n}\n\nfunction createElement(type, props) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  return {\n    type,\n    props: { ...props,\n      children: children.map(child => {\n        return typeof child === 'object' ? child : createTextElement(child);\n      })\n    }\n  };\n}\n\n//# sourceURL=webpack://react-lab/./src/createElement.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./src/createElement.js\");\n\nwindow.DReact = {\n  createElement: _createElement__WEBPACK_IMPORTED_MODULE_0__.createElement,\n  render,\n  useState\n}; // 下一个工作单元\n\nlet nextUnitOfWork = null; // 当前工作的Fiber\n\nlet wipFiber = null; // 多个hook索引标识\n\nlet hookIndex = null; // react 双缓存技术 跟踪当前渲染的节点\n\nlet wipRoot = null; // 当前渲染树 最后准备提交的渲染树\n\nlet currentRoot = null; // 准备删除的节点树\n\nlet deletions = [];\n\nconst isNew = (prev, next) => key => prev[key] !== next[key];\n\nconst isProperty = key => key !== 'children';\n\nconst isGone = (prev, next) => key => !(key in next);\n\nconst isEvent = key => key.startsWith('on'); // initial 表示初始化参数 在本例中 intial = 1\n\n\nfunction useState(initial) {\n  // 是否有旧的hook，旧hook存储了上一次更新的hook\n  console.info(wipFiber);\n  const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex]; // 初始化hook hook的状态是旧hook的状态或者初始状态\n\n  const hook = {\n    state: oldHook ? oldHook.state : initial,\n    queue: []\n  };\n  console.info('oldHook', oldHook); // 从旧的hook 队列中获取所有的动作 然后将它们意义应用到新的hook的状态上\n\n  const actions = oldHook && oldHook.queue ? oldHook.queue : [];\n  actions.forEach(action => {\n    hook.state = action === null || action === void 0 ? void 0 : action(hook.state);\n  });\n\n  const setState = action => {\n    hook.queue.push(action);\n    wipRoot = {\n      dom: currentRoot.dom,\n      props: currentRoot.props,\n      alternate: currentRoot\n    };\n    nextUnitOfWork = wipRoot;\n    deletions = [];\n  };\n\n  wipFiber.hooks.push(hook);\n  hookIndex++;\n  return [hook.state, setState];\n}\n\nfunction createDom(fiber) {\n  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type);\n  updateDom(dom, {}, fiber.props);\n  return dom;\n}\n\nfunction updateDom(dom, prevProps, nextProps) {\n  // 删除旧属性\n  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(name => dom[name] = ''); // 更新新属性\n\n  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(name => {\n    dom[name] = nextProps[name];\n  }); // 删除旧的或者有变化的事件\n\n  Object.keys(prevProps).filter(isEvent).filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key)).forEach(name => {\n    const evnetType = name.toLowerCase().substring(2);\n    dom.removeEventListener(evnetType, prevProps[name]);\n  }); // 注册新事件\n\n  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(name => {\n    const evnetType = name.toLowerCase().substring(2);\n    dom.addEventListener(evnetType, nextProps[name]);\n  });\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom);\n  } else {\n    commitDeletion(fiber.child, domParent);\n  }\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork);\n  commitWork(wipRoot.child); // 双缓存对应的渲染树\n\n  currentRoot = wipRoot;\n  wipRoot = null;\n  console.info('commitRoot', currentRoot);\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return;\n  }\n\n  let domParentFiber = fiber.parent;\n\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent;\n  }\n\n  const domParent = domParentFiber.dom;\n\n  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {\n    domParent.appendChild(fiber.dom);\n  } else if (fiber.effectTag === 'UPDATE' && !fiber.dom !== null) {\n    updateDom(fiber.dom, fiber.alternate.props, fiber.props);\n  } else if (fiber.effectTag === 'DELETION') {\n    commitDeletion(fiber, domParent);\n  }\n\n  commitWork(fiber.child);\n  commitWork(fiber.sibling);\n}\n\nfunction render(element, container) {\n  // 第一个工作单元\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element]\n    },\n    // 判断链表中正在工作切换\n    alternate: currentRoot\n  };\n  nextUnitOfWork = wipRoot;\n}\n\nfunction workLoop(deadline) {\n  // 1. 获取任务\n  // 2. 执行任务\n  // 3. 将任务放入队列\n  // 4. 循环\n  // 5. 循环结束\n  // 6. 执行任务\n  // 判断是否应该停止循环\n  // 8.\n  let shouldYield = false; // 循环\n\n  console.info('nextUnitOfWork && !shouldYield');\n\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 如果当前任务的截止时间到了 停止工作循环 更高优先级的任务来了\n    // shouldYield = nextUnitOfWork.return\n    // 当前帧 因不再匀给你时间\n\n    console.info('**********deadline', deadline.timeRemaining());\n    console.info('**********tree', nextUnitOfWork);\n    shouldYield = deadline.timeRemaining() < 1;\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    // 提交阶段\n    commitRoot();\n  }\n\n  requestIdleCallback(workLoop);\n} // 告知浏览器的一个调度 (vue? microtask + macrotask)\n\n\nrequestIdleCallback(workLoop);\n\nfunction updateFunctionComponent(fiber) {\n  console.info('updateFunctionComponent');\n  wipFiber = fiber;\n  hookIndex = 0;\n  wipFiber.hooks = [];\n  const children = [fiber.type(fiber.props)];\n  console.info('updateFunctionComponent', wipFiber);\n  reconcileChildren(fiber, children);\n}\n\nfunction updateHostComponents(fiber) {\n  // 初始化渲染 Fiber dom => virtual dom\n  if (!(fiber !== null && fiber !== void 0 && fiber.dom)) {\n    fiber.dom = createDom(fiber);\n  } // react 代码 router\n\n\n  const children = fiber.props.children; // 真正的渲染页面的设置\n\n  reconcileChildren(fiber, children);\n} // 承载下一个工作单元\n\n\nfunction performUnitOfWork(fiber) {\n  // 判断一下当前节点是不是函数组件\n  const isFunctionComponent = fiber && fiber.type && fiber.type instanceof Function;\n\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber);\n  } else {\n    updateHostComponents(fiber);\n  }\n\n  if (fiber.child) {\n    return fiber.child;\n  }\n\n  let nextFiber = fiber;\n\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling;\n    }\n\n    nextFiber = nextFiber.parent;\n  }\n} // 所谓的 dom diff 变成真正的双向链表\n\n\nfunction reconcileChildren(wipFiber, elements) {\n  // fiber 根结点\n  let index = 0; // 没变化之前的节点\n\n  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;\n  let preSibling = null; // 遍历child\n\n  while (index < elements.length) {\n    // jsx -> fiber\n    const element = elements[index];\n    let newFiber = null;\n    const sameType = oldFiber && element && element.type === oldFiber.type; // 如果是同样的类型 就更新\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: 'UPDATE'\n      };\n    } // 如果节点类型不一致\n\n\n    if (!sameType && element) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: 'PLACEMENT'\n      };\n    } // 如果节点类型不一致，新的没有但是老的还在\n\n\n    if (!sameType && oldFiber) {\n      oldFiber.effectTag = 'DELETION';\n      deletions.push(oldFiber);\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling;\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber;\n    } else {\n      preSibling.sibling = newFiber;\n    } // js 模拟指针移动\n\n\n    preSibling = newFiber;\n    index++;\n  }\n}\n/** @jsx DReact.createElement */\n\n\nfunction Counter() {\n  const [state, setState] = DReact.useState(1);\n  return DReact.createElement(\"h1\", {\n    onClick: () => setState(c => c + 1)\n  }, \"Count: \", state);\n}\n\nconst element = DReact.createElement(Counter, null);\nconst container = document.getElementById('root');\nDReact.render(element, container);\n\n//# sourceURL=webpack://react-lab/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;