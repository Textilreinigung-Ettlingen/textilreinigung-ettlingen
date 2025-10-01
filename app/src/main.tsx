import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './modules/App.js'
import './styles/theme.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
