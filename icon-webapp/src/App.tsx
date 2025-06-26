
import { LoginPage } from './pages/Login/LoginPage'
import { Dashboard } from './pages/Dashboard'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
)
}

export default App
