import React from "react";
import * as Progress from "@radix-ui/react-progress";

const ProgressBar = ({ progress }) => {
  return (
    <Progress.Root
      className="relative overflow-hidden bg-gray-200 dark:bg-[#111] rounded-md w-[300px] h-[25px]"
      style={{
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-black dark:bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
