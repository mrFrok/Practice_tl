import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BLOCKS } from './config'
import HeroEditor from './HeroEditor'
import BlockEditor from './BlockEditor'
import './admin.css'

const TABS = [{ key: 'hero', title: 'Hero-блок' }, ...BLOCKS.map((b) => ({ key: b.key, title: b.title }))]

function Admin() {
  const [active, setActive] = useState('hero')
  const block = BLOCKS.find((b) => b.key === active)

  return (
    <div className="adm">
      <aside className="adm__side">
        <div className="adm__brand">
          <img src="/tl-logo.svg" alt="" />
          <span>Админка</span>
        </div>
        <nav className="adm__nav">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`adm__tab ${active === t.key ? 'is-active' : ''}`}
              onClick={() => setActive(t.key)}
            >
              {t.title}
            </button>
          ))}
        </nav>
        <Link className="adm__back" to="/">
          ← Открыть сайт
        </Link>
      </aside>

      <main className="adm__main">
        <p className="adm__hint">
          Измените содержимое и нажмите «Сохранить» — обновите публичную страницу, и правки
          появятся сразу.
        </p>
        {active === 'hero' ? <HeroEditor /> : <BlockEditor block={block} />}
      </main>
    </div>
  )
}

export default Admin
