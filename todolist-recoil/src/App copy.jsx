import React from 'react'

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'

import './App.css'

const textState = atom({
  key: 'textState',
  default: '',
})

const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState)
    return text.length
  }
})

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}

function CharacterCounter(props) {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  )
}

function TextInput(props) {
  const [text, setText] = useRecoilState(textState)

  const onChange = (event) => {
    setText(event.target.value)
  }
  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  )
}

function CharacterCount(props) {
  const count = useRecoilValue(charCountState)
  return (
    <>Character Count: {count}</>
  )
}

export default App;
