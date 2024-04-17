import { IconType } from "react-icons";
import { TbLoader3 } from "react-icons/tb";

interface LoadingIndicatorProps {
  className?: string;
  icon?: IconType;
  iconClassName?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  className,
  icon: Icon,
  iconClassName,
}) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin">
        {Icon ? (
          <Icon className={iconClassName} />
        ) : (
          <TbLoader3 className={`text-6xl animate-pulse ${iconClassName}`} />
        )}
      </div>
    </div>
  );
};

export default LoadingIndicator;
