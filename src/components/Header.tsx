"use client";

import { useState } from "react";
import { MdOutlineVideoCall } from "react-icons/md";
import { BiArrowBack, BiBell, BiMicrophone, BiSearch } from "react-icons/bi";

import Logo from "./Logo";
import Search from "./Search";
import IconButton from "./IconButton";
import { useViewportWidth } from "@/hooks/viewport";
import { areOnSameSideOfReference } from "@/lib/utils";

// Used to decide whether search bar covers whole header
const SEARCH_BREAKPOINT = 768;

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchFocussed, setSearchFocussed] = useState(false);
  const [showWideSearchBar, setShowWideSearchBar] = useState(false);

  const viewportWidth = useViewportWidth((storedWidth, viewportWidth) => {
    // For limiting rebuilds
    return !areOnSameSideOfReference(
      storedWidth,
      viewportWidth,
      SEARCH_BREAKPOINT
    );
  });

  // Whether Search covers whole header
  const searchCoversHeader =
    showWideSearchBar && viewportWidth < SEARCH_BREAKPOINT;

  const handleSearchInputChange = (value: string) => {
    setSearchValue(value);
    setShowWideSearchBar(true);
  };

  const handleSearchInputFocus = () => {
    setSearchFocussed(true);
    setShowWideSearchBar(true);
  };

  const handleSearchInputBlur = () => {
    setSearchFocussed(false);
    setShowWideSearchBar(false);
  };

  const toggleShowWideSearchBar = () => {
    setShowWideSearchBar(!showWideSearchBar);
    setSearchFocussed(!showWideSearchBar);
  };

  return (
    <>
      {/* `z-20` so that the header renders over sidebar, making back button
          visible on top of menu button when search covers whole header */}
      <header className={`${className} ${searchCoversHeader ? "z-20" : ""}`}>
        {searchCoversHeader ? (
          <div className="flex justify-between items-center">
            <IconButton
              onClick={toggleShowWideSearchBar}
              icon={BiArrowBack}
              size={24}
              tip="Back"
            />
            <Search
              value={searchValue}
              focused={searchFocussed}
              onChange={handleSearchInputChange}
              onFocus={handleSearchInputFocus}
              onBlur={handleSearchInputBlur}
            />
            <IconButton
              className="sm:block"
              icon={BiMicrophone}
              size={24}
              tip="Voice"
            />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Make space for menu button rendered in Sidebar*/}
              <span className="w-10" />

              <Logo />
            </div>
            <div
              className={`
                hidden flex-auto md:flex items-center gap-2 md:max-w-[424px] 
                lg:max-w-[600px]
              `}
            >
              <Search
                value={searchValue}
                focused={searchFocussed}
                onChange={handleSearchInputChange}
                onFocus={handleSearchInputFocus}
                onBlur={handleSearchInputBlur}
              />
              <IconButton
                className={`bg-neutral-800 hover:bg-neutral-700`}
                icon={BiMicrophone}
                size={24}
                tip="Voice"
              />
            </div>

            {/* TODO: Conditional rendering based on user auth */}
            <div className="flex items-center">
              <IconButton
                onClick={toggleShowWideSearchBar}
                className="md:hidden"
                icon={BiSearch}
                size={24}
                tip="Search"
              />
              <IconButton
                className="hidden sm:block md:hidden"
                icon={BiMicrophone}
                size={24}
                tip="Voice"
              />
              <IconButton icon={MdOutlineVideoCall} size={24} tip="Upload" />
              <IconButton
                className="hidden sm:block"
                icon={BiBell}
                size={24}
                tip="Notifications"
              />
              <div className="ml-2 w-8 h-8 rounded-full bg-slate-800"></div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
