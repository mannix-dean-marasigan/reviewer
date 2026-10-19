export type Subject = 'math' | 'english' | 'reading' | 'mental' | 'essay'

export interface Video {
  id: string // YouTube video id (verified to exist + be embeddable)
  title: string
  channel: string
  why: string // why this one is worth watching
}

export interface Question {
  q: string
  c: [string, string, string, string]
  a: 0 | 1 | 2 | 3
  e: string // detailed explanation (step by step)
  trick?: string // faster shortcut, if any
  passage?: string // optional reading passage shown above the question
  fig?: string // optional key into the figure registry (SVG drawn in code)
}

export type Block =
  | { t: 'h'; text: string }
  | { t: 'p'; text: string }
  | { t: 'list'; items: string[] }
  | { t: 'formula'; items: string[] }
  | { t: 'ex'; title: string; steps: string[]; ans?: string }
  | { t: 'tip'; text: string }
  | { t: 'trap'; text: string }
  | { t: 'table'; head: string[]; rows: string[][] }

/** Questions placed between the lesson stages (Finlab-style checkpoints). */
export interface Checks {
  video: Question[] // right after the videos
  learn: Question[] // one per section of the written lesson (shown after that section)
  lab?: Question[] // right after the interactive
  more?: Question[] // extra practice bank (also feeds mock exams + mistakes notebook)
  drill?: string[] // generated-drill kinds that match this lesson (math)
}

export interface Lesson {
  id: string
  subject: Subject
  title: string
  blurb: string
  minutes: number
  videos: Video[]
  blocks: Block[]
  tricks: string[]
  interactive?: { k: string; data?: any } // key into the interactives registry + optional data
  quiz: Question[]
  checks?: Checks
}

export interface PlanItem {
  label: string
  minutes: number
  lesson?: string
  route?: string
}
export interface PlanDay {
  day: number
  hours: number
  theme: string
  items: PlanItem[]
}
