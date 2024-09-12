"use client";

import { useFormContext } from "react-hook-form";
import { FieldConfig } from "@/types";
import { useEffect, useState } from "react";

const accountDetailsFields: FieldConfig[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    required: true,
    autoComplete: "username",
    validation: { required: "Username is required" },
    colSpan: "sm:col-span-4",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    required: true,
    autoComplete: "email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    colSpan: "sm:col-span-4",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    autoComplete: "new-password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long",
      },
    },
    colSpan: "sm:col-span-3",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
    autoComplete: "new-password",
    validation: {
      required: "Please confirm your password",
      validate: (value, formValues) =>
        value === formValues.password || "Passwords do not match",
    },
    colSpan: "sm:col-span-3",
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
    validation: { required: "Date of birth is required" },
    colSpan: "sm:col-span-3",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    required: true,
    autoComplete: "tel",
    validation: {
      required: "Phone number is required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Please enter a valid 10-digit phone number",
      },
    },
    colSpan: "sm:col-span-3",
  },
  {
    name: "securityQuestion",
    label: "Security Question",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select a security question" },
      { value: "petName", label: "What was the name of your first pet?" },
      {
        value: "motherMaidenName",
        label: "What is your mother's maiden name?",
      },
      { value: "birthCity", label: "In which city were you born?" },
      { value: "schoolName", label: "What was the name of your first school?" },
    ],
    validation: { required: "Security question is required" },
    colSpan: "col-span-full",
  },
  {
    name: "securityAnswer",
    label: "Security Answer",
    type: "text",
    required: true,
    validation: { required: "Security answer is required" },
    colSpan: "col-span-full",
  },
];

export function AccountDetails() {
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/accountDetails?userId=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch account details");

        const { data } = await response.json();
        if (data) {
          Object.keys(data).forEach((key) => setValue(key, data[key]));
        } else {
          const localValues = getValues();
          if (Object.values(localValues).some((value) => value)) {
            Object.keys(localValues).forEach((key) =>
              setValue(key, localValues[key])
            );
          }
        }
      } catch (error) {
        console.error("Error fetching account details:", error);

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
          Account Details
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Please provide your account information to complete your registration.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {accountDetailsFields.map(renderField)}
        </div>
      </div>
    </div>
  );
}
