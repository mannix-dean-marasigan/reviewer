import type { Checks } from '../types'
import { q } from './helpers'

export const CHECKS_OTHER: Record<string, Checks> = {
  'a-series': {
    video: [
      q('5, 10, 15, 20, ?', ['25', '30', '24', '22'], 0, 'Constant difference of 5.'),
      q('1, 2, 4, 8, ?', ['16', '12', '10', '14'], 0, 'Each term doubles (ratio 2).'),
    ],
    learn: [
      q('2, 5, 10, 17, 26, ?', ['37', '35', '36', '38'], 0, 'Differences: 3, 5, 7, 9 → next 11. $26+11=37$. (It is $n^2+1$.)'),
      q('B, D, F, H, ?', ['J', 'I', 'K', 'L'], 0, 'Every other letter (+2 positions): H(8) → J(10).'),
    ],
    lab: [
      q('3, 6, 12, 24, ?', ['48', '30', '36', '27'], 0, 'Ratio 2 → $24\\times2=48$.'),
      q('A, C, E, G, ?', ['I', 'H', 'J', 'K'], 0, 'Skip one letter each time: G(7) → I(9).'),
    ],
    more: [
      q('1, 1, 2, 3, 5, 8, ?', ['13', '11', '12', '10'], 0, 'Fibonacci: each term is the sum of the previous two ($5+8=13$).'),
      q('100, 90, 79, 67, ?', ['54', '55', '56', '57'], 0, 'Differences: −10, −11, −12, so next −13: $67-13=54$.'),
      q('2, 4, 3, 6, 5, 10, ?', ['9', '12', '8', '11'], 0, 'Alternate ×2 and −1: $10-1=9$.'),
      q('5, 6, 8, 11, 15, ?', ['20', '19', '21', '18'], 0, 'Differences 1, 2, 3, 4 → next 5: $15+5=20$.'),
    ],
  },
  'a-patterns': {
    video: [
      q('An arrow points up and rotates 90° clockwise each step. After 2 steps it points:', ['down', 'left', 'up', 'right'], 0, 'Up → right → down.'),
      q('Dot counts of 1, 2, 3 in the first three figures. The 4th figure has:', ['4 dots', '5 dots', '3 dots', '6 dots'], 0, 'One more each time.'),
    ],
    learn: [
      q('An arrow points up and turns 45° clockwise each step. After 4 steps it points:', ['down', 'right', 'left', 'up'], 0, '4 × 45° = 180°, which is pointing down.'),
      q('When a sequence changes in several ways at once, you should:', ['track one attribute at a time', 'guess the answer', 'ignore the shading', 'count only the corners'], 0, 'Separate each change into its own mini-rule.'),
    ],
    lab: [
      q('What is the most useful first step in a pattern puzzle?', ['name the change in a short phrase', 'look at the answer choices only', 'count all lines in the picture', 'skip the puzzle'], 0, 'Phrases like “turns 90° cw” make the rule testable.'),
      q('Two attributes change together (turning AND shading). You should:', ['treat each as its own sequence', 'ignore the shading', 'ignore the turning', 'choose the biggest figure'], 0, 'Predict each change separately, then combine them.'),
    ],
    more: [
      q('Shading cycles white → gray → black. The 5th figure is:', ['gray', 'white', 'black', 'striped'], 0, 'Cycle length 3: figure 4 = white, figure 5 = gray.'),
      q('A dot starts at the top-left of a square and moves counter-clockwise one corner each step. After 1 step it is at the:', ['bottom-left', 'top-right', 'bottom-right', 'top-left'], 0, 'Counter-clockwise from top-left goes down the left side.'),
      q('Shapes with 3, 4, 5 sides come next with a figure of:', ['6 sides', '7 sides', '3 sides', '5 sides'], 0, 'Each figure gains a side.'),
      q('Dot counts 1, 3, 5: the next figure has:', ['7 dots', '6 dots', '9 dots', '8 dots'], 0, 'Add 2 each time.'),
    ],
  },
  'a-matrices': {
    video: [
      q('In a Latin-square matrix, each symbol appears:', ['once in every row and column', 'only in the first row', 'twice per column', 'only on the diagonal'], 0, 'That is the definition.'),
      q('If cell 3 = parts that appear in only one of cells 1 and 2 (XOR), a part found in BOTH cells:', ['disappears', 'stays', 'doubles', 'turns black'], 0, 'Shared parts cancel out.'),
    ],
    learn: [
      q('Rows: A B C / B C A / C A ?', ['B', 'A', 'C', 'D'], 0, 'Row 3 already has C and A, so B is missing.'),
      q('3 4 12 / 2 5 10 / 6 3 ?', ['18', '9', '12', '3'], 0, 'Third = first × second: $6\\times3=18$.'),
      q('If rows reveal no rule, you should next:', ['check columns and diagonals', 'give up', 'pick the middle option', 'count the pixels'], 0, 'A matrix rule might be vertical or diagonal.'),
    ],
    lab: [
      q('In the lab’s dot-count matrix, the count 1, 2, 3 grows across each row. The last column therefore has:', ['3 dots', '1 dot', '2 dots', '6 dots'], 0, 'The third column is always the largest count.'),
      q('Shading stays the same along each row in that matrix. Row 3 is black, so the missing cell is:', ['black', 'white', 'gray', 'half-shaded'], 0, 'Shading is constant within a row.'),
    ],
    more: [
      q('8 2 4 / 12 3 ? Third = first ÷ second.', ['4', '9', '36', '15'], 0, '$12\\div3=4$.'),
      q('2 5 7 / 3 6 9 / 4 7 ?', ['11', '28', '3', '10'], 0, 'Third = sum of first two: $4+7=11$.'),
      q('▲ ● ■ / ● ■ ▲ / ■ ▲ ?', ['●', '■', '▲', '◆'], 0, 'Each row and column needs ▲, ●, ■ once.'),
      q('10 4 6 / 15 9 6 / 20 14 ?', ['6', '34', '5', '14'], 0, 'Third = first − second: $20-14=6$.'),
    ],
  },
  'a-odd-spatial': {
    video: [
      q('A figure and its mirror image:', ['cannot be matched by rotating', 'can always be matched by rotating', 'are always symmetric', 'are always identical'], 0, 'Rotation never changes handedness.'),
      q('A die shows 6 on top. What is on the bottom?', ['1', '2', '3', '5'], 0, 'Opposite faces add to 7.'),
    ],
    learn: [
      q('Which does not belong: 3, 5, 7, 9, 11?', ['9', '3', '5', '11'], 0, '9 is not prime; the rest are.'),
      q('A 3×3×3 cube is painted outside and cut into 27 cubes. How many have exactly 3 painted faces?', ['8', '12', '6', '1'], 0, 'Only the 8 corner cubes have three painted faces.'),
    ],
    lab: [
      q('Four figures are rotations of the same L-shape and one is flipped. Which is the odd one?', ['the flipped one', 'the biggest one', 'the rotated ones', 'none'], 0, 'The flipped figure is the mirror image.'),
      q('If four figures have 3 dots and one has 4 dots, the odd one is:', ['the 4-dot figure', 'any 3-dot figure', 'the one on the left', 'none'], 0, 'Count first: the odd count stands out.'),
    ],
    more: [
      q('A paper is folded in half once and a hole is punched through both layers. How many holes when unfolded?', ['2', '1', '3', '4'], 0, 'Two layers, one punch: 2 holes.'),
      q('How many faces, edges and vertices does a cube have?', ['6, 12, 8', '8, 12, 6', '6, 8, 12', '12, 6, 8'], 0, 'Faces 6, edges 12, vertices 8.'),
      q('Six squares in a single straight row, folded: it forms:', ['no cube (it overlaps)', 'a cube', 'two cubes', 'a pyramid'], 0, 'Squares 1 and 5 would land on the same face.'),
      q('The left–right mirror image of the letter “p” is:', ['q', 'b', 'd', 'p'], 0, 'Reflect the bowl to the other side of the stem: q.'),
    ],
  },
  'a-logic': {
    video: [
      q('A > B and B > C. Who is smallest?', ['C', 'A', 'B', 'cannot tell'], 0, 'A > B > C.'),
      q('Walk 3 km north then 4 km east. How far from the start?', ['5 km', '7 km', '1 km', '12 km'], 0, '3-4-5 right triangle.'),
    ],
    learn: [
      q('P is older than Q, and Q is older than R. The youngest is:', ['R', 'P', 'Q', 'cannot tell'], 0, 'P > Q > R in age.'),
      q('Walk 5 km east then 12 km north. Distance from start:', ['13 km', '17 km', '7 km', '60 km'], 0, '5-12-13.'),
      q('“He is the son of my father’s only sister.” He is my:', ['cousin', 'brother', 'nephew', 'uncle'], 0, 'Your father’s sister is your aunt; her son is your cousin.'),
      q('Today is Friday. What day is it 10 days from now?', ['Monday', 'Sunday', 'Tuesday', 'Wednesday'], 0, '10 mod 7 = 3 days after Friday = Monday.'),
    ],
    lab: [
      q('From the chain A > B > C > D, the SECOND tallest is:', ['B', 'A', 'C', 'D'], 0, 'Order: A, B, C, D.'),
      q('E is taller than C but shorter than B. In the chain A > B > C > D, E is:', ['between B and C', 'between A and B', 'below D', 'above A'], 0, 'B > E > C.'),
    ],
    more: [
      q('All birds have wings. Penguins are birds. Therefore:', ['penguins have wings', 'penguins can fly', 'no birds are penguins', 'wings are birds'], 0, 'Penguins belong to birds, which all have wings.'),
      q('5 machines make 5 gadgets in 5 minutes. How long do 100 machines take to make 100 gadgets?', ['5 minutes', '100 minutes', '20 minutes', '1 minute'], 0, 'Each machine makes 1 gadget per 5 minutes.'),
      q('A is B’s sister and B is C’s father. A is C’s:', ['aunt', 'mother', 'grandmother', 'cousin'], 0, 'C’s father’s sister is C’s aunt.'),
      q('If FAN is coded GBO (each letter +1), then CAT is coded:', ['DBU', 'BZS', 'DAU', 'CBU'], 0, 'C→D, A→B, T→U.'),
    ],
  },
  'essay-structure': {
    video: [
      q('A good thesis statement is:', ['a clear, debatable claim', 'a fact everybody accepts', 'a question', 'a long list of examples'], 0, 'It must take a position someone could disagree with.'),
      q('The conclusion should:', ['restate the thesis in new words', 'introduce a brand-new argument', 'apologize', 'repeat every example'], 0, 'End with synthesis, not new evidence.'),
    ],
    learn: [
      q('A 300-word essay usually has how many body paragraphs?', ['two', 'five', 'one very long', 'zero'], 0, 'Intro + 2 body + conclusion fits 300 words.'),
      q('Which is a thesis?', ['Schools should adopt a four-day week because it boosts attendance and teacher morale.', 'This essay is about school weeks.', 'School weeks have five days.', 'What is a school week?'], 0, 'It states a position and two reasons.'),
      q('In PEEL the second E stands for:', ['Explain', 'Evidence', 'Essay', 'End'], 0, 'Point – Evidence – Explain – Link.'),
      q('Which is a weak opening?', ['“In this essay I will discuss…”', 'A vivid scenario', 'A surprising fact', 'A short question'], 0, 'Announcing the essay wastes the hook.'),
    ],
    lab: [
      q('In the ordering activity, what comes right after reading the prompt and choosing a side?', ['plan thesis and reasons', 'write the conclusion', 'proofread', 'rewrite the prompt'], 0, 'Planning prevents rambling.'),
      q('Proofreading belongs:', ['at the end', 'before planning', 'only if you have time at the start', 'never'], 0, 'Reserve the last few minutes to catch errors.'),
    ],
    more: [
      q('Which is the best topic sentence?', ['Online classes give students flexibility that suits different learning speeds.', 'Online classes exist.', 'I like computers.', 'Some people study.'], 0, 'It states a reason that can be supported with an example.'),
      q('Which transition shows contrast?', ['However', 'Moreover', 'For example', 'Therefore'], 0, 'However introduces an opposite idea.'),
      q('To answer the other side politely you can begin with:', ['“Admittedly, some argue…”', '“You are wrong…”', '“Everybody knows…”', '“Whatever…”'], 0, 'Concession then rebuttal sounds mature.'),
      q('Which closing sentence is strongest?', ['Ultimately, a few quiet minutes of focus can change a whole school day.', 'That is all.', 'The end.', 'I am done writing.'], 0, 'A memorable closing thought that links to the thesis.'),
    ],
  },
  'essay-practice': {
    video: [
      q('In a 30-minute essay, how long should you plan?', ['about 4–5 minutes', '0 minutes', '15 minutes', '25 minutes'], 0, 'A short plan saves time overall.'),
      q('If you are running out of time you should:', ['write a short conclusion', 'start a new paragraph', 'leave the essay unfinished', 'erase everything'], 0, 'A conclusion shows closure and organization.'),
    ],
    learn: [
      q('Graders reward development. That means:', ['specific examples with explanation', 'a long introduction only', 'big words', 'long quotations'], 0, 'Claims must be backed up.'),
      q('Replace “good” with a stronger word:', ['beneficial', 'nice', 'ok', 'fine'], 0, 'Precise words improve style.'),
      q('When should you start proofreading in a 30-minute plan?', ['about minute 26', 'minute 5', 'minute 15', 'never'], 0, 'Leave the last four minutes for it.'),
      q('Which is a good proofreading check?', ['subject–verb agreement in each sentence', 'font size', 'counting the letter e', 'adding more adjectives'], 0, 'Grammar errors are among the easiest to catch.'),
    ],
    lab: [
      q('From the flashcards, a stronger replacement for “very important” is:', ['crucial', 'big', 'okay', 'nice'], 0, 'Crucial = extremely important.'),
      q('What should you do with “I think that”?', ['delete it', 'repeat it', 'put it in every sentence', 'underline it'], 0, 'The essay already is your opinion.'),
    ],
    more: [
      q('Which sentence is in the active voice?', ['The committee approved the plan.', 'The plan was approved by the committee.', 'The plan has been approved.', 'It was approved.'], 0, 'The doer is the subject.'),
      q('Fix the run-on: “Phones are useful they can distract.”', ['Phones are useful; however, they can distract.', 'Phones are useful they, can distract.', 'Phones are useful, they can distract.', 'Phones useful they can distract.'], 0, 'Use a semicolon with a transition word and a comma.'),
      q('Which is the best replacement for “due to the fact that”?', ['because', 'so', 'although', 'when'], 0, 'Shorter and clearer.'),
      q('Which opening line is most effective?', ['Imagine a classroom where no one looks up from a screen.', 'Hello everyone.', 'Technology is a topic.', 'My essay is about phones.'], 0, 'A vivid scenario hooks the reader.'),
    ],
  },
}
