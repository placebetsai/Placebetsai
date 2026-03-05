// pages/debt-calculator.js
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import AdUnit from "../components/AdUnit";
import EmailCapture from "../components/EmailCapture";
import { useState } from "react";

export default function DebtCalculator() {
  const [tuition, setTuition] = useState(40000);
  const [years, setYears] = useState(4);
  const [rate, setRate] = useState(5.5);

  const totalBorrowed = tuition * years;
  const monthlyRate = rate / 100 / 12;
  const months = 10 * 12;

  const monthlyPayment =
    (totalBorrowed * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  const totalInterest = monthlyPayment * months - totalBorrowed;

  return (
    <Layout>
      <SEO
        title="Student Loan Debt Calculator 2025 – See Your True Cost | IHateCollege.com"
        description="Enter your school cost and years to see exact loan payments, total interest paid, and how it compares to trade school. Free calculator — no signup."
      />

      {/* HERO */}
      <section className="page-section text-center">
        <p className="hero-eyebrow">SEE THE REAL NUMBERS</p>
        <h1 className="hero-title">Student Debt Calculator</h1>
        <p className="hero-subtitle max-w-2xl mx-auto">
          Before taking loans, know exactly what you're signing up for.
        </p>
      </section>

      {/* CALCULATOR */}
      <section className="page-section max-w-xl mx-auto">
        <div className="glow-card p-8 space-y-6">
          
          {/* Tuition */}
          <div>
            <label className="text-sm text-slate-400">Cost per year ($)</label>
            <input
              type="number"
              value={tuition}
              onChange={(e) => setTuition(parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          {/* Years */}
          <div>
            <label className="text-sm text-slate-400">Years in school</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          {/* Rate */}
          <div>
            <label className="text-sm text-slate-400">Interest Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          {/* Results */}
          <div className="p-4 rounded bg-slate-900 border border-slate-700">
            <p className="text-slate-400 text-sm">Total Borrowed:</p>
            <p className="text-2xl font-bold text-white mb-2">
              ${totalBorrowed.toLocaleString()}
            </p>

            <p className="text-slate-400 text-sm">Monthly Payment (10 years):</p>
            <p className="text-2xl font-bold text-cyan-300 mb-2">
              ${monthlyPayment.toFixed(2)}
            </p>

            <p className="text-slate-400 text-sm">Total Interest Paid:</p>
            <p className="text-2xl font-bold text-red-400">
              ${totalInterest.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      <section className="page-section max-w-xl mx-auto">
        <AdUnit slot="6600722153" />
      </section>

      <section className="page-section max-w-xl mx-auto">
        <EmailCapture />
      </section>
    </Layout>
  );
}
