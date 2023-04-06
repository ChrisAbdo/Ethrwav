import React from "react";

export default function SlugSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i} className="relative">
          <div className="space-x-4">
            <div className="bg-gray-200 dark:bg-[#333] w-52 h-52 animate-pulse rounded-md" />
          </div>
          <div className="space-y-1">
            <div className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              <div className="bg-gray-200 dark:bg-[#333] w-48 h-4 animate-pulse rounded-md" />
            </div>
            <div className="pointer-events-none block text-sm font-medium text-gray-500">
              <div className="bg-gray-200 dark:bg-[#333] w-48 h-4 animate-pulse rounded-md" />
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
