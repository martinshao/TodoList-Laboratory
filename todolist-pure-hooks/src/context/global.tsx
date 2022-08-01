import { createContext, useContext } from 'react'

export type GlobalContent = {
  copy: string
  setCopy: (c: string) => void
}

export const MyGlobalContext = createContext<GlobalContent>({
  copy: 'hello',
  setCopy: () => { }
})

export const useGlobalContext = () => useContext(MyGlobalContext)