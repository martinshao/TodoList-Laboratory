import * as React from 'react'
import { Theme, ThemeContextType } from '../@types/theme'

export const ThemeContext = React.createContext<ThemeContextType | null>(null)

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = React.useState<Theme>('light')

  return (
    <ThemeContext.Provider value={{ theme: themeMode, ChangeTheme: setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider