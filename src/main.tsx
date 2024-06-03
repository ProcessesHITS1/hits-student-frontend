import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { LoginPage } from './components/login/Login'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <LoginPage />
  </React.StrictMode>,
)
