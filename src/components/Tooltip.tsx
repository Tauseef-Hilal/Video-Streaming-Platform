"use client";

import { useState } from "react";

interface TooltipProps {
  tip: string;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ tip, children, className }) => {
  const [showTip, setShowTip] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
      className="relative"
    >
      {children}
      {showTip && (
        <div
          className={`
            absolute z-10 top-full left-1/2 -translate-x-1/2 
            bg-[#3b3a3ab1] text-neutral-200 text-xs rounded-md
            mt-1 ${tip != "" ? "p-2" : ""}
            ${className}
          `}
        >
          {tip}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
