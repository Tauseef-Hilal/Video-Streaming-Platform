"use client";

import { useState } from "react";
import { BiArrowBack, BiMicrophone, BiSearch } from "react-icons/bi";

import Logo from "./Logo";
import Search from "./Search";
import IconButton from "./IconButton";
import { useViewportWidth } from "@/hooks/viewport";
import { areOnSameSideOfReference } from "@/lib/utils";
import { FiMoreVertical } from "react-icons/fi";
import SignInButton from "./SignInButton";

// Used to decide whether search bar covers whole header
const SEARCH_BREAKPOINT = 768;

const Header: React.FC = () => {
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
      <header
        className={`
          fixed flex justify-between items-center h-[56px] w-full bg-inherit 
          -left-4 pl-8 px-4 z-10 ${searchCoversHeader ? "z-20 py-2" : ""}
        `}
      >
        {searchCoversHeader ? (
          <>
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
          </>
        ) : (
          <>
            <Logo className="ml-12" />

            {/* Search Bar & Mic (md and above) */}
            <div
              className={`
                hidden flex-auto md:flex items-center gap-2 md:max-w-[424px] 
                lg:max-w-[600px] h-min
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
              </div>
              <div className="flex items-center">
                <IconButton
                  className="hover:bg-transparent p-0"
                  icon={FiMoreVertical}
                  size={24}
                  tip="Settings"
                />
                <SignInButton className="text-sm w-max" />
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
