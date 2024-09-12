"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import { useFetchUsers } from "@/hooks/useFormDetail";

interface User {
  id: string;
  name: string;
}

export function UserList() {
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);

  const router = useRouter();

  const { data: users } = useFetchUsers();

  const onDeleteUser = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    router.refresh();
  };

  if (!users) return null;

  return (
    <>
      {users.length > 0 && (
        <h2 className="text-lg tracking-tight font-semibold mb-4">
          Registered Users
        </h2>
      )}
      <ul className="space-y-4 mt-2">
        {users?.map((user: User) => (
          <li
            key={user.id}
            className="bg-white rounded-lg cursor-pointer max-w-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            onMouseEnter={() => setHoveredUser(user.id)}
            onMouseLeave={() => setHoveredUser(null)}
            onClick={() => {
              localStorage.setItem("userId", user.id);
              router.push(`/steps/personalInfo`);
            }}
          >
            <div className="flex items-center p-4 space-x-4">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r bg-violet-800 text-white text-lg font-semibold">
                  {user.name[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  Hi, Click on me to start filling out the form.
                </p>
              </div>
              <div
                className={`flex-shrink-0 transition-opacity duration-300 ${
                  hoveredUser === user.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteUser(user.id);
                  }}
                  className="p-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                  aria-label={`Delete ${user.name}`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
