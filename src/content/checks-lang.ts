import type { Checks } from '../types'
import { q } from './helpers'

const JEEP = 'The jeepney has been a symbol of Philippine streets since the 1940s, when surplus military vehicles were converted into passenger transport. Its colorful decorations reflect the owners’ creativity and faith, yet in recent years the government has pushed for modern replacements that are cleaner and safer. Drivers worry the change will cost them their livelihoods, while commuters hope for more comfortable rides.'

const HOMEWORK = 'Some critics argue that homework should be abolished. They claim it causes stress and leaves little time for family. However, a recent school survey found that students who completed regular homework scored higher on tests. The evidence suggests a balanced approach: shorter, more purposeful assignments.'

export const CHECKS_LANG: Record<string, Checks> = {
  'e-vocab': {
    video: [
      q('“The weather was *inclement*, so the picnic was canceled.” Inclement most likely means:', ['stormy', 'pleasant', 'warm', 'unexpected'], 0, 'The cause-and-effect clue: the picnic was canceled because of the weather, so the weather was bad (stormy).'),
      q('The prefix *mal-* means “bad”. *Malnutrition* therefore means:', ['poor nutrition', 'good nutrition', 'no appetite', 'too much food'], 0, 'mal (bad) + nutrition = bad/poor nutrition.'),
    ],
    learn: [
      q('“Unlike her *gregarious* sister, Mia was shy.” Gregarious means:', ['sociable', 'quiet', 'clever', 'strict'], 0, 'The contrast word “Unlike” signals the opposite of shy: sociable.'),
      q('The root *spect* means “look”. *Inspect* means:', ['to look into closely', 'to look away', 'to forget', 'to remove'], 0, 'in + spect = look into.'),
    ],
    lab: [
      q('Use the flashcards: *ephemeral* means:', ['lasting a very short time', 'lasting forever', 'extremely loud', 'very large'], 0, 'Think of a soap bubble: ephemeral things vanish quickly.'),
      q('A *meticulous* person is:', ['extremely careful about details', 'careless', 'always late', 'very talkative'], 0, 'Meticulous = precise and careful.'),
    ],
    more: [
      q('Choose the synonym of *candid*:', ['honest', 'secretive', 'hostile', 'shy'], 0, 'Candid = frank, honest.'),
      q('Choose the closest meaning of *obsolete*:', ['outdated', 'brand new', 'broken', 'valuable'], 0, 'Obsolete things are no longer used.'),
      q('Which word is the antonym of *benevolent*?', ['malevolent', 'generous', 'kind', 'charitable'], 0, 'bene (good) vs mal (bad): benevolent is kind, malevolent is wishing harm.'),
      q('If a statement is *ambiguous*, it:', ['can be understood in more than one way', 'is completely false', 'is very short', 'is obviously true'], 0, 'Ambiguous = unclear, with more than one possible meaning.'),
    ],
  },
  'e-grammar-sva': {
    video: [
      q('“The boxes on the shelf ___ heavy.”', ['are', 'is', 'was', 'has been'], 0, 'The subject is “boxes” (plural), not “shelf”.'),
      q('“Everyone ___ invited to the party.”', ['is', 'are', 'were', 'have been'], 0, '“Everyone” is singular.'),
    ],
    learn: [
      q('“The teacher, along with her students, ___ going on the trip.”', ['is', 'are', 'were', 'have been'], 0, '“Along with her students” is an extra phrase. The subject is “teacher” (singular).'),
      q('“Neither the manager nor the employees ___ at the meeting.”', ['were', 'was', 'is', 'has been'], 0, 'With neither/nor, match the nearer subject: “employees” (plural).'),
      q('Which is a sentence fragment?', ['Because the road was flooded.', 'The road was flooded.', 'The road flooded, so we turned back.', 'We turned back.'], 0, '“Because…” starts a dependent clause that needs a main clause.'),
    ],
    lab: [
      q('In the error hunt, which word is wrong in “Each of the students have a book”?', ['have', 'Each', 'students', 'book'], 0, '“Each” is singular → “has”.'),
      q('“Mathematics ___ my favorite subject.”', ['is', 'are', 'were', 'be'], 0, 'Mathematics names one field, so it is singular.'),
    ],
    more: [
      q('“There ___ two reasons for the delay.”', ['are', 'is', 'was', 'has'], 0, 'The subject “reasons” follows the verb; it is plural.'),
      q('“A number of students ___ absent today.”', ['are', 'is', 'was', 'has been'], 0, '“A number of” is plural. (“The number of” would be singular.)'),
      q('“The news about the typhoon ___ alarming.”', ['is', 'are', 'were', 'have been'], 0, '“News” is singular despite the -s.'),
      q('“Fifty pesos ___ enough for lunch.”', ['is', 'are', 'were', 'have been'], 0, 'An amount of money treated as one sum takes a singular verb.'),
    ],
  },
  'e-tenses-pronouns': {
    video: [
      q('“She ___ in Cebu since 2015.”', ['has lived', 'lived', 'lives', 'is living'], 0, '“Since 2015” signals present perfect.'),
      q('The simple past of “go” is:', ['went', 'gone', 'goed', 'going'], 0, 'Irregular: go – went – gone.'),
    ],
    learn: [
      q('“By the time he arrived, we ___ dinner.”', ['had finished', 'have finished', 'finish', 'were finish'], 0, 'Two past events: the earlier one takes the past perfect.'),
      q('“I have ___ the letter already.”', ['written', 'wrote', 'writed', 'write'], 0, 'Present perfect uses the past participle: written.'),
      q('“This is between you and ___.”', ['me', 'I', 'myself', 'mine'], 0, 'After a preposition, use the object case.'),
      q('Which sentence has NO dangling modifier?', ['Running to the bus, I dropped my bag.', 'Running to the bus, my bag fell.', 'Running to the bus, the bag was dropped.', 'Running to the bus, it fell.'], 0, 'The “-ing” phrase must describe the noun that follows: “I” was running.'),
    ],
    lab: [
      q('Which is correct?', ['Ana and I went to the mall.', 'Me and Ana went to the mall.', 'Ana and me went to the mall.', 'I and Ana went to the mall.'], 0, 'Remove “Ana and”: “I went”, not “me went”.'),
      q('“He has ___ the report.” Choose the correct form of write.', ['written', 'wrote', 'writing', 'writes'], 0, 'has + past participle.'),
    ],
    more: [
      q('“I ___ the book on the table yesterday.” (put)', ['laid', 'lay', 'lain', 'layed'], 0, 'Lay (to put) – laid – laid.'),
      q('“If I ___ you, I would study harder.”', ['were', 'was', 'am', 'be'], 0, 'Subjunctive mood for hypothetical situations: “were”.'),
      q('“___ did you invite to the party?”', ['Whom', 'Who', 'Whose', 'Who’s'], 0, 'You invited HIM: object case → whom.'),
      q('“Neither of us ___ ready.”', ['is', 'are', 'were', 'be'], 0, '“Neither” is singular.'),
    ],
  },
  'e-sentence-errors': {
    video: [
      q('Which is parallel? “She likes reading, swimming, and…”', ['dancing', 'to dance', 'she dances', 'dance a lot'], 0, 'Keep the same -ing form in a list.'),
      q('Which fixes the comma splice “It rained, we stayed home”?', ['It rained, so we stayed home.', 'It rained we stayed home.', 'It rained, stayed home.', 'It rained, and, we stayed home.'], 0, 'A comma plus a coordinating conjunction (so) joins two sentences correctly.'),
    ],
    learn: [
      q('“He not only sings but also ___.”', ['dances', 'dancing', 'to dance', 'danced a lot'], 0, 'Both parts must be parallel: sings / dances.'),
      q('Which uses the semicolon correctly?', ['I was tired; I went to bed.', 'I was tired; and I went to bed.', 'I was; tired I went to bed.', 'I was tired, I went; to bed.'], 0, 'A semicolon joins two complete sentences without a conjunction.'),
      q('“___ a beautiful day.” (it is)', ['It’s', 'Its', 'Its’', 'Is it’s'], 0, 'It’s = it is.'),
    ],
    lab: [
      q('In the error hunt, “Its a beautiful day for a picnic”: the error is in:', ['Its', 'beautiful', 'picnic', 'for'], 0, 'It should be “It’s”.'),
      q('“I went to the store, I forgot milk.” This is a:', ['comma splice', 'fragment', 'correct sentence', 'parallelism error'], 0, 'Two complete sentences joined by only a comma.'),
    ],
    more: [
      q('“The rain had no ___ on the game.”', ['effect', 'affect', 'affects', 'effects of'], 0, 'After “no”, you need a noun: effect.'),
      q('“There is ___ water in the bottle than before.”', ['less', 'fewer', 'lesser', 'few'], 0, 'Water is uncountable → less.'),
      q('“The prize was divided ___ the three friends.”', ['among', 'between', 'in', 'to'], 0, 'Among = three or more.'),
      q('“___ coming to the party?” (who is)', ['Who’s', 'Whose', 'Whos', 'Who is’s'], 0, 'Who’s = who is.'),
    ],
  },
  'e-word-relations': {
    video: [
      q('“Big : large” shows which relationship?', ['synonyms', 'antonyms', 'part to whole', 'cause and effect'], 0, 'Both words mean the same.'),
      q('“Author : book” shows:', ['maker to product', 'tool to function', 'part to whole', 'degree'], 0, 'An author makes a book.'),
    ],
    learn: [
      q('KNIFE : CUT :: PEN : ?', ['write', 'ink', 'paper', 'draw'], 0, 'Tool : function. A knife is used to cut; a pen is used to write.'),
      q('The idiom “break the ice” means:', ['to start a conversation in an awkward situation', 'to destroy something', 'to be very cold', 'to fail'], 0, 'It means to ease tension and begin interaction.'),
    ],
    lab: [
      q('WHEEL : CAR shows which relationship?', ['part to whole', 'tool to function', 'antonyms', 'cause and effect'], 0, 'A wheel is a part of a car.'),
      q('FIRE : SMOKE shows:', ['cause and effect', 'synonyms', 'part to whole', 'degree'], 0, 'Fire produces smoke.'),
    ],
    more: [
      q('ANCIENT : MODERN is an example of:', ['antonyms', 'synonyms', 'part to whole', 'maker to product'], 0, 'They are opposites.'),
      q('DOCTOR : HOSPITAL :: TEACHER : ?', ['school', 'student', 'book', 'lesson'], 0, 'Worker : workplace.'),
      q('“Under the weather” means:', ['feeling unwell', 'in a storm', 'very happy', 'late'], 0, 'It is an idiom for being slightly sick.'),
      q('Choose the synonym of *frugal*:', ['thrifty', 'wasteful', 'greedy', 'brave'], 0, 'Frugal = careful with money.'),
    ],
  },
  'r-basics': {
    video: [
      q('The main idea of a passage is best described as:', ['the central point the whole passage supports', 'the first sentence only', 'a small detail', 'the author’s name'], 0, 'It covers the entire passage and nothing outside it.'),
      q('The streets are wet and people are carrying closed umbrellas. We can infer:', ['it recently rained', 'it is about to snow', 'it is a very dry season', 'nobody likes umbrellas'], 0, 'An inference is the one logical step the evidence supports.'),
    ],
    learn: [
      q('Which wording is MOST likely to appear in a wrong answer choice?', ['“always” and “never”', '“often” and “may”', '“some”', '“generally”'], 0, 'Extreme words make a statement hard to support.'),
      q('On a vocabulary-in-context question, the best check is to:', ['plug each choice back into the sentence', 'pick the longest word', 'pick the first choice', 'ignore the sentence'], 0, 'The right choice keeps the sentence’s meaning.'),
    ],
    lab: [
      q('In the 4-step system, what comes FIRST?', ['Skim the questions', 'Read the passage word by word', 'Choose your answer', 'Eliminate choices'], 0, 'Knowing what to look for makes your reading purposeful.'),
      q('Why predict an answer before reading the choices?', ['so tempting wrong options do not sway you', 'it saves paper', 'choices are always wrong', 'it is required'], 0, 'Your own prediction anchors you to the passage.'),
    ],
    more: [
      q('What is the main idea of the passage?', ['The jeepney is a lasting symbol that now faces modernization.', 'Jeepneys are the cleanest vehicles.', 'Commuters hate jeepneys.', 'Jeepneys were invented in 2020.'], 0, 'The passage covers history, decoration and the push for modern replacements.', undefined, JEEP),
      q('According to the passage, jeepneys began as:', ['converted surplus military vehicles', 'imported buses', 'electric cars', 'horse carriages'], 0, 'See sentence 1: “surplus military vehicles were converted…”', undefined, JEEP),
      q('What can be inferred about drivers?', ['They fear modernization may threaten their income.', 'They want all jeepneys scrapped.', 'They are indifferent.', 'They own new vehicles.'], 0, 'They “worry the change will cost them their livelihoods”.', undefined, JEEP),
      q('The author’s tone toward the changes is:', ['balanced and informative', 'angry', 'mocking', 'enthusiastic only'], 0, 'Both drivers’ worries and commuters’ hopes are presented without taking sides.', undefined, JEEP),
    ],
  },
  'r-strategy': {
    video: [
      q('Which word describes a NEGATIVE tone?', ['dismissive', 'admiring', 'hopeful', 'appreciative'], 0, 'Dismissive writing treats something as unimportant.'),
      q('If one question is taking too long on test day you should:', ['flag it and move on', 'keep going until solved', 'leave the exam', 'guess instantly without reading'], 0, 'Banked time from easy questions is worth more.'),
    ],
    learn: [
      q('Which is an OPINION?', ['“This is the best film of the decade.”', '“The film was released in 2019.”', '“The film lasts 120 minutes.”', '“The film was shot in Manila.”'], 0, '“Best” is a judgment, not checkable.'),
      q('“Miracle cure” instead of “treatment” shows a tone that is:', ['enthusiastic', 'neutral', 'skeptical', 'sad'], 0, 'The author’s word choices reveal the attitude.'),
      q('About how long should you spend per question on a reading test?', ['about a minute', 'five minutes', 'ten seconds', 'as long as you like'], 0, 'Budget around one minute plus reading time.'),
    ],
    lab: [
      q('Using the flashcards: a *skeptical* author is:', ['doubtful', 'delighted', 'neutral', 'furious'], 0, 'Skeptical = doubting the claim.'),
      q('An *objective* tone is:', ['neutral and fact-based', 'emotional', 'angry', 'sarcastic'], 0, 'Objective writing avoids personal feelings.'),
    ],
    more: [
      q('What does the author conclude?', ['A balanced approach to homework is best.', 'Homework should be abolished.', 'Homework should double.', 'Surveys are useless.'], 0, 'Last sentence: “a balanced approach: shorter, more purposeful assignments”.', undefined, HOMEWORK),
      q('The word “However” signals:', ['a contrast to the critics’ claim', 'an example', 'a conclusion', 'a definition'], 0, 'It introduces evidence that goes against what came before.', undefined, HOMEWORK),
      q('The survey result is used as:', ['evidence', 'a joke', 'a definition', 'an anecdote about the author'], 0, 'It supports the author’s argument with data.', undefined, HOMEWORK),
      q('Which can be inferred about the author?', ['Does not fully agree with abolishing homework', 'Hates schools', 'Wants homework tripled', 'Dislikes surveys'], 0, 'The author recommends reforming, not eliminating, homework.', undefined, HOMEWORK),
    ],
  },
}
