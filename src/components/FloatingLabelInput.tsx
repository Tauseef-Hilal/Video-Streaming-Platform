import React, { useState } from "react";

interface FloatingLabelInputProps {
  id: string;
  label: string;
  value: string;
  name: string;
  ariaDescribedBy?: string;
  type?: string;
  className?: string;
  required?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  id,
  label,
  value,
  name,
  ariaDescribedBy,
  type,
  required,
  onChange,
  onFocus,
  onBlur,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        name={name}
        aria-describedby={ariaDescribedBy}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.call(null, e);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
          }
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.call(null, e);
        }}
        className={`
          block w-full px-2.5 pb-2.5 pt-6 text-sm bg-transparent ${className}
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute text-neutral-400 duration-300
          transform top-4 origin-[0] left-2.5 cursor-text 
          ${value || isFocused ? "text-xs -translate-y-2" : ""}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
