"use client";

import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

import IconButton from "./IconButton";

interface SearchProps {
  value: string;
  focused: boolean;
  className?: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const Search: React.FC<SearchProps> = ({
  value,
  focused,
  className,
  onChange,
  onFocus,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused) {
      inputRef.current?.focus();
    }
  }, [focused, inputRef]);

  return (
    <div className={`flex relative w-full ${className}`}>
      {!focused && <BiSearch className="ml-4 text-transparent text-xl" />}
      <div
        className={`
          flex items-center relative rounded-l-full border border-neutral-700 
          focus-within:border-blue-400 w-full
      `}
      >
        {focused && (
          <BiSearch className="absolute -z-10 ml-4 text-neutral-300 text-xl" />
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
          className={`
            pl-4 placeholder-neutral-500 text-neutral-300 bg-[#1d1c1c2d]
            font-light outline-none ${focused ? "pl-12" : ""}
          `}
        />
        {value.length > 0 ? (
          <IconButton
            onClick={() => {
              inputRef.current?.focus();
              onChange("");
            }}
            icon={RxCross1}
            size={20}
          />
        ) : (
          <IconButton className="opacity-0" icon={RxCross1} size={20} />
        )}
      </div>
      <IconButton
        className={`
          bg-neutral-800 hover:bg-neutral-800 rounded-full rounded-l-none 
          border border-l-0 border-neutral-700 px-4
        `}
        icon={BiSearch}
        size={20}
      />
    </div>
  );
};

export default Search;
