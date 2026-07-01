import { API } from '../api'

// Небольшие обёртки над fetch для операций CRUD через REST API.
async function req(url, options) {
  const res = await fetch(url, options)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.status === 204 ? null : res.json()
}

export const list = (endpoint) => req(`${API}/${endpoint}/`)

export const create = (endpoint, data) =>
  req(`${API}/${endpoint}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

export const update = (endpoint, id, data) =>
  req(`${API}/${endpoint}/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

export const remove = (endpoint, id) =>
  req(`${API}/${endpoint}/${id}/`, { method: 'DELETE' })
