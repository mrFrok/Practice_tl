import { useState, useEffect } from 'react'
import { API } from '../api'
import { create, update, remove } from './crud'

// Особый редактор Hero-блока: тексты секции + вложенная статистика.
// Тексты сохраняются через /api/hero/, статистика — через /api/stats/.
function HeroEditor() {
  const [hero, setHero] = useState(null)
  const [status, setStatus] = useState('')

  const load = () =>
    fetch(`${API}/hero/`)
      .then((r) => r.json())
      .then((d) => setHero(d[0]))
  useEffect(() => {
    load()
  }, [])

  const flash = (msg) => {
    setStatus(msg)
    setTimeout(() => setStatus(''), 1600)
  }

  if (!hero) return <div className="adm-block">Загрузка…</div>

  const saveHero = async () => {
    try {
      await update('hero', hero.id, { title: hero.title, subtitle: hero.subtitle })
      flash('Сохранено ✓')
    } catch {
      flash('Ошибка сохранения')
    }
  }

  const setStat = (id, name, value) =>
    setHero({ ...hero, stats: hero.stats.map((s) => (s.id === id ? { ...s, [name]: value } : s)) })

  const saveStat = async (s) => {
    await update('stats', s.id, s)
    flash('Статистика сохранена ✓')
  }

  const delStat = async (s) => {
    await remove('stats', s.id)
    load()
  }

  const addStat = async () => {
    await create('stats', { hero: hero.id, value: '—', label: 'подпись', order: hero.stats.length + 1 })
    load()
  }

  return (
    <div className="adm-block">
      <div className="adm-block__head">
        <h2>Hero-блок</h2>
        <span className="adm-status">{status}</span>
      </div>

      <div className="adm-card">
        <label className="adm-field">
          <span>Заголовок</span>
          <input value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
        </label>
        <label className="adm-field">
          <span>Слоган (каждая строка — с новой строки)</span>
          <textarea
            rows={3}
            value={hero.subtitle}
            onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
          />
        </label>
        <div className="adm-card__actions">
          <button className="adm-btn" onClick={saveHero}>
            Сохранить
          </button>
        </div>
      </div>

      <h3 className="adm-subhead">Статистика</h3>
      <div className="adm-items">
        {hero.stats.map((s) => (
          <div key={s.id} className="adm-card adm-card--row">
            <label className="adm-field">
              <span>Значение</span>
              <input value={s.value} onChange={(e) => setStat(s.id, 'value', e.target.value)} />
            </label>
            <label className="adm-field">
              <span>Подпись</span>
              <input value={s.label} onChange={(e) => setStat(s.id, 'label', e.target.value)} />
            </label>
            <div className="adm-card__actions">
              <button className="adm-btn" onClick={() => saveStat(s)}>
                Сохранить
              </button>
              <button className="adm-btn adm-btn--danger" onClick={() => delStat(s)}>
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="adm-btn adm-btn--add" onClick={addStat}>
        + Добавить строку статистики
      </button>
    </div>
  )
}

export default HeroEditor
