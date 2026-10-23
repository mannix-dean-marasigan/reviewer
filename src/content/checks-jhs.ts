import type { Checks } from '../types'
import { q } from './helpers'

const S = (...lines: string[]) => lines.join('\n')

export const CHECKS_JHS: Record<string, Checks> = {
  'm-logic': {
    video: [
      q('The negation of “It is raining” is:', ['It is not raining', 'It is raining hard', 'It is sunny', 'It rained yesterday'], 0, S('**Words:** the **negation** of a statement has the OPPOSITE truth value. Symbol: $\\sim p$.', '**Step 1:** put a “not” in the statement.', '**Answer: It is not raining**')),
      q('A tautology is a statement that is:', ['always true', 'always false', 'sometimes true', 'never a proposition'], 0, S('**Words:** a **tautology** is true for EVERY combination of truth values (example: $p\\vee\\sim p$).', '**Answer: always true**')),
    ],
    learn: [
      q('p is TRUE and q is TRUE. What is $p\\wedge q$?', ['True', 'False', 'Unknown', 'Both'], 0, S('**Words:** ∧ means AND: true only when BOTH are true.', '**Step 1:** both are true.', '**Answer: True**')),
      q('Which statement is a CONTRADICTION (always false)?', ['$p\\wedge\\sim p$', '$p\\vee\\sim p$', '$p\\rightarrow p$', '$p\\vee q$'], 0, S('**Step 1:** $p\\wedge\\sim p$ says “p is true AND p is false” at the same time, which is impossible.', '**Step 2:** the others can be true.', '**Answer: $p\\wedge\\sim p$**')),
      q('What is the negation of “Some students passed”?', ['No student passed.', 'Some student failed.', 'All students passed.', 'Some students did not pass.'], 0, S('**Idea:** “some” means at least one.', '**Step 1:** to deny “at least one passed”, no one passed.', '**Answer: No student passed.**')),
    ],
    lab: [
      q('In the truth table activity for $p\\wedge q$, in how many of the 4 rows is it TRUE?', ['1', '2', '3', '4'], 0, S('**Step 1:** AND is true only when both p and q are true.', '**Step 2:** that is just the row T, T.', '**Answer: 1**')),
      q('In the activity for $p\\rightarrow q$, in how many of the 4 rows is it FALSE?', ['1', '2', '3', '0'], 0, S('**Step 1:** a conditional is false only when p is true and q is false.', '**Step 2:** that is just the row T, F.', '**Answer: 1**')),
    ],
    more: [
      q('p is TRUE and q is TRUE. What is $p\\wedge\\sim q$?', ['False', 'True', 'Unknown', 'Both'], 0, S('**Words:** $\\sim q$ means NOT q. $\\wedge$ (AND) is true only when BOTH sides are true.', '**Step 1:** q is True, so $\\sim q$ is False.', '**Step 2:** True AND False = False.', '**Answer: False**')),
      q('If “If you study, you will pass” is true and you did NOT pass, what follows?', ['You did not study', 'You studied', 'You will pass later', 'Nothing can be concluded'], 0, S('**Idea (modus tollens):** from $p\\rightarrow q$ and $\\sim q$ we may conclude $\\sim p$.', '**Step 1:** p = “you study”, q = “you will pass”. q is false.', '**Step 2:** so p must be false.', '**Answer: You did not study**')),
      q('How many rows does a truth table with 4 propositions have?', ['16', '8', '12', '4'], 0, S('**Step 1:** each proposition doubles the number of rows.', '**Step 2:** $2\\times2\\times2\\times2=16$.', '**Answer: 16**')),
      q('p is FALSE and q is FALSE. What is $p\\leftrightarrow q$?', ['True', 'False', 'Unknown', 'Both'], 0, S('**Words:** ↔ is true when p and q have the SAME truth value.', '**Step 1:** both are false, which is the same value.', '**Answer: True**')),
    ],
  },
  'm-stats': {
    video: [
      q('The median of 3, 7, 9 is:', ['7', '9', '3', '6.3'], 0, S('**Words:** the **median** is the middle value of sorted data.', '**Step 1:** sorted already: 3, 7, 9.', '**Answer: 7**')),
      q('A quartile splits the data into how many equal parts?', ['4', '2', '10', '100'], 0, S('**Step 1:** “quart” means four. Quartiles divide the sorted data into four equal parts.', '**Answer: 4**')),
    ],
    learn: [
      q('A frequency table shows the value 4 occurring 3 times and the value 6 occurring 2 times. What is the mean?', ['4.8', '5', '4', '10'], 0, S('**Step 1 (value × frequency):** $4\\times3=12$ and $6\\times2=12$.', '**Step 2 (add):** $12+12=24$.', '**Step 3 (total frequency):** $3+2=5$.', '**Step 4:** $24\\div5=4.8$.', '**Answer: 4.8**')),
      q('For the sorted data 2, 4, 6, 8, 10, 12 (six values) what is $Q_1$?', ['4', '3', '6', '5'], 0, S('**Step 1 (split into two halves of three):** lower half 2, 4, 6; upper half 8, 10, 12.', '**Step 2 ($Q_1$ = median of the lower half):** 4.', '**Answer: 4**')),
    ],
    lab: [
      q('In the stats tool, if you add one very large number to a data set, which value changes the MOST?', ['the mean', 'the median', 'the mode', 'Q1'], 0, S('**Step 1:** the mean uses every value, so one extreme value pulls it a lot.', '**Step 2:** the median and quartiles depend on positions, so they barely move.', '**Answer: the mean**')),
      q('In the tool, the IQR equals:', ['Q3 − Q1', 'Q3 + Q1', 'the max − the min', 'Q2 − Q1'], 0, S('**Step 1:** **IQR** = interquartile range = distance between the third and the first quartile.', '**Answer: Q3 − Q1**')),
    ],
    more: [
      q('Find the range of 4, 9, 2, 15, 7.', ['13', '15', '2', '8'], 0, S('**Words:** the **range** = largest value − smallest value.', '**Step 1:** largest 15, smallest 2.', '**Step 2:** $15-2=13$.', '**Answer: 13**')),
      q('A score at the 50th percentile equals the:', ['median', 'mean', 'mode', 'range'], 0, S('**Step 1:** 50% of the scores are below the median.', '**Answer: the median**')),
      q('Find the median of 4, 9, 2, 15, 7.', ['7', '9', '2', '8'], 0, S('**Words:** the **median** is the middle value after sorting.', '**Step 1 (sort):** 2, 4, 7, 9, 15.', '**Step 2 (middle of 5 values is the 3rd):** 7.', '**Answer: 7**')),
      q('In a class, the 25th percentile of test scores is 60. What does it mean?', ['25% of the scores are below 60', '25% of students scored 60', 'the class average is 60', 'the lowest score is 60'], 0, S('**Step 1:** the 25th percentile has 25% of the scores below it.', '**Answer: 25% of the scores are below 60**')),
    ],
  },
  'm-probability': {
    video: [
      q('The probability of an impossible event is:', ['0', '1', '0.5', '−1'], 0, S('**Step 1:** probabilities run from 0 (cannot happen) to 1 (certain).', '**Answer: 0**')),
      q('If $P(A)=0.7$, then $P(\\text{not }A)=$', ['0.3', '0.7', '1.7', '0'], 0, S('**Words:** the **complement** of an event is “it does not happen”.', '**Step 1:** $P(\\text{not }A)=1-P(A)$.', '**Step 2:** $1-0.7=0.3$.', '**Answer: 0.3**')),
    ],
    learn: [
      q('A fair die is rolled. What is the probability of an even number?', ['$\\dfrac12$', '$\\dfrac16$', '$\\dfrac13$', '$\\dfrac23$'], 0, S('**Step 1 (favorable):** 2, 4, 6 are even: 3 outcomes.', '**Step 2 (total):** 6 outcomes.', '**Step 3:** $\\frac36=\\frac12$.', '**Answer: $\\frac12$**')),
      q('Rolling a 1 OR a 2 on a die: the events are mutually exclusive. $P=$', ['$\\dfrac13$', '$\\dfrac1{36}$', '$\\dfrac16$', '$\\dfrac12$'], 0, S('**Step 1:** $P(1)=\\frac16$ and $P(2)=\\frac16$.', '**Step 2 (mutually exclusive, so add):** $\\frac16+\\frac16=\\frac26=\\frac13$.', '**Answer: $\\frac13$**')),
      q('A bag has 5 red and 3 blue marbles. Two are drawn WITHOUT replacement. What is the probability that both are red?', ['$\\dfrac5{14}$', '$\\dfrac{25}{64}$', '$\\dfrac5{8}$', '$\\dfrac{5}{16}$'], 0, S('**Step 1 (first red):** $\\frac58$.', '**Step 2 (second red; one red gone and one marble gone):** $\\frac47$.', '**Step 3 (multiply):** $\\frac58\\times\\frac47=\\frac{20}{56}$.', '**Step 4 (simplify):** $\\frac5{14}$.', '**Answer: $\\frac5{14}$**')),
    ],
    lab: [
      q('Which rule do you use for “A OR B” when the events can overlap?', ['add, then subtract the overlap', 'multiply', 'subtract only', 'divide'], 0, S('**Step 1:** adding counts the overlap twice.', '**Step 2:** subtract it once: $P(A)+P(B)-P(A\\cap B)$.', '**Answer: add, then subtract the overlap**')),
      q('“At least one” is found using:', ['$1-P(\\text{none})$', '$P(\\text{one})\\times2$', '$P(\\text{all})$', '$1+P(\\text{none})$'], 0, S('**Step 1:** “at least one” is the opposite of “none”.', '**Answer: $1-P(\\text{none})$**')),
    ],
    more: [
      q('Two coins are tossed. What is the probability of getting two heads?', ['$\\dfrac14$', '$\\dfrac12$', '$\\dfrac13$', '$\\dfrac18$'], 0, S('**Step 1 (independent, so multiply):** $\\frac12\\times\\frac12$.', '**Step 2:** $\\frac14$.', '**Answer: $\\frac14$**')),
      q('A card is drawn from 52. What is the probability that it is a heart or a spade?', ['$\\dfrac12$', '$\\dfrac14$', '$\\dfrac{26}{13}$', '$\\dfrac{1}{13}$'], 0, S('**Step 1:** hearts 13 and spades 13 cannot happen together (mutually exclusive).', '**Step 2:** $\\frac{13}{52}+\\frac{13}{52}=\\frac{26}{52}$.', '**Step 3:** $=\\frac12$.', '**Answer: $\\frac12$**')),
      q('The probability of rain is 0.2. What is the probability of NO rain on two independent days?', ['0.64', '0.8', '0.04', '0.96'], 0, S('**Step 1 (no rain on one day):** $1-0.2=0.8$.', '**Step 2 (independent days, multiply):** $0.8\\times0.8=0.64$.', '**Answer: 0.64**')),
      q('$P(A)=0.6$, $P(B)=0.5$, $P(A\\cap B)=0.3$. Find $P(A\\cup B)$.', ['0.8', '1.1', '0.3', '0.9'], 0, S('**Step 1:** $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.', '**Step 2:** $0.6+0.5-0.3$.', '**Step 3:** $=0.8$.', '**Answer: 0.8**')),
    ],
  },
  'm-trig2': {
    video: [
      q('The Law of Sines compares:', ['each side with the sine of its opposite angle', 'two sides only', 'two angles only', 'the area with the perimeter'], 0, S('**Step 1:** $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}$.', '**Answer: each side with the sine of its opposite angle**')),
      q('The Law of Cosines with $C=90^\\circ$ becomes:', ['the Pythagorean theorem', 'the Law of Sines', 'the area formula', 'nothing useful'], 0, S('**Step 1:** $\\cos90^\\circ=0$, so the term $-2ab\\cos C$ disappears.', '**Step 2:** $c^2=a^2+b^2$.', '**Answer: the Pythagorean theorem**')),
    ],
    learn: [
      q('Which pair is “SSS”?', ['three sides known', 'two sides and the angle between them', 'two angles and a side', 'three angles known'], 0, S('**Step 1:** S = side, so SSS = three sides.', '**Step 2:** that case is solved with the Law of Cosines.', '**Answer: three sides known**')),
      q('In the Law of Cosines $c^2=a^2+b^2-2ab\\cos C$, which angle is C?', ['the angle between sides a and b', 'the angle opposite side a', 'the angle opposite side b', 'any angle'], 0, S('**Step 1:** side c is opposite angle C.', '**Step 2:** sides a and b are the two sides that form angle C.', '**Answer: the angle between sides a and b**')),
      q('A triangle has angles $A=50^\\circ$ and $B=60^\\circ$. What is $C$?', ['70°', '110°', '80°', '60°'], 0, S('**Step 1:** the angles of any triangle add to 180°.', '**Step 2:** $180-50-60=70$.', '**Answer: 70°**')),
    ],
    lab: [
      q('In the activity, the angle between the sides 3 and 8 is 60°. What is $2ab\\cos C$?', ['24', '48', '12', '73'], 0, S('**Step 1:** $2\\times3\\times8=48$.', '**Step 2 ($\\cos60^\\circ=\\frac12$):** $48\\times\\frac12=24$.', '**Answer: 24**')),
      q('What is the third side in the activity?', ['7', '49', '11', '5'], 0, S('**Step 1:** $c^2=9+64-24=49$.', '**Step 2:** $c=\\sqrt{49}=7$.', '**Answer: 7**')),
    ],
    more: [
      q('Sides 5 and 8 with a 60° angle between them. Find the third side.', ['7', '9', '13', '6'], 0, S('**Step 1 (Law of Cosines):** $c^2=5^2+8^2-2(5)(8)\\cos60^\\circ$.', '**Step 2:** $25+64-80\\times\\frac12=89-40=49$.', '**Step 3:** $c=7$.', '**Answer: 7**')),
      q('Find the area of a triangle with sides 10 and 6 and the angle 30° between them.', ['15', '30', '60', '8'], 0, S('**Step 1:** area $=\\frac12ab\\sin C$.', '**Step 2:** $\\frac12\\times10\\times6\\times\\frac12$.', '**Step 3:** $30\\times\\frac12=15$.', '**Answer: 15**')),
      q('In a triangle $A=30^\\circ$, $a=6$ and $B=90^\\circ$. Find $b$.', ['12', '6', '3', '$6\\sqrt3$'], 0, S('**Step 1 (Law of Sines):** $\\frac{6}{\\sin30^\\circ}=\\frac{b}{\\sin90^\\circ}$.', '**Step 2:** $\\frac{6}{0.5}=12=b$.', '**Answer: 12**')),
      q('Sides 3, 5 and 7: what is the angle opposite 7?', ['120°', '60°', '90°', '150°'], 0, S('**Step 1 (Law of Cosines):** $\\cos C=\\frac{3^2+5^2-7^2}{2(3)(5)}=\\frac{9+25-49}{30}=\\frac{-15}{30}=-\\frac12$.', '**Step 2:** $\\cos C=-\\frac12$ means $C=120^\\circ$.', '**Answer: 120°**')),
    ],
  },
}
