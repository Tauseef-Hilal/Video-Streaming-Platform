import { FaCirclePlay } from "react-icons/fa6";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <FaCirclePlay className="text-2xl text-red-500" />
      <span className="text-xl font-bold">FusionFlix</span>
    </div>
  );
};

export default Logo;
