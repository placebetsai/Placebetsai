// date: 2026-03-05
// keyword: why college is not worth it
// author: Sarah Chen
import Head from "next/head";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import AdUnit from "../../components/AdUnit";
import Link from "next/link";

export default function BlogPost() {
  return (
    <Layout>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BlogPosting","headline":"Why College Is Not Worth It: Earnings Data vs. Debt Load by Major","description":"Real data on college ROI by major. Compare earnings against student debt loads. Which degrees actually pay off? Honest analysis inside.","datePublished":"2026-03-05","dateModified":"2026-03-05","author":{"@type":"Person","name":"Sarah Chen"},"publisher":{"@type":"Organization","name":"IHateCollege.com","url":"https://ihatecollege.com"},"url":"https://ihatecollege.com/blog/why-college-is-not-worth-it","mainEntityOfPage":{"@type":"WebPage","@id":"https://ihatecollege.com/blog/why-college-is-not-worth-it"}}` }} />
      </Head>
      <SEO
        title="Why College Is Not Worth It: The Earnings vs Debt Reality"
        description="Real data on college ROI by major. Compare earnings against student debt loads. Which degrees actually pay off? Honest analysis inside."
      />

      <article className="max-w-3xl mx-auto px-4 py-12 text-slate-200">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">
            Blog &middot; 2026-03-05
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            Why College Is Not Worth It: Earnings Data vs. Debt Load by Major
          </h1>
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=500&fit=crop&auto=format"
              alt="Why College Is Not Worth It: Earnings Data vs. Debt Load by Major"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Author bio */}
        <div className="flex items-center gap-4 mb-10 p-4 bg-slate-900/60 border border-slate-700 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-lg shrink-0">
            SC
          </div>
          <div>
            <div className="font-bold text-white text-sm">Sarah Chen</div>
            <div className="text-slate-400 text-xs leading-relaxed">Sarah is a labor economist who tracks trade wages and advises high schoolers on alternatives to four-year degrees. Former consultant, current advocate.</div>
          </div>
        </div>

        <AdUnit slot="6600722153" />

        
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">The College Debt Crisis Is Bigger Than You Think</h2>
          <p className="text-slate-300 leading-relaxed">Student loan debt in the United States has reached $1.77 trillion as of 2024, according to Federal Reserve data. That&apos;s more debt than auto loans, credit cards, or any other consumer debt category. The average student loan borrower graduates with $37,850 in debt, per the Institute for College Access and Success. But these national averages hide the real problem: the relationship between what students borrow and what they actually earn has become fundamentally broken for many majors.

The situation has worsened dramatically over the past two decades. In 2004, the average student loan debt was around $13,200. That&apos;s nearly a 3x increase in just 20 years, while wages for young college graduates have grown far more slowly. The Federal Reserve&apos;s own research shows that the wage premium for having a bachelor&apos;s degree has stopped growing significantly since 2000. Meanwhile, the cost of that degree has exploded.

This isn&apos;t just an individual problem. The Brookings Institution found that 20% of student loan borrowers owe more than they borrowed after 20 years of payments. Some borrowers are paying on their loans into their 50s. The Federal Reserve&apos;s 2023 Survey of Household Economics and Decisionmaking found that 31% of people carrying student debt said it prevented them from buying a home, and 25% said it delayed starting a family. This is a wealth-building crisis disguised as educational opportunity.</p>
        </section>
        
      

        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">Which Majors Actually Generate a Positive ROI?</h2>
          <p className="text-slate-300 leading-relaxed">Not all degrees are created equal. The U.S. Bureau of Labor Statistics provides clear data on median earnings by field, and when you subtract debt load from lifetime earnings, the picture becomes much clearer.

Computer Science and Engineering majors generally come out ahead. A computer science graduate earns a median of $120,000 to $130,000 in their first year post-graduation, according to the National Association of Colleges and Employers (NACE) 2023 survey. Over a 40-year career, lifetime earnings for computer engineers reach approximately $3.5 million. Even with $40,000 in debt, that&apos;s a solid ROI.

Electrical Engineering and similar STEM fields show similar patterns: median starting salaries around $70,000 to $75,000, with BLS data showing experienced electrical engineers earning $110,000 to $120,000 annually. Accounting and Finance majors also perform reasonably well, with starting salaries in the $55,000 to $65,000 range and long-term career earnings that can reach $100,000+.

But here&apos;s where the math breaks down for most other degrees. A philosophy major, for example, has a median starting salary of around $32,000 according to recent Georgetown University Center on Education and the Workforce data. A communications major starts at roughly $38,000. A psychology major at $35,000. A hospitality management major at $33,000. When you&apos;re carrying $35,000 to $50,000 in debt on a $32,000 salary, you&apos;re not building wealth—you&apos;re treading water.</p>
        </section>
        <AdUnit slot="6600722153" />
      

        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">The Crushing Gap: Debt vs. Entry-Level Earnings</h2>
          <p className="text-slate-300 leading-relaxed">Here&apos;s the real math that colleges don&apos;t want you to focus on.

Let&apos;s take five common degree paths and compare starting salary to average debt load:

1. Computer Science: $120,000 starting salary / $35,000 debt = 3.4x ratio (positive)
2. Engineering (General): $75,000 starting salary / $40,000 debt = 1.9x ratio (still positive but tight)
3. Business Administration: $55,000 starting salary / $37,000 debt = 1.5x ratio (marginal)
4. Education: $40,000 starting salary / $33,000 debt = 1.2x ratio (barely breaking even)
5. Liberal Arts/General Studies: $36,000 starting salary / $39,000 debt = 0.92x ratio (underwater from day one)

The Federal Reserve&apos;s own analysis of loan-to-income ratios shows that borrowers with ratios above 2.0x struggle significantly with repayment. A 2022 Pew Research study found that 56% of college graduates said the degree wasn&apos;t worth the cost when weighed against their resulting debt.

Consider the opportunity cost. That 22-year-old with a liberal arts degree earning $36,000 with $39,000 in debt is taking home roughly $2,900 monthly after taxes. Student loan payments—assuming a 10-year standard repayment plan—will run about $400 per month. That&apos;s 14% of gross income going to debt service before rent, food, or transportation. A peer who skipped college and went straight into a trade apprenticeship at 18 is now making $50,000 to $60,000 annually at age 22 with zero debt and is building equity in skills while avoiding the debt trap entirely.</p>
        </section>
        
      

        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">The Underemployment Trap Nobody Talks About</h2>
          <p className="text-slate-300 leading-relaxed">Here&apos;s a statistic that should alarm parents: according to the Federal Reserve&apos;s analysis of Census Bureau data, approximately 43% of college graduates are underemployed in their first year after graduation, meaning they&apos;re working jobs that don&apos;t require a college degree. By year five, that number drops to about 34%—still more than one in three.

A 2023 Gallup survey of college graduates found that only 63% strongly agreed their education was worth the cost. That number drops to 52% among graduates under age 35, and falls even further for those with higher debt loads.

The underemployment problem is particularly acute for non-STEM majors. A barista with a degree in English literature is still a barista making $28,000 per year, but now they&apos;re doing it with $35,000 in debt. A recent Burning Glass Technologies analysis found that 21% of recent college graduates are working in jobs that historically didn&apos;t require a degree. These graduates are not only underemployed but also competing directly with high school graduates for the same positions, which suppresses wages for everyone at that level.

The pandemic made this worse. Many employers who were &quot;flexible&quot; on degree requirements during the labor shortage found that credentials didn&apos;t actually matter for job performance. A 2023 Gallup report noted that 71% of workers who changed jobs during the 2021-2023 period moved to jobs that required lower qualifications than they held. Some of those workers still have years of loan payments ahead.</p>
        </section>
        <AdUnit slot="6600722153" />
      

        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">Why Student Debt Is Different From Good Debt</h2>
          <p className="text-slate-300 leading-relaxed">Not all debt is bad. A mortgage makes sense because you&apos;re building equity in an asset that appreciates. A business loan makes sense because it funds a venture that generates cash flow. Student debt? It&apos;s increasingly neither.

Student loans are unsecured debt backed only by your future earning potential. Unlike a house that you can sell, or a car that has tangible value, a degree doesn&apos;t increase in value. In fact, degrees depreciate. A computer science degree from 2010 taught obsolete technologies. A general business degree from 2015 prepared you for a workplace that no longer exists.

Federal Reserve data shows that the real earnings premium for a bachelor&apos;s degree (adjusted for inflation) has remained essentially flat since 2000. Meanwhile, tuition has increased 180% in real terms over the same period. You&apos;re paying exponentially more for the same wage benefit.

Mortgage debt is tax-deductible and spreads risk across property value. Student loan debt is only partially tax-deductible (up to $2,500 per year), and there&apos;s no diversification. You&apos;re betting everything on your own income. According to the Institute for College Access and Success, the median debt-to-income ratio for recent graduates with loans is 26%, meaning it takes a significant chunk of their monthly earnings just to service the debt.

The psychological impact is also different. A 2021 Federal Reserve survey found that 48% of people with student debt reported higher stress levels related to finances than those without. A Boston Federal Reserve study found that student debt delays major life decisions: homeownership, marriage, children, and entrepreneurship all happen later for people carrying student loans. That&apos;s lost decade of wealth-building that high-school-educated workers without debt may be getting ahead on.</p>
        </section>
        
      

        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">The Majors That Don't Pay Off (And Why Colleges Keep Pushing Them)</h2>
          <p className="text-slate-300 leading-relaxed">Let&apos;s be direct: some degrees are objectively bad investments based on the data. Universities continue to offer these programs not because they lead to good careers, but because they&apos;re cheap to operate and students keep enrolling.

A philosophy degree costs roughly the same as an engineering degree to obtain (similar classroom sizes, professor pay), but generates starting salaries 75% lower. A master&apos;s in education leads to a career where the maximum salary is $65,000 to $75,000 in most states, yet some education programs cost $60,000 to complete. A degree in library science costs $40,000 to $50,000 but leads to a job market that the Bureau of Labor Statistics projects will shrink by 3% through 2032.

According to the Georgetown University Center on Education and the Workforce, these are the degrees with the worst mid-career earnings relative to tuition cost:

1. Studio Arts and Fine Arts—median mid-career earnings $53,000, loan burden often $35,000+
2. Religious Studies—median mid-career earnings $54,000
3. Drama and Theater Arts—median mid-career earnings $56,000
4. Humanities (general)—median mid-career earnings $58,000
5. Philosophy and Religion—median mid-career earnings $59,000
6. Music—median mid-career earnings $61,000
7. Elementary Education—median mid-career earnings $62,000
8. Anthropology—median mid-career earnings $64,000
9. Child Development—median mid-career earnings $65,000
10. Counseling Psychology—median mid-career earnings $66,000

For context, mid-career (10+ years) earnings for engineering degrees range from $110,000 to $130,000. For computer science, $130,000 to $150,000.

Why do colleges keep offering unprofitable degree programs? Because they&apos;re not making the calculations you should be making. Universities don&apos;t bear the cost of your debt. They&apos;ve already collected your tuition. A philosophy professor gets paid whether their students earn $60,000 or $120,000 after graduation. From the university&apos;s perspective, enrolling students in low-ROI programs is actually preferable because these majors are cheap to operate and generate tuition revenue without requiring expensive facilities, equipment, or faculty expertise.</p>
        </section>
        
      

        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">The Alternative Paths That Actually Build Wealth</h2>
          <p className="text-slate-300 leading-relaxed">The data on alternative career paths is compelling and underreported.

Trade careers—electrician, plumber, HVAC technician, heavy equipment operator—typically require 3-4 years of apprenticeship training, which is paid work. You earn while you learn, often starting at $20 to $25 per hour and progressing to $50,000 to $80,000+ annually as a licensed tradesperson. Total debt: typically zero. The Bureau of Labor Statistics projects that trades will be one of the fastest-growing job categories through 2032, with demand far outpacing supply.

According to a 2023 Pew Research survey, 70% of Americans believe there should be more focus on trade skills and apprenticeships, yet only 8% of high school graduates pursue them. A master electrician earning $85,000 with zero debt has significantly more wealth at age 35 than a college graduate earning $65,000 with $35,000 in debt.

Technical certifications offer another path. A CompTIA A+ certification costs $300 to $500 and takes 4-6 weeks of study. It leads to IT support roles starting at $45,000 to $55,000. An AWS Solutions Architect certification leads to roles paying $100,000+. These are achievable without $50,000 in debt.

Direct entry into the workforce with strategic on-the-job training is underrated. A 2021 Federal Reserve survey found that 53% of early-career job skills came from employer training, not formal education. Someone who starts in an entry-level role at 18 and receives training has, by age 30, accumulated 12 years of experience. A college graduate entering the same field at 22 will never catch up in seniority, even if they eventually earn slightly more per hour.

The military offers tuition assistance and the GI Bill. The military also provides training, clearances, and discipline that employers value. Roughly 6% of Americans currently use GI Bill benefits to pay for college, but for those who do, the benefit is substantial: tuition covered, housing stipend, and typically zero debt upon graduation.</p>
        </section>
        
      

        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">What the Data Actually Says About College Earnings Premium</h2>
          <p className="text-slate-300 leading-relaxed">Let&apos;s clarify something important: yes, college graduates do earn more than high school graduates, on average. The Bureau of Labor Statistics shows that median weekly earnings for bachelor&apos;s degree holders are $1,716 compared to $1,176 for high school graduates. That&apos;s a 46% premium.

But that figure is misleading because it lumps together a computer engineer making $140,000 with a general studies graduate making $45,000. The average is dragged up by high-earners in lucrative fields.

A more accurate picture comes from the Pew Research Center&apos;s 2023 analysis: the earnings premium for a bachelor&apos;s degree has narrowed significantly when you account for debt and opportunity cost. For someone who graduates at 22 with $35,000 in debt at 5.5% interest, the loan payoff doesn&apos;t meaningfully reduce their debt until their late 20s. During those years, a peer who skipped college and entered the workforce at 18 has been building savings, retirement contributions, and career momentum.

The Federal Reserve&apos;s own research, published in 2023, found that the lifetime earnings advantage of a college degree varies wildly by field:

For STEM majors: $900,000 to $1.2 million lifetime advantage
For business/finance majors: $400,000 to $600,000 lifetime advantage
For education majors: $150,000 to $250,000 lifetime advantage
For liberal arts/humanities majors: $200,000 to $400,000 lifetime advantage
For some specific majors: essentially zero or negative when accounting for debt

The problem is that the average $37,850 debt load represents a breakeven point for moderate-earning graduates but a severe burden for lower-earning ones. A Brookings Institution study found that low-earning graduates spend 43% of their discretionary income on student loans, compared to just 5% for high-earning graduates. The debt is regressive: it hurts the students who need help most.</p>
        </section>
        
      

        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">The Hidden Costs Nobody Mentions</h2>
          <p className="text-slate-300 leading-relaxed">When calculating whether college is worth it, most people only count tuition and visible debt. There are substantial hidden costs that affect the real ROI calculation.

Opportunity cost is the big one. A student spending four years in college and graduating at 22 has foregone four years of earnings. Even if they&apos;re earning $30,000 in entry-level work during those years, that&apos;s $120,000 in lost wages that never gets recovered. That $120,000 could have been saved, invested, or used to pay down debt on an earlier home purchase.

There&apos;s also the cost of extended education. A bachelor&apos;s degree is supposed to take four years. But data from the National Student Clearinghouse shows that the actual time-to-graduation is longer: 40% of students at four-year institutions take more than six years to graduate. Each additional year costs tuition and extends the opportunity cost.

Interest accrual while in school is another hidden cost. Many student loans accrue interest while you&apos;re studying. If you borrow $10,000 per year for four years at 6% interest, by graduation you owe approximately $45,000 instead of $40,000. That&apos;s $5,000 in interest you paid for the privilege of attending school.

There&apos;s also the cost of underemployment. Countless graduates work in jobs that don&apos;t require degrees, earning wages only slightly above what they&apos;d earn with just a high school diploma. That &quot;college earnings premium&quot; disappears when you&apos;re not using the degree. A 2022 Burning Glass report found that 39% of entry-level job postings no longer require a degree, up from 27% just five years earlier. As the degree requirement erodes, so does the premium.

Finally, there&apos;s the psychological cost of debt. Medical research consistently shows that debt stress correlates with higher rates of depression, anxiety, and stress-related illness. There&apos;s a monetary cost to your health and wellbeing that isn&apos;t included in tuition calculations.</p>
        </section>
        
      

        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">The Bottom Line: Who Should Still Go to College?</h2>
          <p className="text-slate-300 leading-relaxed">College is worth it for specific people pursuing specific degrees. That&apos;s the honest takeaway from the data.

College makes sense if you&apos;re pursuing a degree with clear earnings outcomes in high-demand fields: engineering, computer science, nursing, certain business specialties. The data shows positive ROI.

College makes sense if you have significant scholarship money or family support and won&apos;t be borrowing much. Without debt, even a moderate-earning degree eventually pays dividends.

College makes sense if you&apos;re pursuing a field where the degree is a credential requirement: medicine, law, engineering, accounting. You literally cannot enter these fields without the degree, so the ROI question is different.

College does NOT make sense if you&apos;re taking on $40,000+ in debt for a degree that leads to $40,000 annual earnings. That&apos;s a losing trade, and the data clearly shows it.

College does NOT make sense if you&apos;re undecided about your major. Four years and $40,000+ in debt is an expensive way to &quot;find yourself.&quot; Gap years, community college exploration, or trade exploration are cheaper ways to figure out your direction.

College does NOT make sense as a default assumption. Too many 18-year-olds enroll in college because that&apos;s &quot;what you do,&quot; not because they have a specific goal. The result: 40% drop out without finishing (and still carrying debt), and 30% of those who finish are underemployed. For comparison, trade apprenticeships have much higher completion rates and much clearer job pathways.</p>
        </section>
        
      

        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">The Bottom Line</h2>
          <p className="text-slate-300 leading-relaxed">The data is clear: college is not worth it for everyone, and for some majors, it&apos;s objectively a poor financial decision. When you compare starting salaries of $32,000 to $40,000 against debt loads of $35,000 to $50,000, you&apos;re looking at a wealth-destroying investment. The earnings premium that existed for college graduates in past decades has shrunk significantly, while the cost has exploded. Meanwhile, alternative paths—trades, military training, technical certifications, direct workforce entry—offer faster wealth-building with zero or minimal debt. The question isn&apos;t whether college is worth it in the abstract. The question is whether a specific degree from a specific school, financed by a specific amount of debt, leads to a specific career with earnings that justify the cost. For computer science, engineering, and selective professional programs, the answer is yes. For many liberal arts, education, and humanities degrees, the data says no. Make your decision based on that data, not on tradition, family expectations, or the college admissions industry&apos;s marketing. Your financial future depends on it.</p>
        </section>

        <AdUnit slot="6600722153" />

        <div className="mt-12 p-6 rounded-2xl text-center" style={{background:"#111",border:"1px solid #ff2020"}}>
          <h3 className="text-xl font-black text-white mb-2">Stop Paying For A Piece of Paper</h3>
          <p className="text-slate-400 text-sm mb-6">Use our free tools to map your path without debt.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/debt-calculator" style={{background:"#ff2020",color:"#fff",fontWeight:900,padding:"12px 22px",borderRadius:8,textDecoration:"none",fontSize:14}}>Calculate My Debt</Link>
            <Link href="/alternatives" style={{background:"#1a1a1a",color:"#fff",fontWeight:900,padding:"12px 22px",borderRadius:8,textDecoration:"none",fontSize:14,border:"1px solid #2a2a2a"}}>Explore Alternatives</Link>
            <Link href="/trade-schools" style={{background:"#1a1a1a",color:"#fff",fontWeight:900,padding:"12px 22px",borderRadius:8,textDecoration:"none",fontSize:14,border:"1px solid #2a2a2a"}}>Trade Schools</Link>
          </div>
        </div>

        <div className="mt-8 p-5 rounded-xl" style={{background:"#0d0d0d",border:"1px solid #2a2a2a"}}>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Keep Reading</p>
          <div className="flex flex-col gap-2">
            <Link href="/is-college-worth-it-2025" className="text-slate-300 hover:text-white text-sm font-semibold">→ Is College Worth It in 2025? The Real ROI Data</Link>
            <Link href="/trade-school-vs-college-salary-2025" className="text-slate-300 hover:text-white text-sm font-semibold">→ Trade School vs College Salary: Who Actually Wins?</Link>
            <Link href="/blog/highest-paying-trade-jobs-2025" className="text-slate-300 hover:text-white text-sm font-semibold">→ The 8 Highest-Paying Trade Jobs in 2025</Link>
            <Link href="/blog/student-loan-debt-crisis-2025" className="text-slate-300 hover:text-white text-sm font-semibold">→ The Student Loan Crisis Is Worse Than You Think</Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}
