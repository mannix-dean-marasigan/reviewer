import re, glob

def rd(p): return open(p, encoding='utf8').read()
def wr(p, s): open(p, 'w', encoding='utf8').write(s)
def sub(p, a, b):
    s = rd(p); assert a in s, (p, a[:80]); wr(p, s.replace(a, b, 1))
def drop_line(prefix, fn="q('"):
    hits = [(f, i) for f in glob.glob('src/content/*.ts') for i, ln in enumerate(rd(f).split('\n')) if (fn + prefix) in ln]
    assert len(hits) == 1, (prefix, hits)
    f, i = hits[0]; lines = rd(f).split('\n'); del lines[i]; wr(f, '\n'.join(lines))
def swap_line(prefix, new):
    hits = [(f, i) for f in glob.glob('src/content/*.ts') for i, ln in enumerate(rd(f).split('\n')) if ("q('" + prefix) in ln]
    assert len(hits) == 1, (prefix, hits)
    f, i = hits[0]; lines = rd(f).split('\n'); ind = lines[i][:len(lines[i]) - len(lines[i].lstrip())]; lines[i] = ind + new; wr(f, '\n'.join(lines))

# ---------- statistics: drop variance / standard deviation ----------
m8 = 'src/content/math8.ts'
s = rd(m8)
a = s.index("      { t: 'h', text: 'Variance and standard deviation' },")
b = s.index("    ],\n    tricks: [", a)
s = s[:a] + s[b:]
s = s.replace("videos: [VID.ocIqr, VID.ocSd, VID.ocVar],", "videos: [VID.ocIqr],", 1)
s = s.replace("title: 'Statistics: Measures of Position & Variability'", "title: 'Statistics: Quartiles, Percentiles & Outliers'", 1)
s = s.replace("blurb: 'Frequency tables, quartiles, percentiles, interquartile range, variance and standard deviation.'", "blurb: 'Frequency tables, quartiles, percentiles, the interquartile range and outliers.'", 1)
s = s.replace("      'Variance steps: mean → distances → squares → average → (square root for SD).',\n      'Same mean does NOT mean the same spread: compare standard deviations.',\n",
              "      'IQR = Q3 − Q1: the spread of the middle half of the data.',\n      'Outlier: below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR.',\n", 1)
wr(m8, s)
swap_line("Find the population standard deviation of 4 and 8.", r"""q('Find $Q_1$ of 2, 4, 6, 8, 10, 12, 14, 16.', ['5', '4', '6', '9'], 0, S('**Words:** the **first quartile** $Q_1$ is the median of the LOWER half of the sorted data.', '**Step 1 (8 values, so split in half):** lower half 2, 4, 6, 8.', '**Step 2 (median of the lower half, average the two middle values):** $\\frac{4+6}{2}=5$.', '**Answer: 5**')),""")
swap_line("Data A: 10, 10, 10, 10.", r"""q('A data set has $Q_1=10$ and $Q_3=18$. Which value is an outlier?', ['32', '25', '6', '20'], 0, S('**Words:** an **outlier** is a value far from the rest: below $Q_1-1.5\\times IQR$ or above $Q_3+1.5\\times IQR$.', '**Step 1 (IQR):** $18-10=8$.', '**Step 2 (1.5 × IQR):** $1.5\\times8=12$.', '**Step 3 (fences):** lower $10-12=-2$, upper $18+12=30$.', '**Step 4:** only 32 is outside −2 to 30.', '**Answer: 32**')),""")
drop_line("The standard deviation is:")
swap_line("Find the population variance of 2, 4, 6, 8.", r"""q('Find the median of 4, 9, 2, 15, 7.', ['7', '9', '2', '8'], 0, S('**Words:** the **median** is the middle value after sorting.', '**Step 1 (sort):** 2, 4, 7, 9, 15.', '**Step 2 (middle of 5 values is the 3rd):** 7.', '**Answer: 7**')),""")

# ---------- finance: drop stocks and bonds ----------
m7 = 'src/content/math7.ts'
s = rd(m7)
a = s.index("      { t: 'h', text: 'Stocks and bonds (basics)' },")
b = s.index("    ],\n    tricks: [", a)
s = s[:a] + s[b:]
s = s.replace("title: 'Business Math: Interest, Annuities, Loans, Stocks & Bonds'", "title: 'Business Math: Interest, Annuities & Loans'", 1)
s = s.replace("blurb: 'Simple and compound interest, annuities, loan payments, and basic stock/bond vocabulary (General Mathematics).'", "blurb: 'Simple and compound interest, annuities and loan payments (General Mathematics).'", 1)
s = s.replace("title: 'Rational Functions: Asymptotes, Intercepts, Domain & Range'", "title: 'Rational Functions: Asymptotes, Holes, Intercepts & Domain'", 1)
wr(m7, s)
drop_line("A bond’s face value is ₱5,000")
sub('src/content/extras.ts', "label: 'Business math: interest, annuities, loans, stocks & bonds'", "label: 'Business math: interest, annuities & loans'")
swap_line("What is the range of $f(x)=\\dfrac1x$?", r"""q('What is the domain of $f(x)=\\dfrac{3}{x+5}$?', ['all real numbers except −5', 'all real numbers except 5', 'all real numbers except 3', 'all real numbers'], 0, S('**Words:** the **domain** is every x you may use. Remove the x that makes the bottom 0 (the vertical asymptote).', '**Step 1 (bottom = 0):** $x+5=0$, so $x=-5$.', '**Answer: all real numbers except −5**')),""")

# ---------- generators: take out of checkpoints and practice ----------
v = 'src/content/videoMap.ts'
s = rd(v)
new = {
 'm-polynomials': "{ kinds: [['polyClass'], ['polyAddSub', 'polyMul'], ['polyRem'], ['polyDiv']], q: [[0], [], [], [1]] }",
 'm-functions': "{ kinds: [['isFunction', 'relDomain'], ['piecewise', 'funcEval'], ['funcOps'], ['composite'], ['inverseFn', 'inversePoint']], q: [[0, 1], [], [], [], []] }",
 'm-rational-fn': "{ kinds: [['asymptote', 'horizAsym', 'ratFnDomain', 'ratXInt', 'ratHole', 'ratShift']], q: [[0, 1]] }",
 'm-exp-log': "{ kinds: [['expEq', 'expEqLinear', 'expEqTwoBase'], ['logVal', 'logRules'], ['logEq', 'logEqForms', 'logEqSame', 'logEqSum']], q: [[], [0], []] }",
 'm-stats': "{ kinds: [['quartile']], q: [[0, 1]] }",
}
for k, val in new.items():
    s, n = re.subn(r"'" + k + r"': \{[^\n]*\},", f"'{k}': {val},", s); assert n == 1, k
wr(v, s)
c = 'src/content/checks.ts'
s = rd(c)
dr = {
 'm-polynomials': "['polyClass', 'polyAddSub', 'polyMul', 'polyRem', 'polyDiv']",
 'm-functions': "['funcEval', 'piecewise', 'funcOps', 'composite', 'inverseFn', 'inversePoint']",
 'm-rational-fn': "['asymptote', 'horizAsym', 'ratHole', 'ratShift']",
 'm-exp-log': "['expEq', 'expEqTwoBase', 'logVal', 'logRules', 'logEqForms', 'logEqSum']",
 'm-stats': "['quartile']",
}
for k, val in dr.items():
    s, n = re.subn(r"  '" + k + r"': \[[^\n]*\],", f"  '{k}': {val},", s); assert n == 1, k
wr(c, s)
sub('src/content/math6.ts', "videos: [VID.ocPolyClass, VID.ocPolyOps, VID.polyRem, VID.ocSynDiv, VID.ocLongDiv],", "videos: [VID.ocPolyClass, VID.ocPolyOps, VID.polyRem, VID.ocSynDiv],")

# ratShift: domain only (range of rational functions removed)
d = 'src/lib/drills.ts'
sub(d, "const ask = r.pick(['domain', 'range'] as const)\n    const iv", "const ask = 'domain' as 'domain' | 'range'\n    const iv")
print('ok')
