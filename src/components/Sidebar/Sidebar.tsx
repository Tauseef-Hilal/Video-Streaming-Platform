"use client";

import { useState } from "react";
import { CgMenu } from "react-icons/cg";

import sidebarLinks from "./data";
import AppDrawer from "../AppDrawer";
import IconButton from "../IconButton";
import MiniSidebar from "./MiniSidebar";
import FullSidebar from "./FullSidebar";
import { useViewportWidth } from "@/hooks/viewport";
import { areOnSameSideOfReference } from "@/lib/utils";

// Used for switching between sidebars on large screens (vw >= BREAKPOINT)
const BREAKPOINT = 1280;
const sidebars = [
  <MiniSidebar
    key={0}
    className="pt-[6px]"
    links={[...sidebarLinks[0]!, ...sidebarLinks[1]!]}
  />,
  <FullSidebar key={1} links={sidebarLinks} />,
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [showAppDrawer, setShowAppDrawer] = useState(false);

  // For switching between sidebars
  const [sidebarIdx, setSidebarIdx] = useState(1);

  const viewportWidth = useViewportWidth((storedWidth, viewportWidth) => {
    // For limiting rebuilds
    return !areOnSameSideOfReference(storedWidth, viewportWidth, BREAKPOINT);
  });

  const handleMenuButtonClick = () => {
    // Switch between sidebars on large screens
    if (window.innerWidth >= BREAKPOINT) {
      setSidebarIdx(sidebarIdx == 0 ? 1 : 0);
      return;
    }

    // AppDrawer for smaller screens
    setShowAppDrawer(true);
  };

  return (
    <>
      {/* Only menu button for widths less than 640px */}
      <IconButton
        className="sm:hidden ml-3 fixed top-2 z-10"
        onClick={handleMenuButtonClick}
        icon={CgMenu}
        size={24}
      />

      {/* For larger screens, show sidebar also */}
      <aside
        className={`
          h-full hidden sm:flex flex-col gap-2 items-start px-[4px] 
          sticky top-0 z-10 ${className}
        `}
      >
        <IconButton
          onClick={handleMenuButtonClick}
          icon={CgMenu}
          size={24}
          className="ml-3"
        />

        {/* Large screens */}
        {viewportWidth >= BREAKPOINT ? (
          sidebars[sidebarIdx]
        ) : (
          // Smaller screens
          <div className="hidden sm:flex">
            <MiniSidebar
              className="pt-1 hidden sm:flex xl:hidden"
              links={[...sidebarLinks[0]!, ...sidebarLinks[1]!]}
            />
            <FullSidebar className="hidden xl:flex" links={sidebarLinks} />
          </div>
        )}
      </aside>
      <AppDrawer
        visible={showAppDrawer}
        onClose={() => setShowAppDrawer(false)}
      />
    </>
  );
};

export default Sidebar;
