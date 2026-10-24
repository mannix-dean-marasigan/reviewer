import type { PlanDay, Subject } from '../types'

export const SUBJECTS: { id: Subject; label: string }[] = [
  { id: 'math', label: 'Mathematics' },
  { id: 'english', label: 'English' },
  { id: 'reading', label: 'Reading' },
  { id: 'mental', label: 'Mental ability' },
  { id: 'essay', label: 'Essay' },
]

// 3 days, 5 to 8 hours a day. MATH ONLY. Items marked optional are extra if you have time; the rest fits the hours.
// tier: none = core (do these even on a 5-hour day), 'stretch' = add these to reach 8 hours, 'bonus' = only if you still have time.
// tier: none = core (do these even on a 5-hour day), 'stretch' = add these to reach 8 hours, 'bonus' = only if you still have time.
// Lessons inside each day (and across days) follow the learning order in content/index.ts: each lesson builds on the ones before it.
/** Lessons that test-takers report most often (Reddit, 2024-2026): basic algebra, geometry, percentages, fractions, mean/mode. */
export const PRIORITY_IDS = [
  'm-fractions', 'm-exponents', 'm-ratio', 'm-percent', 'm-equations', 'm-word-problems', 'm-variation', 'm-lines', 'm-systems', 'm-factoring', 'm-quadratics',
  'g-congruence', 'm-angles', 'm-similar', 'm-shapes', 'g-quads', 'g-circles', 'm-counting',
]
export const isPriority = (id: string) => PRIORITY_IDS.includes(id)

export const PLAN: PlanDay[] = [
  { day: 1, minHours: 5, hours: 8, theme: 'Foundations and algebra I (lessons 1–13)', items: [
    { label: 'Number sense & order of operations (skim if rusty)', minutes: 40, lesson: 'm-number-sense', tier: 'bonus' },
    { label: 'Fractions, decimals & percent', minutes: 45, lesson: 'm-fractions' },
    { label: 'Exponents, radicals & scientific notation', minutes: 45, lesson: 'm-exponents' },
    { label: 'Ratio, proportion & variation', minutes: 35, lesson: 'm-ratio', tier: 'stretch' },
    { label: 'Percent applications', minutes: 40, lesson: 'm-percent', tier: 'stretch' },
    { label: 'Equations, inequalities & word problems', minutes: 50, lesson: 'm-equations' },
    { label: 'Word problems: number, consecutive, age & work', minutes: 40, lesson: 'm-word-problems', tier: 'stretch' },
    { label: 'Variation: direct, inverse, joint & combined', minutes: 30, lesson: 'm-variation', tier: 'stretch' },
    { label: 'Lines, slope & linear functions', minutes: 40, lesson: 'm-lines' },
    { label: 'Systems of linear equations', minutes: 45, lesson: 'm-systems' },
    { label: 'Sequences & series', minutes: 40, lesson: 'm-sequences', tier: 'bonus' },
    { label: 'Algebraic expressions & factoring', minutes: 45, lesson: 'm-factoring' },
    { label: 'Polynomials: operations, division & remainder theorem', minutes: 45, lesson: 'm-polynomials', tier: 'stretch' },
    { label: 'Mistakes notebook', minutes: 20, route: '/mistakes' },
  ] },
  { day: 2, minHours: 11.5, hours: 11.5, theme: '⭐ ALL ALGEBRA + ALL GEOMETRY (about 11.5 h, a long day: split it over two sittings). Re-drill = Practice + Quiz tabs only. Test-takers report basic algebra, geometry, percentages, fractions, mean/mode.', items: [
    { label: '⭐ Fractions & decimals: re-drill', minutes: 15, lesson: 'm-fractions' },
    { label: '⭐ Exponents & radicals: quick re-drill', minutes: 15, lesson: 'm-exponents', tier: 'bonus' },
    { label: '⭐ Ratio & proportion: re-drill', minutes: 10, lesson: 'm-ratio' },
    { label: '⭐ Percent (discount, change, mixture): re-drill', minutes: 20, lesson: 'm-percent' },
    { label: '⭐ Equations & inequalities: re-drill', minutes: 10, lesson: 'm-equations' },
    { label: '⭐ Word problems (number, age, work): re-drill', minutes: 20, lesson: 'm-word-problems' },
    { label: '⭐ Variation: direct, inverse, joint', minutes: 20, lesson: 'm-variation' },
    { label: '⭐ Lines, slope & linear functions', minutes: 30, lesson: 'm-lines' },
    { label: '⭐ Systems of linear equations', minutes: 30, lesson: 'm-systems' },
    { label: 'Sequences & series', minutes: 30, lesson: 'm-sequences', tier: 'bonus' },
    { label: '⭐ Factoring & special products: re-drill', minutes: 15, lesson: 'm-factoring' },
    { label: 'Polynomials: terms, FOIL & remainder theorem', minutes: 20, lesson: 'm-polynomials' },
    { label: 'Rational expressions & equations', minutes: 25, lesson: 'm-rational' },
    { label: '⭐ Quadratic equations: factoring, formula & discriminant', minutes: 35, lesson: 'm-quadratics' },
    { label: 'Quadratic functions: vertex & inequalities', minutes: 25, lesson: 'm-quad-fn' },
    { label: 'Functions: evaluate, piecewise, composite, inverse', minutes: 25, lesson: 'm-functions' },
    { label: 'Rational functions: asymptotes & domain', minutes: 20, lesson: 'm-rational-fn', tier: 'bonus' },
    { label: 'Exponentials & logs', minutes: 40, lesson: 'm-exp-log', tier: 'bonus' },
    { label: 'Points, lines, segments & if-then statements', minutes: 20, lesson: 'g-basics' },
    { label: '⭐ Angles, parallel lines & triangles', minutes: 35, lesson: 'm-angles' },
    { label: '⭐ Triangle congruence & CPCTC', minutes: 30, lesson: 'g-congruence' },
    { label: '⭐ Pythagorean theorem, special & similar triangles', minutes: 35, lesson: 'm-similar' },
    { label: '⭐ Area, perimeter, circles & volume', minutes: 40, lesson: 'm-shapes' },
    { label: '⭐ Quadrilaterals', minutes: 25, lesson: 'g-quads' },
    { label: 'Skew lines, planes & right-triangle tests', minutes: 20, lesson: 'g-lines-planes' },
    { label: '⭐ Circles: arcs, chords, tangents', minutes: 25, lesson: 'g-circles' },
    { label: '⭐ Counting (factorial), mean, median & mode', minutes: 35, lesson: 'm-counting' },
    { label: '⭐ PRIORITY MOCK (60 questions) + review every miss', minutes: 90, route: '/mock' },
    { label: 'Mistakes notebook: retry what you missed', minutes: 25, route: '/mistakes' },
  ] },
  { day: 3, minHours: 3, hours: 3, theme: 'What is left (about 3 h): trigonometry, sets, probability, then a final mixed mock.', items: [
    { label: 'Number sense (LCM, GCF, order of operations)', minutes: 20, lesson: 'm-number-sense', tier: 'bonus' },
    { label: 'Interest: simple & compound', minutes: 25, lesson: 'm-finance', tier: 'bonus' },
    { label: 'Logic: converse, inverse & truth tables', minutes: 20, lesson: 'm-logic', tier: 'bonus' },
    { label: 'Basic trigonometry (SOH-CAH-TOA, special angles)', minutes: 30, lesson: 'm-trig' },
    { label: 'Law of sines & cosines', minutes: 25, lesson: 'm-trig2', tier: 'bonus' },
    { label: 'Sets & Venn diagrams', minutes: 20, lesson: 'm-sets' },
    { label: 'Probability of compound events', minutes: 30, lesson: 'm-probability' },
    { label: 'Statistics: quartiles & outliers', minutes: 20, lesson: 'm-stats', tier: 'bonus' },
    { label: 'Final mixed math mock (30 questions) + review every miss', minutes: 60, route: '/mock' },
    { label: 'Mistakes notebook: retry everything', minutes: 10, route: '/mistakes' },
    { label: 'Test-day playbook', minutes: 10, route: '/cheatsheet', tier: 'bonus' },
  ] },
]

export const FORMULAS = [
  { title: 'Algebra', items: ['$(a\\pm b)^2=a^2\\pm2ab+b^2$   $(a+b)(a-b)=a^2-b^2$', '$x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}$,  $D=b^2-4ac$', 'Sum of roots $-\\frac ba$, product $\\frac ca$', 'Arithmetic: $a_n=a_1+(n-1)d$, $S_n=\\frac n2(a_1+a_n)$', 'Geometric: $a_n=a_1r^{n-1}$, $S_\\infty=\\frac{a_1}{1-r}$', 'Exponents: $a^ma^n=a^{m+n}$, $\\frac{a^m}{a^n}=a^{m-n}$, $(a^m)^n=a^{mn}$, $a^{-n}=\\frac1{a^n}$'] },
  { title: 'Geometry', items: ['Triangle $=\\frac12bh$, Trapezoid $=\\frac12(b_1+b_2)h$, Circle $=\\pi r^2$, $C=2\\pi r$', 'Interior angles of n-gon $=(n-2)180°$, exterior angles sum to $360°$', 'Pythagoras $a^2+b^2=c^2$; 45-45-90: $1:1:\\sqrt2$; 30-60-90: $1:\\sqrt3:2$', 'Cylinder $\\pi r^2h$, Cone $\\frac13\\pi r^2h$, Sphere $\\frac43\\pi r^3$, Cube $s^3$', 'Similar figures: lengths $k$, areas $k^2$, volumes $k^3$', 'Slope $\\frac{y_2-y_1}{x_2-x_1}$, Distance $\\sqrt{\\Delta x^2+\\Delta y^2}$, Midpoint = averages'] },
  { title: 'Trig & counting', items: ['$\\sin=\\frac{\\text{opp}}{\\text{hyp}}$, $\\cos=\\frac{\\text{adj}}{\\text{hyp}}$, $\\tan=\\frac{\\text{opp}}{\\text{adj}}$, $\\sin^2+\\cos^2=1$', '30°: $\\frac12,\\frac{\\sqrt3}2,\\frac1{\\sqrt3}$   45°: $\\frac{\\sqrt2}2,\\frac{\\sqrt2}2,1$   60°: $\\frac{\\sqrt3}2,\\frac12,\\sqrt3$', '$P(n,r)=\\frac{n!}{(n-r)!}$, $C(n,r)=\\frac{n!}{r!(n-r)!}$', '$P(E)=\\frac{\\text{favorable}}{\\text{total}}$, $P(\\text{at least one})=1-P(\\text{none})$', '$n(A\\cup B)=n(A)+n(B)-n(A\\cap B)$'] },
  { title: 'Word problems', items: ['$d=rt$; work: rates add ($\\frac1a+\\frac1b$); together $=\\frac{ab}{a+b}$', 'Percent change $=\\frac{\\text{new}-\\text{old}}{\\text{old}}\\times100$', 'Simple interest $I=Prt$; compound $A=P(1+r)^t$', 'Average = sum ÷ count → work with TOTALS'] },
]

export const PLAYBOOK = [
  '**Night before:** do a light review (cheat sheet only), pack ID, pencils, eraser, calculator if allowed, water, snacks. Sleep 7–8 hours: sleep consolidates what you studied.',
  '**Morning:** eat a real breakfast, arrive early, skim the formula sheet once, then stop studying.',
  '**Pace yourself:** divide the time by the number of questions. If a question eats more than ~1.5 minutes, flag it and move on.',
  '**Two passes:** answer everything easy first, then return to the flagged ones.',
  '**No blanks** (unless there is a penalty for wrong answers): eliminate two choices and guess.',
  '**Read the question twice** — especially NOT, EXCEPT, LEAST, and “which of the following must be true”.',
  '**Math:** write every step. Plug answers back in. Use the choices (back-solving) when the algebra is ugly.',
  '**Reading:** predict the answer before looking at choices; verify with a line from the passage.',
  '**Mental ability:** one attribute at a time (shape, rotation, shading, count, position). Don’t stare: skip after 30 seconds.',
  '**Essay:** 5 minutes of planning, thesis first, 2 reasons with examples, conclusion, then proofread.',
  '**Stay calm:** breathe slowly, relax your shoulders. One bad question never defines your score.',
  '**Check the official UA&P admissions page** for the current exam format, required items, schedule and any sample questions. This trainer practices the skills; the exact format may vary.',
]

export const ESSAY_PROMPTS = [
  'Should students be allowed to use phones in class? Take a position and defend it.',
  'Is it better to study in a big university in the city or a smaller school near home? Explain your view.',
  'Does social media bring people closer together or push them apart? Support your answer.',
  'Should community service be required for graduation from high school or college?',
  'Technology makes life easier but may make people lazy. Do you agree?',
  'What is the most important quality of a good leader? Explain with examples.',
]

export const ESSAY_CHECKLIST = [
  'My **thesis** takes a clear position and appears in the introduction.',
  'My introduction starts with a **hook** and ends with the thesis.',
  'Each body paragraph has **one reason + a specific example + an explanation**.',
  'I acknowledged the **opposing view** and answered it.',
  'I used **transitions** (However, For example, As a result…).',
  'My conclusion **restates** the thesis in fresh words and adds **no new argument**.',
  'I checked **subject–verb agreement and tense**.',
  'I fixed **comma splices** and fragments.',
  'I replaced vague words (thing, good, bad, a lot) with precise ones.',
  'I finished within **about 300 words / 30 minutes**.',
]

export const MODEL_ESSAY = {
  prompt: ESSAY_PROMPTS[0],
  text: 'Imagine solving a hard math problem while your pocket buzzes every few minutes. Although smartphones are powerful tools, schools should restrict their use during class because phones damage concentration and invite misuse.\n\nFirst, phones divide attention. Research on multitasking shows that switching between a lesson and a message costs the brain valuable time each time it happens. For example, a student who glances at a group chat every few minutes may miss the one step of a math solution that makes the rest make sense. As a result, even brief interruptions can turn a clear lesson into confusion.\n\nSecond, phones create opportunities for misuse. Unsupervised access can lead to cheating on quizzes, sharing hurtful messages, or posting classmates’ pictures without consent. A school that limits phones therefore protects not only grades but also students’ dignity and safety.\n\nOf course, some argue that phones are useful for research and emergencies. This is true, but the solution is not unrestricted access; it is clear rules. Teachers can allow phones for specific tasks, and parents can reach students through the school office in an emergency.\n\nIn conclusion, limiting phones in class is not about punishing students. It is about giving them the focus and safe environment they need to learn. When the screens go dark, the lesson finally gets everyone’s full attention.',
  notes: [
    '**Hook + thesis:** a vivid scenario opener, then a clear position with two reasons (attention, misuse).',
    '**PEEL paragraphs:** each body paragraph opens with a point, gives an example, and explains the effect.',
    '**Counter-argument:** it acknowledges the other side (“Of course…”) and rebuts it, which shows maturity.',
    '**Transitions:** First, Second, For example, As a result, Of course, In conclusion.',
    '**Conclusion:** restates the thesis in new words, adds no new argument and ends with a memorable image.',
    '**Length:** about 290 words, which is achievable in 25 minutes with a plan.',
  ],
}
