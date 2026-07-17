import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import App from './App.tsx'
import './index.css'

// A hello for anyone who opens DevTools — you're exactly who this is for.
console.log(
  `%c
   ▄▄▄     ▄▄   ▄▄
  ▐█ █▌    ██   ██   AYUSH GUPTA — a portfolio
  ▐█▄█▌    ██   ██   Product · Full-Stack · Infrastructure
  ▐█ █▌    ██▄▄▄██
  ▐█ █▌ ▄▄  ▀▀█▀▀    Hiring? → mailto:ayush2425.rk@gmail.com
                     Psst: ↑↑↓↓←→←→BA
`,
  'color:#e50914; font-family:monospace',
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
