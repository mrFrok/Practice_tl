import { useState, useEffect } from 'react'
import { API } from '../api'
import Reveal from './Reveal'

function Vacancies() {
  const [vacancies, setVacancies] = useState([])

  useEffect(() => {
    fetch(`${API}/vacancies/`)
      .then((res) => res.json())
      .then(setVacancies)
  }, [])

  return (
    <section className="section container container--s" id="vacancies">
      <Reveal>
        <h2 className="h-section vacancies__title dot">Ищем прямо сейчас</h2>
      </Reveal>
      <div className="vac-grid">
        {vacancies.map((vacancy, i) => (
          <Reveal key={vacancy.id} delay={i * 80}>
            <a className="vac-card" href={vacancy.url}>
              <h3 className="vac-card__title h-card">{vacancy.title}</h3>
              <p className="vac-card__format">{vacancy.format}</p>
              <span className="vac-card__link">Откликнуться →</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Vacancies
