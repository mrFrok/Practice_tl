// Hero получает данные из App (один запрос на /hero/ переиспользуется
// и здесь, и в блоке статистики). Видео + синий оверлей + слоган снизу-слева.
function Hero({ hero }) {
  // Слоган из БД может содержать переносы строк — разбиваем на строки,
  // как в оригинале (три строки заголовка через <br>).
  const lines = (hero?.subtitle || '').split('\n')

  return (
    <header className="hero" id="top">
      <video
        className="hero__video"
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {hero && (
        <h1 className="hero__title h1">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </h1>
      )}
    </header>
  )
}

export default Hero
