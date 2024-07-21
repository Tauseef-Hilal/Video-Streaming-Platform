import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  dismissOnTap?: boolean;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  dismissOnTap,
  onClose,
  children,
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed top-0 left-0 inset-0 z-20 flex items-center justify-center 
        bg-black bg-opacity-50 text-black
      `}
      onClick={() => {
        if (dismissOnTap == true || dismissOnTap == undefined) {
          onClose?.call(null);
        }
      }}
    >
      <div
        className={`rounded-lg shadow-lg p-6 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
