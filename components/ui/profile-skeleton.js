import React from "react";

export default function ProfileSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <tr key={i}>
          <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium ">
            <div className="flex items-center space-x-3 lg:pl-2">
              <div className="bg-gray-200 dark:bg-[#333] w-8 h-8 animate-pulse rounded-md" />

              <div className="bg-gray-200 dark:bg-[#333] w-96 h-8 animate-pulse rounded-md" />
            </div>
          </td>
          <td className="px-6 py-3 text-sm font-medium text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="flex flex-shrink-0 -space-x-1" />

              <span className="flex-shrink-0 text-xs font-medium leading-5">
                <div className="bg-gray-200 dark:bg-[#333] w-8 h-8 animate-pulse rounded-md" />
              </span>
            </div>
          </td>
          <td className="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
            <div className="bg-gray-200 dark:bg-[#333] w-24 h-8 animate-pulse rounded-md" />
          </td>
          <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
            <div className="bg-gray-200 dark:bg-[#333] w-36 h-8 animate-pulse rounded-md" />
          </td>
        </tr>
      ))}
    </>
  );
}
