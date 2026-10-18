import type { Lesson } from '../types'
import { q, VID } from './helpers'

const P1 = 'Impetigo is particularly troublesome in the summer, especially in warm, moist climates. It can be recognized by characteristic lesions that begin as small red spots and progress to tiny blisters that eventually rupture, producing an oozing, sticky, honey-colored crust. These lesions usually spread very quickly with scratching. Impetigo is a skin infection caused by streptococcal bacteria; occasionally, other bacteria may also be found. There is usually a great deal of itching, and scratching hastens spreading of the lesions. After the sores heal, there may be a slight decrease in skin color at the site, but skin color usually returns to normal.'

const P2 = 'When the town of San Isidro banned single-use plastic bags in 2019, shopkeepers predicted disaster. Customers, they said, would shop elsewhere, and prices would climb. Instead, within a year, plastic litter in the town’s canals fell by nearly half, and most shops reported that the cost of paper and cloth alternatives was offset by savings on plastic bags they no longer had to buy. A few small stores did lose business to a neighboring town, but the mayor argues that this is a temporary cost worth paying. “Change always looks expensive before it looks obvious,” she said.'

const P3 = 'Sleep is not merely rest. During deep sleep the brain consolidates what was learned during the day, moving fragile short-term memories into long-term storage. Students who stay up all night studying may therefore be undermining the very thing they are trying to achieve: facts crammed in the final hours are far less likely to be retained than facts reviewed earlier and then “slept on”. Researchers caution, however, that sleep is not a substitute for study. It only helps preserve what has already been learned.'

export const READING: Lesson[] = [
  {
    id: 'r-basics', subject: 'reading', title: 'Reading Comprehension: Main Idea, Details & Inference', minutes: 40,
    blurb: 'A repeatable system for reading a passage once and answering every question type.',
    videos: [VID.mainIdea, VID.infer],
    blocks: [
      { t: 'h', text: 'The 4-step reading system' },
      { t: 'list', items: ['**1. Skim the questions first** (just the question stems) so you know what to look for.', '**2. Read the passage once, actively:** underline the main claim and mark contrast words (but, however, although, yet).', '**3. Predict the answer in your own words** before reading the choices.', '**4. Eliminate** choices that are too extreme, off-topic, or only partly true.'] },
      { t: 'h', text: 'Question types and how to attack them' },
      { t: 'table', head: ['Type', 'Looks like', 'Strategy'], rows: [
        ['Main idea', '“The passage is mainly about…”', 'Whole-passage summary: not a detail, not too broad. Check first and last sentences.'],
        ['Detail', '“According to the passage…”', 'Go back and find the exact line. Never answer from memory.'],
        ['Inference', '“It can be inferred…”', 'The answer is *strongly implied*, not stated. One small logical step.'],
        ['Vocabulary in context', '“As used in line 5, X means…”', 'Replace X with each choice; use the surrounding sentence.'],
        ['Tone / attitude', '“The author’s attitude is…”', 'Look at adjectives and verbs the author chooses (+/−).'],
        ['Purpose', '“The author mentions X in order to…”', 'Ask: what job does this sentence do? (example, contrast, evidence)'],
      ] },
      { t: 'trap', text: 'The most common wrong answers are: (1) **true but not in the passage**, (2) **too extreme** (always, never, all, only), (3) **a detail dressed up as the main idea**, (4) **the opposite** of what the passage says.' },
      { t: 'tip', text: 'Main idea of a paragraph is usually in the first or last sentence. For the whole passage, combine the introduction’s topic with the conclusion’s point.' },
    ],
    tricks: [
      'Every correct answer is **supported by a specific line**. If you cannot point to one, it is probably wrong.',
      'Extreme words (always, never, only, all, none, completely) are usually wrong; hedged words (may, often, some, generally) are usually right.',
      'For inference, pick the safest, smallest step. Do not invent facts.',
      'Don’t bring outside knowledge; use only what the passage says.',
      'Read the question stem twice: NOT / EXCEPT / LEAST questions flip everything.',
    ],
    quiz: [
      q('Who is most likely to acquire impetigo?', ['John, who spends the summer in Indonesia', 'Mary, who spends the summer in Alaska', 'Peter, who attends the winter Olympics in Europe', 'Alice, who spends Christmas in a snow resort'], 0, 'The passage says impetigo is troublesome in summer, especially in **warm, moist climates**. Indonesia in summer fits best.', undefined, P1),
      q('According to the passage, scratching impetigo sores:', ['spreads the lesions faster', 'cures the infection', 'cools the skin', 'changes the bacteria'], 0, 'Sentences 3 and 6: lesions spread very quickly with scratching; scratching hastens the spread.', undefined, P1),
      q('What is the main idea of the passage?', ['Impetigo is a contagious skin infection with recognizable symptoms and spread patterns.', 'Warm climates are dangerous for travelers.', 'Streptococcal bacteria cause every skin disease.', 'Skin color permanently fades after sores heal.'], 0, 'The whole passage describes what impetigo is, how to recognize it and how it spreads. The other choices are too broad, wrong, or contradicted (“color usually returns to normal”).', 'The main idea covers EVERYTHING in the passage, not just one detail.', P1),
      q('After the sores heal, the skin color:', ['usually returns to normal', 'stays lighter for life', 'turns honey-colored', 'becomes red'], 0, 'Last sentence: skin color usually returns to normal.', undefined, P1),
      q('Which is the best title for the passage?', ['Understanding Impetigo', 'Summer Vacations', 'The Life of Bacteria', 'Itching and Scratching'], 0, 'A title must cover the whole passage: impetigo.', undefined, P1),
      q('The word *consolidates* in the passage most nearly means:', ['strengthens', 'forgets', 'divides', 'borrows'], 0, 'The brain “consolidates what was learned”, moving memories into long-term storage → strengthens/solidifies.', undefined, P3),
      q('What can be inferred about students who cram all night?', ['They may remember less than students who review earlier and sleep.', 'They always fail their exams.', 'They have better memory than other students.', 'They do not need sleep at all.'], 0, 'The passage says crammed facts are far less likely to be retained. “Always fail” is too extreme.', undefined, P3),
    ],
  },
  {
    id: 'r-strategy', subject: 'reading', title: 'Tone, Purpose & Author’s Argument', minutes: 35,
    blurb: 'Handle tone, purpose, opinion vs fact and logic questions, with timed practice passages.',
    videos: [VID.mcq, VID.mcq2],
    blocks: [
      { t: 'h', text: 'Fact vs opinion; claim vs evidence' },
      { t: 'p', text: 'A **fact** can be checked (“The town banned plastic bags in 2019”). An **opinion** is a judgment (“The ban was worth it”). Authors support a **claim** with **evidence** (statistics, examples, expert quotes). Ask: what is the claim? what supports it? what would weaken it?' },
      { t: 'h', text: 'Tone vocabulary (learn these)' },
      { t: 'table', head: ['Positive', 'Neutral', 'Negative'], rows: [['admiring, optimistic, enthusiastic, hopeful', 'objective, informative, analytical, detached', 'critical, skeptical, sarcastic, pessimistic'], ['appreciative, supportive', 'matter-of-fact, descriptive', 'indignant, dismissive, disapproving']] },
      { t: 'p', text: 'Tone shows in the **word choices**: “miracle cure” (enthusiastic) vs “so-called cure” (skeptical) vs “treatment” (neutral).' },
      { t: 'h', text: 'Timed strategy' },
      { t: 'list', items: ['Budget about **1 min per question** plus 1–2 min to read the passage. Don’t re-read the whole passage for every question; use your underlines.', 'If two choices look right, find the one with **exact textual support**; the other usually adds something extra.', 'Skip and flag any question that eats more than 90 seconds.', 'Never leave a blank (unless the test penalizes wrong answers): eliminate then guess.'] },
      { t: 'ex', title: 'Passage: “Critics said the park would never be finished. Today it welcomes 10,000 visitors every weekend.” The author’s tone is…', steps: ['Notice the contrast: critics’ prediction vs reality.', 'The author uses the outcome to show the critics wrong → quietly **vindicating / admiring**.', 'Choose “approving/optimistic”, not “neutral”.'], ans: 'approving' },
    ],
    tricks: [
      'Contrast words (but, however, yet, although) often introduce the author’s real point.',
      'Tone questions: pick the adjective that matches the author’s adjectives and verbs.',
      '“Purpose of a sentence” = what job it does (illustrate, contrast, concede, conclude).',
      'Wrong answers to main-idea items are often too narrow (one detail) or too wide (beyond the passage).',
      'In a long passage, answer easy detail questions first, inference/main idea last.',
    ],
    quiz: [
      q('What is the mayor’s attitude toward the loss of business to the neighboring town?', ['She accepts it as a temporary cost worth paying.', 'She is alarmed and wants to repeal the ban.', 'She is indifferent.', 'She blames the shopkeepers.'], 0, 'The mayor “argues that this is a temporary cost worth paying”.', undefined, P2),
      q('According to the passage, what happened to plastic litter in the canals after the ban?', ['It fell by nearly half within a year.', 'It increased.', 'It stayed the same.', 'It disappeared entirely.'], 0, 'Directly stated: “fell by nearly half”. “Disappeared entirely” is too extreme.', undefined, P2),
      q('Which statement is an OPINION from the passage?', ['“Change always looks expensive before it looks obvious.”', 'The town banned plastic bags in 2019.', 'Litter in canals fell by nearly half.', 'A few small stores lost business.'], 0, 'The mayor’s quote is a judgment, not a verifiable fact.', undefined, P2),
      q('The shopkeepers’ predictions turned out to be:', ['mostly wrong', 'completely right', 'confirmed by the mayor', 'irrelevant to the town'], 0, 'Most shops found costs offset, so the dire predictions largely did not come true; a few small stores did lose business, so “completely right/wrong” would be too extreme.', undefined, P2),
      q('The author’s tone toward the ban is best described as:', ['mildly approving', 'strongly hostile', 'sarcastic', 'confused'], 0, 'The passage presents results favorably and lets the mayor’s positive quote end the piece, so the tone is mildly approving.', undefined, P2),
      q('Why does the author mention that sleep “is not a substitute for study”?', ['To qualify the claim by showing sleep’s limits', 'To prove that sleep is useless', 'To argue students should never study', 'To introduce a new topic'], 0, '“Researchers caution, however…” is a concession that limits the claim: sleep only preserves what has been learned.', undefined, P3),
      q('Which title best fits the passage on sleep?', ['Why Sleep Matters for Learning', 'The Dangers of Studying', 'How to Stay Awake', 'A History of Memory'], 0, 'The passage links sleep to memory consolidation and learning.', undefined, P3),
    ],
  },
]
