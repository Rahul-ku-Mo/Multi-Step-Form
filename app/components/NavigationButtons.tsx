"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { steps } from "@/constant";
import {
  useCreatePersonalInfo,
  useCreateAccountDetails,
  useCreatePreferences,
} from "@/hooks/useFormDetail";

interface NavigationButtonsProps {
  currentStep: number;
}

export default function NavigationButtons({
  currentStep,
}: NavigationButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const createPersonalInfo = useCreatePersonalInfo();
  const createAccountDetails = useCreateAccountDetails();
  const createPreferences = useCreatePreferences();

  const {
    formState: { isValid, isDirty },
    trigger,
    getValues,
    watch,
  } = useFormContext();

  const [_, setCompletedSteps] = useState<string[]>([]);

  // Watch all form fields
  const formValues = watch();

  // Use isDirty from react-hook-form to check for changes
  const hasChanges = isDirty;

  const handleSubmit = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      const currentStepName = steps[currentStep];
      const currentValues = getValues();

      switch (currentStepName) {
        case "personalInfo":
          await createPersonalInfo.mutateAsync(currentValues);
          break;
        case "accountDetails":
          await createAccountDetails.mutateAsync(currentValues);
          break;
        case "preferences":
          await createPreferences.mutateAsync(currentValues);
          break;
        default:
          return;
      }

      setCompletedSteps((prev) => [...prev, currentStepName]);

      if (currentStep < steps.length - 1) {
        router.push(`/steps/${steps[currentStep + 1]}`);
      } else {
        router.push("/steps/ThankYou");
      }
    }
  };

  const handleNext = async () => {
    await handleSubmit();
  };

  // If the current path is "/steps/ThankYou", don't render the buttons
  if (pathname === "/steps/ThankYou") {
    return null;
  }

  return (
    <div className="flex justify-between w-full mt-4">
      <button
        onClick={() => router.push(`/steps/${steps[currentStep - 1]}`)}
        className="rounded-md bg-zinc-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
        style={{
          pointerEvents: currentStep === 0 ? "none" : "auto",
          opacity: currentStep === 0 ? 0 : 1,
        }}
      >
        Previous
      </button>
      {currentStep < steps.length - 1 ? (
        <button
          onClick={handleNext}
          className={`rounded-md bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
            isValid && hasChanges
              ? "bg-green-600 hover:bg-green-500 focus-visible:outline-green-600"
              : "bg-green-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      )}
    </div>
  );
}
