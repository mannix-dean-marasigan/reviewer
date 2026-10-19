import type { Checks } from '../types'
import { q } from './helpers'

// Checkpoints: video (after the videos), learn (one after each section of the written lesson),
// lab (after the interactive), more (extra practice bank). The correct answer is always choice A here;
// the app shuffles the choices every time.
export const CHECKS_MATH1: Record<string, Checks> = {
  'm-number-sense': {
    drill: ['order'],
    video: [
      q('Evaluate: $6+4\\times3$', ['18', '30', '24', '13'], 0, 'Multiplication comes before addition: $4\\times3=12$, then $6+12=18$.'),
      q('To find when two events that repeat every 6 and every 8 days happen together again, you should find the:', ['LCM of 6 and 8', 'GCF of 6 and 8', 'Sum of 6 and 8', 'Difference of 6 and 8'], 0, '“Together again” = least common multiple. $\\text{LCM}(6,8)=24$ days.'),
    ],
    learn: [
      q('$36\\div4\\times3=$', ['27', '3', '12', '108'], 0, 'Division and multiplication have equal rank, so go left to right: $36\\div4=9$, then $9\\times3=27$.'),
      q('The number 4,716 is divisible by:', ['both 4 and 9', '4 but not 9', '9 but not 4', 'neither 4 nor 9'], 0, 'Last two digits 16 are divisible by 4 ✓. Digit sum $4+7+1+6=18$ is divisible by 9 ✓.'),
      q('What is the GCF of 24 and 60?', ['12', '6', '24', '4'], 0, '$24=2^3\\cdot3$ and $60=2^2\\cdot3\\cdot5$. Common primes with the smallest powers: $2^2\\cdot3=12$.'),
    ],
    lab: [
      q('In $5+2\\times3^2$, which step comes FIRST?', ['$3^2=9$', '$5+2$', '$2\\times3$', '$5+2\\times3$'], 0, 'Exponents come before multiplication and addition. So $3^2=9$, then $2\\times9=18$, then $5+18=23$.'),
      q('$20-4\\times(2+3)=$', ['0', '80', '16', '5'], 0, 'Parentheses first: $(2+3)=5$. Then $4\\times5=20$. Finally $20-20=0$.'),
    ],
    more: [
      q('$2+3\\times4^2\\div8=$', ['8', '10', '32', '6'], 0, 'Exponent: $4^2=16$. Then $3\\times16=48$, $48\\div8=6$. Finally $2+6=8$.'),
      q('Which of these is a prime number?', ['59', '51', '57', '91'], 0, '$51=3\\times17$, $57=3\\times19$, $91=7\\times13$. Only 59 has no factor other than 1 and itself.'),
      q('What is the LCM of 15 and 20?', ['60', '30', '300', '5'], 0, '$15=3\\cdot5$, $20=2^2\\cdot5$. LCM $=2^2\\cdot3\\cdot5=60$.'),
      q('48 pencils and 36 erasers are packed into identical sets with none left over. What is the greatest number of sets?', ['12', '6', '4', '144'], 0, '“Largest equal groups” means GCF. $\\text{GCF}(48,36)=12$ sets (4 pencils and 3 erasers each).'),
    ],
  },
  'm-fractions': {
    drill: ['fracAdd', 'percentOf'],
    video: [
      q('$\\frac12+\\frac13=$', ['$\\frac56$', '$\\frac25$', '$\\frac16$', '$\\frac23$'], 0, 'Common denominator 6: $\\frac36+\\frac26=\\frac56$.'),
      q('The decimal 0.75 as a fraction in simplest form is:', ['$\\frac34$', '$\\frac{75}{10}$', '$\\frac{7}{5}$', '$\\frac{3}{5}$'], 0, '$0.75=\\frac{75}{100}=\\frac34$ (divide top and bottom by 25).'),
    ],
    learn: [
      q('$\\frac35\\div\\frac9{10}=$', ['$\\frac23$', '$\\frac{27}{50}$', '$\\frac32$', '$\\frac{9}{50}$'], 0, 'Keep-change-flip: $\\frac35\\times\\frac{10}9=\\frac{30}{45}=\\frac23$.'),
      q('$\\frac58$ as a percent is:', ['62.5%', '58%', '5.8%', '85%'], 0, '$5\\div8=0.625=62.5\\%$. (Or $12.5\\%\\times5$.)'),
    ],
    lab: [
      q('Use the lab: $\\frac14+\\frac16$ has the sum:', ['$\\frac5{12}$', '$\\frac2{10}$', '$\\frac1{5}$', '$\\frac{1}{10}$'], 0, 'Re-cut into twelfths (LCD of 4 and 6): $\\frac3{12}+\\frac2{12}=\\frac5{12}$. The lab shows the same with 24ths: $\\frac{10}{24}=\\frac5{12}$.'),
      q('Which fraction is larger: $\\frac5{12}$ or $\\frac38$?', ['$\\frac5{12}$', '$\\frac38$', 'They are equal', 'Cannot be compared'], 0, 'Cross-multiply: $5\\times8=40$ vs $3\\times12=36$. Since 40 > 36, $\\frac5{12}$ is larger.'),
    ],
    more: [
      q('$\\frac23$ of 45 is:', ['30', '15', '67.5', '22.5'], 0, '$45\\div3=15$, then $\\times2=30$.'),
      q('The fraction equal to 0.125 is:', ['$\\frac18$', '$\\frac1{12}$', '$\\frac{1}{25}$', '$\\frac{5}{8}$'], 0, '$0.125=\\frac{125}{1000}=\\frac18$.'),
      q('$1\\frac12\\times2\\frac23=$', ['4', '3$\\frac16$', '$2\\frac13$', '3'], 0, 'Convert to improper fractions: $\\frac32\\times\\frac83=\\frac{24}6=4$.'),
      q('The repeating decimal $0.\\overline{2}$ equals:', ['$\\frac29$', '$\\frac15$', '$\\frac{2}{10}$', '$\\frac{1}{2}$'], 0, 'One repeating digit goes over 9: $\\frac29$.'),
    ],
  },
  'm-exponents': {
    drill: ['exponent'],
    video: [
      q('$3^2\\times3^4=$', ['$3^6$', '$3^8$', '$9^6$', '$9^8$'], 0, 'Same base: add the exponents, $2+4=6$.'),
      q('$\\sqrt{81}=$', ['9', '8', '27', '40.5'], 0, '$9\\times9=81$.'),
    ],
    learn: [
      q('$(2^3)^2=$', ['64', '32', '16', '128'], 0, 'Power of a power: multiply exponents $3\\times2=6$. $2^6=64$.'),
      q('$\\sqrt{75}$ in simplest radical form is:', ['$5\\sqrt3$', '$3\\sqrt5$', '$25\\sqrt3$', '$15\\sqrt5$'], 0, '$75=25\\times3$ so $\\sqrt{75}=5\\sqrt3$.'),
      q('$3.2\\times10^4$ written as an ordinary number is:', ['32,000', '3,200', '320,000', '0.00032'], 0, 'Move the decimal point 4 places to the right: 32,000.'),
    ],
    lab: [
      q('$5^0+0^5=$', ['1', '0', '6', '5'], 0, 'Any non-zero number to the power 0 is 1, and $0^5=0$. So $1+0=1$.'),
      q('$2^{-2}=$', ['$\\frac14$', '$-4$', '$-\\frac14$', '$\\frac12$'], 0, 'A negative exponent means flip: $2^{-2}=\\frac1{2^2}=\\frac14$.'),
    ],
    more: [
      q('$(x^2y)^3=$', ['$x^6y^3$', '$x^5y^4$', '$x^6y$', '$x^8y^3$'], 0, 'Raise each factor: $x^{2\\cdot3}y^{3}=x^6y^3$.'),
      q('$\\sqrt{12}+\\sqrt{27}=$', ['$5\\sqrt3$', '$\\sqrt{39}$', '$6\\sqrt3$', '$13\\sqrt3$'], 0, '$\\sqrt{12}=2\\sqrt3$, $\\sqrt{27}=3\\sqrt3$. Add the like radicals: $5\\sqrt3$.'),
      q('$\\dfrac{6\\times10^5}{2\\times10^2}=$', ['$3\\times10^3$', '$3\\times10^7$', '$4\\times10^3$', '$12\\times10^3$'], 0, 'Divide the numbers: $6\\div2=3$. Subtract exponents: $5-2=3$.'),
      q('If $2^{x+1}=16$, then $x=$', ['3', '4', '2', '8'], 0, '$16=2^4$, so $x+1=4$ and $x=3$.'),
    ],
  },
  'm-ratio': {
    drill: ['mean'],
    video: [
      q('Two numbers are in the ratio 3:7 and add up to 50. The smaller number is:', ['15', '35', '21', '10'], 0, '$3+7=10$ parts. One part $=50\\div10=5$. Smaller $=3\\times5=15$.'),
      q('3 notebooks cost ₱45. How much do 8 notebooks cost at the same price?', ['₱120', '₱135', '₱105', '₱360'], 0, 'Unit price $=45\\div3=15$. $8\\times15=120$.'),
    ],
    learn: [
      q('If $a:b=2:3$ and $b:c=4:5$, then $a:c=$', ['8:15', '2:5', '6:20', '10:12'], 0, 'Make the b-parts equal (LCM 12): $a:b=8:12$ and $b:c=12:15$. So $a:b:c=8:12:15$ and $a:c=8:15$.'),
      q('y varies directly with x. When x = 4, y = 12. Find y when x = 7.', ['21', '16', '28', '9'], 0, '$y=kx$ with $k=12/4=3$. So $y=3(7)=21$.'),
      q('The average of 4 numbers is 15. A fifth number, 25, is added. The new average is:', ['17', '20', '16', '15'], 0, 'Old total $=60$. New total $=85$ over 5 numbers $=17$.'),
    ],
    lab: [
      q('Number of workers and days to finish the same job: this is…', ['inverse variation', 'direct variation', 'neither', 'a constant'], 0, 'More workers means FEWER days: one goes up while the other goes down → inverse variation.'),
      q('The boys-to-girls ratio is 7:9 and there are 144 students. How many girls?', ['81', '63', '72', '90'], 0, '$7+9=16$ parts. One part $=144\\div16=9$. Girls $=9\\times9=81$.'),
    ],
    more: [
      q('Convert 72 km/h to meters per second.', ['20 m/s', '72 m/s', '12 m/s', '259.2 m/s'], 0, '$72\\times1000\\div3600=20$ m/s. Shortcut: divide km/h by 3.6.'),
      q('A recipe uses 3 cups of flour for 12 cookies. How much flour for 20 cookies?', ['5 cups', '6 cups', '4 cups', '7 cups'], 0, 'Flour per cookie $=3/12=\\frac14$. $20\\times\\frac14=5$.'),
      q('4 machines make 240 parts in 6 hours. How many parts do 6 machines make in 4 hours?', ['240', '160', '360', '120'], 0, 'Parts per machine-hour $=240\\div(4\\times6)=10$. $6\\times4\\times10=240$.'),
      q('Water and concentrate are mixed 5:2. To make 28 liters, how much concentrate is needed?', ['8 L', '20 L', '10 L', '14 L'], 0, '$5+2=7$ parts. One part $=28\\div7=4$ L. Concentrate $=2\\times4=8$ L.'),
    ],
  },
  'm-percent': {
    drill: ['percentOf'],
    video: [
      q('25% of 80 is:', ['20', '25', '32', '55'], 0, '$25\\%=\\frac14$; $80\\div4=20$.'),
      q('A ₱400 item is marked up 15%. The new price is:', ['₱460', '₱415', '₱340', '₱406'], 0, '$400\\times1.15=460$.'),
    ],
    learn: [
      q('After a 40% discount an item costs ₱720. What was the original price?', ['₱1,200', '₱1,008', '₱1,000', '₱900'], 0, 'You paid 60%: original $=720\\div0.6=1200$.'),
      q('₱10,000 is invested at 10% compounded annually for 2 years. The final amount is:', ['₱12,100', '₱12,000', '₱11,000', '₱12,200'], 0, '$A=10000(1.1)^2=12100$. (Simple interest would give only ₱12,000.)'),
      q('10 L of 20% salt solution is mixed with 30 L of 40% solution. The mixture is:', ['35%', '30%', '60%', '25%'], 0, 'Salt $=0.2(10)+0.4(30)=2+12=14$ L in 40 L → $35\\%$.'),
    ],
    lab: [
      q('In the lab, set the price to ₱800 and a 15% discount. What do you pay?', ['₱680', '₱120', '₱785', '₱920'], 0, '$800\\times0.85=680$. The discount itself is ₱120.'),
      q('A price rises 10% and then falls 10%. Compared with the start, it is:', ['1% lower', 'the same', '1% higher', '10% lower'], 0, '$1.1\\times0.9=0.99$.'),
    ],
    more: [
      q('45 is what percent of 60?', ['75%', '25%', '133%', '45%'], 0, '$45/60=0.75=75\\%$.'),
      q('A town of 20,000 grows by 8%. The new population is:', ['21,600', '20,800', '28,000', '21,000'], 0, '$20000\\times1.08=21600$.'),
      q('12% of a number is 54. The number is:', ['450', '648', '6.48', '540'], 0, '$x=54\\div0.12=450$.'),
      q('A score rises from 60 to 75. The percent increase is:', ['25%', '15%', '20%', '125%'], 0, '$\\frac{75-60}{60}=\\frac{15}{60}=25\\%$.'),
    ],
  },
  'm-equations': {
    drill: ['linear', 'work'],
    video: [
      q('A father is 3 times as old as his son. The sum of their ages is 48. How old is the son?', ['12', '16', '36', '9'], 0, 'Son $=s$, father $=3s$: $4s=48$ so $s=12$.'),
      q('Tom is 5 years older than Sam. In 3 years the sum of their ages will be 31. How old is Sam now?', ['10', '11', '13', '8'], 0, 'Sam $=s$, Tom $=s+5$. In 3 years: $(s+3)+(s+8)=31$ → $2s=20$ → $s=10$.'),
    ],
    learn: [
      q('Solve: $5x-7=2x+11$', ['$x=6$', '$x=4$', '$x=-6$', '$x=\\frac{18}{7}$'], 0, '$3x=18$ → $x=6$. Check: $30-7=23=12+11$ ✓.'),
      q('Solve: $2x+3\\ge11$', ['$x\\ge4$', '$x\\le4$', '$x\\ge7$', '$x\\ge14$'], 0, '$2x\\ge8$ → $x\\ge4$. (No negative divisor, so the sign stays.)'),
      q('Two numbers add up to 40 and differ by 12. The larger number is:', ['26', '28', '14', '24'], 0, '$x+(x-12)=40$ → $2x=52$ → $x=26$ (and the smaller is 14).'),
    ],
    lab: [
      q('Solve: $4(x+1)=3x+9$', ['$x=5$', '$x=13$', '$x=-5$', '$x=3$'], 0, '$4x+4=3x+9$ → $x=5$. Check: $4(6)=24=15+9$ ✓.'),
      q('Solving $-2x>8$ gives:', ['$x<-4$', '$x>-4$', '$x<4$', '$x>4$'], 0, 'Divide both sides by −2 and FLIP the sign: $x<-4$.'),
    ],
    more: [
      q('3 pens and 2 notebooks cost ₱70. A pen costs ₱10. How much is a notebook?', ['₱20', '₱30', '₱15', '₱25'], 0, '$3(10)+2n=70$ → $2n=40$ → $n=20$.'),
      q('A car going 90 km/h chases a truck going 60 km/h that has a 45 km head start. How long until it catches up?', ['1.5 hours', '3 hours', '0.5 hours', '2 hours'], 0, 'Closing speed $=90-60=30$ km/h. Time $=45\\div30=1.5$ h.'),
      q('A rectangle has perimeter 36 and its length is twice its width. Its area is:', ['72', '36', '81', '64'], 0, '$2(w+2w)=36$ → $w=6$, $L=12$. Area $=72$.'),
      q('Three consecutive even numbers add up to 54. The largest is:', ['20', '18', '22', '16'], 0, 'They are $n-2,n,n+2$ with $3n=54$, $n=18$. Largest $=20$.'),
    ],
  },
  'm-factoring': {
    video: [
      q('Factor: $x^2-9$', ['$(x-3)(x+3)$', '$(x-3)^2$', '$(x+9)(x-1)$', 'It cannot be factored'], 0, 'Difference of squares: $a^2-b^2=(a-b)(a+b)$ with $a=x$, $b=3$.'),
      q('Factor: $3x+6$', ['$3(x+2)$', '$x(3+6)$', '$9x$', '$3x(x+2)$'], 0, 'Pull out the GCF, 3.'),
    ],
    learn: [
      q('Expand: $(x+4)^2$', ['$x^2+8x+16$', '$x^2+16$', '$x^2+4x+16$', '$x^2+8x+8$'], 0, '$(a+b)^2=a^2+2ab+b^2$. Do not forget the middle term $2(x)(4)=8x$.'),
      q('Factor: $x^2+7x+12$', ['$(x+3)(x+4)$', '$(x+2)(x+6)$', '$(x+1)(x+12)$', '$(x-3)(x-4)$'], 0, 'Find two numbers with product 12 and sum 7 → 3 and 4.'),
      q('Simplify: $\\dfrac{x^2-4}{x+2}$', ['$x-2$', '$x+2$', '$x^2-2$', '$\\frac{x-4}{1}$'], 0, '$x^2-4=(x-2)(x+2)$. Cancel $(x+2)$: $x-2$.'),
    ],
    lab: [
      q('$(x-5)(x+5)=$', ['$x^2-25$', '$x^2+25$', '$x^2-10x+25$', '$x^2-10$'], 0, 'Sum × difference gives a difference of squares: $x^2-25$.'),
      q('$x^2-6x+9$ factors as:', ['$(x-3)^2$', '$(x+3)^2$', '$(x-9)(x+1)$', '$(x-3)(x+3)$'], 0, 'Perfect square trinomial: $x^2-2(3)x+3^2=(x-3)^2$.'),
    ],
    more: [
      q('Factor completely: $2x^2-8$', ['$2(x-2)(x+2)$', '$(2x-4)(x+2)$', '$2(x-4)(x+4)$', '$2(x^2-4)$'], 0, 'GCF first: $2(x^2-4)$, then difference of squares: $2(x-2)(x+2)$. The last choice is not completely factored.'),
      q('Factor: $6x^2+5x-6$', ['$(3x-2)(2x+3)$', '$(6x-1)(x+6)$', '$(3x+2)(2x-3)$', '$(2x-3)(3x-2)$'], 0, 'Check by FOIL: $(3x-2)(2x+3)=6x^2+9x-4x-6=6x^2+5x-6$ ✓.'),
      q('If $x^2-y^2=45$ and $x+y=9$, then $x-y=$', ['5', '36', '9', '4.5'], 0, '$(x-y)(x+y)=45$ → $x-y=45\\div9=5$.'),
      q('Simplify: $\\dfrac{x^2+5x+6}{x^2+x-6}$', ['$\\frac{x+2}{x-2}$', '$\\frac{x+3}{x-3}$', '$\\frac{5x+6}{x-6}$', '$1$'], 0, 'Top: $(x+2)(x+3)$. Bottom: $(x+3)(x-2)$. Cancel $(x+3)$.'),
    ],
  },
  'm-quadratics': {
    drill: ['discriminant'],
    video: [
      q('Solve: $x^2-5x+6=0$', ['$x=2$ or $x=3$', '$x=-2$ or $x=-3$', '$x=1$ or $x=6$', '$x=5$ or $x=6$'], 0, '$(x-2)(x-3)=0$. Check: product 6, sum 5 ✓.'),
      q('Solve: $x^2=49$', ['$x=\\pm7$', '$x=7$', '$x=24.5$', '$x=\\pm49$'], 0, 'Take the square root of both sides, keeping BOTH signs.'),
    ],
    learn: [
      q('For $2x^2-3x-2=0$, the sum of the roots is:', ['$\\frac32$', '$-\\frac32$', '$2$', '$-1$'], 0, 'Sum of roots $=-\\frac ba=-\\frac{-3}{2}=\\frac32$. (The roots are 2 and $-\\frac12$.)'),
      q('The discriminant of $x^2-6x+9=0$ is:', ['0', '72', '36', '−72'], 0, '$D=b^2-4ac=36-4(1)(9)=0$ → one repeated root ($x=3$).'),
    ],
    lab: [
      q('In the lab, set $a=1,\\ b=0,\\ c=-4$. The roots are:', ['$x=\\pm2$', '$x=\\pm4$', '$x=0$ only', 'No real roots'], 0, '$x^2-4=0$ → $x^2=4$ → $x=\\pm2$. The parabola crosses the axis at −2 and 2.'),
      q('With $a=1,\\ b=2,\\ c=5$ the lab shows a parabola that:', ['never touches the x-axis', 'touches the x-axis once', 'crosses it twice', 'is a straight line'], 0, '$D=4-20=-16<0$ → no real roots, so the graph floats above the axis.'),
    ],
    more: [
      q('The product of the roots of $x^2+x-12=0$ is:', ['−12', '12', '−1', '1'], 0, 'Product $=\\frac ca=-12$. (Roots: 3 and −4.)'),
      q('For which value of $k$ does $x^2-4x+k=0$ have equal roots?', ['4', '−4', '16', '2'], 0, '$D=16-4k=0$ → $k=4$.'),
      q('Solve: $3x^2=27$', ['$x=\\pm3$', '$x=\\pm9$', '$x=9$', '$x=3$'], 0, '$x^2=9$ → $x=\\pm3$.'),
      q('Which equation has roots 1 and −3?', ['$x^2+2x-3=0$', '$x^2-2x-3=0$', '$x^2+2x+3=0$', '$x^2-4x+3=0$'], 0, '$x^2-(r+s)x+rs$ with $r+s=-2$ and $rs=-3$: $x^2+2x-3=0$.'),
    ],
  },
}
