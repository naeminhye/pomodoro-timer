import './App.css'
import Header from './components/Header'
import PomodoroTimer from './components/PomodoroTimer'

function App() {
  return (
    <div className="w-screen h-screen flex flex-col p-4">
      <Header />
      <PomodoroTimer />
    </div>
  )
}

export default App
