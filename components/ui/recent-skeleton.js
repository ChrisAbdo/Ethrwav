import React from "react";

export default function RecentSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <li
          key={i}
          className="py-4 rounded-md hover:bg-gray-200 dark:hover:bg-[#333] transition duration-150 p-6 cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="bg-gray-200 dark:bg-[#333] w-8 h-8 animate-pulse rounded-md" />
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="truncate text-sm font-medium ">
                <div className="bg-gray-200 dark:bg-[#333] w-full h-4 animate-pulse rounded-md" />
              </div>
              <div className="truncate text-sm ">
                <div className="bg-gray-200 dark:bg-[#333] w-full h-4 animate-pulse rounded-md" />
              </div>
            </div>
            <div>
              <h1 className="flex text-sm font-semibold text-gray-900 dark:text-gray-100">
                <div className="bg-gray-200 dark:bg-[#333] w-6 h-4 animate-pulse rounded-md" />
              </h1>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
