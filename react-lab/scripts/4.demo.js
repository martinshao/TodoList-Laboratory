import { createElement } from './createElement'
window.DReact = {
  createElement,
  render,
}

function render(element, container) {
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
const element = <h1 title="foo">hello</h1>
const container = document.getElementById('root')
console.info(element)
ReactDOM.render(element, container)
