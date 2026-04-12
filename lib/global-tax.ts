export interface TaxJurisdiction {
  code: string;
  name: string;
  region: string;
  brackets: { min: number; max: number; rate: number }[];
  socialRate: number;
  socialLabel: string;
  deductions: { name: string; amount: number }[];
  incentives: string[];
  complianceNotes: string[];
  filingDeadline: string;
  currency: string;
  currencySymbol: string;
}

export const JURISDICTIONS: TaxJurisdiction[] = [
  {
    code: "US-CA", name: "United States — California", region: "North America", currency: "USD", currencySymbol: "$",
    brackets: [{ min: 0, max: 11600, rate: 0.10 }, { min: 11600, max: 47150, rate: 0.12 }, { min: 47150, max: 100525, rate: 0.22 }, { min: 100525, max: 191950, rate: 0.24 }, { min: 191950, max: 243725, rate: 0.32 }, { min: 243725, max: 609350, rate: 0.35 }, { min: 609350, max: Infinity, rate: 0.37 }],
    socialRate: 0.153, socialLabel: "Self-Employment Tax (SS + Medicare)",
    deductions: [{ name: "Standard Deduction", amount: 14600 }, { name: "Home Office (est.)", amount: 1500 }, { name: "Equipment & Tech", amount: 2500 }, { name: "Internet/Streaming Costs", amount: 1200 }, { name: "Health Insurance Premium", amount: 6000 }],
    incentives: ["QBI Deduction (20% pass-through)", "Section 179 Equipment Expensing", "Home Office Deduction", "Health Insurance Premium Deduction (self-employed)", "Retirement Contributions (SEP IRA up to $69,000)", "California Film & TV Tax Credit"],
    complianceNotes: ["California AB5 independent contractor classification", "Quarterly estimated taxes (Form 1040-ES)", "California Form 540 state filing", "1099-NEC reporting for contractors >$600", "CA Privacy Rights Act (CPRA) data compliance"],
    filingDeadline: "April 15"
  },
  {
    code: "US-NY", name: "United States — New York", region: "North America", currency: "USD", currencySymbol: "$",
    brackets: [{ min: 0, max: 11600, rate: 0.10 }, { min: 11600, max: 47150, rate: 0.12 }, { min: 47150, max: 100525, rate: 0.22 }, { min: 100525, max: 191950, rate: 0.24 }, { min: 191950, max: 243725, rate: 0.32 }, { min: 243725, max: 609350, rate: 0.35 }, { min: 609350, max: Infinity, rate: 0.37 }],
    socialRate: 0.153, socialLabel: "Self-Employment Tax",
    deductions: [{ name: "Standard Deduction", amount: 14600 }, { name: "NY State Standard", amount: 8000 }],
    incentives: ["QBI Deduction (20%)", "NY Film Production Credit", "Excelsior Jobs Program Credit"],
    complianceNotes: ["NY Form IT-201 state filing", "NYC resident tax if applicable", "Quarterly estimated payments"],
    filingDeadline: "April 15"
  },
  {
    code: "US-TX", name: "United States — Texas", region: "North America", currency: "USD", currencySymbol: "$",
    brackets: [{ min: 0, max: 11600, rate: 0.10 }, { min: 11600, max: 47150, rate: 0.12 }, { min: 47150, max: 100525, rate: 0.22 }, { min: 100525, max: 191950, rate: 0.24 }, { min: 191950, max: 243725, rate: 0.32 }, { min: 243725, max: 609350, rate: 0.35 }, { min: 609350, max: Infinity, rate: 0.37 }],
    socialRate: 0.153, socialLabel: "Self-Employment Tax",
    deductions: [{ name: "Standard Deduction", amount: 14600 }],
    incentives: ["No State Income Tax", "QBI Deduction (20%)", "Texas Enterprise Zone Program"],
    complianceNotes: ["No state income tax filing required", "Federal quarterly estimates still required", "Texas franchise tax for entities >$2.47M"],
    filingDeadline: "April 15"
  },
  {
    code: "EU", name: "European Union (Average)", region: "Europe", currency: "EUR", currencySymbol: "€",
    brackets: [{ min: 0, max: 15000, rate: 0.15 }, { min: 15000, max: 40000, rate: 0.25 }, { min: 40000, max: 75000, rate: 0.35 }, { min: 75000, max: 150000, rate: 0.42 }, { min: 150000, max: Infinity, rate: 0.45 }],
    socialRate: 0.12, socialLabel: "Social Security Contributions",
    deductions: [{ name: "Personal Allowance", amount: 10000 }, { name: "Professional Expenses", amount: 3000 }],
    incentives: ["EU Digital Services exemptions", "Creative Industry Tax Relief", "VAT Margin Scheme for digital goods", "R&D Tax Credits (varies by member state)"],
    complianceNotes: ["GDPR data compliance mandatory", "VAT registration if turnover >€10,000 cross-border", "DAC7 platform reporting directive", "Country-specific filing deadlines apply"],
    filingDeadline: "Varies by member state"
  },
  {
    code: "UK", name: "United Kingdom", region: "Europe", currency: "GBP", currencySymbol: "£",
    brackets: [{ min: 0, max: 12570, rate: 0 }, { min: 12570, max: 50270, rate: 0.20 }, { min: 50270, max: 125140, rate: 0.40 }, { min: 125140, max: Infinity, rate: 0.45 }],
    socialRate: 0.12, socialLabel: "National Insurance (Class 4)",
    deductions: [{ name: "Personal Allowance", amount: 12570 }, { name: "Trading Allowance", amount: 1000 }],
    incentives: ["Creative Industry Tax Relief", "Annual Investment Allowance", "Enterprise Investment Scheme"],
    complianceNotes: ["Self-Assessment tax return required", "Making Tax Digital (MTD) for VAT", "Payment on account system"],
    filingDeadline: "January 31"
  },
  {
    code: "JP", name: "Japan", region: "Asia-Pacific", currency: "JPY", currencySymbol: "¥",
    brackets: [{ min: 0, max: 1950000, rate: 0.05 }, { min: 1950000, max: 3300000, rate: 0.10 }, { min: 3300000, max: 6950000, rate: 0.20 }, { min: 6950000, max: 9000000, rate: 0.23 }, { min: 9000000, max: 18000000, rate: 0.33 }, { min: 18000000, max: Infinity, rate: 0.40 }],
    socialRate: 0.15, socialLabel: "Social Insurance (Health + Pension)",
    deductions: [{ name: "Basic Deduction", amount: 480000 }, { name: "Employment Income Deduction", amount: 550000 }],
    incentives: ["Blue Return filing (higher deductions)", "Equipment depreciation allowances", "Hometown Tax (Furusato Nozei)"],
    complianceNotes: ["National Tax Agency (NTA) filing", "Residence tax filed separately", "Consumption tax if revenue >¥10M", "My Number (Individual Number) required"],
    filingDeadline: "March 15"
  },
  {
    code: "AU", name: "Australia", region: "Asia-Pacific", currency: "AUD", currencySymbol: "A$",
    brackets: [{ min: 0, max: 18200, rate: 0 }, { min: 18200, max: 45000, rate: 0.19 }, { min: 45000, max: 120000, rate: 0.325 }, { min: 120000, max: 180000, rate: 0.37 }, { min: 180000, max: Infinity, rate: 0.45 }],
    socialRate: 0.02, socialLabel: "Medicare Levy",
    deductions: [{ name: "Tax-Free Threshold", amount: 18200 }, { name: "Work-Related Expenses", amount: 300 }],
    incentives: ["Instant Asset Write-Off", "Small Business Income Tax Offset", "R&D Tax Incentive", "Producer Offset (40% for film)"],
    complianceNotes: ["ATO self-assessment system", "BAS (Business Activity Statement) quarterly", "GST registration if turnover >A$75K", "Superannuation guarantee for employees"],
    filingDeadline: "October 31"
  },
  {
    code: "CN", name: "China", region: "Asia-Pacific", currency: "CNY", currencySymbol: "¥",
    brackets: [{ min: 0, max: 36000, rate: 0.03 }, { min: 36000, max: 144000, rate: 0.10 }, { min: 144000, max: 300000, rate: 0.20 }, { min: 300000, max: 420000, rate: 0.25 }, { min: 420000, max: 660000, rate: 0.30 }, { min: 660000, max: 960000, rate: 0.35 }, { min: 960000, max: Infinity, rate: 0.45 }],
    socialRate: 0.105, socialLabel: "Social Insurance (5 insurances + housing fund)",
    deductions: [{ name: "Basic Monthly Deduction", amount: 60000 }, { name: "Children Education", amount: 12000 }, { name: "Continuing Education", amount: 4800 }],
    incentives: ["Special Additional Deductions (6 categories)", "Small & Micro Enterprise preferential rates", "High-tech Enterprise 15% rate", "Western Development incentives"],
    complianceNotes: ["Monthly withholding by employer/platform", "Annual reconciliation by March 31", "Golden Tax System (Fapiao) compliance", "Cross-border payment reporting"],
    filingDeadline: "March 31"
  },
  {
    code: "AF-EA", name: "East Africa (Kenya/Tanzania/Uganda)", region: "Africa", currency: "KES", currencySymbol: "KSh",
    brackets: [{ min: 0, max: 288000, rate: 0.10 }, { min: 288000, max: 388000, rate: 0.25 }, { min: 388000, max: Infinity, rate: 0.30 }],
    socialRate: 0.05, socialLabel: "NSSF Contribution",
    deductions: [{ name: "Personal Relief", amount: 28800 }, { name: "Insurance Relief", amount: 5000 }],
    incentives: ["Export Processing Zone benefits", "Special Economic Zone incentives", "Investment deduction allowance", "Digital services tax credits"],
    complianceNotes: ["KRA iTax system (Kenya)", "TRA e-filing (Tanzania)", "Digital Services Tax compliance", "Withholding tax on cross-border payments"],
    filingDeadline: "June 30"
  },
  {
    code: "AF-WA", name: "West Africa (Nigeria/Ghana)", region: "Africa", currency: "NGN", currencySymbol: "₦",
    brackets: [{ min: 0, max: 300000, rate: 0.07 }, { min: 300000, max: 600000, rate: 0.11 }, { min: 600000, max: 1100000, rate: 0.15 }, { min: 1100000, max: 1600000, rate: 0.19 }, { min: 1600000, max: 3200000, rate: 0.21 }, { min: 3200000, max: Infinity, rate: 0.24 }],
    socialRate: 0.05, socialLabel: "Pension Contribution",
    deductions: [{ name: "Consolidated Relief Allowance", amount: 200000 }],
    incentives: ["Pioneer Status incentive", "Export Expansion Grant", "Free Trade Zone benefits", "Tech startup tax holiday (3 years)"],
    complianceNotes: ["FIRS TaxPro Max portal (Nigeria)", "GRA filing (Ghana)", "VAT registration if turnover threshold met", "Transfer pricing documentation"],
    filingDeadline: "March 31"
  },
  {
    code: "AF-SA", name: "Southern Africa (South Africa)", region: "Africa", currency: "ZAR", currencySymbol: "R",
    brackets: [{ min: 0, max: 237100, rate: 0.18 }, { min: 237100, max: 370500, rate: 0.26 }, { min: 370500, max: 512800, rate: 0.31 }, { min: 512800, max: 673000, rate: 0.36 }, { min: 673000, max: 857900, rate: 0.39 }, { min: 857900, max: 1817000, rate: 0.41 }, { min: 1817000, max: Infinity, rate: 0.45 }],
    socialRate: 0.01, socialLabel: "UIF Contribution",
    deductions: [{ name: "Primary Rebate", amount: 17235 }, { name: "Medical Tax Credit", amount: 4200 }],
    incentives: ["Section 12J Venture Capital incentive", "Employment Tax Incentive", "Film & TV Production incentive (SA)", "Small Business Corporation rate"],
    complianceNotes: ["SARS eFiling system", "Provisional tax payments (bi-annual)", "VAT registration if turnover >R1M", "Exchange control regulations"],
    filingDeadline: "October 31 (provisional) / January 31 (final)"
  }
];

export function calculateGlobalTax(income: number, jurisdictionCode: string) {
  const j = JURISDICTIONS.find((x) => x.code === jurisdictionCode);
  if (!j) return null;

  let incomeTax = 0;
  for (const b of j.brackets) {
    if (income <= b.min) break;
    incomeTax += (Math.min(income, b.max) - b.min) * b.rate;
  }

  const totalDeductions = j.deductions.reduce((s, d) => s + d.amount, 0);
  const taxableIncome = Math.max(0, income - totalDeductions);

  let adjustedTax = 0;
  for (const b of j.brackets) {
    if (taxableIncome <= b.min) break;
    adjustedTax += (Math.min(taxableIncome, b.max) - b.min) * b.rate;
  }

  const socialTax = taxableIncome * j.socialRate;
  const totalTax = adjustedTax + socialTax;
  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;
  const netIncome = income - totalTax;

  return {
    jurisdiction: j,
    grossIncome: income,
    totalDeductions,
    taxableIncome,
    incomeTax: adjustedTax,
    socialTax,
    totalTax,
    effectiveRate,
    netIncome
  };
}
