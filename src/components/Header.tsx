"use client";

import { useEffect, useState } from "react";
import { MdOutlineVideoCall } from "react-icons/md";
import { BiArrowBack, BiBell, BiMicrophone, BiSearch } from "react-icons/bi";
import { CgMenu } from "react-icons/cg";

import IconButton from "./IconButton";
import Logo from "./Logo";
import Search from "./Search";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchFocussed, setSearchFocussed] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [showWideSearchBar, setShowWideSearchBar] = useState(false);

  // Used to decide which search bar to display
  const SEARCH_BREAKPOINT = 768;

  useEffect(() => {
    function resizeHandler() {
      // Performance optimisation: Only update viewportWidth if
      // window.innerWidth and viewportWidth both are not < or >= BREAKPOINT
      if (
        (window.innerWidth < SEARCH_BREAKPOINT &&
          viewportWidth < SEARCH_BREAKPOINT) ||
        (window.innerWidth >= SEARCH_BREAKPOINT &&
          viewportWidth >= SEARCH_BREAKPOINT)
      ) {
        return;
      }

      setViewportWidth(window.innerWidth);
    }

    // Update viewportWidth because its initially set to 0
    setViewportWidth(window.innerWidth);

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [viewportWidth]);

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
    <header>
      {showWideSearchBar && viewportWidth < SEARCH_BREAKPOINT ? (
        <div className="flex justify-between items-center pl-2 pr-4 py-2">
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
        <div className={`flex justify-between items-center pl-2 pr-4 py-2`}>
          <div className="flex items-center gap-4">
            <IconButton icon={CgMenu} size={24} />
            <Logo />
          </div>
          <div
            className={`
              hidden flex-auto md:flex items-center gap-2 md:max-w-[424px] lg:max-w-[600px]
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
  );
};

export default Header;
