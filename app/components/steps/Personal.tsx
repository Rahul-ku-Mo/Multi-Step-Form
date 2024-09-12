"use client";

import { useFormContext } from "react-hook-form";
import { FieldConfig } from "@/types";
import { useEffect, useState } from "react";

const personalInfoFields: FieldConfig[] = [
  {
    name: "firstName",
    label: "First name",
    type: "text",
    required: true,
    autoComplete: "given-name",
    validation: {
      validate: (value) => value.trim() !== "" || "First name cannot be empty",
    },
    colSpan: "sm:col-span-3",
  },
  {
    name: "lastName",
    label: "Last name",
    type: "text",
    required: true,
    autoComplete: "family-name",
    validation: {
      validate: (value) => value.trim() !== "" || "Last name cannot be empty",
    },
    colSpan: "sm:col-span-3",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    required: true,
    autoComplete: "email",
    validation: {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    colSpan: "sm:col-span-4",
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    required: true,
    autoComplete: "country-name",
    options: [
      { value: "", label: "Select a country" },
      { value: "US", label: "United States" },
      { value: "CA", label: "Canada" },
      { value: "MX", label: "Mexico" },
    ],
    colSpan: "sm:col-span-3",
  },
  {
    name: "streetAddress",
    label: "Street address",
    type: "text",
    required: true,
    autoComplete: "street-address",
    colSpan: "col-span-full",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: true,
    autoComplete: "address-level2",
    colSpan: "sm:col-span-2 sm:col-start-1",
  },
  {
    name: "region",
    label: "State / Province",
    type: "text",
    required: true,
    autoComplete: "address-level1",
    colSpan: "sm:col-span-2",
  },
  {
    name: "postalCode",
    label: "ZIP / Postal code",
    type: "text",
    required: true,
    autoComplete: "postal-code",
    colSpan: "sm:col-span-2",
  },
];

export function PersonalInfo() {
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    getValues,
  } = useFormContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/personalInfo?userId=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch personal info");

        const { data } = await response.json();
        if (data) {
          Object.keys(data).forEach((key) => setValue(key, data[key]));
        } else {
          // If API data is null, check for values in local state
          const localValues = getValues();
          if (Object.values(localValues).some((value) => value)) {
            Object.keys(localValues).forEach((key) =>
              setValue(key, localValues[key])
            );
          }
        }
      } catch (error) {
        console.error("Error fetching personal info:", error);
        // If there's an error fetching from API, fall back to local state
        const localValues = getValues();
        if (Object.values(localValues).some((value) => value)) {
          Object.keys(localValues).forEach((key) =>
            setValue(key, localValues[key])
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getValues, setValue]);

  const renderField = (field: FieldConfig) => {
    const inputClass =
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
    const errorClass = "mt-1 text-sm text-red-600";

    const commonProps = {
      id: field.name,
      ...register(field.name, {
        required: field.required ? `${field.label} is required` : false,
        ...field.validation,
      }),
      className: inputClass,
      onBlur: () => trigger(field.name),
      autoComplete: field.autoComplete,
    };

    return (
      <div key={field.name} className={field.colSpan || "sm:col-span-3"}>
        <label
          htmlFor={field.name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {field.label}
        </label>
        <div className="mt-2">
          {field.type === "select" ? (
            <select {...commonProps}>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input type={field.type} {...commonProps} />
          )}
          {errors[field.name] && (
            <p className={errorClass}>
              {errors[field.name]?.message as string}
            </p>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Please fill in the following information to complete your profile.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {personalInfoFields.map(renderField)}
        </div>
      </div>
    </div>
  );
}
