import { TbLoader3 } from "react-icons/tb";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="animate-spin">
        <TbLoader3 className="text-6xl animate-pulse" />
      </div>
    </div>
  );
};

export default LoadingIndicator;
