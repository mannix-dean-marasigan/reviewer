import { useSyncExternalStore } from 'react'

export interface WrongItem { lesson: string; idx: number; at: number; count: number }
export interface State {
  done: Record<string, number> // lessonId -> best quiz % (completed when >=0)
  watched: Record<string, true>
  wrong: Record<string, WrongItem> // key lesson:idx
  mocks: { at: number; score: number; total: number; secs: number; bySubject: Record<string, [number, number]> }[]
  minutes: Record<string, number> // yyyy-mm-dd -> minutes studied
  startDate: string | null
  checks: Record<string, true> // plan checklist
  essays: Record<string, string>
  drills: { at: number; kind: string; score: number; total: number }[]
}

const KEY = 'uap-prep-v1'
const empty: State = { done: {}, watched: {}, wrong: {}, mocks: [], minutes: {}, startDate: null, checks: {}, essays: {}, drills: [] }

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...empty, ...JSON.parse(raw) }
  } catch { /* storage may be unavailable */ }
  return { ...empty }
}

let state: State = load()
const subs = new Set<() => void>()

export function update(fn: (s: State) => State) {
  state = fn(state)
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignore */ }
  subs.forEach(f => f())
}
export function useStore(): State {
  return useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => state)
}
export function getState() { return state }

export const today = () => new Date().toISOString().slice(0, 10)

export function recordQuiz(lesson: string, idxWrong: number[], pct: number) {
  update(s => {
    const wrong = { ...s.wrong }
    idxWrong.forEach(i => {
      const k = `${lesson}:${i}`
      wrong[k] = { lesson, idx: i, at: Date.now(), count: (wrong[k]?.count ?? 0) + 1 }
    })
    return { ...s, wrong, done: { ...s.done, [lesson]: Math.max(s.done[lesson] ?? 0, pct) } }
  })
}
export function clearWrong(key: string) {
  update(s => { const w = { ...s.wrong }; delete w[key]; return { ...s, wrong: w } })
}
export function addMinutes(m: number) {
  update(s => ({ ...s, minutes: { ...s.minutes, [today()]: (s.minutes[today()] ?? 0) + m } }))
}
export function resetAll() { update(() => ({ ...empty })) }
