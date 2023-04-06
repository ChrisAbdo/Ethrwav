import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileTopSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }, (_, i) => (
        <li key={i} className="relative col-span-1 flex rounded-md shadow-sm">
          <div
            className={classNames(
              "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
            )}
          >
            <div className="bg-gray-200 dark:bg-[#333] w-16 h-16 animate-pulse rounded-md" />
          </div>
          <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 dark:border-[#333] bg-white dark:bg-[#111]">
            <div className="flex-1 truncate px-4 py-2 text-sm">
              <div className="space-y-1">
                <div className="bg-gray-200 dark:bg-[#333] w-16 h-4 animate-pulse rounded-md" />
                <div className="bg-gray-200 dark:bg-[#333] w-16 h-4 animate-pulse rounded-md" />
              </div>
            </div>

            <div className="mr-4 bg-gray-200 dark:bg-[#333] w-8 h-8 animate-pulse rounded-md" />
          </div>
        </li>
      ))}
    </>
  );
}
