interface LoadMoreProps {
  className?: string;
  text: string;
  onClick: () => void;
}

const LoadMore: React.FC<LoadMoreProps> = ({ className, text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        w-full rounded-full border-[1px] border-neutral-500 py-2 text-center 
        text-xs text-blue-400 font-medium cursor-pointer hover:bg-[#2e2e2e6b]
        ${className}
      `}
    >
      {text}
    </div>
  );
};

export default LoadMore;
