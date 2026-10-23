import type { Lesson } from '../types'
import { q, VID } from './helpers'

const S = (...lines: string[]) => lines.join('\n')

// Word problems: turning sentences into equations (number, consecutive integer, age and work problems).
export const MATH9: Lesson[] = [
  {
    id: 'm-word-problems', subject: 'math', title: 'Word Problems: Number, Consecutive, Age & Work', minutes: 40,
    blurb: 'Turn a sentence into an equation, then solve it. Covers number, consecutive-integer, age and work problems.',
    videos: [VID.ocTranslate, VID.ocAge, VID.ocConsec, VID.ocWork],
    interactive: { k: 'flash', data: { frontLabel: 'WORDS', cards: [['sum', 'addition (+)'], ['difference', 'subtraction (−)'], ['product', 'multiplication (×)'], ['quotient', 'division (÷)'], ['is / was / equals', 'the equals sign (=)'], ['twice a number', '$2x$'], ['4 less than a number', '$x-4$ (the 4 goes AFTER the x)'], ['5 more than a number', '$x+5$'], ['3 consecutive integers', '$x,\\ x+1,\\ x+2$'], ['3 consecutive even or odd integers', '$x,\\ x+2,\\ x+4$'], ['n years from now', 'add n to EVERY age'], ['A does a job in a hours', 'A does $\\frac1a$ of the job per hour']] } },
    blocks: [
      { t: 'h', text: 'Turn words into algebra' },
      { t: 'formula', items: ['A **variable** is a letter (like $x$) standing for the number you do not know yet.', '**sum** → add, **difference** → subtract, **product** → multiply, **quotient** → divide, **is** → equals.', '**“4 less than a number”** is $x-4$, NOT $4-x$. The number you start from comes first.'] },
      { t: 'ex', title: 'The sum of five times a number and twelve is 32. Find the number.', steps: ['Let $x$ be the number. “Five times the number” is $5x$.', '“The sum of $5x$ and 12” is $5x+12$, and “is 32” means $=32$.', 'Subtract 12 from both sides: $5x=20$.', 'Divide both sides by 5: $x=4$.'], ans: '$x=4$' },
      { t: 'h', text: 'Consecutive integer problems' },
      { t: 'formula', items: ['**Consecutive integers** come right after each other: 3, 4, 5.', '**Consecutive even integers** (or odd) skip one: 12, 14, 16 (or 9, 11, 13).', 'Quick method for 3 numbers: divide the sum by 3 to get the MIDDLE number, then step down and up.'] },
      { t: 'ex', title: 'The sum of three consecutive odd integers is 105. What is the smallest?', steps: ['Divide the sum by how many numbers: $105\\div3=35$. That is the middle number (and it is odd, good).', 'Consecutive odd numbers are 2 apart, so the three numbers are 33, 35, 37.', 'Check: $33+35+37=105$ ✓.'], ans: '33' },
      { t: 'h', text: 'Age problems' },
      { t: 'formula', items: ['Give each person a letter for their age NOW.', 'Write one equation for the present and one for the past or future (add or subtract the years from EVERY person).', 'Two unknowns need two equations: substitute one into the other.'] },
      { t: 'ex', title: 'Sally is three times as old as John. In 8 years Sally will be twice as old as John. How old is John now?', steps: ['Now: $s=3j$. In 8 years: $s+8=2(j+8)$.', 'Substitute $s=3j$: $3j+8=2j+16$.', 'Subtract $2j$ and 8 from both sides: $j=8$.', 'Check: Sally is 24 now; in 8 years she is 32 and John is 16, and $32=2\\times16$ ✓.'], ans: 'John is 8' },
      { t: 'h', text: 'Work problems' },
      { t: 'formula', items: ['A **rate** is how much of the job gets done in ONE hour. If A takes $a$ hours, A does $\\frac1a$ of the job per hour.', 'Working together the rates add: $\\dfrac1T=\\dfrac1a+\\dfrac1b$ (T is the time together).', 'To find one person’s time, subtract the other rate: $\\dfrac1b=\\dfrac1T-\\dfrac1a$.'] },
      { t: 'ex', title: 'John paints a room in 6 hours and Sally in 3 hours. How long together?', steps: ['Rates: John $\\frac16$, Sally $\\frac13$ of the room per hour.', 'Add: $\\frac16+\\frac13=\\frac16+\\frac26=\\frac36=\\frac12$ of the room per hour.', 'Flip it: the whole room takes 2 hours.'], ans: '2 hours' },
    ],
    tricks: [
      'Always start with “Let $x$ = …” and say in words what x stands for.',
      '“Less than” flips the order: 4 less than $x$ is $x-4$.',
      'Consecutive numbers: sum ÷ how many = the middle number (odd count).',
      'Age problems: when time passes, EVERYONE gets older by the same number of years.',
      'Work problems: together time is always LESS than the faster person’s time. If your answer is bigger, you made a mistake.',
      'Two workers: time together = (a × b) ÷ (a + b).',
    ],
    quiz: [
      q('The sum of five times a number and twelve is 32. Find the number.', ['4', '20', '44', '7'], 0, S('**Words:** a **variable** is a letter for the unknown number. “Sum” means add and “is” means equals.', '**Step 1 (let x be the number):** five times it is $5x$.', '**Step 2 (write the equation):** $5x+12=32$.', '**Step 3 (subtract 12 from both sides):** $5x=20$.', '**Step 4 (divide both sides by 5):** $x=4$.', '**Answer: 4**')),
      q('Which expression means “7 less than a number”?', ['$x-7$', '$7-x$', '$7x$', '$x+7$'], 0, S('**Words:** “less than” means subtract, but the number you START from comes first.', '**Step 1:** the number is $x$ and we take 7 away from it.', '**Step 2:** $x-7$ (not $7-x$).', '**Answer: $x-7$**')),
      q('The sum of three consecutive even integers is 78. What is the smallest?', ['24', '26', '28', '22'], 0, S('**Words:** **consecutive even integers** are even numbers right after each other, 2 apart (like 24, 26, 28).', '**Step 1 (middle number):** $78\\div3=26$.', '**Step 2 (2 below and 2 above):** the numbers are 24, 26, 28.', '**Step 3 (check):** $24+26+28=78$ ✓.', '**Answer: 24**')),
      q('Sally is three times as old as John. In 8 years Sally will be twice as old as John. How old is John now?', ['8', '24', '16', '12'], 0, S('**Step 1 (name the ages now):** Sally $s$, John $j$.', '**Step 2 (now):** $s=3j$.', '**Step 3 (in 8 years both get 8 older):** $s+8=2(j+8)$.', '**Step 4 (substitute $s=3j$):** $3j+8=2j+16$.', '**Step 5 (subtract $2j$ and 8):** $j=8$.', '**Check:** Sally 24 now; in 8 years 32 and 16, and $32=2\\times16$ ✓.', '**Answer: 8**')),
      q('John can paint a room in 6 hours and Sally in 3 hours. How long will they take together?', ['2 hours', '4.5 hours', '9 hours', '3 hours'], 0, S('**Words:** a **rate** is the part of the job done in one hour.', '**Step 1 (rates):** John $\\frac16$, Sally $\\frac13$.', '**Step 2 (add):** $\\frac16+\\frac26=\\frac36=\\frac12$ of the job per hour.', '**Step 3 (flip to get the time for the whole job):** 2 hours.', '**Answer: 2 hours**')),
      q('Mark and Kelly together finish a job in 4 hours. Mark alone takes 6 hours. How long would Kelly take alone?', ['12 hours', '2 hours', '10 hours', '24 hours'], 0, S('**Step 1 (together rate):** $\\frac14$ of the job per hour. Mark’s rate is $\\frac16$.', '**Step 2 (Kelly’s rate = together − Mark):** $\\frac14-\\frac16=\\frac3{12}-\\frac2{12}=\\frac1{12}$.', '**Step 3 (flip):** Kelly takes 12 hours.', '**Answer: 12 hours**')),
      q('Four times a number, decreased by 9, equals 27. Find the number.', ['9', '4.5', '18', '36'], 0, S('**Step 1 (let x be the number):** “four times” is $4x$, “decreased by 9” is $-9$.', '**Step 2 (equation):** $4x-9=27$.', '**Step 3 (add 9 to both sides):** $4x=36$.', '**Step 4 (divide by 4):** $x=9$.', '**Answer: 9**')),
    ],
  },
]
