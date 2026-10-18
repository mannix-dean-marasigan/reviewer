import type { Question, Video } from '../types'

/** Question builder: q(text, [A,B,C,D], correctIndex, explanation, optionalShortcut) */
export const q = (text: string, c: [string, string, string, string], a: 0 | 1 | 2 | 3, e: string, trick?: string, passage?: string): Question => ({ q: text, c, a, e, trick, passage })

const OCT = 'The Organic Chemistry Tutor'
const GON = 'Math Teacher Gon'
const LYQA = 'Team Lyqa'
const LEO = 'SolvingMath with Leonalyn'

// Every id below was checked against YouTube (exists + embeddable) when this project was built.
export const VID: Record<string, Video> = {
  pemdas: { id: 'saTBf8AO4Ok', title: 'Order of Operations - Made Easy!', channel: OCT, why: 'Clear step-by-step PEMDAS with many examples; pause before each answer.' },
  pemdasGon: { id: 'pfnctEEWuuM', title: 'Order of Operations (PEMDAS) – Civil Service Exam & LET Math Reviewer', channel: GON, why: 'Filipino exam-style problems with the same traps you will meet.' },
  gcdLcm: { id: 'Veo6jftWyNw', title: 'How to Find the GCF and LCM using Prime Factorization', channel: 'Math with Mr. J', why: 'The cleanest way to do GCF and LCM quickly.' },
  fracConv: { id: '-Xt4UDk7Kzw', title: 'Converting Between Fractions, Decimals, and Percentages', channel: 'Professor Dave Explains', why: 'Fast, 5 minutes, covers every conversion.' },
  fracGon: { id: '1KJdxi3xXCc', title: 'Converting Fractions to Decimals to Percentages', channel: GON, why: 'Slower, exam-oriented walk-through from a Philippine reviewer channel.' },
  expIntro: { id: 'ZtTO8uUGy2Y', title: 'Introduction to Exponents', channel: OCT, why: 'Builds the idea from scratch.' },
  expRules: { id: 'Zt2fdy3zrZU', title: 'Simplifying Exponents With Fractions, Variables, Negative Exponents', channel: OCT, why: 'All the exponent laws with practice problems.' },
  sqrt: { id: 'wSBxW7LW3DA', title: 'How To Simplify Square Roots', channel: OCT, why: 'The factor-out-the-perfect-square method.' },
  ratio: { id: 'JOZSFwuyqok', title: 'Ratio and Proportion Word Problems', channel: OCT, why: 'Covers the typical word-problem setups.' },
  percentChange: { id: 'T6-0MwmCpE8', title: 'Percent Increase and Decrease Word Problems', channel: OCT, why: 'Discounts, markups, and percent change.' },
  ageGon: { id: 'FZmZUaet3Ig', title: 'Solving Age Problems – Civil Service Exam', channel: GON, why: 'Age problems are a favorite in Philippine exams.' },
  factoring: { id: 'U6FndtdgpcA', title: 'How To Factor Polynomials The Easy Way!', channel: OCT, why: 'GCF, trinomials, difference of squares, in one sitting.' },
  quadFormula: { id: 'IlNAJl36-10', title: 'How To Solve Quadratic Equations Using The Quadratic Formula', channel: OCT, why: 'Plug-and-chug formula, no mystery.' },
  discGon: { id: 'n4riwmh-9Xw', title: 'Discriminant and the Nature of Roots of Quadratic Equations', channel: GON, why: 'Exactly the “how many roots” item type.' },
  lineTwoPts: { id: 'mFNwaQUyBlw', title: 'Slope-Intercept Form from Two Points', channel: 'Math with Mr. J', why: 'Build a line equation from two points.' },
  lineBrian: { id: 'gf-829r4B4s', title: 'Find the equation of a line through two points', channel: 'Brian McLogan', why: 'A second explanation if the first one did not click.' },
  arithSeq: { id: 'IshPbnP3vk8', title: 'Arithmetic Sequences Formulas', channel: OCT, why: 'The nth term and sum formulas explained.' },
  angles: { id: 'I5auyoXYoX0', title: 'Alternate, Corresponding and Allied Angles – Parallel Lines', channel: 'Cognito', why: 'Crisp visual rules for parallel lines.' },
  extAngle: { id: 'ndqxxAUDF5Y', title: 'Exterior Angle Theorem For Triangles', channel: OCT, why: 'Triangle angle problems with practice.' },
  special: { id: '6SC4JNSuBJQ', title: 'Special Right Triangles: 30-60-90 and 45-45-90', channel: GON, why: 'Memorize two ratios, win many items.' },
  area: { id: 'JnLDmw3bbuw', title: 'Area of a Rectangle, Triangle, Circle & Sector, Trapezoid…', channel: OCT, why: 'Every area formula you need, with examples.' },
  similar: { id: 'YiFwvAFk-xs', title: 'Similar Triangles', channel: OCT, why: 'Set up proportions correctly.' },
  trig: { id: 'PUB0TaZ7bhA', title: 'Trigonometry For Beginners!', channel: OCT, why: 'SOH-CAH-TOA and special angles from zero.' },
  trigGon: { id: 'iIgEKWUQB4o', title: 'Solving Right Triangles: Finding the Missing Side (SOH-CAH-TOA)', channel: GON, why: 'Exam-style missing-side problems.' },
  combos: { id: 'XJnIdRXUi7A', title: 'Permutations and Combinations Tutorial', channel: OCT, why: 'When to use nPr vs nCr, with practice.' },
  meanMode: { id: 'A1mQ9kD-i9I', title: 'Mean, Median, Mode, and Range', channel: OCT, why: 'Quick and complete.' },
  vennUpcat: { id: 'x5yFt411zGA', title: 'Solving Word Problems with Sets Using a Venn Diagram | UPCAT and CSE Review', channel: LYQA, why: 'Made for Philippine entrance exams.' },
  venn3: { id: 'zoSpsLhO0qg', title: 'Venn Diagram Word Problems With 3 Categories', channel: OCT, why: 'Level up: three overlapping sets.' },
  syllogism: { id: 'awdnai6yojA', title: 'Logical Reasoning | SYLLOGISM Tricks', channel: 'NoMo Studio', why: 'Diagram method for syllogism items.' },
  context: { id: 'nvK5EzfuAIs', title: 'How to Use Context Clues to Understand Words', channel: LYQA, why: 'Core vocabulary skill for the exam.' },
  contextKhan: { id: 'CiNggzdWkIo', title: 'Using context clues to figure out new words', channel: 'Khan Academy', why: 'Short and sharp recap.' },
  roots: { id: '0diRbQ-mgfo', title: 'English Vocabulary: Roots, Prefixes and Suffixes', channel: 'Daniel Byrnes', why: 'Unlocks hundreds of words from a few roots.' },
  sva: { id: 'Qsmzg8D3wd0', title: '15 Rules of Subject-Verb Agreement', channel: 'NoMo Studio', why: 'Every tricky agreement rule in one video.' },
  tenses: { id: '15NgAMXhqrw', title: 'English Tenses Part 1: Present Tenses', channel: LYQA, why: 'Tense control for sentence-correction items.' },
  parallel: { id: '_AeYYtvVacA', title: 'Parallelism: Identifying Errors | Sentence Correction', channel: LYQA, why: 'Spot the broken pattern quickly.' },
  punct: { id: '4IqlgGLV1XQ', title: 'English punctuation rules (Comma, Period, Colon, Semicolon)', channel: 'POC English', why: 'Punctuation rules without the confusion.' },
  semicolon: { id: 'gar2EzA7sAw', title: 'Using a SEMICOLON | CSE, IELTS, and UPCAT Review', channel: LYQA, why: 'Semicolons are tested a lot.' },
  analogy: { id: 'jylFRkq5QcE', title: '10-item Verbal Analogy Sample Questions', channel: 'NoMo Studio', why: 'Learn the relationship types, then practice.' },
  mainIdea: { id: 'LbO3lRXT0ww', title: 'Main Idea | Summarising | Reading Strategies', channel: 'EasyTeaching', why: 'Find the main idea in under a minute.' },
  infer: { id: 'g2G-MaIxjBI', title: 'Inferring | Reading Strategies', channel: 'EasyTeaching', why: 'How to “read between the lines”.' },
  abstract: { id: 'WxeHtY-H7Dk', title: 'ABSTRACT REASONING TESTS Questions, Tips and Tricks!', channel: 'CareerVidz', why: 'The best overview of every pattern type and how to attack it.' },
  abstractLeo: { id: 'oOdQYmW1JFc', title: 'ABSTRACT REASONING | Logical Test', channel: LEO, why: 'Filipino instructor; works through entrance-exam style items.' },
  abstract25: { id: 'rUHUb75RXOw', title: '25-item ABSTRACT REASONING Test 1', channel: LEO, why: 'Full practice set (includes UPCAT and college entrance exams): pause and try each.' },
  numSeries: { id: 'r614AD021n0', title: 'Number Series Reasoning Tricks – The Easy Way!', channel: OCT, why: 'Systematic way to crack any number series.' },
  numSeriesLeo: { id: 'iwpd_RkG-1U', title: 'NUMBER SERIES | Numerical Reasoning Test [AFPSAT CSE UPCAT PMA LET]', channel: LEO, why: 'Entrance-exam flavoured practice.' },
  nonverbal: { id: 'CzMbznbN3xk', title: 'Non Verbal Reasoning Test Tips and Tricks', channel: 'CareerVidz', why: 'Matrices and grid patterns.' },
  oddOne: { id: 'IZ_IiMFCzzo', title: 'Which figure is the odd one out? | ABSTRACT REASONING TEST', channel: LEO, why: 'Odd-one-out strategies.' },
  cubes: { id: 'qyzh1maZIfE', title: 'Pattern folding strategy: Cube nets / folding cubes', channel: 'Erudition', why: 'Spatial folding technique.' },
  spatial: { id: 'JrDcD_lcazw', title: 'HOW to PASS a SPATIAL REASONING TEST!', channel: 'CareerVidz', why: 'Rotation and mental-manipulation tips.' },
  essayPlan: { id: 'oAUKxr946SI', title: 'How to Write an Argumentative Essay – Planning', channel: 'British Council Singapore', why: 'Planning an essay before you write.' },
  essayStruct: { id: 'VZKUeEBryOk', title: 'How to Write an Argumentative Essay with Example', channel: 'Literacy In Focus', why: 'Short, with a full example.' },
  essayTimed: { id: 'ga-ONwAX9cg', title: 'Timed Essay Strategies', channel: 'Ms. Peer Editor', why: 'How to budget your minutes.' },
  essay30: { id: 'bpB2wgK-HKc', title: 'Write an Essay in 30 MINUTES!!', channel: 'Eleanor Josefina', why: 'Fast-writing hacks for a timed setting.' },
  mcq: { id: 'Q1y8c_MZYvE', title: '5 Rules (and One Secret Weapon) for Acing Multiple Choice Tests', channel: 'Thomas Frank', why: 'Test-taking tactics that actually work.' },
  mcq2: { id: '0aF7G0TMh7M', title: '7 Tips and Strategies for Answering Multiple Choice Questions', channel: '2 Minute Classroom', why: 'A 3-minute checklist for test day.' },
}
