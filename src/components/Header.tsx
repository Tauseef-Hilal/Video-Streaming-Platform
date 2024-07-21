"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdMic, IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";

import Logo from "./Logo";
import Search from "./Search";
import IconButton from "./IconButton";
import SignInButton from "./SignInButton";
import useViewportWidth from "@/hooks/viewport";
import useAuth from "@/hooks/auth";
import { SCROLLBAR_WIDTH } from "@/lib/constants";
import { areOnSameSideOfReference } from "@/lib/utils/abc";
import { IoVideocamOutline } from "react-icons/io5";

// Used to decide whether search bar covers whole header
const SEARCH_BREAKPOINT = 768 + SCROLLBAR_WIDTH;

const Header: React.FC = () => {
  const { isLoggedIn } = useAuth();
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
              icon={IoMdMic}
              size={24}
              tip="Voice"
            />
          </>
        ) : (
          <>
            <Logo className="ml-5 scale-90 sm:ml-10 sm:scale-100" />

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
                icon={IoMdMic}
                size={24}
                tip="Voice"
              />
            </div>

            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <IconButton
                  onClick={toggleShowWideSearchBar}
                  className="md:hidden"
                  icon={IoMdSearch}
                  size={24}
                  tip="Search"
                />
                <IconButton
                  className="hidden sm:block md:hidden"
                  icon={IoMdMic}
                  size={24}
                  tip="Voice"
                />
              </div>
              {isLoggedIn && (
                <div className="flex items-center">
                  <IconButton
                    onClick={toggleShowWideSearchBar}
                    icon={IoVideocamOutline}
                    size={24}
                    tip="Upload"
                  />
                  <IconButton
                    icon={IoMdNotificationsOutline}
                    size={24}
                    tip="Notifications"
                  />
                </div>
              )}
              <div className="flex items-center">
                <IconButton
                  className="hover:bg-transparent px-0 py-0"
                  icon={isLoggedIn ? RxAvatar : FiMoreVertical}
                  size={24}
                  tip="Settings"
                />
                {!isLoggedIn && <SignInButton className="text-sm w-max" />}
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
