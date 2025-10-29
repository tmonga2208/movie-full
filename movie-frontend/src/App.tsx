import './App.css'
import { ThemeProvider } from './components/theme-provider'
import RouteComp from './routes/route'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouteComp />
    </ThemeProvider>
  )
}

export default App
