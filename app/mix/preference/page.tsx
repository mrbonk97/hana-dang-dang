"use client";
import { MixStep } from "@/components/breadcrumb/mix-step";
import { StepInfo1 } from "@/components/step/mix/step-info-1";
import { useState } from "react";

const PreferencePage = () => {
  const [step, setStep] = useState(0);
  return (
    <main className="pt-20 h-full">
      <MixStep step={step} />
    </main>
  );
};

export default PreferencePage;
