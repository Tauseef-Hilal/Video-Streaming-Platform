"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarLink } from "./data";

interface MiniSidebarProps {
  links: SidebarLink[];
  className?: string;
}

const MiniSidebar: React.FC<MiniSidebarProps> = ({ links, className }) => {
  const pathname = usePathname(); // To check for active link

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {links.map((link) => (
        <Link
          key={link.link}
          href={link.link}
          className={`
            flex flex-col items-center w-full gap-2 hover:bg-[#343434bb] 
            px-[2px] py-4 rounded-lg
          `}
        >
          {link.link == pathname ? (
            <link.activeIcon size={20} />
          ) : (
            <link.icon size={20} />
          )}
          <p className="text-[10px]">{link.text}</p>
        </Link>
      ))}
    </div>
  );
};

export default MiniSidebar;
