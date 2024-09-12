"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useForm, FormProvider as RHFProvider } from "react-hook-form";

interface FormContextType {
  userId: string | null;
  updateUserId: (newUserId: string) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const methods = useForm();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");

    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  const updateUserId = (newUserId: string) => {
    setUserId(newUserId);
    localStorage.setItem("userId", newUserId);
  };

  return (
    <FormContext.Provider value={{ userId, updateUserId }}>
      <RHFProvider {...methods}>{children}</RHFProvider>
    </FormContext.Provider>
  );
}

export const useFormContext = () => useContext(FormContext);
