import Header from './components/Header'
import PomodoroTimer from './components/PomodoroTimer'

import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-screen h-screen flex flex-col p-4">
        <Header />
        <PomodoroTimer />
      </div>
    </ThemeProvider>
  )
}

export default App
