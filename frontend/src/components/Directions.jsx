import { useState, useEffect } from 'react'
import { API } from '../api'
import Reveal from './Reveal'

function Directions() {
  const [directions, setDirections] = useState([])

  useEffect(() => {
    fetch(`${API}/directions/`)
      .then((res) => res.json())
      .then(setDirections)
  }, [])

  return (
    <section className="section container container--s" id="directions">
      <Reveal className="section__head" as="header">
        <h2 className="h-section">Направления</h2>
      </Reveal>
      <div className="grid">
        {directions.map((direction, i) => (
          <Reveal key={direction.id} delay={i * 80}>
            <article className="card">
              <h3 className="card__title h-card">{direction.name}</h3>
              <p className="card__text">{direction.description}</p>
              <p className="card__tags">{direction.technologies}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Directions
