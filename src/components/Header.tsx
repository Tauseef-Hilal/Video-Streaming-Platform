"use client";

import { useState } from "react";
import { BiArrowBack, BiMicrophone, BiSearch } from "react-icons/bi";

import Logo from "./Logo";
import Search from "./Search";
import IconButton from "./IconButton";
import SignInButton from "./SignInButton";
import { useViewportWidth } from "@/hooks/viewport";
import { areOnSameSideOfReference } from "@/lib/utils/abc";
import { FiMoreVertical } from "react-icons/fi";
import { SCROLLBAR_WIDTH } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";

// Used to decide whether search bar covers whole header
const SEARCH_BREAKPOINT = 768 + SCROLLBAR_WIDTH;

const Header: React.FC = () => {
  const [searchFocussed, setSearchFocussed] = useState(false);
  const [showWideSearchBar, setShowWideSearchBar] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("query") ?? ""
  );

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
    console.log("BKJ:SLDKJ:LSKDBJ");
  };

  const toggleShowWideSearchBar = () => {
    setShowWideSearchBar(!showWideSearchBar);
    setSearchFocussed(!showWideSearchBar);
  };

  const handleSearchButtonPress = () => {
    router.push(`/results?query=${searchValue}`);
  };

  return (
    <>
      {/* `z-20` so that the header renders over sidebar, making back button
          visible on top of menu button when search covers whole header */}
      <header
        id="header"
        className={`
          fixed flex justify-between items-center h-[56px] w-full bg-inherit 
          px-6 z-10 ${searchCoversHeader ? "z-20 py-2" : ""}
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
              key={"123"}
              value={searchValue}
              focused={searchFocussed}
              onChange={handleSearchInputChange}
              onFocus={handleSearchInputFocus}
              onBlur={handleSearchInputBlur}
              onSearch={handleSearchButtonPress}
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
            <Logo className="ml-10" />

            {/* Search Bar & Mic (md and above) */}
            <div
              className={`
                hidden flex-auto md:flex items-center gap-2 md:max-w-[424px] 
                lg:max-w-[600px] h-min
              `}
            >
              <Search
                key={"123"}
                value={searchValue}
                focused={searchFocussed}
                onChange={handleSearchInputChange}
                onFocus={handleSearchInputFocus}
                onBlur={handleSearchInputBlur}
                onSearch={handleSearchButtonPress}
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
                  className="hover:bg-transparent px-0 py-0"
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
