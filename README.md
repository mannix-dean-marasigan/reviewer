# UA&P Prep

A personal entrance-exam trainer: YouTube video lessons, written lessons with worked examples, interactive labs, quizzes with step-by-step explanations, a timed mock exam, a mistakes notebook, an essay studio, and a 5-day study plan (5 h × 4 days + 10 h on the last day, math-heavy).

- **Guided lessons (Finlab-style):** video → checkpoint → written lesson with a question after every section → interactive → checkpoint → tricks → extra practice → final quiz. 500+ written questions plus unlimited generated ones.
- **Math (34 lessons, JHS + General Mathematics):** fundamentals, algebra (systems, polynomials, rational expressions, quadratics, variation), functions, rational functions, exponentials and logarithms, business math, geometry (congruence, quadrilaterals, circles), trigonometry (including laws of sines and cosines), counting, probability, statistics and logic.
- **English (5) + Reading (2):** vocabulary, grammar, sentence errors, analogies, passage questions.
- **Mental ability (5):** number/letter series, figure sequences, matrices, odd-one-out, spatial and logic. Unlimited procedurally generated puzzles.
- **Essay (2):** structure, style, timed practice with checklist and a model essay.
- Progress is saved in your browser (localStorage). There is no backend.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # validates every question + all generators
npm run build    # production build in dist/
```

## Deploy (GitHub Pages)

Push to `main`. The workflow in `.github/workflows/deploy.yml` tests, builds and publishes. In the repo go to **Settings → Pages → Source: GitHub Actions** (one time).

## Notes

- The exact UA&P test layout can change; check the official admissions page. This trainer builds the underlying skills (math, English, reading, abstract reasoning, essay).
- Videos are embedded from YouTube (verified as existing and embeddable when built). If one is ever removed, use the "Open on YouTube" link or search the same title.
