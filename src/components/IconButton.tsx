import { IconType } from "react-icons";
import Tooltip from "./Tooltip";
import { MouseEventHandler } from "react";

interface IconButtonProps {
  icon: IconType;
  size: number;
  tip?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  onMouseDown?: MouseEventHandler<HTMLSpanElement>;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  size,
  tip,
  className,
  onClick,
  onMouseDown,
}) => {
  return (
    <Tooltip tip={tip ?? ""}>
      <span
        onMouseDown={onMouseDown}
        onClick={onClick}
        className={`
          p-2 rounded-full hover:bg-neutral-800 flex justify-center 
          items-center cursor-pointer ${className}
        `}
      >
        <Icon size={size} />
      </span>
    </Tooltip>
  );
};

export default IconButton;
