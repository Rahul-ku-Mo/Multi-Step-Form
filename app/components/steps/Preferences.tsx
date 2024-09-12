"use client";

import { useFormContext } from "react-hook-form";
import { FieldConfig } from "@/types";
import { useEffect, useState } from "react";

interface CheckboxFieldConfig extends FieldConfig {
  type: "checkbox";
  checkboxLabel: string;
}

interface FieldsetConfig {
  legend: string;
  fields: CheckboxFieldConfig[];
}

const preferencesFields: (FieldConfig | FieldsetConfig)[] = [
  {
    name: "theme",
    label: "Preferred Theme",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select a theme" },
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
      { value: "system", label: "System" },
    ],
    validation: { required: "Theme selection is required" },
    colSpan: "sm:col-span-3",
  },
  {
    name: "language",
    label: "Preferred Language",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select a language" },
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
      { value: "de", label: "German" },
      { value: "zh", label: "Chinese" },
    ],
    validation: { required: "Language selection is required" },
    colSpan: "sm:col-span-3",
  },
  {
    name: "timezone",
    label: "Timezone",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select a timezone" },
      { value: "UTC-8", label: "Pacific Time (PT)" },
      { value: "UTC-5", label: "Eastern Time (ET)" },
      { value: "UTC+0", label: "Coordinated Universal Time (UTC)" },
      { value: "UTC+1", label: "Central European Time (CET)" },
      { value: "UTC+8", label: "China Standard Time (CST)" },
    ],
    validation: { required: "Timezone selection is required" },
    colSpan: "sm:col-span-3",
  },
  {
    name: "currency",
    label: "Preferred Currency",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select a currency" },
      { value: "USD", label: "US Dollar (USD)" },
      { value: "EUR", label: "Euro (EUR)" },
      { value: "GBP", label: "British Pound (GBP)" },
      { value: "JPY", label: "Japanese Yen (JPY)" },
      { value: "CNY", label: "Chinese Yuan (CNY)" },
    ],
    validation: { required: "Currency selection is required" },
    colSpan: "sm:col-span-3",
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    required: true,
    validation: {
      maxLength: { value: 500, message: "Bio must be 500 characters or less" },
    },
    placeholder: "Tell us a little about yourself...",
    colSpan: "sm:col-span-6",
  },
  {
    legend: "Notification Preferences",

    fields: [
      {
        required: true,
        name: "emailNotifications",
        label: "Email Notifications",
        type: "checkbox",
        checkboxLabel: "Receive email notifications",
      },
      {
        required: true,
        name: "smsNotifications",
        label: "SMS Notifications",
        type: "checkbox",
        checkboxLabel: "Receive SMS notifications",
      },
      {
        required: true,
        name: "pushNotifications",
        label: "Push Notifications",
        type: "checkbox",
        checkboxLabel: "Receive push notifications",
      },
    ],
  },
  {
    required: true,
    name: "newsletterFrequency",
    label: "Newsletter Frequency",
    type: "select",
    options: [
      { value: "", label: "Select frequency" },
      { value: "daily", label: "Daily" },
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
      { value: "never", label: "Never" },
    ],
    colSpan: "sm:col-span-6",
  },
];

export function Preferences() {
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/preferences?userId=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch preferences");

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
        console.error("Error fetching preferences:", error);
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

  const renderField = (field: FieldConfig | FieldsetConfig) => {
    const inputClass =
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
    const errorClass = "mt-1 text-sm text-red-600";

    if ("legend" in field) {
      return (
        <div key={field.legend} className="sm:col-span-6">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              {field.legend}
            </legend>
            <div className="mt-4 space-y-4">
              {field.fields.map((checkboxField) => (
                <div key={checkboxField.name} className="flex items-center">
                  <input
                    id={checkboxField.name}
                    {...register(checkboxField.name)}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={checkboxField.name}
                    className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                  >
                    {checkboxField.checkboxLabel}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      );
    }

    const commonProps = {
      id: field.name,
      ...register(field.name, field.validation),
      className: inputClass,
      onBlur: () => trigger(field.name),
      placeholder: field.placeholder,
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
          ) : field.type === "textarea" ? (
            <textarea {...commonProps} rows={3}></textarea>
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
          Preferences
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Customize your preferences to enhance your experience.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {preferencesFields.map(renderField)}
        </div>
      </div>
    </div>
  );
}
