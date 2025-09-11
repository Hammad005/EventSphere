import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/ui/theme-provider'

createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme="dark" storageKey="EventSphere-theme">
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ThemeProvider>
)
