"use client";

import { SidebarLink } from "./data";
import SidebarSection from "./SidebarSection";
import AdditionalLinks from "./AdditionalLinks";

interface FullSidebarProps {
  links: (SidebarLink[] | null)[];
  className?: string;
}

const FullSidebar: React.FC<FullSidebarProps> = ({ links, className }) => {
  return (
    <div
      className={`
        flex flex-col w-[230px] overflow-y-auto ${className}
      `}
    >
      <div>
        {links.map((linkArr, idx) => (
          <SidebarSection key={idx} links={linkArr} />
        ))}
      </div>

      {/* Additional links */}
      <div
        className={`
          pl-7 py-4 flex flex-col gap-3 text-[13px] text-neutral-400 
          font-medium
        `}
      >
        <AdditionalLinks />
        <p className="text-xs text-neutral-500">&copy; 2024 FusionFlix</p>
      </div>
    </div>
  );
};

export default FullSidebar;
