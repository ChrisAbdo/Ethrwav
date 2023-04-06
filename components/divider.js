import React from "react";

export default function Divider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300 dark:border-[#333]" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white dark:bg-black px-3 text-base font-semibold leading-6 text-black dark:text-[#999]">
          Not ready to upload?
        </span>
      </div>
    </div>
  );
}
