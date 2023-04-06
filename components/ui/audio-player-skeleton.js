import React from "react";

export default function AudioPlayerSkeleton() {
  return (
    <>
      <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <div className="bg-gray-200 dark:bg-[#333] w-96 h-96 animate-pulse rounded-md" />
          </div>

          <div className="mt-12">
            <div className="max-w-sm mx-auto flex justify-between items-center">
              <div className="bg-gray-200 dark:bg-[#333] w-12 h-6 animate-pulse rounded-md" />

              <div className="bg-gray-200 dark:bg-[#333] w-12 h-6 animate-pulse rounded-md" />
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <div className="flex justify-between space-x-2">
              <div className="bg-gray-200 dark:bg-[#333] w-8 h-6 animate-pulse rounded-md" />

              <div className="bg-gray-200 dark:bg-[#333] w-72 h-6 animate-pulse rounded-md" />

              <div className="bg-gray-200 dark:bg-[#333] w-8 h-6 animate-pulse rounded-md" />
            </div>
          </div>

          <div className="mt-12">
            <div className="max-w-sm mx-auto flex justify-between items-center">
              <div className="bg-gray-200 dark:bg-[#333] w-14 h-12 animate-pulse rounded-md" />

              <div className="bg-gray-200 dark:bg-[#333] w-14 h-12 animate-pulse rounded-md" />

              <div className="bg-gray-200 dark:bg-[#333] w-14 h-12 animate-pulse rounded-md" />
            </div>
          </div>

          <div className="mt-12">
            <div className="max-w-sm mx-auto flex justify-between items-center">
              <div className="bg-gray-200 dark:bg-[#333] w-20 h-10 animate-pulse rounded-md" />

              <div className="bg-gray-200 dark:bg-[#333] w-20 h-10 animate-pulse rounded-md" />
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-2">
          <div className="bg-gray-200 dark:bg-[#333] w-full h-12 animate-pulse rounded-md" />

          <div className="bg-gray-200 dark:bg-[#333] w-full h-12 animate-pulse rounded-md" />
        </div>
      </div>
    </>
  );
}
