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
