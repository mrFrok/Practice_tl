import Reveal from './Reveal'

// Плашка со статистикой сразу под героем (с 2008 года / 300+ / 12 000+).
// Данные — те же hero.stats, что приходят с /hero/.
function Advantages({ stats = [] }) {
  if (stats.length === 0) return null

  return (
    <section className="advantages">
      <div className="advantages__inner container">
        {stats.map((stat, i) => (
          <Reveal key={stat.id} className="stat" delay={i * 120}>
            <div className="stat__value">{stat.value}</div>
            <div className="stat__label">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Advantages
