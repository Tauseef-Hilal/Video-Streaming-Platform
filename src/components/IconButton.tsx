import { IconType } from "react-icons";
import Tooltip from "./Tooltip";

interface IconButtonProps {
  icon: IconType;
  size: number;
  tip?: string;
  className?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  size,
  tip,
  className,
  onClick,
}) => {
  return (
    <Tooltip tip={tip ?? ""}>
      <span
        onClick={onClick}
        className={`
        p-2 rounded-full hover:bg-neutral-800 flex justify-center items-center 
        cursor-pointer ${className}
      `}
      >
        <Icon size={size} />
      </span>
    </Tooltip>
  );
};

export default IconButton;
