"use client";

import { useFormContext } from "@/context/FormContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "@/libs/queryClient";

const getUserIdFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userId");
  }
  return null;
};

export const useFetchUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`
      );

      const data = await response.json();
      return data;
    },
  });

  return { data, isLoading, error };
};

export const useCreateUser = () => {
  const { updateUserId } = useFormContext();

  return useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      return response.json();
    },
    onSuccess: (data) => {
      updateUserId(data.id);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error) => {
      console.error("Error creating user", error);
    },
  });
};

export const useCreatePersonalInfo = () =>
  useMutation({
    mutationFn: async (data) => {
      const userId = getUserIdFromLocalStorage();
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/personalInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.assign({}, data, { userId })),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create personal info");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("Personal info created successfully", data);
    },
    onError: (error) => {
      console.error("Error creating personal info", error);
    },
  });

export const useCreateAccountDetails = () =>
  useMutation({
    mutationFn: async (data) => {
      const userId = getUserIdFromLocalStorage();
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/accountDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.assign({}, data, { userId })),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create account details");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("Account details created successfully", data);
    },
    onError: (error) => {
      console.error("Error creating account details", error);
    },
  });

export const useCreatePreferences = () =>
  useMutation({
    mutationFn: async (data) => {
      const userId = getUserIdFromLocalStorage();
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/preferences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.assign({}, data, { userId })),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create preferences");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("Preferences created successfully", data);
    },
    onError: (error) => {
      console.error("Error creating preferences", error);
    },
  });
