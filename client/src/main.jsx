import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { AuthContextProvider } from './context/AuthContext.jsx'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        < App />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,    
)
