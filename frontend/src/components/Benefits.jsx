import { useState, useEffect } from 'react'
import { API } from '../api'
import Reveal from './Reveal'

// Разноцветные заголовки карточек — как в блоке «Плюшки» на travelline.
const COLORS = [
  '#a456c3',
  '#48af45',
  '#eb4836',
  '#6667d4',
  '#d86ab3',
  '#00a2bc',
  '#20a781',
  '#507bce',
]

function Benefits() {
  const [benefits, setBenefits] = useState([])

  useEffect(() => {
    fetch(`${API}/benefits/`)
      .then((res) => res.json())
      .then(setBenefits)
  }, [])

  return (
    <section className="section container container--s" id="benefits">
      <Reveal>
        <h2 className="h-section" style={{ marginBottom: '40px' }}>
          Плюшки и всё такое
        </h2>
      </Reveal>
      <div className="grid">
        {benefits.map((benefit, i) => (
          <Reveal key={benefit.id} delay={i * 80}>
            <article className="card">
              <h3
                className="bonus-card__title h-card"
                style={{ color: COLORS[i % COLORS.length] }}
              >
                {benefit.title}
              </h3>
              <p className="bonus-card__text">{benefit.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Benefits
