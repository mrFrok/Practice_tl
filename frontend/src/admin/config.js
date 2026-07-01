// Описание блоков-списков для универсального редактора (принцип DRY:
// один компонент BlockEditor обслуживает все блоки по этой конфигурации).
export const BLOCKS = [
  {
    key: 'team',
    title: 'Команда',
    endpoint: 'team',
    fields: [
      { name: 'name', label: 'Имя' },
      { name: 'position', label: 'Должность' },
      { name: 'photo', label: 'Фото (путь, напр. /team/1.svg)' },
      { name: 'order', label: 'Порядок', type: 'number' },
    ],
    blank: { name: 'Новый сотрудник', position: 'Должность', photo: '/team/1.svg', order: 99 },
  },
  {
    key: 'vacancies',
    title: 'Вакансии',
    endpoint: 'vacancies',
    fields: [
      { name: 'title', label: 'Название' },
      { name: 'format', label: 'Формат' },
      { name: 'url', label: 'Ссылка' },
      { name: 'order', label: 'Порядок', type: 'number' },
    ],
    blank: { title: 'Новая вакансия', format: 'удалённо', url: '', order: 99 },
  },
  {
    key: 'directions',
    title: 'Направления',
    endpoint: 'directions',
    fields: [
      { name: 'name', label: 'Название' },
      { name: 'description', label: 'Описание' },
      { name: 'technologies', label: 'Технологии' },
      { name: 'order', label: 'Порядок', type: 'number' },
    ],
    blank: { name: 'Новое направление', description: '', technologies: '', order: 99 },
  },
  {
    key: 'benefits',
    title: 'Бонусы',
    endpoint: 'benefits',
    fields: [
      { name: 'title', label: 'Заголовок' },
      { name: 'description', label: 'Описание' },
      { name: 'order', label: 'Порядок', type: 'number' },
    ],
    blank: { title: 'Новый бонус', description: '', order: 99 },
  },
]
