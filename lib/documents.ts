export function generateCSV(headers: string[], rows: string[][]): string {
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = [headers.map(escape).join(","), ...rows.map((r) => r.map(escape).join(","))];
  return lines.join("\n");
}

export function downloadCSV(filename: string, headers: string[], rows: string[][]) {
  const csv = generateCSV(headers, rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function printPayStub(stub: PayStub) {
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`<!DOCTYPE html><html><head><title>Pay Stub - ${stub.employeeName}</title>
<style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;color:#222}
h1{color:#cc0029;border-bottom:3px solid #cc0029;padding-bottom:10px}
table{width:100%;border-collapse:collapse;margin:20px 0}
th,td{padding:10px 12px;text-align:left;border-bottom:1px solid #ddd}
th{background:#f5f5f5;font-weight:600}
.total{font-weight:700;font-size:1.1em;border-top:3px solid #333}
.header{display:flex;justify-content:space-between;align-items:center}
.company{font-size:0.9em;color:#666}
@media print{body{margin:20px}}</style></head><body>
<div class="header"><div><h1>🍒 CherryStim Pay Stub</h1><p class="company">CherryStim Inc. • Premium Immersive Entertainment</p></div></div>
<table><tr><th>Employee</th><td>${stub.employeeName}</td><th>Role</th><td>${stub.role}</td></tr>
<tr><th>Pay Period</th><td>${stub.periodStart} — ${stub.periodEnd}</td><th>Pay Date</th><td>${stub.payDate}</td></tr>
<tr><th>Employee ID</th><td>${stub.employeeId}</td><th>Tax Filing</th><td>${stub.jurisdiction}</td></tr></table>
<h3>Earnings</h3><table><tr><th>Description</th><th>Hours/Units</th><th>Rate</th><th>Amount</th></tr>
${stub.earnings.map((e) => `<tr><td>${e.description}</td><td>${e.units}</td><td>$${e.rate.toFixed(2)}</td><td>$${e.amount.toFixed(2)}</td></tr>`).join("")}
<tr class="total"><td colspan="3">Gross Pay</td><td>$${stub.grossPay.toFixed(2)}</td></tr></table>
<h3>Deductions</h3><table><tr><th>Description</th><th>Amount</th></tr>
${stub.deductions.map((d) => `<tr><td>${d.description}</td><td>$${d.amount.toFixed(2)}</td></tr>`).join("")}
<tr class="total"><td>Total Deductions</td><td>$${stub.totalDeductions.toFixed(2)}</td></tr></table>
<table><tr class="total"><td>Net Pay</td><td style="font-size:1.3em;color:#cc0029">$${stub.netPay.toFixed(2)}</td></tr></table>
<p style="margin-top:40px;font-size:0.8em;color:#999">This is a computer-generated document. CherryStim Inc. — Confidential.</p>
</body></html>`);
  win.document.close();
  win.print();
}

export interface PayStub {
  employeeId: string;
  employeeName: string;
  role: string;
  periodStart: string;
  periodEnd: string;
  payDate: string;
  jurisdiction: string;
  earnings: { description: string; units: number; rate: number; amount: number }[];
  deductions: { description: string; amount: number }[];
  grossPay: number;
  totalDeductions: number;
  netPay: number;
}

export function generatePayStub(name: string, role: string, grossAmount: number, jurisdiction: string): PayStub {
  const now = new Date();
  const periodEnd = new Date(now);
  const periodStart = new Date(now);
  periodStart.setDate(periodStart.getDate() - 14);

  const taxes = calculateWithholding(grossAmount, jurisdiction);

  return {
    employeeId: `CS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    employeeName: name,
    role,
    periodStart: periodStart.toLocaleDateString(),
    periodEnd: periodEnd.toLocaleDateString(),
    payDate: periodEnd.toLocaleDateString(),
    jurisdiction,
    earnings: [
      { description: role === "dancer" ? "Performance Revenue (70% split)" : "Base Salary", units: role === "dancer" ? 1 : 80, rate: role === "dancer" ? grossAmount : grossAmount / 80, amount: grossAmount }
    ],
    deductions: taxes.deductions,
    grossPay: grossAmount,
    totalDeductions: taxes.total,
    netPay: grossAmount - taxes.total
  };
}

function calculateWithholding(gross: number, jurisdiction: string) {
  const deductions: { description: string; amount: number }[] = [];

  if (jurisdiction.startsWith("US")) {
    const federal = gross * 0.22;
    const stateRates: Record<string, number> = { "US-CA": 0.093, "US-NY": 0.0685, "US-TX": 0, "US-FL": 0 };
    const state = gross * (stateRates[jurisdiction] ?? 0.05);
    deductions.push({ description: "Federal Income Tax", amount: federal });
    if (state > 0) deductions.push({ description: `State Tax (${jurisdiction.split("-")[1]})`, amount: state });
    deductions.push({ description: "Social Security (6.2%)", amount: gross * 0.062 });
    deductions.push({ description: "Medicare (1.45%)", amount: gross * 0.0145 });
  } else if (jurisdiction === "PR") {
    deductions.push({ description: "PR Income Tax", amount: gross * 0.20 });
    deductions.push({ description: "SS + Medicare", amount: gross * 0.0765 });
  } else if (jurisdiction === "CA") {
    deductions.push({ description: "Federal Tax (Canada)", amount: gross * 0.205 });
    deductions.push({ description: "CPP + EI", amount: gross * 0.119 });
  } else if (["EU", "DE", "FR", "IT", "ES", "NL", "PT", "IE"].includes(jurisdiction)) {
    deductions.push({ description: "Income Tax (Europe)", amount: gross * 0.30 });
    deductions.push({ description: "Social Contributions", amount: gross * 0.12 });
  } else if (jurisdiction === "UK") {
    deductions.push({ description: "PAYE Income Tax", amount: gross * 0.2 });
    deductions.push({ description: "National Insurance", amount: gross * 0.12 });
  } else if (jurisdiction === "CH") {
    deductions.push({ description: "Federal + Cantonal Tax", amount: gross * 0.115 });
    deductions.push({ description: "AHV/IV/EO", amount: gross * 0.128 });
  } else if (jurisdiction === "JP") {
    deductions.push({ description: "Income Tax (Japan)", amount: gross * 0.23 });
    deductions.push({ description: "Social Insurance", amount: gross * 0.15 });
  } else if (jurisdiction === "CN") {
    deductions.push({ description: "IIT (China)", amount: gross * 0.25 });
    deductions.push({ description: "Social Insurance (5+1)", amount: gross * 0.105 });
  } else if (jurisdiction === "KR") {
    deductions.push({ description: "Income Tax (Korea)", amount: gross * 0.24 });
    deductions.push({ description: "Social Insurance", amount: gross * 0.09 });
  } else if (jurisdiction === "PH") {
    deductions.push({ description: "Income Tax (Philippines)", amount: gross * 0.25 });
    deductions.push({ description: "SSS/PhilHealth/HDMF", amount: gross * 0.12 });
  } else if (["TH", "VN", "MY", "ID"].includes(jurisdiction)) {
    deductions.push({ description: "Income Tax (SE Asia)", amount: gross * 0.20 });
    deductions.push({ description: "Social Insurance", amount: gross * 0.08 });
  } else if (jurisdiction === "SG") {
    deductions.push({ description: "Income Tax (Singapore)", amount: gross * 0.15 });
    deductions.push({ description: "CPF", amount: gross * 0.20 });
  } else if (jurisdiction === "IN") {
    deductions.push({ description: "Income Tax (India)", amount: gross * 0.20 });
    deductions.push({ description: "EPF + ESI", amount: gross * 0.12 });
  } else if (jurisdiction === "AU") {
    deductions.push({ description: "Income Tax (Australia)", amount: gross * 0.325 });
    deductions.push({ description: "Medicare Levy", amount: gross * 0.02 });
  } else if (jurisdiction === "NZ") {
    deductions.push({ description: "Income Tax (NZ)", amount: gross * 0.30 });
    deductions.push({ description: "ACC Levy", amount: gross * 0.04 });
  } else if (["AE", "SA", "BS"].includes(jurisdiction)) {
    deductions.push({ description: "No Income Tax", amount: 0 });
    if (jurisdiction !== "BS") deductions.push({ description: "Social Insurance", amount: gross * 0.05 });
  } else if (["DO", "CU", "BB", "JM", "TT", "HT"].includes(jurisdiction)) {
    deductions.push({ description: "Income Tax (Caribbean)", amount: gross * 0.20 });
    deductions.push({ description: "Social Security", amount: gross * 0.06 });
  } else if (["BR", "CO", "AR", "MX"].includes(jurisdiction)) {
    deductions.push({ description: "Income Tax (LATAM)", amount: gross * 0.25 });
    deductions.push({ description: "Social Contributions", amount: gross * 0.10 });
  } else if (jurisdiction.startsWith("AF") || ["EG", "ET", "MA"].includes(jurisdiction)) {
    deductions.push({ description: "Income Tax (Africa)", amount: gross * 0.20 });
    deductions.push({ description: "Social Levy", amount: gross * 0.05 });
  } else if (["FJ", "PG"].includes(jurisdiction)) {
    deductions.push({ description: "Income Tax (Pacific)", amount: gross * 0.20 });
    deductions.push({ description: "Social Fund", amount: gross * 0.07 });
  } else if (jurisdiction === "IL") {
    deductions.push({ description: "Income Tax (Israel)", amount: gross * 0.31 });
    deductions.push({ description: "Bituach Leumi", amount: gross * 0.12 });
  } else {
    deductions.push({ description: "Estimated Tax", amount: gross * 0.25 });
  }

  return { deductions, total: deductions.reduce((s, d) => s + d.amount, 0) };
}
