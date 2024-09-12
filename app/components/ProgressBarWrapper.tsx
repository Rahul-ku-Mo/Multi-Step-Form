"use client";

import NavigationButtons from "./NavigationButtons";
import { ProgressBar } from "./ProgressBar";
import { steps } from "@/constant";
import { usePathname } from "next/navigation";

export const ProgressBarWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const currentStep = steps.indexOf(pathname.split("/").pop() || "");

  return (
    <>
      <ProgressBar steps={steps} />
      {children}
      <NavigationButtons currentStep={currentStep} />
    </>
  );
};
