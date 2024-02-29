import { MouseEventHandler } from "react";
import { CgMenu } from "react-icons/cg";

import FullSidebar from "./Sidebar/FullSidebar";
import sidebarLinks from "./Sidebar/data";
import IconButton from "./IconButton";
import Logo from "./Logo";
import { resetBodyScroll } from "@/lib/utils/abc";

interface AppDrawerProps {
  visible: boolean;
  onClose: MouseEventHandler;
}

const AppDrawer: React.FC<AppDrawerProps> = ({ visible, onClose }) => {
  const handleClose: MouseEventHandler = (e) => {
    resetBodyScroll();
    onClose(e);
  };

  return (
    <div role="drawer">
      {visible && ( // Overlay
        <div
          onClick={handleClose}
          className={`
            fixed z-10 top-0 w-full h-full bg-black opacity-40 
            transition-opacity
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
            flex flex-col bg-[var(--background-color)] h-full
          `}
        >
          <div className="flex items-center gap-3 pl-3 pt-2">
            <IconButton onMouseDown={handleClose} icon={CgMenu} size={24} />
            <Logo />
          </div>
          <FullSidebar
            className="h-full"
            links={sidebarLinks}
            resetScrollOnLeave={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AppDrawer;
