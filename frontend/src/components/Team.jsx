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
      <Reveal className="team__strip">
        {team.map((member) => (
          <article key={member.id} className="team-card">
            <img
              className="team-card__photo"
              src={member.photo}
              alt={member.name}
            />
            <div className="team-card__body">
              <div className="team-card__name">{member.name}</div>
              <div className="team-card__role">{member.position}</div>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  )
}

export default Team
