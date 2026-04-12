"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizBank: Question[] = [
  { id: 1, question: "What percentage of your credit score is determined by payment history?", options: ["10%", "30%", "35%", "15%"], correct: 2, explanation: "Payment history is the single largest factor at 35% of your FICO score." },
  { id: 2, question: "Which business entity provides pass-through taxation and limited liability?", options: ["Sole Proprietorship", "S-Corporation", "C-Corporation", "General Partnership"], correct: 1, explanation: "S-Corps provide both pass-through taxation (avoiding double taxation) and limited liability protection." },
  { id: 3, question: "What is the self-employment tax rate?", options: ["7.65%", "12.4%", "15.3%", "22%"], correct: 2, explanation: "Self-employment tax is 15.3% — covering both the employer and employee portions of Social Security (12.4%) and Medicare (2.9%)." },
  { id: 4, question: "What's the recommended emergency fund size?", options: ["1 month expenses", "3-6 months expenses", "1 year expenses", "None needed"], correct: 1, explanation: "Financial experts recommend 3-6 months of living expenses in an easily accessible emergency fund." },
  { id: 5, question: "Which investment strategy involves regularly investing a fixed amount regardless of market conditions?", options: ["Market Timing", "Dollar-Cost Averaging", "Value Investing", "Day Trading"], correct: 1, explanation: "Dollar-Cost Averaging reduces the impact of volatility by spreading purchases over time." }
];

export function QuizModule({ className }: { className?: string }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizBank[currentQ];

  function handleAnswer(idx: number) {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === question.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (currentQ + 1 >= quizBank.length) {
      setFinished(true);
      return;
    }
    setCurrentQ((q) => q + 1);
    setSelected(null);
    setShowResult(false);
  }

  function handleReset() {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  }

  return (
    <Card className={`glass overflow-hidden ${className || ""}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
        <Brain size={18} className="text-violet-400" />
        <h3 className="text-lg font-semibold">Knowledge Check</h3>
        <span className="ml-auto text-xs text-white/40">
          {finished ? `${score}/${quizBank.length}` : `${currentQ + 1}/${quizBank.length}`}
        </span>
      </div>

      {finished ? (
        <div className="p-8 text-center">
          <div className="mb-4 text-6xl font-bold">
            {score === quizBank.length ? "🏆" : score >= 3 ? "🎯" : "📚"}
          </div>
          <p className="mb-1 text-2xl font-semibold">{score}/{quizBank.length} Correct</p>
          <p className="mb-6 text-sm text-white/50">
            {score === quizBank.length ? "Perfect score! You're a financial expert." : score >= 3 ? "Great job! Keep learning to improve." : "Keep studying — knowledge is wealth."}
          </p>
          <Button onClick={handleReset}>
            <RotateCcw size={14} className="mr-2" /> Retake Quiz
          </Button>
        </div>
      ) : (
        <div className="p-6">
          <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-violet-500 transition-all" style={{ width: `${((currentQ + 1) / quizBank.length) * 100}%` }} />
          </div>
          <p className="mb-5 text-base font-medium">{question.question}</p>
          <div className="space-y-2">
            {question.options.map((opt, idx) => {
              let style = "border-white/10 hover:bg-white/5";
              if (showResult && idx === question.correct) style = "border-emerald-500 bg-emerald-500/10";
              else if (showResult && idx === selected && idx !== question.correct) style = "border-red-500 bg-red-500/10";
              else if (selected === idx) style = "border-cherry-500 bg-cherry-500/10";

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${style}`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-xs font-medium">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                  {showResult && idx === question.correct && <CheckCircle2 size={16} className="ml-auto text-emerald-400" />}
                  {showResult && idx === selected && idx !== question.correct && <XCircle size={16} className="ml-auto text-red-400" />}
                </button>
              );
            })}
          </div>
          {showResult && (
            <div className="mt-4 rounded-xl bg-white/[0.03] p-3 text-xs text-white/60">
              {question.explanation}
            </div>
          )}
          {showResult && (
            <Button onClick={handleNext} className="mt-4 w-full">
              {currentQ + 1 >= quizBank.length ? "See Results" : "Next Question →"}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
