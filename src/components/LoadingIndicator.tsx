import { TbLoader3 } from "react-icons/tb";

interface LoadingIndicatorProps {
  className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin">
        <TbLoader3 className="text-6xl animate-pulse" />
      </div>
    </div>
  );
};

export default LoadingIndicator;
