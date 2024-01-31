import { PiSmileySadFill } from "react-icons/pi";

interface ErrorProps {
  text: string;
  onRetryClick: () => void;
}

const ErrorComponent: React.FC<ErrorProps> = ({ text, onRetryClick }) => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <PiSmileySadFill className="text-red-600 animate-bounce" size={70} />
        <p className="text-neutral-500">{text}</p>
        <div
          role="button"
          onClick={onRetryClick}
          className={`
        bg-[#47474796] px-4 py-1 mt-4 rounded-lg hover:bg-[#474747c7]
      `}
        >
          Retry
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;