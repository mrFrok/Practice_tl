import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.jsx'
import Admin from './admin/Admin.jsx'

// Плавный инерционный скролл, как на travelline.tech.
const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Lenis отключает нативный smooth-scroll, поэтому клики по якорям в меню
// проводим через lenis.scrollTo — с отступом под фиксированную шапку.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]')
  if (!link) return
  const id = link.getAttribute('href')
  if (id.length <= 1) return
  const target = document.querySelector(id)
  if (target) {
    e.preventDefault()
    lenis.scrollTo(target, { offset: -80 })
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
