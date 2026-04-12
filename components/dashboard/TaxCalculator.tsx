"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign } from "lucide-react";

const TAX_BRACKETS = [
  { min: 0, max: 11600, rate: 0.1 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 }
];

function calculateTax(income: number) {
  let tax = 0;
  for (const bracket of TAX_BRACKETS) {
    if (income <= bracket.min) break;
    const taxable = Math.min(income, bracket.max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  return tax;
}

export function TaxCalculator({ className }: { className?: string }) {
  const [grossIncome, setGrossIncome] = useState(85000);
  const [deductions, setDeductions] = useState(14600);
  const [stateRate, setStateRate] = useState(5);

  const taxableIncome = Math.max(0, grossIncome - deductions);
  const federalTax = calculateTax(taxableIncome);
  const stateTax = taxableIncome * (stateRate / 100);
  const selfEmploymentTax = taxableIncome * 0.153;
  const totalTax = federalTax + stateTax + selfEmploymentTax;
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
  const netIncome = grossIncome - totalTax;

  return (
    <Card className={`glass overflow-hidden ${className || ""}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
        <Calculator size={18} className="text-emerald-400" />
        <h3 className="text-lg font-semibold">Tax Estimator</h3>
        <span className="ml-auto rounded-lg bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">2025 BRACKETS</span>
      </div>
      <div className="space-y-4 p-6">
        <div>
          <label className="mb-1 block text-xs text-white/50">Gross Annual Income</label>
          <div className="relative">
            <DollarSign size={14} className="absolute left-3 top-3 text-white/30" />
            <input
              type="number"
              value={grossIncome}
              onChange={(e) => setGrossIncome(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-8 pr-4 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-white/50">Deductions</label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/50">State Tax %</label>
            <input
              type="number"
              value={stateRate}
              onChange={(e) => setStateRate(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none"
              step={0.1}
            />
          </div>
        </div>

        <div className="space-y-2 rounded-2xl bg-white/[0.03] p-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Federal Tax</span>
            <span>${federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">State Tax</span>
            <span>${stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Self-Employment Tax</span>
            <span>${selfEmploymentTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="border-t border-white/10 pt-2">
            <div className="flex justify-between text-sm font-semibold">
              <span>Total Tax</span>
              <span className="text-cherry-500">${totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span>Effective Rate</span>
              <span className="text-gold-400">{effectiveRate.toFixed(1)}%</span>
            </div>
            <div className="mt-2 flex justify-between text-base font-bold">
              <span>Net Take-Home</span>
              <span className="text-emerald-400">${netIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
