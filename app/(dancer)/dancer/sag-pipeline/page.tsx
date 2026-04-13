"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCastingStore } from "@/hooks/useCastingStore";
import { CheckCircle, Circle, BookOpen, ExternalLink } from "lucide-react";

export default function SagPipelinePage() {
  const { sagPipeline, completeSagStep } = useCastingStore();
  const completedCount = sagPipeline.filter((s) => s.completed).length;
  const progress = Math.round((completedCount / sagPipeline.length) * 100);

  return (
    <div className="min-h-screen bg-[#050002] p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-3">
            <BookOpen className="text-gold-500" size={32} />
            <h1 className="cherry-text font-display text-5xl">SAG Pipeline</h1>
          </div>
          <p className="mb-6 max-w-2xl text-white/70">
            Your step-by-step roadmap to becoming a SAG-AFTRA member and professional actress/model.
            Researched from the top 40 talent and modeling agencies across California, Atlanta, Florida, New York, Paris and worldwide.
          </p>
          <div className="flex items-center gap-4">
            <div className="h-3 flex-1 rounded-full bg-white/10">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-cherry-500 to-gold-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gold-400">{progress}% Complete</span>
          </div>
          <p className="mt-2 text-sm text-white/50">{completedCount} of {sagPipeline.length} steps completed</p>
        </div>

        <div className="space-y-4">
          {sagPipeline.map((step, index) => (
            <Card key={step.id} className={`glass p-6 transition ${step.completed ? "border-emerald-500/30 bg-emerald-500/5" : ""}`}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-sm font-bold">
                    {index + 1}
                  </div>
                  {index < sagPipeline.length - 1 && (
                    <div className={`mt-2 h-full w-0.5 ${step.completed ? "bg-emerald-500/50" : "bg-white/10"}`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    {step.completed ? (
                      <CheckCircle className="text-emerald-400" size={20} />
                    ) : (
                      <Circle className="text-white/30" size={20} />
                    )}
                    <h3 className={`text-xl font-semibold ${step.completed ? "text-emerald-400" : ""}`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="mb-3 text-sm text-white/70">{step.description}</p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {step.resources.map((resource, i) => (
                      <span key={i} className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-xs text-white/60">
                        <ExternalLink size={10} /> {resource}
                      </span>
                    ))}
                  </div>
                  {!step.completed && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => completeSagStep(step.id)}
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
