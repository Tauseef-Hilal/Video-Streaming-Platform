"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineUserCircle } from "react-icons/hi2";

import { SidebarLink } from "./data";

interface SidebarSectionProps {
  links: SidebarLink[] | null;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ links }) => {
  const pathname = usePathname(); // To find active link

  if (links == null) {
    // TODO: Show subscriptions if user is signed in

    // Otherwise render this
    return (
      <div
        className={`
          flex flex-col gap-3 items-start px-7 py-5 border-b-[1px] 
          border-[#4c4c4cb4]
        `}
      >
        <p className="text-sm">
          Sign in to like videos,
          <br />
          comment, and subscribe
        </p>
        <span // Sign in button
          className={`
            flex gap-1 items-center text-sm font-medium text-sky-500 
            border-[1px] rounded-full pl-2 pr-3 py-1 border-[#4c4c4cb4]
            hover:bg-[#3aabf126] hover:border-black cursor-pointer
          `}
        >
          <HiOutlineUserCircle size={25} />
          <span>Sign in</span>
        </span>
      </div>
    );
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
