import { useEffect, useState } from 'react'

// Фиксированная шапка: прозрачная (белый текст) над видео-героем,
// а после прокрутки на высоту экрана — светлеет (тёмный текст, тень).
function Header() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${solid ? 'header--solid' : ''}`}>
      <div className="header__inner container">
        <a className="header__logo" href="#top">
          <img src="/tl-logo.svg" alt="" />
          <span>TravelLine</span>
        </a>
        <nav className="header__nav">
          <a href="#team">Команда</a>
          <a href="#vacancies">Вакансии</a>
          <a href="#directions">Направления</a>
          <a href="#benefits">Бонусы</a>
        </nav>
        <a className="header__cta" href="#vacancies">
          Присоединиться
        </a>
      </div>
    </header>
  )
}

export default Header
