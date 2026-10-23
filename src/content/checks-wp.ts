import type { Checks } from '../types'
import { q } from './helpers'

const S = (...lines: string[]) => lines.join('\n')

export const CHECKS_WP: Record<string, Checks> = {
  'm-word-problems': {
    video: [
      q('Which expression means “4 less than a number”?', ['$x-4$', '$4-x$', '$4x$', '$x+4$'], 0, S('**Words:** the video warns that “less than” flips the order.', '**Step 1:** the number is $x$ and 4 is taken away from it.', '**Step 2:** $x-4$.', '**Answer: $x-4$**')),
      q('Sally is three times as old as John. Which equation shows this (s = Sally, j = John)?', ['$s=3j$', '$j=3s$', '$s+3=j$', '$s=j+3$'], 0, S('**Step 1:** “three times as old as John” means Sally’s age is 3 × John’s age.', '**Step 2:** $s=3j$.', '**Answer: $s=3j$**')),
      q('Which list is three consecutive odd integers?', ['9, 11, 13', '9, 10, 11', '10, 12, 14', '9, 11, 14'], 0, S('**Words:** consecutive odd integers are odd numbers that come right after each other, so they are 2 apart.', '**Step 1:** 9, 11, 13 are all odd and 2 apart ✓.', '**Step 2:** 9, 10, 11 are consecutive integers (not all odd); 10, 12, 14 are even.', '**Answer: 9, 11, 13**')),
      q('John paints a room in 6 hours and Sally in 3 hours. How long together?', ['2 hours', '9 hours', '4.5 hours', '3 hours'], 0, S('**Step 1 (formula from the video):** $\\frac1T=\\frac1{6}+\\frac1{3}$.', '**Step 2 (add):** $\\frac16+\\frac26=\\frac36=\\frac12$.', '**Step 3 (flip):** $T=2$ hours.', '**Answer: 2 hours**')),
    ],
    learn: [
      q('In a word problem, the word “is” usually means:', ['equals (=)', 'add (+)', 'multiply (×)', 'subtract (−)'], 0, S('**Idea:** “is”, “was” and “gives” connect the two sides of the equation.', '**Answer: equals**')),
      q('The sum of three consecutive integers is 63. What is the middle number?', ['21', '20', '22', '19'], 0, S('**Step 1 (sum ÷ how many):** $63\\div3=21$.', '**Step 2:** that is the middle number (the numbers are 20, 21, 22).', '**Answer: 21**')),
      q('John is $j$ years old now. How old will he be in 5 years?', ['$j+5$', '$j-5$', '$5j$', '$\\dfrac j5$'], 0, S('**Step 1:** “in 5 years” means 5 years older.', '**Step 2:** $j+5$.', '**Answer: $j+5$**')),
      q('A does $\\frac14$ of a job per hour and B does $\\frac1{12}$ per hour. How much of the job do they do together in one hour?', ['$\\dfrac13$', '$\\dfrac16$', '$\\dfrac1{48}$', '$\\dfrac5{12}$'], 0, S('**Step 1 (common denominator 12):** $\\frac14=\\frac3{12}$.', '**Step 2 (add rates):** $\\frac3{12}+\\frac1{12}=\\frac4{12}$.', '**Step 3 (simplify):** $\\frac13$.', '**Answer: $\\frac13$**')),
    ],
    lab: [
      q('“Twice a number” is written as:', ['$2x$', '$x+2$', '$x^2$', '$\\dfrac x2$'], 0, S('**Step 1:** “twice” means 2 times.', '**Step 2:** $2x$.', '**Answer: $2x$**')),
      q('“The product of two numbers” means:', ['multiply them', 'add them', 'subtract them', 'divide them'], 0, S('**Idea:** product = multiplication.', '**Answer: multiply them**')),
    ],
    more: [
      q('Three more than twice a number is 17. Find the number.', ['7', '10', '5', '14'], 0, S('**Step 1 (equation):** $2x+3=17$.', '**Step 2 (subtract 3):** $2x=14$.', '**Step 3 (divide by 2):** $x=7$.', '**Answer: 7**')),
      q('The sum of two consecutive integers is 41. What is the larger one?', ['21', '20', '22', '19'], 0, S('**Step 1 (let the numbers be x and x + 1):** $x+(x+1)=41$.', '**Step 2:** $2x+1=41$, so $2x=40$ and $x=20$.', '**Step 3 (larger number):** $20+1=21$.', '**Answer: 21**')),
      q('Anna is 4 years older than Ben. The sum of their ages is 30. How old is Ben?', ['13', '17', '15', '11'], 0, S('**Step 1 (let Ben be b, so Anna is b + 4):** $b+(b+4)=30$.', '**Step 2:** $2b+4=30$, so $2b=26$.', '**Step 3:** $b=13$.', '**Check:** Anna is 17 and $13+17=30$ ✓.', '**Answer: 13**')),
      q('A tap fills a tank in 10 hours and a second tap in 15 hours. How long do both take together?', ['6 hours', '12.5 hours', '25 hours', '5 hours'], 0, S('**Step 1 (rates):** $\\frac1{10}+\\frac1{15}=\\frac3{30}+\\frac2{30}=\\frac5{30}=\\frac16$ of the tank per hour.', '**Step 2 (flip):** 6 hours.', '**Answer: 6 hours**')),
      q('Father is 4 times as old as his son. In 10 years he will be twice as old. How old is the son now?', ['5', '10', '20', '40'], 0, S('**Step 1 (now, and in 10 years everyone is 10 older):** $f=4s$ and $f+10=2(s+10)$.', '**Step 2 (substitute $f=4s$):** $4s+10=2s+20$.', '**Step 3 (subtract $2s$ and 10):** $2s=10$, so $s=5$.', '**Check:** the father is 20 now; in 10 years he is 30 and his son is 15, and $30=2\\times15$ ✓.', '**Answer: 5**')),
    ],
  },
}
