import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href={"/"} className={`flex items-center gap-1 ${className}`}>
      <FaCirclePlay className="text-2xl text-red-500" />
      <span className="text-xl font-bold">FusionFlix</span>
    </Link>
  );
};

export default Logo;
