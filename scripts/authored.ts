import { LESSONS } from '../src/content'
for (const id of process.argv.slice(2)) {
  const l = LESSONS.find(x => x.id === id)!
  const c = l.checks!
  const groups: [string, typeof l.quiz][] = [['video', c.video], ['learn', c.learn], ['lab', c.lab ?? []], ['more', c.more ?? []], ['quiz', l.quiz]]
  console.log(`\n#### ${id}`)
  for (const [g, qs] of groups) qs.forEach((q, i) => console.log(`${g}${i}: ${q.q.replace(/\n/g, ' ')}  ==> ${q.c[q.a]}   [${q.c.filter((_, j) => j !== q.a).join(' | ')}]`))
}
