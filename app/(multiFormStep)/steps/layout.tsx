import { FormProvider } from "@/context/FormContext";
import { ProgressBarWrapper } from "@/app/components/ProgressBarWrapper";
import Link from "next/link";

export default function StepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormProvider>
      <main className="container mx-auto p-4">
        <Link href="/">
          <h1 className="text-2xl font-bold mb-4">
            Multi-Step Registration Form
          </h1>
        </Link>
        <ProgressBarWrapper>{children}</ProgressBarWrapper>
      </main>
    </FormProvider>
  );
}
