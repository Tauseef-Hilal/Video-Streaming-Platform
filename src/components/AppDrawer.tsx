import { MouseEventHandler } from "react";
import { CgMenu } from "react-icons/cg";

import FullSidebar from "./Sidebar/FullSidebar";
import sidebarLinks from "./Sidebar/data";
import IconButton from "./IconButton";
import Logo from "./Logo";

interface AppDrawerProps {
  visible: boolean;
  onClose: MouseEventHandler;
}

const AppDrawer: React.FC<AppDrawerProps> = ({ visible, onClose }) => {
  return (
    <div role="drawer">
      {visible && ( // Overlay
        <div
          onClick={onClose}
          className={`
            fixed top-0 w-full h-full bg-black opacity-30 transition-opacity
          `}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 z-20 h-full
          ${visible ? "drawer-open" : "drawer-closed"}
        `}
      >
        <div
          className={`
            flex flex-col bg-[var(--background-color)] overflow-auto h-full
          `}
        >
          <div className="flex items-center gap-4 pl-3 pt-2">
            <IconButton onClick={onClose} icon={CgMenu} size={24} />
            <Logo />
          </div>
          <FullSidebar className="h-full" links={sidebarLinks} />
        </div>
      </div>
    </div>
  );
};

export default AppDrawer;
