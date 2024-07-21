"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarLink } from "./data";
import Subscriptions from "../Subscriptions";

interface SidebarSectionProps {
  links: SidebarLink[] | null;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ links }) => {
  const pathname = usePathname(); // To find active link

  // Show subscriptions if user is signed in
  if (links == null) {
    return <Subscriptions />;
  }

  return (
    <div
      className={`
        pl-[10px] pr-[16px] py-3 border-b-[1px] border-[#4c4c4cb4]
      `}
    >
      {links.map((link) => (
        <Link
          key={link.link}
          href={link.link}
          className={`
            ${link.link == pathname ? "bg-[#343434bb]" : ""}
            flex items-center w-full gap-[1.6em] hover:bg-[#343434bb] 
            px-3 py-[10px] rounded-lg 
          `}
        >
          {link.link == pathname ? (
            <link.activeIcon size={20} />
          ) : (
            <link.icon size={20} />
          )}
          <p className="text-sm">{link.text}</p>
        </Link>
      ))}
    </div>
  );
};

export default SidebarSection;
