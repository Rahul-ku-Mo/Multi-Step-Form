"use client";

import React from "react";

import { usePathname, useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { stepsHeading } from "@/constant";

interface ProgressBarProps {
  steps: string[];
}

export function ProgressBar({ steps }: ProgressBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    formState: { isValid },
    trigger,
  } = useFormContext();

  const currentStep = steps.findIndex((step) => pathname.includes(step));

  const handleStepClick = async (index: number) => {
    if (index <= currentStep) {
      router.push(`/steps/${steps[index]}`);
    } else if (index === currentStep + 1 && isValid) {
      const isStepValid = await trigger();
      if (isStepValid) {
        router.push(`/steps/${steps[index]}`);
      }
    }
  };

  return (
    <div className="w-full mx-auto py-4">
      <div className="flex justify-between mb-4 gap-12">
        {steps.map((step, index) => (
          <div key={step} className="flex-1">
            <div
              className={`h-1 ${
                index <= currentStep ? "bg-indigo-600" : "bg-gray-200"
              }`}
            />
            <div
              className="mt-2 cursor-pointer"
              onClick={() => handleStepClick(index)}
            >
              <p
                className={`text-sm font-medium ${
                  index <= currentStep ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                Step {index + 1}
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  index <= currentStep ? "" : "text-gray-400"
                }`}
              >
                {stepsHeading[index]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
