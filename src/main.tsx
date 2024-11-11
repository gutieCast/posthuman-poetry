import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/styles/main.scss";
import { Hero } from './components/hero/hero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main>
      <Hero />
    </main>
  </StrictMode>,
)
