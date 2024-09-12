"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateUser } from "@/hooks/useFormDetail";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export function CreateUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const createUser = useCreateUser();

  const onSubmit = async (data) => {
    // Here you would typically send the data to your API
    createUser.mutate(data);
    reset();
    setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-violet-700 text-white font-semibold px-3 text-sm py-2 rounded-md hover:bg-violet-600 transition-colors"
      >
        New User
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New User</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  id="name"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {"Name is required"}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
