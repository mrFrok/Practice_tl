import { useState, useEffect } from 'react'
import { API } from '../api'
import Reveal from './Reveal'

function Team() {
  const [team, setTeam] = useState([])

  useEffect(() => {
    fetch(`${API}/team/`)
      .then((res) => res.json())
      .then(setTeam)
  }, [])

  return (
    <section className="section container container--s" id="team">
      <Reveal className="section__head" as="header">
        <h2 className="h-section">Любим и бережём свою команду</h2>
        <p className="section__desc">
          Люди, которые вдохновляют своими достижениями
        </p>
      </Reveal>
      <div className="grid">
        {team.map((member, i) => (
          <Reveal key={member.id} delay={i * 80}>
            <article className="card">
              <h3 className="card__title h-card">{member.name}</h3>
              <p className="card__text">{member.position}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Team
