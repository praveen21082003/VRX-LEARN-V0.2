import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ToastProvider } from "./context/ToastProvider";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </AuthProvider>,
)
