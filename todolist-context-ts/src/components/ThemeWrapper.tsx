import React from 'react'
import { Theme, ThemeContextType } from '../@types/theme'
import { ThemeContext } from '../context/themeContext'

interface ThemeWrapperProps {
  children: React.ReactNode
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const { theme, ChangeTheme } = React.useContext(ThemeContext) as ThemeContextType
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    ChangeTheme(event.target.value as Theme)
  }

  return (
    <div data-theme={theme}>
      <select name="toggleTheme" onChange={handleThemeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      {children}
    </div>
  )
}

export default ThemeWrapper