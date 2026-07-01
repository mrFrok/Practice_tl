import { useState, useEffect } from 'react'
import { list, create, update, remove } from './crud'

// Универсальный редактор блока-списка. Работает для любого блока по его
// конфигурации (endpoint + список полей) — одна реализация на все блоки.
function BlockEditor({ block }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('')

  const load = () => list(block.endpoint).then(setItems)
  useEffect(() => {
    load()
    setStatus('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.endpoint])

  const flash = (msg) => {
    setStatus(msg)
    setTimeout(() => setStatus(''), 1600)
  }

  const onField = (id, name, value) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [name]: value } : it)))

  const onSave = async (item) => {
    try {
      await update(block.endpoint, item.id, item)
      flash('Сохранено ✓')
    } catch {
      flash('Ошибка сохранения')
    }
  }

  const onDelete = async (item) => {
    if (!window.confirm('Удалить элемент?')) return
    await remove(block.endpoint, item.id)
    load()
  }

  const onAdd = async () => {
    const created = await create(block.endpoint, block.blank)
    setItems((prev) => [...prev, created])
    flash('Добавлено — отредактируйте поля')
  }

  return (
    <div className="adm-block">
      <div className="adm-block__head">
        <h2>{block.title}</h2>
        <span className="adm-status">{status}</span>
      </div>

      <div className="adm-items">
        {items.map((item) => (
          <div key={item.id} className="adm-card">
            {block.fields.map((f) => (
              <label key={f.name} className="adm-field">
                <span>{f.label}</span>
                <input
                  type={f.type || 'text'}
                  value={item[f.name] ?? ''}
                  onChange={(e) => onField(item.id, f.name, e.target.value)}
                />
              </label>
            ))}
            <div className="adm-card__actions">
              <button className="adm-btn" onClick={() => onSave(item)}>
                Сохранить
              </button>
              <button className="adm-btn adm-btn--danger" onClick={() => onDelete(item)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="adm-empty">Пока нет элементов.</p>}
      </div>

      <button className="adm-btn adm-btn--add" onClick={onAdd}>
        + Добавить элемент
      </button>
    </div>
  )
}

export default BlockEditor
