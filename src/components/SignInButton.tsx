import { HiOutlineUserCircle } from "react-icons/hi2";

interface SignInButtonProps {
  className?: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({ className }) => {
  return (
    <span
      className={`
        flex gap-1 items-center text-sm font-medium text-sky-500 
        border-[1px] rounded-full pl-2 pr-3 py-1 border-[#4c4c4cb4]
        hover:bg-[#3aabf126] hover:border-black cursor-pointer
        ${className}
      `}
    >
      <HiOutlineUserCircle size={24} />
      <span>Sign in</span>
    </span>
  );
};

export default SignInButton;
