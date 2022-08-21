import React from 'react'

export default function UseRefDemo() {
  // <div> reference type
const divRef = React.useRef<HTMLDivElement>(null);

// <button> reference type
const buttonRef = React.useRef<HTMLButtonElement>(null);

// <br /> reference type
const brRef = React.useRef<HTMLBRElement>(null);

// <a> reference type
const linkRef = React.useRef<HTMLLinkElement>(null);

  return (
    <div>UseRefDemo</div>
  )
}
