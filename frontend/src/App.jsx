import { useState, useEffect } from 'react'
import { API } from './api'
import Header from './components/Header'
import Hero from './components/Hero'
import Advantages from './components/Advantages'
import Team from './components/Team'
import Vacancies from './components/Vacancies'
import Directions from './components/Directions'
import Benefits from './components/Benefits'

// App грузит hero один раз и передаёт его в Hero (слоган) и Advantages
// (статистика). Остальные блоки грузят свои данные сами.
function App() {
  const [hero, setHero] = useState(null)

  useEffect(() => {
    fetch(`${API}/hero/`)
      .then((res) => res.json())
      .then((data) => setHero(data[0]))
  }, [])

  return (
    <>
      <Header />
      <Hero hero={hero} />
      <Advantages stats={hero?.stats || []} />
      <Team />
      <Vacancies />
      <Directions />
      <Benefits />
      <footer className="footer">
        © {new Date().getFullYear()} TravelLine Tech — учебный проект (летняя практика)
      </footer>
    </>
  )
}

export default App
