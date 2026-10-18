import type { Lesson } from '../types'
import { q, VID } from './helpers'

export const ESSAY: Lesson[] = [
  {
    id: 'essay-structure', subject: 'essay', title: 'Essay Structure: Thesis, Paragraphs, Conclusion', minutes: 40,
    blurb: 'A 5-paragraph blueprint you can fill in under time pressure, with a strong thesis every time.',
    videos: [VID.essayPlan, VID.essayStruct],
    interactive: {
      k: 'steps', data: {
        prompt: 'Order the parts of a 30-minute essay from first to last.',
        steps: ['Read the prompt and choose your position (1 min)', 'Plan: thesis + 2 reasons + examples (4 min)', 'Write the introduction with a thesis (4 min)', 'Write two body paragraphs, each with an example (14 min)', 'Address the other side briefly (included in body)', 'Write the conclusion (3 min)', 'Proofread for grammar and clarity (4 min)'],
        why: 'Planning for 5 minutes saves you from rambling. Never skip the proofreading minutes: they are worth a point or two.',
      },
    },
    blocks: [
      { t: 'h', text: 'The blueprint (≈ 300 words)' },
      { t: 'table', head: ['Part', 'Job', 'Length'], rows: [
        ['Introduction', 'Hook → context → **thesis** (your position)', '3–4 sentences'],
        ['Body 1', 'Reason 1 + specific example + explanation', '5–6 sentences'],
        ['Body 2', 'Reason 2 + specific example + explanation', '5–6 sentences'],
        ['Counter-argument (optional, inside Body 2 or its own)', 'Admit the opposing view, then rebut it', '2–3 sentences'],
        ['Conclusion', 'Restate thesis in new words → big-picture closing thought', '3 sentences'],
      ] },
      { t: 'h', text: 'A strong thesis' },
      { t: 'p', text: 'A thesis is a **debatable, specific claim** plus your reasons. ✗ *Social media is a topic many people discuss.* (not a claim) ✗ *Social media is bad.* (vague) ✓ *Schools should limit phone use during class because it protects attention and reduces cyberbullying.*' },
      { t: 'h', text: 'PEEL for body paragraphs' },
      { t: 'list', items: ['**P**oint: topic sentence stating the reason.', '**E**vidence/example: something concrete (a real case, statistic, personal experience).', '**E**xplain: why the example proves your point (this is where most students lose points).', '**L**ink: connect back to the thesis or lead to the next paragraph.'] },
      { t: 'h', text: 'Hooks and transitions' },
      { t: 'list', items: ['Hooks: a surprising fact, a short scenario, a question, or a bold statement. Keep it to one sentence.', 'Transitions: *First, In addition, Moreover, However, On the other hand, For example, As a result, In conclusion*.'] },
      { t: 'trap', text: 'Do not write “In this essay I will discuss…” or “In conclusion, I believe that everyone has their own opinion.” Both are weak. Do not introduce new arguments in the conclusion.' },
    ],
    tricks: [
      'Choose a side in 30 seconds and commit. A clear mediocre argument beats an unclear brilliant one.',
      'Two strong reasons beat four weak ones.',
      'Use ONE vivid, specific example per paragraph (a name, a place, a number).',
      'Write the thesis last in your plan, but FIRST in your essay.',
      'Reserve the final 4 minutes for proofreading: check tense, agreement, punctuation, spelling.',
    ],
    quiz: [
      q('Which is the strongest thesis?', ['Schools should require uniforms because they reduce distractions and promote equality.', 'Uniforms are a topic in schools.', 'I will talk about uniforms.', 'Uniforms are bad or good depending.'], 0, 'It takes a clear position and previews two reasons. The others are announcements or vague.'),
      q('What belongs in the conclusion?', ['A restatement of the thesis in fresh words and a closing thought', 'A brand-new argument', 'An apology for a short essay', 'A list of every example again'], 0, 'Conclusions synthesise; they do not introduce new arguments.'),
      q('In PEEL, which step do students most often forget?', ['Explain', 'Point', 'Evidence', 'Link'], 0, 'Students give an example but don’t explain how it proves the point.'),
      q('Which is the best hook sentence?', ['Imagine a classroom where every student is silently scrolling while the teacher explains fractions.', 'Hello, my name is Ana.', 'Since the beginning of time, humans have used technology.', 'This essay is about technology.'], 0, 'A specific, vivid scenario grabs attention; the others are cliché or announcements.'),
      q('Which transition best fits? “Online classes are convenient. ___, they can reduce student interaction.”', ['However', 'Therefore', 'Similarly', 'For example'], 0, 'Contrast: convenience vs a downside → However.'),
      q('How many minutes should you plan before writing a 30-minute essay?', ['About 4–5', '0 — start writing immediately', '15', '20'], 0, 'A short plan prevents rambling and improves organisation.'),
      q('Which sentence is a good topic sentence for a body paragraph?', ['Limiting phone use improves focus in class.', 'Phones were invented in the 20th century.', 'Many people own phones.', 'Some students like phones.'], 0, 'It states a reason that supports the thesis and can be developed with an example.'),
    ],
  },
  {
    id: 'essay-practice', subject: 'essay', title: 'Essay Style, Timing & Proofreading', minutes: 35,
    blurb: 'Sound sophisticated without being fancy: word choice, sentence variety and a proofreading routine.',
    videos: [VID.essayTimed, VID.essay30],
    interactive: {
      k: 'flash', data: {
        frontLabel: 'WEAK PHRASE', cards: [
          ['very important', 'crucial / essential / vital'], ['a lot of', 'numerous / many / considerable'], ['good', 'beneficial / valuable / effective'], ['bad', 'harmful / detrimental / damaging'],
          ['thing', 'factor / issue / element (be specific!)'], ['I think that', '(delete it. Just state your claim)'], ['in my opinion', '(delete it. The essay is your opinion)'], ['get', 'obtain / gain / receive'],
          ['also', 'moreover / in addition / furthermore'], ['but', 'however / yet / nevertheless'], ['so', 'therefore / consequently / as a result'], ['show', 'demonstrate / illustrate / reveal'],
        ],
      },
    },
    blocks: [
      { t: 'h', text: 'What graders reward' },
      { t: 'list', items: ['**Clear position** and consistent focus on the prompt.', '**Organisation:** intro, body, conclusion; each paragraph one idea.', '**Development:** specific examples with explanation (not just claims).', '**Language control:** correct grammar, varied sentences, precise vocabulary.', '**Conventions:** punctuation, spelling, capitalisation.'] },
      { t: 'h', text: 'Style upgrades that are low-risk' },
      { t: 'list', items: ['Replace vague words (*thing, good, bad, a lot*) with precise ones: factor, beneficial, harmful, numerous.', 'Mix sentence lengths: one short punchy sentence after two long ones adds emphasis.', 'Delete filler: “I think”, “in my opinion”, “as we all know”, “very”, “really”.', 'Use active voice: “Schools should ban phones” beats “Phones should be banned by schools.”'] },
      { t: 'trap', text: 'Don’t use big words you aren’t sure about. A misused word costs more than a simple one. Clear beats fancy.' },
      { t: 'h', text: '30-minute timing plan' },
      { t: 'table', head: ['Minutes', 'Task'], rows: [['0–1', 'Read prompt, pick a side'], ['1–5', 'Plan: thesis, two reasons, one example each, one counter-argument'], ['5–9', 'Introduction'], ['9–23', 'Two body paragraphs'], ['23–26', 'Conclusion'], ['26–30', 'Proofread (read it ALOUD in your head, sentence by sentence)']] },
      { t: 'h', text: 'Proofreading routine' },
      { t: 'list', items: ['Subject–verb agreement in every sentence.', 'Consistent tense.', 'Commas after introductory words; no comma splices.', 'Its / it’s, their / there, your / you’re.', 'Each paragraph starts with a topic sentence.'] },
    ],
    tricks: [
      'Practice the 30-minute essay at least TWICE before the exam, in the Essay Studio.',
      'Memorise 6 transitions you can use anywhere (However, Moreover, For example, As a result, Consequently, In conclusion).',
      'Have 3 reusable examples ready (technology, education, health/community) that you can adapt to almost any prompt.',
      'If you run out of time, write a short conclusion rather than none.',
      'Neat handwriting (or typing) is part of clarity. Don’t rush into illegibility.',
    ],
    quiz: [
      q('Choose the most precise replacement for “a lot of people”.', ['numerous people', 'many of the peoples', 'plenty people', 'lot of people'], 0, '“Numerous” is precise and correct; the others are ungrammatical or still vague.'),
      q('Which sentence is in the active voice?', ['The government introduced a new law.', 'A new law was introduced by the government.', 'A new law has been introduced.', 'The law was being introduced.'], 0, 'The doer (the government) is the subject.'),
      q('Which phrase is filler and should be deleted?', ['In my opinion, ', 'For example, ', 'However, ', 'As a result, '], 0, 'The whole essay is your opinion; saying so wastes words.'),
      q('What is wrong? “Technology make life easier, it also have risks.”', ['Subject–verb agreement and a comma splice', 'Nothing', 'Missing hook', 'Too formal'], 0, '“Technology makes”; “it also has risks”. Also a comma splice: use “, but it also has risks.”'),
      q('Which revision of “Pollution is a very bad thing” is best?', ['Pollution is a serious threat to public health.', 'Pollution is really really bad.', 'Pollution, it is bad.', 'Pollution is a bad thing for us.'], 0, 'Precise nouns and adjectives replace the vague “very bad thing”.'),
      q('Where should you spend your LAST 4 minutes in a 30-minute essay?', ['Proofreading', 'Adding a third argument', 'Rewriting the introduction', 'Drawing a conclusion map'], 0, 'Proofreading catches avoidable grammar and spelling errors.'),
      q('Which is the best concluding sentence for an essay arguing for school uniforms?', ['Ultimately, uniforms prepare students to focus on what truly matters: learning.', 'That is all I have to say.', 'Uniforms are blue, white and green.', 'Another reason is that uniforms are cheap.'], 0, 'A strong closing ties back to the thesis and offers a final thought; it adds no new argument.'),
    ],
  },
]
